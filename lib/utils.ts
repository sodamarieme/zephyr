import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const services = [
  {
    id: "web-design",
    icon: "✦",
    title: "Web Design",
    description: "Interfaces premium qui convertissent. Chaque pixel pensé pour l'impact et l'expérience utilisateur.",
    tags: ["UI/UX", "Figma", "Prototypage"],
    gradient: "from-brand-500 to-electric-DEFAULT",
  },
  {
    id: "web-dev",
    icon: "⟨/⟩",
    title: "Web Développement",
    description: "Applications web performantes, scalables et maintenables construites avec les meilleures technologies.",
    tags: ["Next.js", "React", "Node.js"],
    gradient: "from-electric-DEFAULT to-cyan-zephyr",
  },
  {
    id: "mobile",
    icon: "◻",
    title: "Application Mobile",
    description: "Apps iOS & Android avec une expérience native irréprochable et des performances optimales.",
    tags: ["React Native", "Expo", "iOS/Android"],
    gradient: "from-cyan-zephyr to-brand-300",
  },
  {
    id: "identity",
    icon: "◈",
    title: "Identité Visuelle",
    description: "Branding fort et cohérent qui ancre votre positionnement premium sur tous les supports.",
    tags: ["Logo", "Charte graphique", "Brand strategy"],
    gradient: "from-brand-400 to-brand-600",
  },
  {
    id: "marketing",
    icon: "↗",
    title: "Web Marketing",
    description: "SEO, campagnes digitales et stratégie d'acquisition orientés résultats mesurables.",
    tags: ["SEO", "Google Ads", "Analytics"],
    gradient: "from-brand-500 to-electric-DEFAULT",
  },
  {
    id: "motion",
    icon: "▶",
    title: "Motion Design",
    description: "Animations et vidéos qui donnent vie à votre marque et captivent votre audience.",
    tags: ["After Effects", "GSAP", "Lottie"],
    gradient: "from-electric-DEFAULT to-cyan-zephyr",
  },
];

export const stats = [
  { value: "50+", label: "Projets livrés" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "3×",  label: "ROI moyen client" },
  { value: "48h", label: "Délai de réponse" },
];

export const portfolioItems = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web Design",
    tags: ["web-design", "web-dev"],
    description: "Tableau de bord analytique pour une fintech ouest-africaine.",
    year: "2024",
    gradient: "from-brand-500 to-electric-DEFAULT",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    title: "Bëkk — App Mobile",
    category: "Application Mobile",
    tags: ["mobile"],
    description: "Super-app de livraison et services pour le marché sénégalais.",
    year: "2024",
    gradient: "from-electric-DEFAULT to-cyan-zephyr",
    image: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8b08f?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    title: "Luxe Immobilier",
    category: "Web Design",
    tags: ["web-design", "web-dev"],
    description: "Vitrine premium pour une agence immobilière de prestige à Dakar.",
    year: "2025",
    gradient: "from-brand-400 to-brand-700",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Aminata Diallo",
    role: "CEO, TechSahelAgri",
    text: "Zephyr a transformé notre présence digitale. Le résultat dépasse tout ce qu'on espérait. Nos leads ont augmenté de 300% en 3 mois.",
    avatar: null,
    rating: 5,
  },
  {
    id: 2,
    name: "Ibrahim Sow",
    role: "Fondateur, PayDakar",
    text: "Une équipe qui comprend vraiment les enjeux business. Livraison dans les délais, qualité irréprochable et support réactif.",
    avatar: null,
    rating: 5,
  },
  {
    id: 3,
    name: "Fatou Ndiaye",
    role: "DG, Mode Dakar",
    text: "Le design est absolument magnifique. Exactement le positionnement premium qu'on cherchait pour notre marque.",
    avatar: null,
    rating: 5,
  },
];
