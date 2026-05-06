import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Zap, Heart } from "lucide-react";
import { stats } from "@/lib/utils";
import { FadeIn } from "@/components/ui/AnimatedText";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez Zephyr, l'agence digitale premium basée à Dakar.",
};

const values = [
  {
    icon: Target,
    title: "Excellence",
    desc: "Chaque pixel, chaque ligne de code, chaque interaction est soignée. Nous ne livrons pas moins que le meilleur.",
  },
  {
    icon: Zap,
    title: "Impact",
    desc: "Nous construisons des produits qui font avancer votre business, pas des sites vitrines sans âme.",
  },
  {
    icon: Heart,
    title: "Partenariat",
    desc: "Nous sommes votre équipe, pas juste un prestataire. Votre succès est notre succès.",
  },
];

const team = [
  {
    name: "Massourang Sourang",
    role: "Fondateur & CEO",
    bio: "Visionnaire derrière Zephyr. Architecte d'expériences digitales depuis 8 ans.",
    gradient: "from-brand-500 to-cyan-zephyr",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Hero section */}
        <FadeIn className="max-w-4xl mx-auto text-center space-y-6 mb-24">
          <span className="tag">Notre histoire</span>
          <h1 className="section-title mt-3">
            Une agence née pour{" "}
            <span className="gradient-text">élever les standards</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Zephyr est née d&apos;un constat simple : le marché digital sénégalais mérite
            mieux que des templates génériques. Nous sommes là pour créer des
            expériences qui font la différence.
          </p>
        </FadeIn>

        {/* Stats */}
        <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24" delay={0.1}>
          {stats.map(({ value, label }) => (
            <div key={label} className="glass rounded-2xl p-6 text-center">
              <div className="text-4xl font-display font-bold gradient-text mb-2">{value}</div>
              <div className="text-sm text-slate-400">{label}</div>
            </div>
          ))}
        </FadeIn>

        {/* Values */}
        <div className="mb-24">
          <FadeIn className="text-center mb-12">
            <h2 className="section-title">
              Nos <span className="gradient-text">valeurs</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="card space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center">
                    <v.icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <FadeIn className="text-center mb-12">
            <h2 className="section-title">
              L&apos;équipe <span className="gradient-text">fondatrice</span>
            </h2>
          </FadeIn>
          <div className="flex justify-center">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <div className="card max-w-sm w-full text-center space-y-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-3xl font-bold mx-auto`}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-brand-400 text-sm font-medium">{member.role}</p>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Envie de rejoindre l&apos;aventure ?
          </h2>
          <p className="text-slate-400">
            Nous cherchons toujours des talents passionnés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="btn-primary">
              Travailler avec nous
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline">
              Postuler
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
