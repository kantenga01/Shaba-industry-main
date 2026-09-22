import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { projects, services, localized } from "@/lib/site-data";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      { title: "Réalisations — Chantiers, industrie et projets SHABA INDUSTRY" },
      {
        name: "description",
        content:
          "Galerie photos et vidéos des réalisations de SHABA INDUSTRY : construction, industrie, impression, informatique et logistique.",
      },
      { property: "og:title", content: "Nos réalisations — SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Découvrez nos projets livrés en construction, industrie, impression et IT.",
      },
    ],
  }),
  component: Realisations,
});

// Un identifiant stable (fr) par catégorie, indépendant de la langue affichée,
// pour que le filtre continue de fonctionner quelle que soit la langue active.
// Doit correspondre exactement aux valeurs `category.fr` définies dans site-data.ts.
const categories: { id: string; fr: string; en: string }[] = [
  { id: "all", fr: "Toutes", en: "All" },
  { id: "construction", fr: "Construction", en: "Construction" },
  { id: "industrie", fr: "Industrie", en: "Industry" },
  { id: "impression", fr: "Impression", en: "Printing" },
  { id: "technologie", fr: "Technologie", en: "Technology" },
  { id: "logistique", fr: "Logistique", en: "Logistics" },
];

const videoGallery = [
  { fr: "Chantier industriel", en: "Industrial site" },
  { fr: "Atelier impression", en: "Printing workshop" },
  { fr: "Logistique & convoi", en: "Logistics & convoy" },
];

function Realisations() {
  const { language } = useLanguage();
  const [catId, setCatId] = useState("all");

  const t =
    language === "fr"
      ? {
          eyebrow: "Réalisations",
          title: "Nos projets livrés",
          description:
            "Un aperçu de nos interventions pour les entreprises industrielles, minières et commerciales du Haut-Katanga.",
          videoTitle: "Galerie vidéos",
          videoSubtitle: "Reportages de chantier et présentations de nos pôles d'activité.",
        }
      : {
          eyebrow: "Projects",
          title: "Our Delivered Projects",
          description:
            "An overview of our work for industrial, mining, and commercial companies across Haut-Katanga.",
          videoTitle: "Video Gallery",
          videoSubtitle: "Site reports and presentations of our business divisions.",
        };

  const activeCategory = categories.find((c) => c.id === catId) ?? categories[0]!;

  // On compare toujours sur le libellé français (canonique), peu importe la
  // langue affichée, car c'est la clé stable définie dans site-data.ts.
  const filtered =
    activeCategory.id === "all"
      ? projects
      : projects.filter((p) => localized(p.category, "fr") === activeCategory.fr);

  const imageFor = (slug: string) => services.find((s) => s.slug === slug)?.image;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="py-14 bg-foreground md:py-20">
        <div className="container-page">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCatId(c.id)}
                className={`border px-4 py-2 text-sm font-semibold text-primary-foreground uppercase tracking-wide transition-colors ${
                  catId === c.id
                    ? "border-primary bg-primary font-semibold text-primary-foreground"
                    : "border-border hover:border-primary"
                }`}
              >
                {language === "fr" ? c.fr : c.en}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, index) => (
              <figure key={`${p.service}-${index}`} className="group relative overflow-hidden">
                <img
                  src={imageFor(p.service)}
                  alt={localized(p.title, language)}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-ink/85 px-4 py-3 text-ink-foreground">
                  <p className="font-display text-sm font-semibold uppercase">
                    {localized(p.title, language)}
                  </p>
                  <p className="text-xs text-primary">{localized(p.category, language)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground py-14 md:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-ink uppercase md:text-3xl">{t.videoTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t.videoSubtitle}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videoGallery.map((v, i) => {
              const label = language === "fr" ? v.fr : v.en;

              return (
                <div
                  key={label}
                  className="relative flex h-48 items-center justify-center overflow-hidden bg-ink text-ink-foreground"
                >
                  <img
                    src={imageFor(projects[i]?.service ?? "workwear-ppe")}
                    alt={label}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                  />
                  <div className="relative flex flex-col items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Play className="h-5 w-5" />
                    </span>
                    <span className="font-display text-sm uppercase tracking-wide">{label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
