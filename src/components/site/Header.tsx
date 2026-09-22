import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/site-data";
import { useLanguage } from "@/lib/language";
import { getTranslations } from "@/lib/translations";
import logoWhite from "@/assets/logo-shaba-white.png";

export function Header() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const { language, setLanguage } = useLanguage();
  const t = getTranslations(language).header;

  const primaryPhone = company.phones[0] ?? "";

  const nav = [
    { to: "/", label: t.home },
    { to: "/a-propos", label: t.about },
    { to: "/services", label: t.services },
    { to: "/shop", label: t.shop },
    { to: "/realisations", label: t.projects },
    { to: "/catalogue", label: t.resources },
    { to: "/contact", label: t.contact },
  ];

  const changeLanguage = (newLanguage: "fr" | "en") => {
    setLanguage(newLanguage);
    setLanguageOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-ink/95 text-ink-foreground backdrop-blur">
      {/* Top bar */}
      <div className="hidden border-b border-white/10 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs text-ink-muted">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {company.address}
          </div>

          <span className="flex items-center gap-4">
            <a
              className="hover:text-primary"
              href="/carrieres"
            >
              {t.careers}
            </a>

            <a
              className="hover:text-primary"
              href="/blog"
            >
              {t.news}
            </a>

            <span>|</span>

            <a
              className="hover:text-primary"
              href={`tel:${primaryPhone.replace(/\s/g, "")}`}
            >
              {primaryPhone}
            </a>

            <a
              className="hover:text-primary"
              href={`mailto:${company.emails[0]}`}
            >
              {company.emails[0]}
            </a>
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="container-page flex items-center justify-between gap-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <img
            src={logoWhite}
            alt="SHABA INDUSTRY LOGO"
            width={1}
            height={1}
            className="h-15 w-auto md:h-19"
          />
        </Link>

        {/* Desktop navigation */}
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

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Language selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((value) => !value)}
              className="flex items-center gap-1 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              aria-label="Choose language"
            >
              <span>{language === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-32 overflow-hidden rounded-md border border-border bg-background text-foreground shadow-lg">
                <button
                  type="button"
                  onClick={() => changeLanguage("fr")}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-muted ${
                    language === "fr" ? "font-semibold text-primary" : ""
                  }`}
                >
                  🇫🇷 Français
                </button>

                <button
                  type="button"
                  onClick={() => changeLanguage("en")}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-muted ${
                    language === "en" ? "font-semibold text-primary" : ""
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>
            )}
          </div>

          <Button asChild size="sm" variant="default">
            <Link to="/devis">{t.quote}</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? t.closeMenu : t.openMenu}
          onClick={() => setOpen((value) => !value)}
          className="rounded-sm p-2 text-ink-foreground lg:hidden"
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
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

            {/* Mobile language selector */}
            <div className="border-b border-white/5 py-4">
              <p className="mb-2 text-xs uppercase tracking-wider text-ink-muted">
                {t.language}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => changeLanguage("fr")}
                  className={`rounded-md border px-4 py-2 text-sm font-medium ${
                    language === "fr"
                      ? "border-primary text-primary"
                      : "border-white/20 text-ink-foreground"
                  }`}
                >
                  🇫🇷 FR
                </button>

                <button
                  type="button"
                  onClick={() => changeLanguage("en")}
                  className={`rounded-md border px-4 py-2 text-sm font-medium ${
                    language === "en"
                      ? "border-primary text-primary"
                      : "border-white/20 text-ink-foreground"
                  }`}
                >
                  🇬🇧 EN
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 py-4">
              <Button asChild>
                <Link
                  to="/devis"
                  onClick={() => setOpen(false)}
                >
                  {t.quote}
                </Link>
              </Button>

              <a
                href={`tel:${primaryPhone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 py-2 text-sm text-ink-muted"
              >
                <Phone className="h-4 w-4" />
                {primaryPhone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}