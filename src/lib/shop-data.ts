import type { LocalizedText } from "./site-data";

import construction from "@/assets/service-construction.jpg";
import print from "@/assets/service-print.jpg";
import fournitures from "@/assets/service-fournitures.jpg";
import logistique from "@/assets/service-logistique.jpg";
import it from "@/assets/service-it.jpg";

// Vraies photos produits EPI (à placer dans src/assets/shop/)
import casqueSecurite from "@/assets/shop/casque-securite.jpg";
import gantsProtection from "@/assets/shop/gants-protection.jpg";
import gantsAntiCoupure from "@/assets/shop/gants-anti-coupure.jpg";
import chaussuresSecurite from "@/assets/shop/chaussures-securite.jpg";
import lunettesProtection from "@/assets/shop/lunettes-protection.jpg";
import masqueRespiratoire from "@/assets/shop/masque-respiratoire.jpg";
import tenueTravailShaba from "@/assets/shop/tenue-travail-shaba.jpg";

export type ShopProduct = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  category: string; // doit correspondre à un `slug` dans `services` (site-data.ts)
  image: string;
};

export const shopProducts: ShopProduct[] = [
  // --- EPI (photos réelles) ---
  {
    id: "casque-securite",
    name: { fr: "Casque de sécurité", en: "Safety Helmet" },
    description: {
      fr: "Casque de chantier certifié, réglable, résistant aux chocs pour les environnements industriels et miniers.",
      en: "Certified, adjustable, impact-resistant helmet for industrial and mining environments.",
    },
    category: "workwear-ppe",
    image: casqueSecurite,
  },
  {
    id: "gants-protection",
    name: { fr: "Gants de protection Dromex", en: "Dromex Protective Gloves" },
    description: {
      fr: "Gants renforcés anti-impact et anti-coupure, adhérence optimale pour les travaux manuels.",
      en: "Reinforced impact- and cut-resistant gloves, excellent grip for manual work.",
    },
    category: "workwear-ppe",
    image: gantsProtection,
  },
  {
    id: "gants-anti-coupure",
    name: { fr: "Gants anti-coupure renforcés", en: "Reinforced Cut-Resistant Gloves" },
    description: {
      fr: "Protection renforcée pour la manipulation d'objets tranchants ou abrasifs.",
      en: "Reinforced protection for handling sharp or abrasive materials.",
    },
    category: "workwear-ppe",
    image: gantsAntiCoupure,
  },
  {
    id: "chaussures-securite",
    name: { fr: "Chaussures de sécurité Rebel S3", en: "Rebel S3 Safety Footwear" },
    description: {
      fr: "Norme S3 : embout renforcé, semelle antidérapante et anti-perforation.",
      en: "S3 standard: reinforced toe cap, non-slip and anti-perforation sole.",
    },
    category: "workwear-ppe",
    image: chaussuresSecurite,
  },
  {
    id: "lunettes-protection",
    name: { fr: "Lunettes de protection", en: "Safety Goggles" },
    description: {
      fr: "Lunettes enveloppantes anti-buée pour la protection oculaire sur chantier.",
      en: "Wraparound anti-fog goggles for eye protection on site.",
    },
    category: "workwear-ppe",
    image: lunettesProtection,
  },
  {
    id: "masque-respiratoire",
    name: { fr: "Masque de protection respiratoire", en: "Respiratory Protection Mask" },
    description: {
      fr: "Masque anti-poussière FFP, léger et confortable pour un usage prolongé.",
      en: "Lightweight FFP dust mask, comfortable for extended use.",
    },
    category: "workwear-ppe",
    image: masqueRespiratoire,
  },
  {
    id: "tenue-travail-shaba",
    name: { fr: "Tenue de travail Shaba", en: "Shaba Workwear Suit" },
    description: {
      fr: "Combinaison haute visibilité, bandes réfléchissantes, conçue pour les sites industriels et miniers.",
      en: "High-visibility coverall with reflective bands, designed for industrial and mining sites.",
    },
    category: "workwear-ppe",
    image: tenueTravailShaba,
  },

  // --- Autres catégories (photos de démonstration en attendant vos visuels) ---
  {
    id: "outils-professionnels",
    name: { fr: "Outils professionnels", en: "Professional Tools" },
    description: {
      fr: "Sélection d'outillage robuste pour les opérations minières et industrielles.",
      en: "A selection of robust tools for mining and industrial operations.",
    },
    category: "mining-supplies",
    image: fournitures,
  },
  {
    id: "consommables-techniques",
    name: { fr: "Consommables techniques", en: "Technical Consumables" },
    description: {
      fr: "Pièces d'usure et consommables pour assurer la continuité de vos opérations.",
      en: "Wear parts and consumables to keep your operations running.",
    },
    category: "mining-supplies",
    image: fournitures,
  },

  {
    id: "materiaux-construction",
    name: { fr: "Matériaux de construction", en: "Construction Materials" },
    description: {
      fr: "Matériaux courants pour vos chantiers, disponibles en stock à Lubumbashi.",
      en: "Common construction materials, in stock in Lubumbashi.",
    },
    category: "construction",
    image: construction,
  },
  {
    id: "equipement-plomberie",
    name: { fr: "Équipement de plomberie", en: "Plumbing Equipment" },
    description: {
      fr: "Raccords, tuyauterie et accessoires pour installations et réparations.",
      en: "Fittings, piping, and accessories for installations and repairs.",
    },
    category: "construction",
    image: construction,
  },

  {
    id: "flyers-brochures",
    name: { fr: "Flyers et brochures", en: "Flyers & Brochures" },
    description: {
      fr: "Impression numérique haute qualité pour vos supports commerciaux.",
      en: "High-quality digital printing for your marketing materials.",
    },
    category: "print",
    image: print,
  },
  {
    id: "banderoles-bâches",
    name: { fr: "Banderoles et bâches", en: "Banners & Tarpaulins" },
    description: {
      fr: "Impression grand format résistante aux intempéries pour l'extérieur.",
      en: "Weather-resistant large-format printing for outdoor use.",
    },
    category: "print",
    image: print,
  },

  {
    id: "transport-equipements",
    name: { fr: "Transport d'équipements", en: "Equipment Transport" },
    description: {
      fr: "Solutions de transport national et régional pour vos marchandises.",
      en: "Domestic and regional transport solutions for your goods.",
    },
    category: "import-export",
    image: logistique,
  },
  {
    id: "dedouanement",
    name: { fr: "Service de dédouanement", en: "Customs Clearance Service" },
    description: {
      fr: "Prise en charge complète des formalités douanières à l'import comme à l'export.",
      en: "End-to-end handling of import and export customs formalities.",
    },
    category: "import-export",
    image: logistique,
  },

  {
    id: "reseau-infrastructure",
    name: { fr: "Infrastructure réseau", en: "Network Infrastructure" },
    description: {
      fr: "Conception et déploiement de réseaux fiables pour vos sites.",
      en: "Design and deployment of reliable networks for your sites.",
    },
    category: "it",
    image: it,
  },
  {
    id: "solutions-cloud",
    name: { fr: "Solutions cloud", en: "Cloud Solutions" },
    description: {
      fr: "Hébergement, sauvegarde et solutions cloud adaptées à votre activité.",
      en: "Hosting, backup, and cloud solutions tailored to your business.",
    },
    category: "it",
    image: it,
  },
];