import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company } from "@/lib/site-data";
import { submitContact } from "@/lib/submissions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SHABA INDUSTRY, Lubumbashi (RDC)" },
      {
        name: "description",
        content:
          "Contactez SHABA INDUSTRY : 02 Changalele, Route Kinsevere, Lubumbashi. Téléphone, WhatsApp, email et formulaire de contact.",
      },
      { property: "og:title", content: "Contact — SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Adresse, téléphones, emails et formulaire de contact à Lubumbashi, RDC.",
      },
    ],
  }),
  component: Contact,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  message: z.string().trim().min(10, "Message trop court").max(2000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    try {
      await submitContact(parsed.data);
      toast.success("Message envoyé ! Nous vous répondons rapidement.");
      form.reset();
    } catch {
      toast.error("Envoi impossible pour le moment. Réessayez ou écrivez-nous sur WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Nous contacter"
        description="Nos équipes sont disponibles du lundi au samedi pour répondre à vos demandes."
      />

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold uppercase">Coordonnées</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{company.address}</span>
              </li>
              {company.phones.map((p) => (
                <li key={p} className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-primary">
                    {p}
                  </a>
                </li>
              ))}
              {company.emails.map((m) => (
                <li key={m} className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <a href={`mailto:${m}`} className="hover:text-primary">
                    {m}
                  </a>
                </li>
              ))}
            </ul>

            <Button asChild className="mt-7" variant="secondary">
              <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Écrire sur WhatsApp
              </a>
            </Button>

            <div className="mt-8 overflow-hidden border border-border">
              <iframe
                title="Localisation de SHABA INDUSTRY à Lubumbashi"
                src="https://www.google.com/maps?q=Route%20Kinsevere%2C%20Lubumbashi%2C%20RDC&output=embed"
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </div>

          <form onSubmit={onSubmit} className="grid h-max gap-5 border border-border p-6 md:p-8">
            <h2 className="text-2xl font-bold uppercase">Formulaire de contact</h2>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Nom *</Label>
              <Input name="name" required maxLength={100} placeholder="Votre nom" />
              {errors["name"] && <p className="text-xs text-destructive">{errors["name"]}</p>}
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Email *</Label>
              <Input name="email" type="email" required maxLength={255} placeholder="vous@societe.com" />
              {errors["email"] && <p className="text-xs text-destructive">{errors["email"]}</p>}
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Message *</Label>
              <Textarea name="message" rows={6} required maxLength={2000} placeholder="Votre message" />
              {errors["message"] && <p className="text-xs text-destructive">{errors["message"]}</p>}
            </div>
            <Button type="submit" size="lg" className="justify-self-start">
              <Send className="mr-2 h-4 w-4" /> Envoyer
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
