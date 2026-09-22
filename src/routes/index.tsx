import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, HardHat, Quote, ShieldCheck, Timer, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImg from "@/assets/hero-industry.JPEG";
import epiImg from "@/assets/service-epi.jpg";
import fournituresImg from "@/assets/service-fournitures.jpg";
import logistiqueImg from "@/assets/service-logistique.jpg";
import printImg from "@/assets/service-print.jpg";
import constructionImg from "@/assets/service-construction.jpg";
import itImg from "@/assets/service-it.jpg";
import { services, stats, testimonials, company, localized } from "@/lib/site-data";
import { useLanguage } from "@/lib/language";
import { getTranslations } from "@/lib/translations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shaba Industry — Leading Industrial and Corporate Service Provider" },
      {
        name: "description",
        content:
          "Premier industrial contractor in Lubumbashi, DRC. Premium PPE & workwear, mining procurement, cross-border logistics, commercial printing, construction, and enterprise technology.",
      },
      {
        property: "og:title",
        content: "SHABA INDUSTRY — Integrated Industrial & Mining Solutions",
      },
      {
        property: "og:description",
        content:
          "Reliable procurement, certified PPE, freight logistics, civil works, printing, and IT services tailored for mining and industrial operations across the DRC.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const [active, setActive] = useState(0);

  // Diapositives construites depuis translations.ts (déjà bilingue), chacune
  // associée à une image de fond cohérente avec son texte.
  const slides = [
    { title: t.home.hero.trustedPartner, text: t.home.hero.trustedPartnerText, image: heroImg },
    { title: t.home.hero.ppe, text: t.home.hero.ppeText, image: epiImg },
    { title: t.home.hero.mining, text: t.home.hero.miningText, image: fournituresImg },
    { title: t.home.hero.logistics, text: t.home.hero.logisticsText, image: logistiqueImg },
    { title: t.home.hero.printing, text: t.home.hero.printingText, image: printImg },
    { title: t.home.hero.construction, text: t.home.hero.constructionText, image: constructionImg },
    { title: t.home.hero.technology, text: t.home.hero.technologyText, image: itImg },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const slide = slides[active] ?? slides[0]!;

  const whyUs =
    language === "fr"
      ? [
          {
            icon: ShieldCheck,
            t: "Qualité certifiée",
            d: "Des produits et prestations conformes aux normes du secteur.",
          },
          { icon: Timer, t: "Réactivité", d: "Stock local et interventions rapides sur site." },
          {
            icon: HardHat,
            t: "Expertise terrain",
            d: "Des équipes formées aux exigences minières et industrielles.",
          },
          {
            icon: Truck,
            t: "Chaîne complète",
            d: "De l'approvisionnement international à la livraison.",
          },
        ]
      : [
          {
            icon: ShieldCheck,
            t: "Certified quality",
            d: "Products and services compliant with industry standards.",
          },
          { icon: Timer, t: "Responsiveness", d: "Local stock and fast on-site intervention." },
          {
            icon: HardHat,
            t: "Field expertise",
            d: "Teams trained to mining and industrial requirements.",
          },
          {
            icon: Truck,
            t: "Full supply chain",
            d: "From international sourcing to final delivery.",
          },
        ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[80vh] overflow-hidden bg-ink text-ink-foreground">
        {/* Fond défilant : toutes les images sont superposées, seule celle de
            la diapo active est visible (fondu enchaîné en CSS, aucun JS de plus). */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <img
              key={i}
              src={s.image}
              alt=""
              aria-hidden={i !== active}
              width={1920}
              height={1088}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="container-page relative flex min-h-[80vh] flex-col justify-center py-20">
          <div key={active} className="rise-in max-w-3xl">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-primary">
              SHABA INDUSTRY
            </p>
            <h1 className="mt-5 text-4xl font-bold uppercase leading-[1.05] md:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
              {slide.text}
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/devis">
                {t.header.quote} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-ink-foreground hover:bg-white/10"
            >
              <Link to="/contact">{t.common.contactUs}</Link>
            </Button>
          </div>
          <div className="mt-10 flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.title}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1 w-10 rounded-full transition-colors ${i === active ? "bg-primary" : "bg-white/25"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t.home.about.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase md:text-4xl">
              {t.home.about.title}
            </h2>
            <p className="mt-5 text-muted-foreground">
              {language === "fr"
                ? "SHABA INDUSTRY est une entreprise basée à Lubumbashi, spécialisée dans les domaines industriels, de la construction, de la sécurité, de l'impression, de la logistique, des fournitures industrielles et minières ainsi que des services informatiques."
                : "SHABA INDUSTRY is a company based in Lubumbashi, specialized in industry, construction, safety, printing, logistics, industrial and mining supplies, and IT services."}
            </p>
            <p className="mt-4 text-muted-foreground">
              {language === "fr"
                ? "Nos équipes accompagnent les sociétés minières, industrielles et commerciales du Haut-Katanga avec une exigence constante de qualité, de sécurité et de réactivité."
                : "Our teams support mining, industrial and commercial companies in Haut-Katanga with a constant focus on quality, safety and responsiveness."}
            </p>
            <Button asChild className="mt-7" variant="secondary">
              <Link to="/a-propos">{t.home.about.button}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.value}
                className="border-l-4 border-primary bg-muted px-5 py-7 transition-transform hover:-translate-y-1"
              >
                <p className="font-display text-3xl font-bold md:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {localized(s.label, language)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-foreground py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t.home.services.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase md:text-4xl">{t.home.services.title}</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const title = localized(s.title, language);
              const short = localized(s.short, language);

              return (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group">
                  <Card className="h-full overflow-hidden border-border/70 p-0 transition-all group-hover:-translate-y-1 group-hover:shadow-industrial">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={s.image}
                        alt={title}
                        loading="lazy"
                        width={1200}
                        height={800}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-display text-lg font-semibold uppercase">{title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{short}</p>
                      <span className="mt-4 inline-flex items-center text-sm font-medium text-foreground group-hover:text-primary">
                        {t.home.services.button} <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <h2 className="text-3xl font-bold uppercase md:text-4xl">{t.home.whyUs.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((f) => (
              <div
                key={f.t}
                className="border border-border p-6 transition-colors hover:border-primary"
              >
                <f.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-display text-lg font-semibold uppercase">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="border-y border-border bg-foreground py-12">
        <div className="container-page">
          <p className="text-center font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t.home.partners.title}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {[
              "Mining Corp",
              "Katanga Build",
              "Kinsevere Log",
              "Congo Steel",
              "Lubum Trade",
              "AfriTech",
            ].map((p) => (
              <div
                key={p}
                className="flex h-16 items-center justify-center border border-border bg-background font-display text-sm uppercase tracking-wide text-muted-foreground"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-foreground md:py-24">
        <div className="container-page">
          <h2 className="text-3xl font-bold uppercase md:text-4xl">{t.home.testimonials.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => {
              const name = localized(testimonial.name, language);
              const testimonialCompany = localized(testimonial.company, language);
              const testimonialText = localized(testimonial.text, language);

              return (
                <Card key={`${name}-${index}`} className="h-full border-border/70">
                  <CardContent className="p-6">
                    <Quote className="h-7 w-7 text-primary" />
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      "{testimonialText}"
                    </p>
                    <p className="mt-5 font-display text-sm font-semibold uppercase">{name}</p>
                    <p className="text-xs text-muted-foreground">{testimonialCompany}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-ink-foreground">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold uppercase md:text-3xl">{t.home.cta.title}</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
              <CheckCircle2 className="h-4 w-4 text-primary" /> {t.home.cta.text}{" "}
              · {company.phones.join(" · ")}
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/devis">{t.home.cta.button}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}