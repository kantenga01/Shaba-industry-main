import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { values, stats } from "@/lib/site-data";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — SHABA INDUSTRY, entreprise multiservices à Lubumbashi" },
      {
        name: "description",
        content:
          "Vision, mission, valeurs, historique et équipe de SHABA INDUSTRY, entreprise multiservices basée à Lubumbashi en RDC.",
      },
      { property: "og:title", content: "À propos de SHABA INDUSTRY" },
      {
        property: "og:description",
        content: "Notre vision, notre mission, nos valeurs et notre équipe à Lubumbashi, RDC.",
      },
    ],
  }),
  component: About,
});

const history = [
  { year: "2018", text: "Création de l'activité de fournitures industrielles à Lubumbashi." },
  { year: "2020", text: "Lancement du pôle EPI et des premiers contrats miniers." },
  { year: "2022", text: "Ouverture de SHABA Construction et de l'atelier SHABA Print." },
  { year: "2024", text: "Développement du pôle Import & Export et de la logistique." },
  { year: "2026", text: "Création du pôle Services IT et transformation digitale." },
];

const team = [
  { name: "Direction Générale", role: "Stratégie & partenariats" },
  { name: "Pôle Technique", role: "Construction & maintenance" },
  { name: "Pôle Commercial", role: "Fournitures & EPI" },
  { name: "Pôle Digital", role: "IT, web & cybersécurité" },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="SHABA INDUSTRY"
        description="Une entreprise congolaise multiservices qui accompagne l'industrie, les mines et les entreprises du Haut-Katanga."
      />

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold uppercase md:text-3xl">Présentation de l'entreprise</h2>
            <p className="mt-5 text-muted-foreground">
              Basée à Lubumbashi, SHABA INDUSTRY intervient dans six domaines complémentaires :
              équipements de protection individuelle, construction et maintenance, impression et
              communication visuelle, fournitures industrielles et minières, import-export et
              logistique, et enfin services informatiques.
            </p>
            <p className="mt-4 text-muted-foreground">
              Cette organisation multiservices permet à nos clients de centraliser leurs besoins
              auprès d'un interlocuteur unique, avec des délais réduits et une qualité constante.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="border-l-4 border-primary bg-muted p-6">
                <h3 className="font-display text-lg font-semibold uppercase">Notre vision</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Devenir l'acteur multiservices de référence en République Démocratique du Congo,
                  reconnu pour sa fiabilité et son exigence technique.
                </p>
              </div>
              <div className="border-l-4 border-primary bg-muted p-6">
                <h3 className="font-display text-lg font-semibold uppercase">Notre mission</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fournir aux entreprises des solutions complètes, sûres et durables pour leurs
                  opérations industrielles, logistiques et digitales.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {stats.map((s) => (
              <div key={s.label} className="border border-border p-5">
                <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-bold uppercase md:text-3xl">Nos valeurs</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title} className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold uppercase">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold uppercase md:text-3xl">Historique</h2>
            <ol className="mt-8 space-y-6 border-l border-border pl-6">
              {history.map((h) => (
                <li key={h.year} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary" />
                  <p className="font-display text-lg font-semibold">{h.year}</p>
                  <p className="text-sm text-muted-foreground">{h.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold uppercase md:text-3xl">Notre équipe</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {team.map((t) => (
                <div key={t.name} className="border border-border p-6 transition-colors hover:border-primary">
                  <div className="gradient-gold h-10 w-10 rounded-sm" />
                  <p className="mt-4 font-display text-base font-semibold uppercase">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
