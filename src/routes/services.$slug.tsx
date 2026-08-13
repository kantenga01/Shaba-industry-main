import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Download, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Service introuvable — SHABA INDUSTRY" }, { name: "robots", content: "noindex" }],
      };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} — SHABA INDUSTRY` },
        { name: "description", content: service.short },
        { property: "og:title", content: `${service.title} — SHABA INDUSTRY` },
        { property: "og:description", content: service.short },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const gallery = service.slug === "construction" || service.slug === "print";

  return (
    <>
      <PageHero eyebrow="Service" title={service.title} description={service.short} />

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              width={1200}
              height={800}
              className="shadow-industrial w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold uppercase md:text-3xl">Notre offre</h2>
            <p className="mt-4 text-muted-foreground">{service.intro}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.items.map((item: string) => (
                <li key={item} className="flex items-start gap-2 border-l-2 border-primary bg-muted px-4 py-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/devis" search={{ service: service.slug }}>
                  Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/catalogue">
                  <Download className="mr-2 h-4 w-4" /> Catalogue
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {gallery && (
        <section className="bg-muted py-16">
          <div className="container-page">
            <h2 className="text-2xl font-bold uppercase md:text-3xl">Galerie de réalisations</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="group relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} — réalisation ${i + 1}`}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-0 left-0 bg-ink/80 px-3 py-1 text-xs uppercase tracking-wide text-ink-foreground">
                    Réalisation {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container-page">
          <h2 className="text-2xl font-bold uppercase">Autres services</h2>
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
                  {s.title}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
