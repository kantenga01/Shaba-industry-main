import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { company, services, localized } from "@/lib/site-data";
import { sendNotificationEmail } from "@/lib/email.functions";
import { useLanguage } from "@/lib/language";
import { getTranslations } from "@/lib/translations";
import logoWhite from "@/assets/shaba-rectangular.png";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const { language } = useLanguage();
  const t = getTranslations(language);

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const email = newsletterEmail.trim();

    if (!email) {
      toast.error(
        language === "fr"
          ? "Veuillez saisir votre adresse e-mail."
          : "Please enter your email address.",
      );
      return;
    }

    try {
      setSubscribing(true);

      await sendNotificationEmail({
        data: {
          type: "newsletter",
          email,
        },
      });

      toast.success(
        language === "fr"
          ? "Merci de vous être inscrit à notre newsletter !"
          : "Thank you for subscribing to our newsletter!",
      );
      setNewsletterEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);

      toast.error(
        language === "fr"
          ? "Impossible de vous inscrire pour le moment. Veuillez réessayer plus tard."
          : "Unable to subscribe at the moment. Please try again later.",
      );
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* COMPANY */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoWhite}
              alt="SHABA INDUSTRY"
              className="h-11 w-auto md:h-14"
            />
          </Link>

          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {language === "fr"
              ? "Nous fournissons des vêtements de travail et EPI de qualité, des fournitures minières, une logistique import/export, de l'impression, des services de construction et des solutions technologiques d'entreprise partout en RDC, avec des prix compétitifs et une livraison fiable."
              : "We deliver high-quality workwear and PPE, mining supplies, import/export logistics, printing, construction services and business technology solutions across the DRC with competitive pricing and reliable delivery."}
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
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/15 p-2 transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">
            {t.footer.contact}
          </h3>

          <ul className="mt-4 space-y-3 text-sm text-ink-muted">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{company.address}</span>
            </li>

            {company.phones.map((p) => (
              <li key={p} className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <a
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="hover:text-primary"
                >
                  {p}
                </a>
              </li>
            ))}

            {company.emails.map((e) => (
              <li key={e} className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <a
                  href={`mailto:${e}`}
                  className="hover:text-primary"
                >
                  {e}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">
            {t.footer.services}
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="transition-colors hover:text-primary"
                >
                  {localized(s.title, language)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">
            {t.footer.newsletter}
          </h3>

          <p className="mt-4 text-sm text-ink-muted">
            {t.footer.newsletterText}
          </p>

          <form
            className="mt-4 flex gap-2"
            onSubmit={handleNewsletterSubmit}
          >
            <Input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={t.footer.emailPlaceholder}
              aria-label={t.footer.emailPlaceholder}
              disabled={subscribing}
              className="border-white/15 bg-white/5 text-ink-foreground placeholder:text-xs placeholder:text-ink-muted"
            />

            <Button
              type="submit"
              disabled={subscribing}
            >
              {subscribing ? t.footer.subscribing : t.footer.subscribe}
            </Button>
          </form>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <span>Lubumbashi · Kolwezi · DR. Congo</span>

          <span>
            © {new Date().getFullYear()} SHABA INDUSTRY. {t.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
