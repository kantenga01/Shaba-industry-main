import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, HardHat, Quote, ShieldCheck, Timer, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImg from "@/assets/hero-industry.jpg";
import { services, stats, testimonials, company } from "@/lib/site-data";

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

const slides = [
  {
    title: "Your Trusted Industrial & Mining Partner",
    text: "Delivering end-to-end solutions across PPE, mining supplies, logistics, commercial printing, construction, and IT services across the DRC.",
  },
  {
    title: "Certified PPE & Safety Solutions",
    text: "World-class site safety gear, high-visibility workwear, and protective equipment compliant with international standards.",
  },
  {
    title: "Mining & Industrial Supplies",
    text: "Reliable procurement of specialized machinery, technical consumables, heavy-duty hardware, and industrial tooling.",
  },
  {
    title: "Import/Export & Customs Clearance",
    text: "Cross-border freight forwarding, supply chain logistics, and seamless customs brokerage for time-critical operations.",
  },
  {
    title: "High-Impact Commercial Printing",
    text: "Large-format printing, dynamic corporate branding, structural signage, and high-volume promotional materials.",
  },
  {
    title: "Industrial Construction & Maintenance",
    text: "Turnkey structural engineering, facility renovation, civil works, and comprehensive operational maintenance.",
  },
  {
    title: "Enterprise Technology & IT Infrastructure",
    text: "Custom software engineering, network architecture, cybersecurity, and managed IT services designed for modern enterprises.",
  },
];

function Index() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[active] ?? slides[0]!;

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[80vh] overflow-hidden bg-ink text-ink-foreground">
        <img
          src={heroImg}
          alt="Équipe industrielle SHABA INDUSTRY sur un site minier à Lubumbashi"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
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
                GET A QUOTE <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-ink-foreground hover:bg-white/10"
            >
              <Link to="/contact">GET IN TOUCH</Link>
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
              Qui sommes-nous
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase md:text-4xl">
              Une entreprise multiservices au service de l'industrie congolaise
            </h2>
            <p className="mt-5 text-muted-foreground">
              SHABA INDUSTRY est une entreprise basée à Lubumbashi, spécialisée dans les domaines
              industriels, de la construction, de la sécurité, de l'impression, de la logistique,
              des fournitures industrielles et minières ainsi que des services informatiques.
            </p>
            <p className="mt-4 text-muted-foreground">
              Nos équipes accompagnent les sociétés minières, industrielles et commerciales du
              Haut-Katanga avec une exigence constante de qualité, de sécurité et de réactivité.
            </p>
            <Button asChild className="mt-7" variant="secondary">
              <Link to="/a-propos">En savoir plus</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="border-l-4 border-primary bg-muted px-5 py-7 transition-transform hover:-translate-y-1"
              >
                <p className="font-display text-3xl font-bold md:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {s.label}
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
              Nos pôles d'activité
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase md:text-4xl">Nos services</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group">
                <Card className="h-full overflow-hidden border-border/70 p-0 transition-all group-hover:-translate-y-1 group-hover:shadow-industrial">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      width={1200}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-semibold uppercase">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-foreground group-hover:text-primary">
                      Découvrir <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <h2 className="text-3xl font-bold uppercase md:text-4xl">Why Choose Us?</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
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
            ].map((f) => (
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
            They Trust Us
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
          <h2 className="text-3xl font-bold uppercase md:text-4xl">Avis clients</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="h-full border-border/70">
                <CardContent className="p-6">
                  <Quote className="h-7 w-7 text-primary" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                  <p className="mt-5 font-display text-sm font-semibold uppercase">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-ink-foreground">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold uppercase md:text-3xl">
              Un projet, un besoin, une urgence ?
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Réponse sous 24h ouvrées ·{" "}
              {company.phones.join(" · ")}
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/devis">Demander un devis</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
