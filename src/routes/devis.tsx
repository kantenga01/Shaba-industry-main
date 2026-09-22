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
import { services, localized } from "@/lib/site-data";
import { submitQuote } from "@/lib/submissions";
import { useLanguage } from "@/lib/language";

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
      {
        property: "og:title",
        content: "Request a Quote — SHABA INDUSTRY",
      },
      {
        property: "og:description",
        content:
          "Describe your requirements and we will respond within 24 business hours.",
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

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const MAX_TOTAL_SIZE = 20 * 1024 * 1024;
const MAX_FILES = 5;

type QuoteAttachment = {
  filename: string;
  content: string;
  contentType: string;
};

async function fileToBase64(file: File): Promise<QuoteAttachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        reject(new Error(`Unable to read ${file.name}`));
        return;
      }

      const base64 = result.split(",")[1];

      if (!base64) {
        reject(new Error(`Unable to encode ${file.name}`));
        return;
      }

      resolve({
        filename: file.name,
        content: base64,
        contentType: file.type || "application/octet-stream",
      });
    };

    reader.onerror = () => {
      reject(new Error(`Unable to read ${file.name}`));
    };

    reader.readAsDataURL(file);
  });
}

function Quote() {
  const { service } = Route.useSearch();
  const { language } = useLanguage();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const t =
    language === "fr"
      ? {
          heroEyebrow: "Une proposition sur mesure",
          heroTitle: "Demandes professionnelles",
          heroDescription:
            "Envoyez-nous votre besoin et recevez un devis détaillé sous un jour ouvré.",
          name: "Nom complet *",
          namePlaceholder: "Votre nom",
          company: "Entreprise",
          companyPlaceholder: "Nom de votre entreprise",
          phone: "Téléphone *",
          email: "E-mail *",
          service: "Service souhaité *",
          servicePlaceholder: "------",
          message: "Description du besoin *",
          messagePlaceholder: "Quantités, délais, lieu de livraison…",
          attachments: "Pièces jointes (plans, spécifications)",
          attachmentsHint: "Maximum 5 fichiers, 8 Mo par fichier, 20 Mo au total.",
          submit: "Envoyer la demande",
          sending: "Envoi en cours…",
          howItWorks: "Comment ça marche ?",
          step1Title: "1. Votre demande",
          step1: "Décrivez votre besoin en quelques lignes.",
          step2Title: "2. Analyse",
          step2: "Notre équipe étudie la faisabilité et les délais.",
          step3Title: "3. Devis",
          step3: "Vous recevez une offre détaillée sous 24h ouvrées.",
          errorFix: "Veuillez corriger les champs indiqués.",
          errorMaxFiles: (n: number) => `Vous pouvez joindre au maximum ${n} fichiers.`,
          errorTooLarge: (name: string) =>
            `"${name}" est trop volumineux. Taille maximale : 8 Mo par fichier.`,
          errorTotalSize: "La taille totale des pièces jointes ne peut pas dépasser 20 Mo.",
          success: "Demande envoyée ! Notre équipe vous répondra sous 24h ouvrées.",
          errorSubmit:
            "Impossible d'envoyer pour le moment. Veuillez réessayer ou nous contacter via WhatsApp.",
        }
      : {
          heroEyebrow: "Get a Tailored Proposal",
          heroTitle: "Business Requests",
          heroDescription:
            "Submit your requirements and receive a detailed quotation within one business day",
          name: "Full Name *",
          namePlaceholder: "Your name",
          company: "Company",
          companyPlaceholder: "Your company name",
          phone: "Phone *",
          email: "Email *",
          service: "Service Required *",
          servicePlaceholder: "------",
          message: "Requirement Description *",
          messagePlaceholder: "Quantities, deadlines, delivery location…",
          attachments: "Attachments (plans, specifications)",
          attachmentsHint: "Maximum 5 files, 8 MB per file, 20 MB total.",
          submit: "Submit Request",
          sending: "Sending…",
          howItWorks: "How It Works ?",
          step1Title: "1. Your Request",
          step1: "Describe your requirements in a few lines.",
          step2Title: "2. Review",
          step2: "Our team analyzes feasibility and timelines.",
          step3Title: "3. Quote",
          step3: "You receive a detailed offer within 24 business hours.",
          errorFix: "Please correct the highlighted fields.",
          errorMaxFiles: (n: number) => `You can attach a maximum of ${n} files.`,
          errorTooLarge: (name: string) =>
            `"${name}" is too large. Maximum size is 8 MB per file.`,
          errorTotalSize: "The total size of your attachments cannot exceed 20 MB.",
          success: "Request submitted! Our team will respond within 24 business hours.",
          errorSubmit:
            "Unable to send at the moment. Please try again or contact us via WhatsApp.",
        };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const parsed = quoteSchema.safeParse(data);

    if (!parsed.success) {
      const next: Record<string, string> = {};

      for (const issue of parsed.error.issues) {
        next[String(issue.path[0])] = issue.message;
      }

      setErrors(next);
      toast.error(t.errorFix);
      return;
    }

    const fileInput = form.elements.namedItem("files") as
      | HTMLInputElement
      | null;

    const selectedFiles = fileInput?.files
      ? Array.from(fileInput.files)
      : [];

    if (selectedFiles.length > MAX_FILES) {
      toast.error(t.errorMaxFiles(MAX_FILES));
      return;
    }

    const totalSize = selectedFiles.reduce(
      (total, file) => total + file.size,
      0,
    );

    const oversizedFile = selectedFiles.find(
      (file) => file.size > MAX_FILE_SIZE,
    );

    if (oversizedFile) {
      toast.error(t.errorTooLarge(oversizedFile.name));
      return;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      toast.error(t.errorTotalSize);
      return;
    }

    setErrors({});
    setSending(true);

    try {
      const attachments = await Promise.all(
        selectedFiles.map(fileToBase64),
      );

      await submitQuote({
        ...parsed.data,
        attachments,
      });

      toast.success(t.success);

      form.reset();
    } catch (error) {
      console.error("Quote submission error:", error);

      toast.error(t.errorSubmit);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        description={t.heroDescription}
      />

      <section className="bg-foreground py-16 text-ink md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[2fr_1fr]">
          <form
            onSubmit={onSubmit}
            className="grid gap-5 border border-border p-6 md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t.name} error={errors["name"]}>
                <Input
                  name="name"
                  required
                  maxLength={100}
                  placeholder={t.namePlaceholder}
                />
              </Field>

              <Field label={t.company} error={errors["company"]}>
                <Input
                  name="company"
                  maxLength={120}
                  placeholder={t.companyPlaceholder}
                />
              </Field>

              <Field label={t.phone} error={errors["phone"]}>
                <Input
                  name="phone"
                  required
                  maxLength={30}
                  placeholder="+243 ..."
                />
              </Field>

              <Field label={t.email} error={errors["email"]}>
                <Input
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  placeholder="you@company.com"
                />
              </Field>
            </div>

            <Field label={t.service} error={errors["service"]}>
              <select
                name="service"
                defaultValue={service ?? ""}
                required
                className="h-10 w-full rounded-sm border border-input bg-foreground px-3 text-sm"
              >
                <option value="">{t.servicePlaceholder}</option>

                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {localized(s.title, language)}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={t.message} error={errors["message"]}>
              <Textarea
                name="message"
                rows={6}
                required
                maxLength={2000}
                placeholder={t.messagePlaceholder}
              />
            </Field>

            <Field label={t.attachments}>
              <Input
                name="files"
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx"
              />

              <p className="text-xs text-muted-foreground">{t.attachmentsHint}</p>
            </Field>

            <Button
              type="submit"
              size="lg"
              disabled={sending}
              className="justify-self-start"
            >
              <Send className="mr-2 h-4 w-4" />

              {sending ? t.sending : t.submit}
            </Button>
          </form>

          <aside className="h-max border-l-4 border-primary bg-muted p-6">
            <h2 className="font-display text-lg font-semibold uppercase text-primary">
              {t.howItWorks}
            </h2>

            <ol className="mt-4 space-y-4 text-sm text-muted-foreground">
              <li>
                <span className="font-display font-semibold text-foreground">
                  {t.step1Title}
                </span>
                <br />
                {t.step1}
              </li>

              <li>
                <span className="font-display font-semibold text-foreground">
                  {t.step2Title}
                </span>
                <br />
                {t.step2}
              </li>

              <li>
                <span className="font-display font-semibold text-foreground">
                  {t.step3Title}
                </span>
                <br />
                {t.step3}
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
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>

      {children}

      {error && (
        <p className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
