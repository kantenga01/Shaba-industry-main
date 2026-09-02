import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { company, services } from "@/lib/site-data";
import logoWhite from "@/assets/shaba-rectangular.png";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <img
              src={logoWhite}
              alt="SHABA Rectangular"
              width={1}
              height={1}
              className="h-11 w-auto md:h-14"
            />
          </Link>

          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            We deliver high-quality workwear and PPE, mining supplies, import/export logistics,
            printing, construction services and business technology solutions across the DRC with
            competitive pricing and reliable delivery.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.linkedin.com/company/shaba-industry/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/15 p-2 transition-colors hover:border-primary hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/shabaindustry?igsh=MTN6ZjlrOW1jampkbg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-sm border border-white/15 p-2 transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">
            Get In Touch
          </h3>
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
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">
            We Provide
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="transition-colors  hover:text-primary"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-ink-muted">
            Subscribe to get our latest updates and insights.{" "}
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
              placeholder="you@company.com"
              aria-label="Votre email"
              className="border-white/15 bg-white/5 text-ink-foreground placeholder:text-ink-muted placeholder:text-xs"
            />
            <Button type="submit">SUBSCRIBE</Button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <span>Lubumbashi · Kolwezi · DR. Congo</span>
          <span>© {new Date().getFullYear()} SHABA INDUSTRY. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
