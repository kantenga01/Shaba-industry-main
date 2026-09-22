import epi from "@/assets/service-epi.jpg";
import construction from "@/assets/service-construction.jpg";
import print from "@/assets/service-print.jpg";
import fournitures from "@/assets/service-fournitures.jpg";
import logistique from "@/assets/service-logistique.jpg";
import it from "@/assets/service-it.jpg";

export type Language = "fr" | "en";

export type LocalizedText = {
  fr: string;
  en: string;
};

export function localized(
  value: LocalizedText | string,
  language: Language,
): string {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return value[language] ?? value.fr ?? value.en ?? "";
}

export const company = {
  name: "SHABA INDUSTRY",

  tagline: {
    fr: "La sécurité est notre priorité. La qualité est notre standard.",
    en: "Safety is our priority. Quality is our standard.",
  },

  address: "02 Changalele, Kinsevere Road, Q. Joli Site, Lubumbashi, DR Congo",

  phones: ["+243 820 191 003",],

  whatsapp: "243820191003",

  emails: ["info@shabaindustry.com", "sales@shabaindustry.com"],
};

export type Service = {
  slug: string;
  title: LocalizedText;
  short: LocalizedText;
  intro: LocalizedText;
  image: string;
  items: LocalizedText[];
};

export const services: Service[] = [
  {
    slug: "workwear-ppe",

    title: {
      fr: "Vêtements de travail & EPI",
      en: "Workwear & PPE",
    },

    short: {
      fr: "Des EPI certifiés pour protéger vos équipes sur les chantiers de construction et dans les opérations minières.",
      en: "Certified PPE to safeguard your teams across construction sites and mining operations.",
    },

    intro: {
      fr: "SHABA INDUSTRY fournit une gamme complète d'équipements de protection individuelle conformes aux normes internationales, disponibles à Lubumbashi et livrables directement sur votre site.",
      en: "SHABA INDUSTRY provides a full range of personal protective equipment compliant with international standards, available in Lubumbashi and deliverable directly to your site.",
    },

    image: epi,

    items: [
      {
        fr: "Casques de sécurité",
        en: "Safety helmets",
      },
      {
        fr: "Gants de protection",
        en: "Protective gloves",
      },
      {
        fr: "Lunettes de sécurité",
        en: "Safety glasses",
      },
      {
        fr: "Chaussures de sécurité",
        en: "Safety footwear",
      },
      {
        fr: "Combinaisons de travail",
        en: "Work overalls",
      },
      {
        fr: "Gilets réfléchissants",
        en: "Reflective vests",
      },
      {
        fr: "Masques et protections respiratoires",
        en: "Respiratory masks and protection",
      },
      {
        fr: "Harnais antichute",
        en: "Fall-arrest harnesses",
      },
      {
        fr: "Accessoires de protection",
        en: "Protective accessories",
      },
    ],
  },

  {
    slug: "import-export",

    title: {
      fr: "Logistique Import & Export",
      en: "Import & Export Logistics",
    },

    short: {
      fr: "Une solution complète de logistique, transport et approvisionnement international.",
      en: "Comprehensive logistics, transport, and international sourcing.",
    },

    intro: {
      fr: "SHABA INDUSTRY prend en charge l'ensemble de votre chaîne d'approvisionnement : sourcing, importation, dédouanement, transport et livraison sur site.",
      en: "SHABA INDUSTRY manages your entire supply chain: sourcing, importation, customs clearance, transport, and on-site delivery.",
    },

    image: logistique,

    items: [
      {
        fr: "Logistique intégrée",
        en: "Integrated logistics",
      },
      {
        fr: "Transport national et régional",
        en: "Domestic and regional transport",
      },
      {
        fr: "Services d'importation",
        en: "Import services",
      },
      {
        fr: "Services d'exportation",
        en: "Export services",
      },
      {
        fr: "Fourniture d'équipements",
        en: "Supply of equipment",
      },
    ],
  },

  {
    slug: "mining-supplies",

    title: {
      fr: "Fournitures Minières & Industrielles",
      en: "Mining & Industrial Supplies",
    },

    short: {
      fr: "Outils, équipements et consommables pour les secteurs minier et industriel.",
      en: "Tools, equipment, and consumables for mining and industry.",
    },

    intro: {
      fr: "Un catalogue étendu de fournitures industrielles et minières, approvisionnées localement et à l'international afin d'assurer la continuité de vos opérations.",
      en: "An extensive catalogue of industrial and mining supplies, sourced locally and internationally to ensure operational continuity.",
    },

    image: fournitures,

    items: [
      {
        fr: "Outils professionnels",
        en: "Professional tools",
      },
      {
        fr: "Équipements industriels",
        en: "Industrial equipment",
      },
      {
        fr: "Fournitures minières",
        en: "Mining supplies",
      },
      {
        fr: "Consommables techniques",
        en: "Technical consumables",
      },
    ],
  },

  {
    slug: "construction",

    title: {
      fr: "Shaba Construction",
      en: "Shaba Construction",
    },

    short: {
      fr: "Construction, rénovation, plomberie et maintenance industrielle.",
      en: "Construction, renovation, plumbing, and industrial maintenance.",
    },

    intro: {
      fr: "Des équipes techniques expérimentées pour vos projets de construction, rénovation et maintenance, des travaux structurels aux finitions et aux services industriels.",
      en: "Experienced technical teams for construction, renovation, and maintenance projects — from structural works to finishing and industrial services.",
    },

    image: construction,

    items: [
      {
        fr: "Construction de bâtiments",
        en: "Building construction",
      },
      {
        fr: "Plomberie et assainissement",
        en: "Plumbing and sanitation",
      },
      {
        fr: "Rénovation et réhabilitation",
        en: "Renovation and rehabilitation",
      },
      {
        fr: "Travaux industriels",
        en: "Industrial works",
      },
      {
        fr: "Maintenance préventive et corrective",
        en: "Preventive and corrective maintenance",
      },
    ],
  },

  {
    slug: "print",

    title: {
      fr: "Shaba Printing",
      en: "Shaba Printing",
    },

    short: {
      fr: "Impression numérique, grand format et communication visuelle.",
      en: "Digital printing, large format, and visual communication.",
    },

    intro: {
      fr: "Un atelier d'impression complet pour renforcer la visibilité de votre marque, des flyers aux supports grand format, avec une qualité professionnelle et des délais fiables.",
      en: "A complete printing workshop to enhance your brand visibility — from flyers to large-format banners, with professional quality and reliable turnaround times.",
    },

    image: print,

    items: [
      {
        fr: "Impression numérique",
        en: "Digital printing",
      },
      {
        fr: "Impression grand format",
        en: "Large-format printing",
      },
      {
        fr: "Flyers et brochures",
        en: "Flyers and brochures",
      },
      {
        fr: "Cartes de visite",
        en: "Business cards",
      },
      {
        fr: "Roll-ups et banderoles",
        en: "Roll-ups and banners",
      },
      {
        fr: "Bâches publicitaires",
        en: "Advertising tarpaulins",
      },
      {
        fr: "Branding et covering de véhicules",
        en: "Branding and vehicle wraps",
      },
      {
        fr: "Communication visuelle",
        en: "Visual communication",
      },
    ],
  },

  {
    slug: "it",

    title: {
      fr: "Technologies pour les entreprises",
      en: "Business Technology",
    },

    short: {
      fr: "Logiciels, web, cybersécurité, réseaux, cloud et solutions ERP.",
      en: "Software, web, cybersecurity, networks, cloud, and ERP solutions.",
    },

    intro: {
      fr: "Notre division informatique accompagne la transformation numérique des entreprises congolaises, du développement sur mesure aux infrastructures et à la sécurité.",
      en: "Our IT division supports the digital transformation of Congolese businesses — from custom development to infrastructure and security.",
    },

    image: it,

    items: [
      {
        fr: "Développement logiciel",
        en: "Software development",
      },
      {
        fr: "Développement web",
        en: "Web development",
      },
      {
        fr: "Développement mobile",
        en: "Mobile development",
      },
      {
        fr: "Cybersécurité",
        en: "Cybersecurity",
      },
      {
        fr: "Marketing digital",
        en: "Digital marketing",
      },
      {
        fr: "Infrastructure réseau",
        en: "Network infrastructure",
      },
      {
        fr: "Maintenance informatique",
        en: "IT maintenance",
      },
      {
        fr: "Services d'hébergement",
        en: "Hosting services",
      },
      {
        fr: "Solutions cloud",
        en: "Cloud solutions",
      },
      {
        fr: "Systèmes ERP",
        en: "ERP systems",
      },
    ],
  },
];

export const stats = [
  {
    value: "10+",
    label: {
      fr: "Années d'expérience cumulées",
      en: "Years of combined experience",
    },
  },
  {
    value: "6",
    label: {
      fr: "Pôles d'activité",
      en: "Business divisions",
    },
  },
  {
    value: "250+",
    label: {
      fr: "Projets réalisés",
      en: "Projects delivered",
    },
  },
  {
    value: "120+",
    label: {
      fr: "Clients accompagnés",
      en: "Clients supported",
    },
  },
];

export const values = [
  {
    title: {
      fr: "Sécurité",
      en: "Safety",
    },
    text: {
      fr: "La protection des personnes et des installations guide chacune de nos opérations.",
      en: "Protecting people and facilities guides every one of our operations.",
    },
  },
  {
    title: {
      fr: "Qualité",
      en: "Quality",
    },
    text: {
      fr: "Des matériaux certifiés, des équipes formées et un contrôle rigoureux à chaque étape.",
      en: "Certified materials, trained teams, and rigorous control at every stage.",
    },
  },
  {
    title: {
      fr: "Réactivité",
      en: "Responsiveness",
    },
    text: {
      fr: "Un stock local à Lubumbashi et une logistique conçue pour réduire les délais.",
      en: "Local stock in Lubumbashi and logistics designed to minimize lead times.",
    },
  },
  {
    title: {
      fr: "Intégrité",
      en: "Integrity",
    },
    text: {
      fr: "Des prix, des délais et des engagements contractuels transparents.",
      en: "Transparent pricing, timelines, and contractual commitments.",
    },
  },
];

export const testimonials = [
  {
    name: {
      fr: "Département HSE",
      en: "HSE Department",
    },
    company: {
      fr: "Entreprise minière, Haut-Katanga",
      en: "Mining Company, Haut-Katanga",
    },
    text: {
      fr: "Un fournisseur d'EPI fiable : des équipements conformes et des livraisons rapides, même pour les commandes urgentes.",
      en: "A reliable PPE supplier: compliant and fast deliveries, even for urgent orders.",
    },
  },
  {
    name: {
      fr: "Responsable technique",
      en: "Technical Manager",
    },
    company: {
      fr: "Groupe industriel, Lubumbashi",
      en: "Industrial Group, Lubumbashi",
    },
    text: {
      fr: "L'équipe SHABA Construction a réalisé l'extension de notre atelier dans les délais convenus.",
      en: "The SHABA Construction team delivered our workshop extension within the agreed timeframe.",
    },
  },
  {
    name: {
      fr: "Département communication",
      en: "Communications Department",
    },
    company: {
      fr: "Entreprise de distribution",
      en: "Distribution Company",
    },
    text: {
      fr: "Une impression grand format impeccable et un accompagnement complet pour notre projet de branding.",
      en: "Impeccable large-format printing and full support for our branding project.",
    },
  },
];

export const projects = [
  {
    title: {
      fr: "Extension d'un atelier industriel",
      en: "Industrial Workshop Extension",
    },
    category: {
      fr: "Construction",
      en: "Construction",
    },
    service: "construction",
  },
  {
    title: {
      fr: "Fourniture d'EPI pour site minier",
      en: "PPE Supply for Mining Site",
    },
    category: {
      fr: "Industrie",
      en: "Industry",
    },
    service: "workwear-ppe",
  },
  {
    title: {
      fr: "Branding de véhicules & banderoles",
      en: "Vehicle Branding & Banners",
    },
    category: {
      fr: "Impression",
      en: "Printing",
    },
    service: "print",
  },
  {
    title: {
      fr: "Réseau informatique & supervision",
      en: "IT Network & Supervision",
    },
    category: {
      fr: "Technologie",
      en: "Technology",
    },
    service: "it",
  },
  {
    title: {
      fr: "Transport d'équipements lourds",
      en: "Heavy Equipment Transport",
    },
    category: {
      fr: "Logistique",
      en: "Logistics",
    },
    service: "import-export",
  },
  {
    title: {
      fr: "Réhabilitation de bureaux",
      en: "Office Rehabilitation",
    },
    category: {
      fr: "Construction",
      en: "Construction",
    },
    service: "construction",
  },
  {
    title: {
      fr: "Consommables & outils",
      en: "Consumables & Tools",
    },
    category: {
      fr: "Industrie",
      en: "Industry",
    },
    service: "mining-supplies",
  },
  {
    title: {
      fr: "Roll-ups & signalétique pour salon",
      en: "Trade Show Roll-ups & Signage",
    },
    category: {
      fr: "Impression",
      en: "Printing",
    },
    service: "print",
  },
];

export const catalogues = [
  {
    title: {
      fr: "Profil de l'entreprise",
      en: "Company Profile",
    },
    desc: {
      fr: "Présentation de l'entreprise et de ses différents pôles d'activité.",
      en: "Corporate overview and business divisions.",
    },
    format: "PDF",
  },
  {
    title: {
      fr: "Catalogue Vêtements de travail & EPI",
      en: "Workwear & PPE Catalogue",
    },
    desc: {
      fr: "Casques, gants, chaussures, harnais et accessoires de protection.",
      en: "Helmets, gloves, footwear, harnesses, and protective accessories.",
    },
    format: "PDF",
  },
  {
    title: {
      fr: "Catalogue Fournitures industrielles",
      en: "Industrial Supplies Catalogue",
    },
    desc: {
      fr: "Outils, équipements et consommables miniers.",
      en: "Tools, equipment, and mining consumables.",
    },
    format: "PDF",
  },
  {
    title: {
      fr: "Brochure Shaba Print",
      en: "SHABA Print Brochure",
    },
    desc: {
      fr: "Formats, supports et finitions d'impression.",
      en: "Formats, media, and printing finishes.",
    },
    format: "XLSX",
  },
  {
    title: {
      fr: "Notre flotte",
      en: "Our Fleet",
    },
    desc: {
      fr: "Catalogue complet des équipements disponibles à la location, des engins lourds aux outils spécialisés, entretenus selon les standards de l'industrie et prêts à être déployés.",
      en: "Comprehensive catalogue of rental equipment — from heavy machinery to specialized tools, maintained to industry standards and ready for deployment.",
    },
    format: "DOC",
  },
];

export const posts = [
  {
    slug: "choisir-epi-site-minier",
    title: {
      fr: "Comment choisir les bons EPI pour un site minier",
      en: "How to Choose the Right PPE for a Mining Site",
    },
    category: {
      fr: "EPI",
      en: "PPE",
    },
    excerpt: {
      fr: "Normes, niveaux de protection et erreurs courantes lors du choix des équipements.",
      en: "Standards, protection levels, and common mistakes when selecting equipment.",
    },
    date: "2026-06-12",
  },
  {
    slug: "maintenance-industrielle-preventive",
    title: {
      fr: "Maintenance industrielle préventive : par où commencer ?",
      en: "Preventive Industrial Maintenance: Where to Begin",
    },
    category: {
      fr: "Industrie",
      en: "Industry",
    },
    excerpt: {
      fr: "Un plan de maintenance simple pour réduire les arrêts de production.",
      en: "A simple maintenance plan to reduce production downtime.",
    },
    date: "2026-05-28",
  },
  {
    slug: "cybersecurite-pme-rdc",
    title: {
      fr: "Cybersécurité : les priorités pour les PME en RDC",
      en: "Cybersecurity: Key Priorities for SMEs in the DRC",
    },
    category: {
      fr: "Cybersécurité",
      en: "Cybersecurity",
    },
    excerpt: {
      fr: "Sauvegardes, gestion des accès et sensibilisation des employés.",
      en: "Backups, access management, and employee awareness.",
    },
    date: "2026-05-10",
  },
  {
    slug: "impression-grand-format-guide",
    title: {
      fr: "Impression grand format : bien préparer ses fichiers",
      en: "Large-Format Printing: Preparing Your Files Correctly",
    },
    category: {
      fr: "Impression",
      en: "Printing",
    },
    excerpt: {
      fr: "Résolution, marges et supports : un guide pratique.",
      en: "Resolution, margins, and media — a practical guide.",
    },
    date: "2026-04-22",
  },
  {
    slug: "reussir-chantier-construction",
    title: {
      fr: "Réussir un projet de construction en 6 étapes",
      en: "Managing a Construction Project in 6 Steps",
    },
    category: {
      fr: "Construction",
      en: "Construction",
    },
    excerpt: {
      fr: "De la planification au suivi du chantier, les étapes essentielles.",
      en: "From planning to site supervision, the essential checkpoints.",
    },
    date: "2026-04-02",
  },
];

export const jobs = [
  {
    title: {
      fr: "Technicien en maintenance industrielle",
      en: "Industrial Maintenance Technician",
    },
    type: {
      fr: "Temps plein",
      en: "Full-time",
    },
    place: {
      fr: "Lubumbashi",
      en: "Lubumbashi",
    },
  },
  {
    title: {
      fr: "Commercial B2B – Fournitures industrielles",
      en: "B2B Sales Executive – Industrial Supplies",
    },
    type: {
      fr: "Temps plein",
      en: "Full-time",
    },
    place: {
      fr: "Lubumbashi",
      en: "Lubumbashi",
    },
  },
  {
    title: {
      fr: "Graphiste / Opérateur PAO",
      en: "Graphic Designer / DTP Operator",
    },
    type: {
      fr: "Temps plein",
      en: "Full-time",
    },
    place: {
      fr: "Lubumbashi",
      en: "Lubumbashi",
    },
  },
  {
    title: {
      fr: "Développeur Web Full-Stack",
      en: "Full-Stack Web Developer",
    },
    type: {
      fr: "Temps plein / Hybride",
      en: "Full-time / Hybrid",
    },
    place: {
      fr: "Lubumbashi",
      en: "Lubumbashi",
    },
  },
];