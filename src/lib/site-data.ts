import epi from "@/assets/service-epi.jpg";
import construction from "@/assets/service-construction.jpg";
import print from "@/assets/service-print.jpg";
import fournitures from "@/assets/service-fournitures.jpg";
import logistique from "@/assets/service-logistique.jpg";
import it from "@/assets/service-it.jpg";
import { format } from "path";

export const company = {
  name: "SHABA INDUSTRY",
  tagline: "Safety is our priority. Quality is our standard.",
  address: "02 Changalele, Kinsevere Road, Q. Joli Site, Lubumbashi, DR Congo",
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
    slug: "workwear-ppe",
    title: "Workwear & PPE",
    short: "Certified PPE to safeguard your teams across construction sites and mining operations.",
    intro:
      "SHABA INDUSTRY provides a full range of personal protective equipment compliant with international standards, available in Lubumbashi and deliverable directly to your site.",
    image: epi,
    items: [
      "Safety helmets",
      "Protective gloves",
      "Safety glasses",
      "Safety footwear",
      "Work overalls",
      "Reflective vests",
      "Respiratory masks and protection",
      "Fall‑arrest harnesses",
      "Protective accessories",
    ],
  },
  {
    slug: "import-export",
    title: "Import & Export Logistics",
    short: "Comprehensive logistics, transport, and international sourcing.",
    intro:
      "SHABA INDUSTRY manages your entire supply chain: sourcing, importation, customs clearance, transport, and on‑site delivery.",
    image: logistique,
    items: [
      "Integrated logistics",
      "Domestic and regional transport",
      "Import services",
      "Export services",
      "Supply of equipment",
    ],
  },
  {
    slug: "mining-supplies",
    title: "Mining & Industrial Supplies",
    short: "Tools, equipment, and consumables for mining and industry.",
    intro:
      "An extensive catalogue of industrial and mining supplies, sourced locally and internationally to ensure operational continuity.",
    image: fournitures,
    items: [
      "Professional tools",
      "Industrial equipment",
      "Mining supplies",
      "Technical consumables",
    ],
  },
  {
    slug: "construction",
    title: "Shaba Construction",
    short: "Construction, renovation, plumbing, and industrial maintenance.",
    intro:
      "Experienced technical teams for construction, renovation, and maintenance projects — from structural works to finishing and industrial services.",
    image: construction,
    items: [
      "Building construction",
      "Plumbing and sanitation",
      "Renovation and rehabilitation",
      "Industrial works",
      "Preventive and corrective maintenance",
    ],
  },
  {
    slug: "print",
    title: "Shaba Printing",
    short: "Digital printing, large format, and visual communication.",
    intro:
      "A complete printing workshop to enhance your brand visibility — from flyers to large‑format banners, with professional quality and reliable turnaround times.",
    image: print,
    items: [
      "Digital printing",
      "Large‑format printing",
      "Flyers and brochures",
      "Business cards",
      "Roll‑ups and banners",
      "Advertising tarpaulins",
      "Branding and vehicle wraps",
      "Visual communication",
    ],
  },
  {
    slug: "it",
    title: "Business Technology",
    short: "Software, web, cybersecurity, networks, cloud, and ERP solutions.",
    intro:
      "Our IT division supports the digital transformation of Congolese businesses — from custom development to infrastructure and security.",
    image: it,
    items: [
      "Software development",
      "Web development",
      "Mobile development",
      "Cybersecurity",
      "Digital marketing",
      "Network infrastructure",
      "IT maintenance",
      "Hosting services",
      "Cloud solutions",
      "ERP systems",
    ],
  },
];

export const stats = [
  { value: "10+", label: "Years of combined experience" },
  { value: "6", label: "Business divisions" },
  { value: "250+", label: "Projects delivered" },
  { value: "120+", label: "Clients supported" },
];

export const values = [
  {
    title: "Safety",
    text: "Protecting people and facilities guides every one of our operations.",
  },
  {
    title: "Quality",
    text: "Certified materials, trained teams, and rigorous control at every stage.",
  },
  {
    title: "Responsiveness",
    text: "Local stock in Lubumbashi and logistics designed to minimize lead times.",
  },
  {
    title: "Integrity",
    text: "Transparent pricing, timelines, and contractual commitments.",
  },
];

export const testimonials = [
  {
    name: "HSE Department",
    company: "Mining Company, Haut‑Katanga",
    text: "A reliable PPE supplier: compliant and fast deliveries, even for urgent orders.",
  },
  {
    name: "Technical Manager",
    company: "Industrial Group, Lubumbashi",
    text: "The SHABA Construction team delivered our workshop extension within the agreed timeframe.",
  },
  {
    name: "Communications Department",
    company: "Distribution Company",
    text: "Impeccable large‑format printing and full support for our branding project.",
  },
];

export const projects = [
  { title: "Industrial Workshop Extension", category: "Construction", service: "construction" },
  { title: "PPE Supply for Mining Site", category: "Industry", service: "epi" },
  { title: "Vehicle Branding & Banners", category: "Printing", service: "print" },
  { title: "IT Network & Supervision", category: "Technology", service: "it" },
  { title: "Heavy Equipment Transport", category: "Logistics", service: "import-export" },
  { title: "Office Rehabilitation", category: "Construction", service: "construction" },
  { title: "Consumables & Tools", category: "Industry", service: "fournitures-industrielles" },
  { title: "Trade Show Roll‑ups & Signage", category: "Printing", service: "print" },
];

export const catalogues = [
  {
    title: "Company Profile",
    desc: "Corporate overview and business divisions.",
    format: "PDF",
  },
  {
    title: "Workwear & PPE Catalogue",
    desc: "Helmets, gloves, footwear, harnesses, and protective accessories.",
    format: "PDF",
  },
  {
    title: "Industrial Supplies Catalogue",
    desc: "Tools, equipment, and mining consumables.",
    format: "PDF",
  },
  {
    title: "SHABA Print Brochure",
    desc: "Formats, media, and printing finishes.",
    format: "XSLX",
  },
  {
    title: "Our Fleet",
    desc: "Comprehensive catalogue of rental equipment — from heavy machinery to specialized tools, maintained to industry standards and ready for deployment.",
    format: "DOC",
  },
];

export const posts = [
  {
    slug: "choisir-epi-site-minier",
    title: "How to Choose the Right PPE for a Mining Site",
    category: "PPE",
    excerpt: "Standards, protection levels, and common mistakes when selecting equipment.",
    date: "2026-06-12",
  },
  {
    slug: "maintenance-industrielle-preventive",
    title: "Preventive Industrial Maintenance: Where to Begin",
    category: "Industry",
    excerpt: "A simple maintenance plan to reduce production downtime.",
    date: "2026-05-28",
  },
  {
    slug: "cybersecurite-pme-rdc",
    title: "Cybersecurity: Key Priorities for SMEs in the DRC",
    category: "Cybersecurity",
    excerpt: "Backups, access management, and employee awareness.",
    date: "2026-05-10",
  },
  {
    slug: "impression-grand-format-guide",
    title: "Large‑Format Printing: Preparing Your Files Correctly",
    category: "Printing",
    excerpt: "Resolution, margins, and media — a practical guide.",
    date: "2026-04-22",
  },
  {
    slug: "reussir-chantier-construction",
    title: "Managing a Construction Project in 6 Steps",
    category: "Construction",
    excerpt: "From planning to site supervision, the essential checkpoints.",
    date: "2026-04-02",
  },
];

export const jobs = [
  { title: "Industrial Maintenance Technician", type: "Full‑time", place: "Lubumbashi" },
  { title: "B2B Sales Executive – Industrial Supplies", type: "Full‑time", place: "Lubumbashi" },
  { title: "Graphic Designer / DTP Operator", type: "Full‑time", place: "Lubumbashi" },
  { title: "Full‑Stack Web Developer", type: "Full‑time / Hybrid", place: "Lubumbashi" },
];
