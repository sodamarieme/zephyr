import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono, Exo_2 } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Zephyr — Agence Digitale Premium au Sénégal",
    template: "%s | Zephyr",
  },
  description:
    "Zephyr conçoit et développe des expériences digitales premium : sites web, applications mobiles et identités visuelles pour les entreprises ambitieuses.",
  keywords: ["agence digitale", "Sénégal", "Dakar", "web design", "développement web", "application mobile"],
  authors: [{ name: "Zephyr", url: "https://zephyr.sn" }],
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://zephyr.sn",
    title: "Zephyr — Agence Digitale Premium au Sénégal",
    description: "Expériences digitales premium pour les entreprises ambitieuses.",
    siteName: "Zephyr",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={cn(
      inter.variable,
      orbitron.variable,
      jetbrains.variable,
      exo2.variable,
      "scroll-smooth"
    )}>
      <body className="antialiased bg-surface-900 text-white overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
