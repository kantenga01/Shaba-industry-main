import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { posts } from "@/lib/site-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Conseils construction, industrie, EPI et cybersécurité" },
      {
        name: "description",
        content:
          "Articles et conseils techniques de SHABA INDUSTRY sur la construction, l'industrie, les EPI, l'impression et la cybersécurité en RDC.",
      },
      { property: "og:title", content: "Blog SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Conseils techniques et actualités industrielles en République Démocratique du Congo.",
      },
    ],
  }),
  component: Blog,
});

function Blog() {
  const [q, setQ] = useState("");
  const filtered = posts.filter((p) =>
    (p.title + p.category + p.excerpt).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Actualités & conseils techniques"
        description="Construction, industrie, EPI, cybersécurité, impression : nos experts partagent leurs bonnes pratiques."
      />

      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un article…"
              aria-label="Rechercher un article"
              className="pl-9"
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Card key={p.slug} className="h-full transition-all hover:-translate-y-1 hover:shadow-industrial">
                <CardContent className="p-6">
                  <span className="bg-primary px-2 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                    {p.category}
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold uppercase leading-snug">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {new Date(p.date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground">Aucun article ne correspond à votre recherche.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
