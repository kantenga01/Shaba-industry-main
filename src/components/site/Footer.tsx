import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { company, services } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-xl font-semibold">
            SHABA <span className="text-primary">INDUSTRY</span>
          </span>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Entreprise multiservices basée à Lubumbashi : industrie, construction, sécurité,
            impression, logistique, fournitures et services informatiques.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="rounded-sm border border-white/15 p-2 transition-colors hover:border-primary hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="rounded-sm border border-white/15 p-2 transition-colors hover:border-primary hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-primary">Nos services</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="transition-colors hover:text-primary"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-primary">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-muted">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{company.address}</span>
            </li>
            {company.phones.map((p) => (
              <li key={p} className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-primary">
                  {p}
                </a>
              </li>
            ))}
            {company.emails.map((e) => (
              <li key={e} className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${e}`} className="hover:text-primary">
                  {e}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-primary">Newsletter</h3>
          <p className="mt-4 text-sm text-ink-muted">
            Recevez nos actualités, nouveautés catalogue et conseils techniques.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              e.currentTarget.reset();
            }}
          >
            <Input
              type="email"
              required
              placeholder="Votre email"
              aria-label="Votre email"
              className="border-white/15 bg-white/5 text-ink-foreground placeholder:text-ink-muted"
            />
            <Button type="submit">OK</Button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} SHABA INDUSTRY. Tous droits réservés.</span>
          <span>Lubumbashi · Haut-Katanga · République Démocratique du Congo</span>
        </div>
      </div>
    </footer>
  );
}
