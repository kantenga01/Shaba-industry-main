import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
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
  if (typeof value === "string") {
    return value;
  }

  return value[language];
}

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      {
        title: "Nos services — SHABA INDUSTRY",
      },
      {
        name: "description",
        content:
          "Découvrez les six pôles de SHABA INDUSTRY : EPI, construction, impression, fournitures industrielles et minières, import-export et informatique.",
      },
      {
        property: "og:title",
        content: "Nos services — SHABA INDUSTRY",
      },
      {
        property: "og:description",
        content:
          "Six pôles d'expertise au service des industries et des mines en RDC.",
      },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const { language } = useLanguage();

  const content =
    language === "fr"
      ? {
          eyebrow: "Nos services",
          title: "Six pôles d'expertise spécialisée",
          description:
            "Une offre complète pour vos opérations industrielles, vos chantiers, votre communication et vos besoins informatiques.",
          details: "Voir le détail",
        }
      : {
          eyebrow: "Our Services",
          title: "Six Areas of Specialized Expertise",
          description:
            "Comprehensive solutions tailored to your industrial operations, construction projects, communications, and IT requirements.",
          details: "View Details",
        };

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />

      <section className="bg-foreground py-16 md:py-20">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const title = text(service.title, language);
            const short = text(service.short, language);

            return (
              <Link
                key={service.slug}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group"
              >
                <Card className="h-full overflow-hidden p-0 transition-all group-hover:-translate-y-1 group-hover:shadow-industrial">
                  <img
                    src={service.image}
                    alt={title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <CardContent className="p-6">
                    <h2 className="font-display text-lg font-semibold uppercase">
                      {title}
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {short}
                    </p>

                    <span className="mt-4 inline-flex items-center text-sm font-medium group-hover:text-primary">
                      {content.details}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}