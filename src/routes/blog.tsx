import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { posts, localized } from "@/lib/site-data";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "News & Articles — SHABA INDUSTRY Insights" },
      {
        name: "description",
        content:
          "Stay informed with SHABA INDUSTRY: expert articles and industry insights on construction, manufacturing, PPE, printing, and cybersecurity in the DRC.",
      },
      { property: "og:title", content: "News & Articles — SHABA INDUSTRY" },
      {
        property: "og:description",
        content:
          "Professional analysis, technical guidance, and industry updates from Lubumbashi and beyond.",
      },
    ],
  }),
  component: News,
});

function News() {
  const { language } = useLanguage();
  const [q, setQ] = useState("");

  const t =
    language === "fr"
      ? {
          eyebrow: "Actualités",
          title: "Analyses, actualités et regards d'experts",
          description:
            "Découvrez des articles de référence sur la construction, l'industrie, les EPI, l'impression et la cybersécurité. Nos spécialistes partagent des conseils pratiques et les dernières évolutions du secteur.",
          searchPlaceholder: "Rechercher un article…",
          empty: "Aucun article trouvé pour votre recherche.",
          dateLocale: "fr-FR",
        }
      : {
          eyebrow: "News & Articles",
          title: "Insights, Updates & Expert Perspectives",
          description:
            "Explore authoritative articles on construction, industry, PPE, printing, and cybersecurity. Our specialists share practical guidance and the latest developments shaping the sector.",
          searchPlaceholder: "Search articles…",
          empty: "No articles found for your search.",
          dateLocale: "en-US",
        };

  // Recherche sur le texte localisé (dans la langue active), au lieu de
  // concaténer directement des objets {fr,en} (ce qui produisait
  // "[object Object]" et cassait le filtrage).
  const query = q.toLowerCase();
  const filtered = posts.filter((p) => {
    const haystack = [
      localized(p.title, language),
      localized(p.category, language),
      localized(p.excerpt, language),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="py-16 bg-foreground md:py-20">
        <div className="container-page">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="pl-9 text-ink"
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Card
                key={p.slug}
                className="h-full transition-all hover:-translate-y-1 hover:shadow-industrial"
              >
                <CardContent className="p-6">
                  <span className="bg-primary px-2 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                    {localized(p.category, language)}
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold uppercase leading-snug">
                    {localized(p.title, language)}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {localized(p.excerpt, language)}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {new Date(p.date).toLocaleDateString(t.dateLocale, {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground">{t.empty}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}