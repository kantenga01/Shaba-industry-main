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
      { title: "Carrières — Offres d'emploi chez SHABA INDUSTRY à Lubumbashi" },
      {
        name: "description",
        content:
          "Rejoignez SHABA INDUSTRY : offres d'emploi à Lubumbashi en maintenance industrielle, commerce, infographie et développement web. Déposez votre CV.",
      },
      { property: "og:title", content: "Carrières — SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Offres d'emploi et dépôt de candidature spontanée à Lubumbashi, RDC.",
      },
    ],
  }),
  component: Carrieres,
});

function Carrieres() {
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
        position: String(fd.get("position") ?? "").trim() || "Candidature spontanée",
        message: String(fd.get("message") ?? "").trim() || undefined,
      });
      toast.success("Candidature envoyée. Merci de votre intérêt !");
      form.reset();
    } catch {
      toast.error("Envoi impossible pour le moment. Réessayez plus tard.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Carrières"
        title="Rejoignez nos équipes"
        description="Nous recrutons des profils techniques et commerciaux passionnés par l'industrie et le service client."
      />

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <h2 className="text-2xl font-bold uppercase">Offres d'emploi</h2>
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
                    <a href="#candidature">Postuler</a>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <form
            id="candidature"
            onSubmit={onSubmit}
            className="grid h-max gap-4 border-l-4 border-primary bg-muted p-6"
          >
            <h2 className="text-2xl font-bold uppercase">Déposer votre CV</h2>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Nom complet *</Label>
              <Input name="name" required maxLength={100} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Email *</Label>
              <Input name="email" type="email" required maxLength={255} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Poste visé</Label>
              <Input name="position" maxLength={120} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Message</Label>
              <Textarea name="message" rows={4} maxLength={1500} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">CV (PDF)</Label>
              <Input name="cv" type="file" accept=".pdf,.doc,.docx" />
              <p className="text-xs text-muted-foreground">
                Envoyez votre CV en pièce jointe à info@shabaindustry.com après l'envoi du
                formulaire.
              </p>
            </div>
            <Button type="submit" disabled={sending} className="justify-self-start">
              <Send className="mr-2 h-4 w-4" /> {sending ? "Envoi…" : "Envoyer ma candidature"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
