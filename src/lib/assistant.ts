import {
  services,
  company,
  stats,
  values,
  testimonials,
  jobs,
  posts,
  localized,
} from "./site-data";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// -----------------------------------------------------------------------
// Assistant 100% gratuit, sans API externe.
//
// Deux niveaux de réponse :
// 1. Recherche dynamique dans les données du site (services, items,
//    statistiques, valeurs, témoignages, offres d'emploi, articles) :
//    couvre presque tout ce qui existe réellement sur le site.
// 2. Règles par mots-clés pour les intentions générales (devis, contact...).
//
// Si rien ne correspond, l'assistant l'admet honnêtement et renvoie vers
// WhatsApp / le formulaire de contact plutôt que d'inventer une réponse.
//
// Le jour où vous voudrez passer à une vraie IA (Claude, via
// `assistant.functions.ts`), il suffira de remplacer le contenu de
// `askAssistant` ci-dessous par un appel à `askAssistantServer`.
// -----------------------------------------------------------------------

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // retire les accents pour un matching plus robuste
}

function includesWord(haystack: string, needle: string): boolean {
  if (!needle) return false;
  return haystack.includes(normalize(needle));
}

// --- 1. Recherche dans les items précis de chaque service (casques, EPI, etc.) ---
function findServiceItemMatch(normalizedQuery: string, language: "fr" | "en") {
  for (const service of services) {
    for (const item of service.items) {
      const fr = normalize(item.fr);
      const en = normalize(item.en);

      const matches =
        normalizedQuery.includes(fr) ||
        normalizedQuery.includes(en) ||
        fr.split(" ").some((w) => w.length > 4 && normalizedQuery.includes(w)) ||
        en.split(" ").some((w) => w.length > 4 && normalizedQuery.includes(w));

      if (matches) {
        const serviceTitle = localized(service.title, language);
        const itemName = localized(item, language);

        return language === "fr"
          ? `Oui, « ${itemName} » fait partie de notre pôle ${serviceTitle}. Plus de détails et devis sur /services/${service.slug}.`
          : `Yes, "${itemName}" is part of our ${serviceTitle} division. More details and quote requests at /services/${service.slug}.`;
      }
    }
  }
  return null;
}

// --- 2. Sujets généraux couverts par une recherche par mots-clés ---
type Rule = {
  keywords: string[];
  answer: (language: "fr" | "en") => string;
};

const staticAbout = {
  fr: "SHABA INDUSTRY est une entreprise multiservices basée à Lubumbashi, en RDC, qui accompagne les entreprises minières, industrielles et commerciales du Haut-Katanga. Notre mission : apporter de la valeur à nos clients par des partenariats solides et une livraison efficace de produits et services de qualité. Plus de détails sur /a-propos.",
  en: "SHABA INDUSTRY is a multiservice company based in Lubumbashi, DRC, supporting mining, industrial, and commercial companies across Haut-Katanga. Our mission: to deliver value to our clients through strong partnerships and efficient delivery of quality products and services. More details at /a-propos.",
};

const rules: Rule[] = [
  {
    keywords: [
      "service", "services", "offre", "pole", "activite",
      "offer", "division", "what do you do", "que faites",
    ],
    answer: (language) => {
      const list = services.map((s) => localized(s.title, language)).join(", ");
      return language === "fr"
        ? `Nous proposons 6 pôles d'activité : ${list}. Voulez-vous plus de détails sur l'un d'eux ?`
        : `We offer 6 business divisions: ${list}. Would you like more details on one of them?`;
    },
  },
  {
    keywords: ["devis", "prix", "tarif", "cout", "combien", "quote", "price", "cost", "how much"],
    answer: (language) =>
      language === "fr"
        ? "Vous pouvez demander un devis gratuit directement sur notre page « Demander un devis » (/devis). Notre équipe répond sous 24h ouvrées."
        : "You can request a free quote directly on our \"Request a Quote\" page (/devis). Our team replies within 24 business hours.",
  },
  {
    keywords: [
      "contact", "telephone", "email", "e-mail", "adresse", "joindre", "appeler",
      "phone", "address", "reach", "call you", "mail", "ou etes vous", "where are you",
    ],
    answer: (language) =>
      language === "fr"
        ? `Vous pouvez nous joindre au ${company.phones.join(" ou ")}, par e-mail à ${company.emails[0]}, ou nous rendre visite : ${company.address}.`
        : `You can reach us at ${company.phones.join(" or ")}, by email at ${company.emails[0]}, or visit us at: ${company.address}.`,
  },
  {
    keywords: ["shop", "boutique", "produit", "acheter", "catalogue produit", "buy", "product"],
    answer: (language) =>
      language === "fr"
        ? "Retrouvez une sélection de nos produits sur la page Shop (/shop), avec un bouton « Demander un devis » pour chaque article."
        : "Check out a selection of our products on the Shop page (/shop), with a \"Request a Quote\" button for each item.",
  },
  {
    keywords: ["emploi", "carriere", "recrut", "poste", "job", "career", "hiring", "vacancy", "cv"],
    answer: (language) => {
      const list = jobs.map((j) => localized(j.title, language)).join(", ");
      return language === "fr"
        ? `Nos offres actuelles : ${list}. Postulez directement sur la page Carrières (/carrieres) — vous pouvez aussi y envoyer une candidature spontanée.`
        : `Our current openings: ${list}. Apply directly on the Careers page (/carrieres) — you can also send an open application there.`;
    },
  },
  {
    keywords: ["catalogue", "brochure", "fiche technique", "pdf", "datasheet", "documentation"],
    answer: (language) =>
      language === "fr"
        ? "Nos catalogues et fiches techniques sont téléchargeables sur la page Catalogue (/catalogue)."
        : "Our catalogues and technical sheets are available for download on the Catalogue page (/catalogue).",
  },
  {
    keywords: [
      "epi", "casque", "gant", "chaussure", "lunette", "masque", "harnais", "securite",
      "ppe", "helmet", "glove", "boot", "goggles", "mask", "safety",
    ],
    answer: (language) =>
      language === "fr"
        ? "Nous fournissons des EPI certifiés (casques, gants, chaussures, lunettes, masques...). Découvrez notre sélection sur /shop ou /services/workwear-ppe."
        : "We supply certified PPE (helmets, gloves, footwear, goggles, masks...). Check our selection at /shop or /services/workwear-ppe.",
  },
  {
    keywords: ["realisation", "projet", "reference", "portfolio", "project", "case study"],
    answer: (language) =>
      language === "fr"
        ? "Découvrez nos projets livrés sur la page Réalisations (/realisations) : construction, industrie, impression, IT et logistique."
        : "Take a look at our delivered projects on the Projects page (/realisations): construction, industry, printing, IT, and logistics.",
  },
  {
    keywords: [
      "qui etes vous", "qui es tu", "presentation", "a propos", "vision", "mission",
      "who are you", "about you", "about shaba",
    ],
    answer: (language) => staticAbout[language],
  },
  {
    keywords: ["valeur", "valeurs", "values", "core value"],
    answer: (language) => {
      const list = values.map((v) => localized(v.title, language)).join(", ");
      return language === "fr"
        ? `Nos valeurs fondamentales : ${list}. Détails sur /a-propos.`
        : `Our core values: ${list}. Details at /a-propos.`;
    },
  },
  {
    keywords: [
      "experience", "annees", "depuis quand", "combien de projet", "combien de client",
      "years", "how long", "how many projects", "how many clients", "chiffre",
    ],
    answer: (language) => {
      const list = stats.map((s) => `${s.value} ${localized(s.label, language)}`).join(" · ");
      return language === "fr" ? `Quelques chiffres clés : ${list}.` : `A few key numbers: ${list}.`;
    },
  },
  {
    keywords: ["avis", "temoignage", "client satisfait", "review", "testimonial", "feedback"],
    answer: (language) => {
      const sample = testimonials[0];
      if (!sample) {
        return language === "fr"
          ? "Consultez les avis de nos clients sur la page d'accueil."
          : "Check our client reviews on the homepage.";
      }
      const quote = localized(sample.text, language);
      const author = localized(sample.company, language);
      return language === "fr"
        ? `Un exemple de retour client : « ${quote} » — ${author}. D'autres témoignages sont visibles sur la page d'accueil.`
        : `A sample client review: "${quote}" — ${author}. More testimonials are visible on the homepage.`;
    },
  },
  {
    keywords: ["actualite", "blog", "article", "news"],
    answer: (language) => {
      const categories = Array.from(
        new Set(posts.map((p) => localized(p.category, language))),
      ).join(", ");
      return language === "fr"
        ? `Nos articles couvrent : ${categories}. Retrouvez-les sur la page Actualités (/blog).`
        : `Our articles cover: ${categories}. Find them on the News page (/blog).`;
    },
  },
];

const fallback = {
  fr: "Je n'ai pas toutes les informations pour répondre précisément à cette question. Je vous invite à nous contacter via WhatsApp ou le formulaire de contact, ou à demander un devis directement — notre équipe vous répondra rapidement.",
  en: "I don't have precise information to answer that. Please contact our team via WhatsApp or the contact form, or request a quote directly — our team will get back to you quickly.",
};

export async function askAssistant(
  messages: ChatMessage[],
  language: "fr" | "en",
): Promise<string> {
  const lastMessage = messages[messages.length - 1]?.content ?? "";
  const normalized = normalize(lastMessage);

  // Petite latence pour un rendu naturel dans l'UI (indicateur "en train d'écrire").
  await new Promise((resolve) => setTimeout(resolve, 400));

  // 1. On cherche d'abord dans les produits/items précis de chaque service.
  const itemMatch = findServiceItemMatch(normalized, language);
  if (itemMatch) return itemMatch;

  // 2. Sinon, on cherche parmi les sujets généraux.
  const matched = rules.find((rule) =>
    rule.keywords.some((keyword) => includesWord(normalized, keyword)),
  );

  return matched ? matched.answer(language) : fallback[language];
}