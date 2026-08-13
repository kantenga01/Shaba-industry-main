import epi from "@/assets/service-epi.jpg";
import construction from "@/assets/service-construction.jpg";
import print from "@/assets/service-print.jpg";
import fournitures from "@/assets/service-fournitures.jpg";
import logistique from "@/assets/service-logistique.jpg";
import it from "@/assets/service-it.jpg";

export const company = {
  name: "SHABA INDUSTRY",
  tagline: "Votre partenaire industriel de confiance",
  address: "02 Changalele, Route Kinsevere, Quartier Jolie Site, Lubumbashi, Haut-Katanga, RDC",
  phones: ["+243 820 191 003", "+243 900 261 229"],
  whatsapp: "243820191003",
  emails: ["info@shabaindustry.com", "sales@shabaindustry.com"],
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  image: string;
  items: string[];
};

export const services: Service[] = [
  {
    slug: "epi",
    title: "Équipements de Protection Individuelle",
    short: "EPI certifiés pour protéger vos équipes sur tous les chantiers et sites miniers.",
    intro:
      "SHABA INDUSTRY fournit une gamme complète d'équipements de protection individuelle conformes aux normes internationales, disponibles en stock à Lubumbashi et livrables sur site.",
    image: epi,
    items: [
      "Casques de sécurité",
      "Gants de protection",
      "Lunettes de protection",
      "Chaussures de sécurité",
      "Combinaisons de travail",
      "Gilets réfléchissants",
      "Masques et protections respiratoires",
      "Harnais antichute",
      "Accessoires de protection",
    ],
  },
  {
    slug: "construction",
    title: "SHABA Construction",
    short: "Construction, rénovation, plomberie et maintenance industrielle.",
    intro:
      "Des équipes techniques expérimentées pour vos projets de construction, de rénovation et de maintenance, du gros œuvre aux finitions et aux travaux industriels.",
    image: construction,
    items: [
      "Construction de bâtiments",
      "Plomberie et sanitaires",
      "Rénovation et réhabilitation",
      "Travaux industriels",
      "Maintenance préventive et corrective",
    ],
  },
  {
    slug: "print",
    title: "SHABA Print",
    short: "Impression numérique, grand format et communication visuelle.",
    intro:
      "Un atelier d'impression complet pour donner de la visibilité à votre marque : du flyer à la bâche grand format, avec un rendu professionnel et des délais maîtrisés.",
    image: print,
    items: [
      "Impression numérique",
      "Impression grand format",
      "Flyers et dépliants",
      "Cartes de visite",
      "Roll-up et kakémonos",
      "Bâches publicitaires",
      "Branding et habillage",
      "Communication visuelle",
    ],
  },
  {
    slug: "fournitures-industrielles",
    title: "Fournitures Industrielles & Minières",
    short: "Outillage, équipements et consommables pour l'industrie et les mines.",
    intro:
      "Un catalogue étendu de fournitures industrielles et minières, avec approvisionnement local et international pour garantir la continuité de vos opérations.",
    image: fournitures,
    items: [
      "Outillage professionnel",
      "Équipements industriels",
      "Fournitures minières",
      "Consommables techniques",
    ],
  },
  {
    slug: "import-export",
    title: "Import & Export",
    short: "Logistique, transport et approvisionnement international.",
    intro:
      "SHABA INDUSTRY gère l'ensemble de votre chaîne d'approvisionnement : sourcing, importation, dédouanement, transport et livraison sur site.",
    image: logistique,
    items: [
      "Logistique intégrée",
      "Transport national et régional",
      "Importation",
      "Exportation",
      "Fourniture de matériel",
    ],
  },
  {
    slug: "it",
    title: "Services IT",
    short: "Logiciels, web, cybersécurité, réseaux, cloud et ERP.",
    intro:
      "Notre pôle informatique accompagne la transformation digitale des entreprises congolaises, du développement sur mesure à l'infrastructure et à la sécurité.",
    image: it,
    items: [
      "Développement logiciel",
      "Développement web",
      "Développement mobile",
      "Cybersécurité",
      "Marketing digital",
      "Réseaux informatiques",
      "Maintenance informatique",
      "Hébergement",
      "Cloud",
      "Solutions ERP",
    ],
  },
];

export const stats = [
  { value: "10+", label: "Années d'expérience cumulée" },
  { value: "6", label: "Pôles d'activité" },
  { value: "250+", label: "Projets livrés" },
  { value: "120+", label: "Clients accompagnés" },
];

export const values = [
  { title: "Sécurité", text: "La protection des personnes et des installations guide chacune de nos interventions." },
  { title: "Qualité", text: "Des matériaux certifiés, des équipes formées et un contrôle rigoureux à chaque étape." },
  { title: "Réactivité", text: "Un stock local à Lubumbashi et une logistique qui réduit vos délais d'attente." },
  { title: "Intégrité", text: "Transparence sur les prix, les délais et les engagements contractuels." },
];

export const testimonials = [
  {
    name: "Direction HSE",
    company: "Société minière, Haut-Katanga",
    text: "Un fournisseur EPI fiable : livraisons conformes et rapides, même sur des commandes urgentes.",
  },
  {
    name: "Responsable technique",
    company: "Groupe industriel, Lubumbashi",
    text: "Les équipes de SHABA Construction ont livré notre extension d'atelier dans les délais annoncés.",
  },
  {
    name: "Service communication",
    company: "Entreprise de distribution",
    text: "Impression grand format impeccable et accompagnement complet sur notre branding.",
  },
];

export const projects = [
  { title: "Extension d'atelier industriel", category: "Construction", service: "construction" },
  { title: "Fourniture EPI site minier", category: "Industrie", service: "epi" },
  { title: "Habillage véhicules et bâches", category: "Impression", service: "print" },
  { title: "Réseau et supervision IT", category: "Informatique", service: "it" },
  { title: "Convoi matériel lourd", category: "Logistique", service: "import-export" },
  { title: "Réhabilitation de bureaux", category: "Construction", service: "construction" },
  { title: "Consommables et outillage", category: "Industrie", service: "fournitures-industrielles" },
  { title: "Roll-up et signalétique salon", category: "Impression", service: "print" },
];

export const catalogues = [
  { title: "Catalogue EPI", desc: "Casques, gants, chaussures, harnais et accessoires de protection.", size: "PDF" },
  { title: "Catalogue Fournitures Industrielles", desc: "Outillage, équipements et consommables miniers.", size: "PDF" },
  { title: "Brochure SHABA Print", desc: "Formats, supports et finitions d'impression.", size: "PDF" },
  { title: "Présentation SHABA INDUSTRY", desc: "Présentation générale de l'entreprise et de ses pôles.", size: "PDF" },
];

export const posts = [
  {
    slug: "choisir-epi-site-minier",
    title: "Comment choisir les EPI adaptés à un site minier",
    category: "EPI",
    excerpt: "Normes, niveaux de protection et erreurs fréquentes lors du choix des équipements.",
    date: "2026-06-12",
  },
  {
    slug: "maintenance-industrielle-preventive",
    title: "Maintenance industrielle préventive : par où commencer",
    category: "Industrie",
    excerpt: "Un plan de maintenance simple pour réduire les arrêts de production.",
    date: "2026-05-28",
  },
  {
    slug: "cybersecurite-pme-rdc",
    title: "Cybersécurité : les priorités des PME en RDC",
    category: "Cybersécurité",
    excerpt: "Sauvegardes, gestion des accès et sensibilisation des équipes.",
    date: "2026-05-10",
  },
  {
    slug: "impression-grand-format-guide",
    title: "Impression grand format : bien préparer ses fichiers",
    category: "Impression",
    excerpt: "Résolution, marges et supports : le guide pratique.",
    date: "2026-04-22",
  },
  {
    slug: "reussir-chantier-construction",
    title: "Réussir un chantier de construction en 6 étapes",
    category: "Construction",
    excerpt: "De l'étude au suivi de chantier, les points de contrôle essentiels.",
    date: "2026-04-02",
  },
];

export const jobs = [
  { title: "Technicien de maintenance industrielle", type: "Temps plein", place: "Lubumbashi" },
  { title: "Commercial B2B - Fournitures industrielles", type: "Temps plein", place: "Lubumbashi" },
  { title: "Infographiste / Opérateur PAO", type: "Temps plein", place: "Lubumbashi" },
  { title: "Développeur Web Full-Stack", type: "Temps plein / Hybride", place: "Lubumbashi" },
];
