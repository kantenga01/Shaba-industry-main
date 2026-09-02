import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { catalogues } from "@/lib/site-data";

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

function Catalogue() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Catalogues & Documentation"
        description="Access our product catalogues, technical sheets, and documentation available for direct download."
      />

      <section className="py-16 bg-foreground md:py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {catalogues.map((c) => (
            <div
              key={c.title}
              className="flex bg-muted items-start gap-4 border border-border p-6 transition-colors hover:border-primary"
            >
              <span className="gradient-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-sm text-primary-foreground">
                <FileText className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <h2 className="font-display text-lg font-semibold uppercase">{c.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                <Button asChild size="sm" variant="secondary" className="mt-4">
                  {/* Replace with actual file path or URL for each catalogue */}
                  <a href={`/downloads/${c.title.replace(/\s+/g, "-").toLowerCase()}.pdf`} download>
                    <Download className="mr-2 h-4 w-4" /> {c.format}
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-14">
        <div className="container-page flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold uppercase">Need a specific datasheet?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Our sales team will provide the documentation tailored to your requirements.
            </p>
          </div>
          <Button asChild size="lg">
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </section>
    </>
  );
}
