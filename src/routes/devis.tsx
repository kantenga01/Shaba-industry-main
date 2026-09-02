import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/lib/site-data";
import { submitQuote } from "@/lib/submissions";

const searchSchema = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/devis")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Request a Quote — SHABA INDUSTRY Lubumbashi" },
      {
        name: "description",
        content:
          "Get a free quote for PPE, construction works, printing, industrial supplies, logistics, or IT projects in Lubumbashi.",
      },
      { property: "og:title", content: "Request a Quote — SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Describe your requirements and we will respond within 24 business hours.",
      },
    ],
  }),
  component: Quote,
});

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name too short").max(100),
  company: z.string().trim().max(120).optional(),
  phone: z.string().trim().min(6, "Invalid phone number").max(30),
  email: z.string().trim().email("Invalid email").max(255),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .trim()
    .min(10, "Please describe your requirement (min. 10 characters)")
    .max(2000),
});

function Quote() {
  const { service } = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = quoteSchema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setErrors({});
    setSending(true);
    try {
      await submitQuote(parsed.data);
      toast.success("Request submitted! Our team will respond within 24 business hours.");
      form.reset();
    } catch {
      toast.error("Unable to send at the moment. Please try again or contact us via WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Get a Tailored Proposal"
        title="Business Requests"
        description="Submit your requirements and receive a detailed quotation within one business day"
      />

      <section className="py-16 text-ink bg-foreground md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[2fr_1fr]">
          <form onSubmit={onSubmit} className="grid gap-5 border border-border p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name *" error={errors["name"]}>
                <Input name="name" required maxLength={100} placeholder="Your name" />
              </Field>
              <Field label="Company" error={errors["company"]}>
                <Input name="company" maxLength={120} placeholder="Your company name" />
              </Field>
              <Field label="Phone *" error={errors["phone"]}>
                <Input name="phone" required maxLength={30} placeholder="+243 ..." />
              </Field>
              <Field label="Email *" error={errors["email"]}>
                <Input
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  placeholder="you@company.com"
                />
              </Field>
            </div>

            <Field label="Service Required *" error={errors["service"]}>
              <select
                name="service"
                defaultValue={service ?? ""}
                required
                className="h-10 w-full rounded-sm border border-input bg-foreground px-3 text-sm"
              >
                <option value="">------</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Requirement Description *" error={errors["message"]}>
              <Textarea
                name="message"
                rows={6}
                required
                maxLength={2000}
                placeholder="Quantities, deadlines, delivery location…"
              />
            </Field>

            <Field label="Attachments (plans, specifications)">
              <Input name="files" type="file" multiple />
            </Field>

            <Button type="submit" size="lg" disabled={sending} className="justify-self-start">
              <Send className="mr-2 h-4 w-4" /> {sending ? "Sending…" : "Submit Request"}
            </Button>
          </form>

          <aside className="h-max border-l-4 border-primary bg-muted p-6">
            <h2 className="font-display text-primary text-lg font-semibold uppercase">
              How It Works ?
            </h2>
            <ol className="mt-4 space-y-4 text-sm text-muted-foreground">
              <li>
                <span className="font-display font-semibold text-foreground">1. Your Request</span>
                <br />
                Describe your requirements in a few lines.
              </li>
              <li>
                <span className="font-display font-semibold text-foreground">2. Review</span>
                <br />
                Our team analyzes feasibility and timelines.
              </li>
              <li>
                <span className="font-display font-semibold text-foreground">3. Quote</span>
                <br />
                You receive a detailed offer within 24 business hours.
              </li>
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
