import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Nos services — EPI, construction, print, fournitures, logistique, IT" },
      {
        name: "description",
        content:
          "Découvrez les six pôles de SHABA INDUSTRY : EPI, construction, impression, fournitures industrielles et minières, import-export et services informatiques.",
      },
      { property: "og:title", content: "Nos services — SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Six pôles d'expertise au service des industries et des mines en RDC.",
      },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="Six pôles d'expertise"
        description="Une offre complète pour vos opérations industrielles, vos chantiers, votre communication et votre informatique."
      />
      <section className="py-16 bg-foreground md:py-20">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group">
              <Card className="h-full overflow-hidden p-0 transition-all group-hover:-translate-y-1 group-hover:shadow-industrial">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <CardContent className="p-6">
                  <h2 className="font-display text-lg font-semibold uppercase">{s.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium group-hover:text-primary">
                    Voir le détail <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
