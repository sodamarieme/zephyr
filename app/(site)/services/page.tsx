import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/utils";
import { FadeIn } from "@/components/ui/AnimatedText";

export const metadata: Metadata = {
  title: "Services",
  description: "Découvrez l'offre digitale 360° de Zephyr : design, développement web, mobile, identité visuelle et marketing.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-20">
          <span className="tag">Notre offre</span>
          <h1 className="section-title mt-3">
            Services <span className="gradient-text">360°</span>
          </h1>
          <p className="section-subtitle mx-auto">
            De la stratégie à la mise en production, Zephyr vous accompagne
            sur l&apos;ensemble de votre transformation digitale.
          </p>
        </div>

        <div className="space-y-6">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.07}>
              <div
                id={service.id}
                className="card flex flex-col md:flex-row gap-8 group hover:border-brand-500/30 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white text-3xl font-mono shrink-0`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition-all">
                    {service.title}
                  </h2>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <Link
                    href="/devis"
                    className="btn-outline text-sm whitespace-nowrap"
                  >
                    Démarrer
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-16" delay={0.4}>
          <p className="text-slate-400 mb-6">
            Vous ne trouvez pas ce dont vous avez besoin ?
          </p>
          <Link href="/contact" className="btn-primary">
            Discutons de votre projet
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
