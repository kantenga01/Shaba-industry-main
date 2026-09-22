import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services, localized } from "@/lib/site-data";
import { shopProducts } from "@/lib/shop-data";
import { useLanguage } from "@/lib/language";

// TODO: remplace ces deux URLs par les vrais liens de tes fiches App Store et
// Google Play une fois l'application "Shaba Shop" publiée.
const APP_STORE_URL = "#";
const PLAY_STORE_URL = "#";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Produits & fournitures — SHABA INDUSTRY" },
      {
        name: "description",
        content:
          "Découvrez une sélection de produits SHABA INDUSTRY par catégorie : EPI, fournitures minières, construction, impression, logistique et IT. Demandez un devis en un clic.",
      },
      { property: "og:title", content: "Shop — SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Une sélection de produits par catégorie, avec devis sur demande.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const content =
    language === "fr"
      ? {
          eyebrow: "Shop",
          title: "Nos produits par catégorie",
          description:
            "Une sélection de produits proposés par SHABA INDUSTRY. Demandez un devis en un clic pour recevoir une offre adaptée à votre besoin.",
          all: "Tous",
          quote: "Demander un devis",
          empty: "Aucun produit dans cette catégorie pour le moment.",
          appTitle: "L'application Shaba Shop",
          appText:
            "Retrouvez notre catalogue et demandez vos devis directement depuis votre téléphone.",
          appStore: "Télécharger sur l'App Store",
          playStore: "Disponible sur Google Play",
        }
      : {
          eyebrow: "Shop",
          title: "Our Products by Category",
          description:
            "A selection of products offered by SHABA INDUSTRY. Request a quote in one click to receive an offer tailored to your needs.",
          all: "All",
          quote: "Request a Quote",
          empty: "No products in this category yet.",
          appTitle: "The Shaba Shop App",
          appText: "Browse our catalogue and request quotes directly from your phone.",
          appStore: "Download on the App Store",
          playStore: "Get it on Google Play",
        };

  // Filtres construits à partir des services existants, pour rester cohérent
  // avec les catégories déjà utilisées ailleurs sur le site.
  const categoryFilters = [
    { slug: "all", label: content.all },
    ...services.map((s) => ({ slug: s.slug, label: localized(s.title, language) })),
  ];

  const filteredProducts =
    activeCategory === "all"
      ? shopProducts
      : shopProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHero eyebrow={content.eyebrow} title={content.title} description={content.description} />

      {/* TÉLÉCHARGEMENT DE L'APP */}
      <section className="border-b border-border bg-foreground py-10">
        <div className="container-page flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-lg font-semibold uppercase">{content.appTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{content.appText}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.appStore}
              className="inline-flex items-center gap-3 rounded-md border border-border bg-background px-4 py-2 transition-colors hover:border-primary"
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden>
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.93-.18 1.94-.87 3.4-.75 1.83.15 3.24.93 4.09 2.34-3.54 2.12-3.03 6.83.15 7.75-.57 1.5-1.31 2.99-2.72 4.83zM12.03 7.25c-.15-2.23 1.66-4.13 3.74-4.25.29 2.5-2.15 4.35-3.74 4.25z" />
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase text-muted-foreground">Download on the</span>
                <span className="block text-sm font-semibold">App Store</span>
              </span>
            </a>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.playStore}
              className="inline-flex items-center gap-3 rounded-md border border-border bg-background px-4 py-2 transition-colors hover:border-primary"
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden>
                <path d="M3.6 2.4c-.4.4-.6.9-.6 1.5v16.2c0 .6.2 1.1.6 1.5l.1.1L13 12 3.7 2.3l-.1.1z" />
                <path d="M16.2 14.9 13 12l3.2-3.2 3.9 2.2c1.1.6 1.1 1.5 0 2.1l-3.9 2.2z" />
                <path d="m4 21.6 9-9-9-9c-.1.2-.1.4-.1.6v16.8c0 .2 0 .4.1.6z" opacity=".6" />
                <path d="M13 12 4 21.6c.3.1.7.1 1.1-.1l10.4-6-2.5-2.5L13 12z" />
                <path d="M13 12 3.6 2.5c-.4-.2-.8-.2-1.1-.1L13 12z" opacity=".8" />
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase text-muted-foreground">Get it on</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page">
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCategory(c.slug)}
                className={`border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  activeCategory === c.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Grille produits */}
          {filteredProducts.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => {
                const name = localized(product.name, language);
                const description = localized(product.description, language);
                const categoryLabel =
                  services.find((s) => s.slug === product.category)?.title;

                return (
                  <Card
                    key={product.id}
                    className="h-full overflow-hidden p-0 transition-all hover:-translate-y-1 hover:shadow-industrial"
                  >
                    <img
                      src={product.image}
                      alt={name}
                      loading="lazy"
                      width={1200}
                      height={800}
                      className="h-44 w-full object-cover"
                    />

                    <CardContent className="p-6">
                      {categoryLabel && (
                        <p className="text-xs uppercase tracking-wide text-primary">
                          {localized(categoryLabel, language)}
                        </p>
                      )}

                      <h2 className="mt-1 font-display text-lg font-semibold uppercase">
                        {name}
                      </h2>

                      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

                      <Button asChild size="sm" className="mt-4">
                        <Link to="/devis" search={{ service: product.category }}>
                          {content.quote}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="mt-10 text-sm text-muted-foreground">{content.empty}</p>
          )}
        </div>
      </section>
    </>
  );
}