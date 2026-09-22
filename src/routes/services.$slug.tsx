import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Download } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-data";
import { useLanguage } from "@/lib/language";

type Language = "fr" | "en";

type LocalizedValue =
  | string
  | {
      fr: string;
      en: string;
    };

function text(value: LocalizedValue, language: Language): string {
  return typeof value === "string" ? value : value[language];
}

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);

    if (!service) {
      throw notFound();
    }

    return { service };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          {
            title: "Service introuvable — SHABA INDUSTRY",
          },
          {
            name: "robots",
            content: "noindex",
          },
        ],
      };
    }

    const { service } = loaderData;

    // Les métadonnées restent en français par défaut.
    // Le contenu visible de la page, lui, change avec la langue.
    const title = text(service.title, "fr");
    const description = text(service.short, "fr");

    return {
      meta: [
        {
          title: `${title} — SHABA INDUSTRY`,
        },
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: `${title} — SHABA INDUSTRY`,
        },
        {
          property: "og:description",
          content: description,
        },
      ],
    };
  },

  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const { language } = useLanguage();

  const title = text(service.title, language);
  const short = text(service.short, language);
  const intro = text(service.intro, language);

  const gallery =
    service.slug === "construction" || service.slug === "print";

  const content =
    language === "fr"
      ? {
          eyebrow: "Service",
          offer: "Notre offre",
          quote: "Demander un devis",
          catalogue: "Catalogue",
          gallery: "Galerie de réalisations",
          achievement: "Réalisation",
          other: "Autres services",
        }
      : {
          eyebrow: "Service",
          offer: "Our Offer",
          quote: "Request a Quote",
          catalogue: "Catalogue",
          gallery: "Project Gallery",
          achievement: "Project",
          other: "Other Services",
        };

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={title}
        description={short}
      />

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <img
              src={service.image}
              alt={title}
              loading="lazy"
              width={1200}
              height={800}
              className="shadow-industrial w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold uppercase md:text-3xl">
              {content.offer}
            </h2>

            <p className="mt-4 text-muted-foreground">
              {intro}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.items.map((item, index) => {
                const itemText = text(item, language);

                return (
                  <li
                    key={`${service.slug}-${index}`}
                    className="flex items-start gap-2 border-l-2 border-primary bg-muted px-4 py-3 text-sm"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {itemText}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link
                  to="/devis"
                  search={{ service: service.slug }}
                >
                  {content.quote}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="secondary">
                <Link to="/catalogue">
                  <Download className="mr-2 h-4 w-4" />
                  {content.catalogue}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {gallery && (
        <section className="bg-muted py-16">
          <div className="container-page">
            <h2 className="text-2xl font-bold uppercase md:text-3xl">
              {content.gallery}
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden"
                >
                  <img
                    src={service.image}
                    alt={`${title} — ${content.achievement} ${i + 1}`}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute bottom-0 left-0 bg-ink/80 px-3 py-1 text-xs uppercase tracking-wide text-ink-foreground">
                    {content.achievement} {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container-page">
          <h2 className="text-2xl font-bold uppercase">
            {content.other}
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
                >
                  {text(s.title, language)}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}