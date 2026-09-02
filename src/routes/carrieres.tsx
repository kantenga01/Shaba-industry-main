import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Briefcase, MapPin, Send } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { jobs } from "@/lib/site-data";
import { submitApplication } from "@/lib/submissions";

export const Route = createFileRoute("/carrieres")({
  head: () => ({
    meta: [
      { title: "Careers — Opportunities at SHABA INDUSTRY, Lubumbashi" },
      {
        name: "description",
        content:
          "Discover career opportunities at SHABA INDUSTRY in Lubumbashi: industrial maintenance, sales, graphic design, and web development. Submit your CV and join our growing team.",
      },
      { property: "og:title", content: "Careers — SHABA INDUSTRY" },
      {
        property: "og:description",
        content:
          "Explore job openings or send a spontaneous application to SHABA INDUSTRY in Lubumbashi, DRC.",
      },
    ],
  }),
  component: Careers,
});

function Careers() {
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    try {
      await submitApplication({
        name: String(fd.get("name") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        position: String(fd.get("position") ?? "").trim() || "Open Application",
        message: String(fd.get("message") ?? "").trim() || undefined,
      });
      toast.success(
        "Application submitted successfully. Thank you for your interest in SHABA INDUSTRY!",
      );
      form.reset();
    } catch {
      toast.error("Submission failed. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Shape Your Future With Us"
        description="At Shaba Industry, we welcome ambitious professionals eager to drive innovation in industry and deliver exceptional customer service. Explore our current openings or send us your CV."
      />

      <section className="py-16 text-ink bg-foreground md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <h2 className="text-2xl font-bold uppercase">Current Openings</h2>
            <div className="mt-6 space-y-4">
              {jobs.map((j) => (
                <div
                  key={j.title}
                  className="flex flex-col gap-3 border border-border p-5 transition-colors hover:border-primary sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold uppercase">{j.title}</h3>
                    <p className="mt-1 flex flex-wrap gap-4 text-xs uppercase tracking-wide text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 text-primary" /> {j.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" /> {j.place}
                      </span>
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" asChild>
                    <a href="#application">Apply Now</a>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <form
            id="application"
            onSubmit={onSubmit}
            className="grid h-max gap-4 border-l-4 text-ink border-primary bg-foreground p-6"
          >
            <h2 className="text-2xl font-bold uppercase">Submit Your Application</h2>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Full Name *
              </Label>
              <Input name="name" required maxLength={100} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Email *
              </Label>
              <Input name="email" type="email" required maxLength={255} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Position of Interest
              </Label>
              <Input name="position" maxLength={120} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Message
              </Label>
              <Textarea
                name="message"
                rows={4}
                maxLength={1500}
                placeholder="Tell us about your skills, experience, and motivation."
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                CV (PDF)
              </Label>
              <Input name="cv" type="file" accept=".pdf,.doc,.docx" />
              <p className="text-xs text-muted-foreground">Multiple files ? </p>
            </div>
            <Button type="submit" disabled={sending} className="justify-self-start">
              <Send className="mr-2 h-4 w-4" /> {sending ? "Submitting…" : "Apply Now"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
