import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company, services } from "@/lib/site-data";
import logoWhite from "@/assets/logo-shaba-white.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/a-propos", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/realisations", label: "Projects" },
  { to: "/catalogue", label: "Ressources" },
  //{ to: "/blog", label: "News" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const primaryPhone = company.phones[0] ?? "";

  return (
    <header className="sticky top-0 z-50 bg-ink/95 text-ink-foreground backdrop-blur">
      <div className="hidden  border-b border-white/10 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs text-ink-muted">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {company.address}
          </div>
          <span className="flex items-center gap-4">
            <a className="hover:text-primary" href={`/carrieres`}>
              {"Careers"}
            </a>
            <a className="hover:text-primary" href={`/blog`}>
              {"News  "}
            </a>
            <span>|</span>
            <a className="hover:text-primary" href={`tel:${primaryPhone.replace(/\s/g, "")}`}>
              {primaryPhone}
            </a>
            <a className="hover:text-primary" href={`mailto:${company.emails[0]}`}>
              {company.emails[0]}
            </a>
          </span>
        </div>
      </div>

      <div className="container-page flex items-center justify-between gap-6 py-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img
            src={logoWhite}
            alt="SHABA INDUSTRY LOGO"
            width={1}
            height={1}
            className="h-15 w-auto md:h-19"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="text-sm font-medium uppercase tracking-wide text-ink-foreground/85 transition-colors hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild size="sm" variant="default">
            <Link to="/devis">GET A QUOTE</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-sm p-2 text-ink-foreground lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <nav className="container-page flex flex-col py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-sm font-medium uppercase tracking-wide"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 py-4">
              {services.slice(0, 0).map((s) => (
                <span key={s.slug} />
              ))}
              <Button asChild>
                <Link to="/devis" onClick={() => setOpen(false)}>
                  GET A QUOTE
                </Link>
              </Button>
              <a
                href={`tel:${primaryPhone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 py-2 text-sm text-ink-muted"
              >
                <Phone className="h-4 w-4" /> {primaryPhone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
