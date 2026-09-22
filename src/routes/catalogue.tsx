import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { catalogues, localized } from "@/lib/site-data";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/catalogue")({
  head: () => ({
    meta: [
      { title: "Catalogues & Documentation — SHABA INDUSTRY" },
      {
        name: "description",
        content:
          "Download SHABA INDUSTRY catalogues: PPE, industrial and mining supplies, printing brochures, and technical documentation.",
      },
      { property: "og:title", content: "Catalogues & Documentation — SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "PDF catalogues, technical sheets, and product documentation.",
      },
    ],
  }),
  component: Catalogue,
});

// Nom de fichier stable par catalogue (indépendant de la langue affichée),
// dans le même ordre que le tableau `catalogues` de site-data.ts.
const catalogueFiles = [
  "profil-entreprise.pdf",
  "catalogue-epi-workwear.pdf",
  "catalogue-fournitures-industrielles.pdf",
  "brochure-shaba-print.xlsx",
  "notre-flotte.doc",
];

function Catalogue() {
  const { language } = useLanguage();

  const t =
    language === "fr"
      ? {
          eyebrow: "Catalogue",
          title: "Catalogues & Documentation",
          description:
            "Accédez à nos catalogues produits, fiches techniques et documentation, disponibles en téléchargement direct.",
          ctaTitle: "Besoin d'une fiche technique spécifique ?",
          ctaText: "Notre équipe commerciale vous fournira la documentation adaptée à votre besoin.",
          contact: "Nous contacter",
        }
      : {
          eyebrow: "Catalogue",
          title: "Catalogues & Documentation",
          description:
            "Access our product catalogues, technical sheets, and documentation available for direct download.",
          ctaTitle: "Need a specific datasheet?",
          ctaText: "Our sales team will provide the documentation tailored to your requirements.",
          contact: "Contact Us",
        };

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="py-16 bg-foreground md:py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {catalogues.map((c, index) => {
            const title = localized(c.title, language);
            const desc = localized(c.desc, language);
            const filename = catalogueFiles[index] ?? "document.pdf";

            return (
              <div
                key={filename}
                className="flex bg-muted items-start gap-4 border border-border p-6 transition-colors hover:border-primary"
              >
                <span className="gradient-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-sm text-primary-foreground">
                  <FileText className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-semibold uppercase">{title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  <Button asChild size="sm" variant="secondary" className="mt-4">
                    {/* Remplacer par le chemin ou l'URL réel du fichier */}
                    <a href={`/downloads/${filename}`} download>
                      <Download className="mr-2 h-4 w-4" /> {c.format}
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-muted py-14">
        <div className="container-page flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold uppercase">{t.ctaTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.ctaText}</p>
          </div>
          <Button asChild size="lg">
            <a href="/contact">{t.contact}</a>
          </Button>
        </div>
      </section>
    </>
  );
}
