import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { values, stats, localized } from "@/lib/site-data";
import { useLanguage } from "@/lib/language";

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
  {
    year: "2018",
    fr: "Création de l'activité de fournitures industrielles à Lubumbashi.",
    en: "Launch of the industrial supplies activity in Lubumbashi.",
  },
  {
    year: "2020",
    fr: "Lancement du pôle EPI et des premiers contrats miniers.",
    en: "Launch of the PPE division and the first mining contracts.",
  },
  {
    year: "2022",
    fr: "Ouverture de SHABA Construction et de l'atelier SHABA Print.",
    en: "Opening of SHABA Construction and the SHABA Print workshop.",
  },
  {
    year: "2024",
    fr: "Développement du pôle Import & Export et de la logistique.",
    en: "Development of the Import & Export and logistics division.",
  },
  {
    year: "2026",
    fr: "Création du pôle Services IT et transformation digitale.",
    en: "Creation of the IT Services division and digital transformation.",
  },
];

const team = [
  {
    fr: { name: "Direction Générale", role: "Stratégie & partenariats" },
    en: { name: "General Management", role: "Strategy & partnerships" },
  },
  {
    fr: { name: "Pôle Technique", role: "Construction & maintenance" },
    en: { name: "Technical Division", role: "Construction & maintenance" },
  },
  {
    fr: { name: "Pôle Commercial", role: "Fournitures & EPI" },
    en: { name: "Sales Division", role: "Supplies & PPE" },
  },
  {
    fr: { name: "Pôle Digital", role: "IT, web & cybersécurité" },
    en: { name: "Digital Division", role: "IT, web & cybersecurity" },
  },
];

function About() {
  const { language } = useLanguage();

  const content =
    language === "fr"
      ? {
          eyebrow: "À propos",
          heroDescription:
            "Une entreprise multiservices congolaise au service de l'industrie, des mines et des entreprises du Haut-Katanga.",
          aboutTitle: "Qui sommes-nous",
          aboutP1:
            "En tant que l'un des principaux fournisseurs d'EPI en RDC, il est essentiel pour nous de vous garantir un maximum de sécurité et de protection sur le terrain, avec pour repères la qualité, le style et un niveau de sécurité international.",
          aboutP2:
            "SHABA INDUSTRY a été fondée pour fournir des équipements généraux aux entreprises locales, avec un accent particulier sur les équipements de protection individuelle (EPI) destinés à plusieurs sociétés à l'échelle nationale.",
          aboutP3:
            "Depuis ces débuts modestes, SHABA INDUSTRY est devenue l'un des principaux distributeurs d'EPI et de produits associés du pays, reconnus pour leur qualité, leur prix compétitif et leur livraison dans les délais.",
          aboutP4:
            "Notre capacité à traiter aussi bien de grandes que de petites commandes, associée à notre flexibilité et à la solidité de nos relations clients, nous permet de livrer des produits haut de gamme à chacun de nos clients.",
          aboutP5:
            "Notre approche multiservice intégrée donne à nos clients accès à un partenaire de confiance unique pour tous leurs besoins, avec des délais plus courts et une qualité de service constamment élevée.",
          visionTitle: "Notre vision",
          vision:
            "Offrir un processus de production durable et de référence, permettant à toutes les parties prenantes d'atteindre leurs objectifs tout en générant une valeur plus élevée — dans une logique gagnant-gagnant pour tous.",
          missionTitle: "Notre mission",
          mission:
            "Apporter de la valeur à nos clients grâce à des partenariats solides et une livraison efficace de produits et services de la meilleure qualité, adaptés à leurs besoins essentiels.",
          coreValues: "Nos valeurs",
          historyTitle: "Historique",
          teamTitle: "Notre équipe",
        }
      : {
          eyebrow: "About Us",
          heroDescription:
            "A Congolese multiservice company empowering industries, mining operations, and businesses across Haut-Katanga.",
          aboutTitle: "About Us",
          aboutP1:
            "As one of DRC's leading PPE suppliers, it is important that we provide you with maximum safety and protection gear on the worksite — always with quality, style and world-class safety in mind.",
          aboutP2:
            "SHABA INDUSTRY was originally founded to supply general equipment to local companies, with a strong focus on Personal Protective Equipment (PPE) for several companies nationally.",
          aboutP3:
            "From this modest start, SHABA INDUSTRY has grown into the country's leading wholesaler of PPE and related products, well known as a reference for quality, competitive pricing, and on-time delivery.",
          aboutP4:
            "Our ability to handle both large and small orders, combined with our flexibility and strong customer relationships, enables us to deliver high-end products to every client.",
          aboutP5:
            "Our integrated multiservice approach gives clients access to a single trusted partner for all their needs, delivering faster turnaround times and consistently high-quality service.",
          visionTitle: "Our Vision",
          vision:
            "To provide a best-in-class and sustainable production process that enables all stakeholders to achieve their business objectives while generating higher revenue — a win-win situation for everyone, delivered in a timely and efficient manner.",
          missionTitle: "Our Mission",
          mission:
            "We are dedicated to providing value to our customers through strong partnerships and the efficient delivery of the best quality products and services that match their key requirements.",
          coreValues: "Core Values",
          historyTitle: "History",
          teamTitle: "Our Team",
        };

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title="SHABA INDUSTRY"
        description={content.heroDescription}
      />

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold uppercase md:text-3xl">{content.aboutTitle}</h2>

            <p className="mt-5 text-muted-foreground">{content.aboutP1}</p>
            <p className="mt-4 text-muted-foreground">{content.aboutP2}</p>
            <p className="mt-4 text-muted-foreground">{content.aboutP3}</p>
            <p className="mt-4 text-muted-foreground">{content.aboutP4}</p>
            <p className="mt-4 text-muted-foreground">{content.aboutP5}</p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="border-l-4 border-primary bg-muted p-6">
                <h3 className="font-display text-lg font-semibold uppercase">
                  {content.visionTitle}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{content.vision}</p>
              </div>
              <div className="border-l-4 border-primary bg-muted p-6">
                <h3 className="font-display text-lg font-semibold uppercase">
                  {content.missionTitle}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{content.mission}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {stats.map((s) => (
              <div key={s.value} className="border border-border p-5">
                <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {localized(s.label, language)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-bold uppercase md:text-3xl">{content.coreValues}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold uppercase">
                    {localized(v.title, language)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {localized(v.text, language)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold uppercase md:text-3xl">{content.historyTitle}</h2>
            <ol className="mt-8 space-y-6 border-l border-border pl-6">
              {history.map((h) => (
                <li key={h.year} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary" />
                  <p className="font-display text-lg font-semibold">{h.year}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "fr" ? h.fr : h.en}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold uppercase md:text-3xl">{content.teamTitle}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {team.map((member, index) => {
                const m = language === "fr" ? member.fr : member.en;

                return (
                  <div
                    key={index}
                    className="border border-border p-6 transition-colors hover:border-primary"
                  >
                    <div className="gradient-gold h-10 w-10 rounded-sm" />
                    <p className="mt-4 font-display text-base font-semibold uppercase">
                      {m.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{m.role}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
