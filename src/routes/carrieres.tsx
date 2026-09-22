import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Briefcase, MapPin, Send } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { jobs, localized } from "@/lib/site-data";
import { submitApplication } from "@/lib/submissions";
import { useLanguage } from "@/lib/language";

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
  const { language } = useLanguage();
  const [sending, setSending] = useState(false);

  const t =
    language === "fr"
      ? {
          eyebrow: "Carrières",
          title: "Construisez votre avenir avec nous",
          description:
            "Chez SHABA INDUSTRY, nous accueillons des professionnels ambitieux, prêts à porter l'innovation dans l'industrie et à offrir un service client exceptionnel. Consultez nos offres ou envoyez-nous votre CV.",
          openings: "Offres actuelles",
          applyNow: "Postuler",
          formTitle: "Envoyer votre candidature",
          name: "Nom complet *",
          email: "E-mail *",
          position: "Poste souhaité",
          message: "Message",
          messagePlaceholder: "Parlez-nous de vos compétences, votre expérience et votre motivation.",
          cv: "CV (PDF)",
          multipleFiles: "Plusieurs fichiers ?",
          submit: "Postuler",
          sending: "Envoi en cours…",
          success: "Candidature envoyée avec succès. Merci pour votre intérêt pour SHABA INDUSTRY !",
          error: "Échec de l'envoi. Veuillez réessayer plus tard.",
          openApplication: "Candidature spontanée",
        }
      : {
          eyebrow: "Careers",
          title: "Shape Your Future With Us",
          description:
            "At Shaba Industry, we welcome ambitious professionals eager to drive innovation in industry and deliver exceptional customer service. Explore our current openings or send us your CV.",
          openings: "Current Openings",
          applyNow: "Apply Now",
          formTitle: "Submit Your Application",
          name: "Full Name *",
          email: "Email *",
          position: "Position of Interest",
          message: "Message",
          messagePlaceholder: "Tell us about your skills, experience, and motivation.",
          cv: "CV (PDF)",
          multipleFiles: "Multiple files ?",
          submit: "Apply Now",
          sending: "Submitting…",
          success: "Application submitted successfully. Thank you for your interest in SHABA INDUSTRY!",
          error: "Submission failed. Please try again later.",
          openApplication: "Open Application",
        };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    try {
      await submitApplication({
        name: String(fd.get("name") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        position: String(fd.get("position") ?? "").trim() || t.openApplication,
        message: String(fd.get("message") ?? "").trim() || undefined,
      });
      toast.success(t.success);
      form.reset();
    } catch {
      toast.error(t.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="py-16 text-ink bg-foreground md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <h2 className="text-2xl font-bold uppercase">{t.openings}</h2>
            <div className="mt-6 space-y-4">
              {jobs.map((j, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 border border-border p-5 transition-colors hover:border-primary sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold uppercase">
                      {localized(j.title, language)}
                    </h3>
                    <p className="mt-1 flex flex-wrap gap-4 text-xs uppercase tracking-wide text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 text-primary" />{" "}
                        {localized(j.type, language)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />{" "}
                        {localized(j.place, language)}
                      </span>
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" asChild>
                    <a href="#application">{t.applyNow}</a>
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
            <h2 className="text-2xl font-bold uppercase">{t.formTitle}</h2>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                {t.name}
              </Label>
              <Input name="name" required maxLength={100} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                {t.email}
              </Label>
              <Input name="email" type="email" required maxLength={255} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                {t.position}
              </Label>
              <Input name="position" maxLength={120} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                {t.message}
              </Label>
              <Textarea name="message" rows={4} maxLength={1500} placeholder={t.messagePlaceholder} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">{t.cv}</Label>
              <Input name="cv" type="file" accept=".pdf,.doc,.docx" />
              <p className="text-xs text-muted-foreground">{t.multipleFiles}</p>
            </div>
            <Button type="submit" disabled={sending} className="justify-self-start">
              <Send className="mr-2 h-4 w-4" /> {sending ? t.sending : t.submit}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}