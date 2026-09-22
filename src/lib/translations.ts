import type { Language } from "./language";

export const translations = {
  fr: {
    header: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      shop: "Shop",
      projects: "Réalisations",
      resources: "Ressources",
      contact: "Contact",
      careers: "Carrières",
      news: "Actualités",
      quote: "DEMANDER UN DEVIS",
      language: "Langue",
      closeMenu: "Fermer le menu",
      openMenu: "Ouvrir le menu",
    },

    common: {
      learnMore: "En savoir plus",
      discover: "Découvrir",
      readMore: "Lire la suite",
      contactUs: "Nous contacter",
      getQuote: "Demander un devis",
      send: "Envoyer",
      loading: "Chargement...",
    },

    home: {
      hero: {
        trustedPartner: "Votre partenaire industriel et minier de confiance",
        trustedPartnerText:
          "Des solutions intégrées pour accompagner vos opérations industrielles et minières.",
        ppe: "EPI certifiés et solutions de sécurité",
        ppeText:
          "Des équipements de protection adaptés aux exigences de vos environnements de travail.",
        mining: "Fournitures minières et industrielles",
        miningText:
          "Une gamme complète de fournitures pour vos opérations industrielles et minières.",
        logistics: "Import/Export et dédouanement",
        logisticsText:
          "Nous facilitons vos opérations d'importation, d'exportation et de dédouanement.",
        printing: "Impression commerciale à fort impact",
        printingText:
          "Des solutions d'impression professionnelles pour valoriser votre image.",
        construction: "Construction et maintenance industrielle",
        constructionText:
          "Des solutions adaptées à vos chantiers et infrastructures industrielles.",
        technology: "Technologies d'entreprise et infrastructure IT",
        technologyText:
          "Des solutions informatiques pour accompagner la performance de votre entreprise.",
      },

      about: {
        eyebrow: "Qui sommes-nous",
        title:
          "Une entreprise multiservices au service de l'industrie congolaise",
        button: "En savoir plus",
      },

      services: {
        eyebrow: "Nos pôles d'activité",
        title: "Nos services",
        button: "Découvrir",
      },

      whyUs: {
        eyebrow: "Notre engagement",
        title: "Pourquoi nous choisir ?",
      },

      partners: {
        eyebrow: "Nos partenaires",
        title: "Ils nous font confiance",
      },

      testimonials: {
        eyebrow: "Témoignages",
        title: "Avis clients",
      },

      cta: {
        title: "Un projet industriel ou professionnel ?",
        text:
          "Décrivez-nous votre besoin et notre équipe vous proposera une solution adaptée.",
        button: "Demander un devis",
      },
    },

    footer: {
      newsletter: "Newsletter",
      newsletterText:
        "Recevez nos actualités, nouveautés et informations directement par e-mail.",
      emailPlaceholder: "Votre adresse e-mail",
      subscribe: "S'inscrire",
      subscribing: "Inscription...",
      address: "Adresse",
      contact: "Contact",
      services: "Services",
      usefulLinks: "Liens utiles",
      rights: "Tous droits réservés.",
    },
  },

  en: {
    header: {
      home: "Home",
      about: "About Us",
      services: "Services",
      shop: "Shop",
      projects: "Projects",
      resources: "Resources",
      contact: "Contact",
      careers: "Careers",
      news: "News",
      quote: "GET A QUOTE",
      language: "Language",
      closeMenu: "Close menu",
      openMenu: "Open menu",
    },

    common: {
      learnMore: "Learn more",
      discover: "Discover",
      readMore: "Read more",
      contactUs: "Contact us",
      getQuote: "Get a quote",
      send: "Send",
      loading: "Loading...",
    },

    home: {
      hero: {
        trustedPartner: "Your Trusted Industrial & Mining Partner",
        trustedPartnerText:
          "End-to-end solutions to support your industrial and mining operations.",
        ppe: "Certified PPE & Safety Solutions",
        ppeText:
          "Protective equipment adapted to the requirements of your working environments.",
        mining: "Mining & Industrial Supplies",
        miningText:
          "A complete range of supplies for your industrial and mining operations.",
        logistics: "Import/Export & Customs Clearance",
        logisticsText:
          "We facilitate your import, export and customs clearance operations.",
        printing: "High-Impact Commercial Printing",
        printingText:
          "Professional printing solutions designed to strengthen your brand image.",
        construction: "Industrial Construction & Maintenance",
        constructionText:
          "Solutions adapted to your construction projects and industrial infrastructure.",
        technology: "Enterprise Technology & IT Infrastructure",
        technologyText:
          "Technology solutions designed to support your company's performance.",
      },

      about: {
        eyebrow: "Who we are",
        title: "A multi-service company serving the Congolese industry",
        button: "Learn more",
      },

      services: {
        eyebrow: "Our business divisions",
        title: "Our services",
        button: "Discover",
      },

      whyUs: {
        eyebrow: "Our commitment",
        title: "Why Choose Us?",
      },

      partners: {
        eyebrow: "Our partners",
        title: "They Trust Us",
      },

      testimonials: {
        eyebrow: "Testimonials",
        title: "Client Reviews",
      },

      cta: {
        title: "Have an industrial or professional project?",
        text:
          "Tell us about your requirements and our team will propose a suitable solution.",
        button: "Get a quote",
      },
    },

    footer: {
      newsletter: "Newsletter",
      newsletterText:
        "Receive our latest news, updates and information directly by email.",
      emailPlaceholder: "Your email address",
      subscribe: "Subscribe",
      subscribing: "Subscribing...",
      address: "Address",
      contact: "Contact",
      services: "Services",
      usefulLinks: "Useful links",
      rights: "All rights reserved.",
    },
  },
} as const;

export function getTranslations(language: Language) {
  return translations[language];
}