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
  const [q, setQ] = useState("");
  const filtered = posts.filter((p) =>
    (p.title + p.category + p.excerpt).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <PageHero
        eyebrow="News & Articles"
        title="Insights, Updates & Expert Perspectives"
        description="Explore authoritative articles on construction, industry, PPE, printing, and cybersecurity. Our specialists share practical guidance and the latest developments shaping the sector."
      />

      <section className="py-16 bg-foreground md:py-20">
        <div className="container-page">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
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
                    {p.category}
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold uppercase leading-snug">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {new Date(p.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground">No articles found for your search.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
