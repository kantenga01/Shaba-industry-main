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
      { title: "Demande de devis — SHABA INDUSTRY Lubumbashi" },
      {
        name: "description",
        content:
          "Obtenez un devis gratuit pour vos EPI, travaux de construction, impressions, fournitures industrielles, logistique ou projets IT à Lubumbashi.",
      },
      { property: "og:title", content: "Demande de devis — SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Décrivez votre besoin, nous revenons vers vous sous 24h ouvrées.",
      },
    ],
  }),
  component: Devis,
});

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  company: z.string().trim().max(120).optional(),
  phone: z.string().trim().min(6, "Téléphone invalide").max(30),
  email: z.string().trim().email("Email invalide").max(255),
  service: z.string().min(1, "Sélectionnez un service"),
  message: z.string().trim().min(10, "Décrivez votre besoin (10 caractères min.)").max(2000),
});

function Devis() {
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
      toast.error("Merci de corriger les champs indiqués.");
      return;
    }
    setErrors({});
    setSending(true);
    try {
      await submitQuote(parsed.data);
      toast.success("Demande envoyée ! Notre équipe vous répond sous 24h ouvrées.");
      form.reset();
    } catch {
      toast.error("Envoi impossible pour le moment. Réessayez ou contactez-nous par WhatsApp.");
    } finally {
      setSending(false);
    }
  };


  return (
    <>
      <PageHero
        eyebrow="Devis"
        title="Demander un devis"
        description="Remplissez le formulaire, notre équipe commerciale vous répond sous 24 heures ouvrées."
      />

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[2fr_1fr]">
          <form onSubmit={onSubmit} className="grid gap-5 border border-border p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nom complet *" error={errors["name"]}>
                <Input name="name" required maxLength={100} placeholder="Votre nom" />
              </Field>
              <Field label="Société" error={errors["company"]}>
                <Input name="company" maxLength={120} placeholder="Nom de votre société" />
              </Field>
              <Field label="Téléphone *" error={errors["phone"]}>
                <Input name="phone" required maxLength={30} placeholder="+243 ..." />
              </Field>
              <Field label="Email *" error={errors["email"]}>
                <Input name="email" type="email" required maxLength={255} placeholder="vous@societe.com" />
              </Field>
            </div>

            <Field label="Service concerné *" error={errors["service"]}>
              <select
                name="service"
                defaultValue={service ?? ""}
                required
                className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm"
              >
                <option value="">Sélectionnez un service</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Description du besoin *" error={errors["message"]}>
              <Textarea name="message" rows={6} required maxLength={2000} placeholder="Quantités, délais, lieu de livraison…" />
            </Field>

            <Field label="Pièces jointes (plans, cahier des charges)">
              <Input name="files" type="file" multiple />
            </Field>

            <Button type="submit" size="lg" disabled={sending} className="justify-self-start">
              <Send className="mr-2 h-4 w-4" /> {sending ? "Envoi…" : "Envoyer la demande"}
            </Button>
          </form>

          <aside className="h-max border-l-4 border-primary bg-muted p-6">
            <h2 className="font-display text-lg font-semibold uppercase">Comment ça marche</h2>
            <ol className="mt-4 space-y-4 text-sm text-muted-foreground">
              <li>
                <span className="font-display font-semibold text-foreground">1. Votre demande</span>
                <br />
                Décrivez votre besoin en quelques lignes.
              </li>
              <li>
                <span className="font-display font-semibold text-foreground">2. Étude</span>
                <br />
                Nos équipes analysent la faisabilité et les délais.
              </li>
              <li>
                <span className="font-display font-semibold text-foreground">3. Devis</span>
                <br />
                Vous recevez une offre chiffrée sous 24h ouvrées.
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
