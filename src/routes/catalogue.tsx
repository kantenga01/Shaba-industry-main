import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { catalogues } from "@/lib/site-data";

export const Route = createFileRoute("/catalogue")({
  head: () => ({
    meta: [
      { title: "Catalogues & documentation — SHABA INDUSTRY" },
      {
        name: "description",
        content:
          "Téléchargez les catalogues EPI, fournitures industrielles et minières, la brochure impression et les fiches techniques de SHABA INDUSTRY.",
      },
      { property: "og:title", content: "Catalogues & documentation — SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Catalogues PDF, fiches techniques et documentation produits.",
      },
    ],
  }),
  component: Catalogue,
});

function Catalogue() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Catalogues & documentation"
        description="Retrouvez nos catalogues produits, fiches techniques et documentation à télécharger."
      />

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {catalogues.map((c) => (
            <div
              key={c.title}
              className="flex items-start gap-4 border border-border p-6 transition-colors hover:border-primary"
            >
              <span className="gradient-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-sm text-primary-foreground">
                <FileText className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <h2 className="font-display text-lg font-semibold uppercase">{c.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                <Button asChild size="sm" variant="secondary" className="mt-4">
                  <Link to="/devis">
                    <Download className="mr-2 h-4 w-4" /> Demander le {c.size}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-14">
        <div className="container-page flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold uppercase">Besoin d'une fiche technique précise ?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Notre équipe commerciale vous transmet la documentation adaptée à votre besoin.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
