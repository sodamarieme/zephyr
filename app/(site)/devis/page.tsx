import type { Metadata } from "next";
import { BriefForm } from "@/components/forms/BriefForm";
import { Zap, Clock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: "Remplissez notre formulaire de brief pour recevoir une proposition personnalisée sous 48h.",
};

const guarantees = [
  { icon: Zap, title: "Réponse rapide", desc: "Retour garanti sous 48h" },
  { icon: Shield, title: "Sans engagement", desc: "Devis gratuit et sans obligation" },
  { icon: Clock, title: "Processus simple", desc: "4 étapes, 5 minutes max" },
];

export default function DevisPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <span className="tag">Devis gratuit</span>
            <h1 className="section-title mt-3">
              Parlez-nous de votre <span className="gradient-text">projet</span>
            </h1>
            <p className="section-subtitle mx-auto">
              Remplissez ce brief en 4 étapes. Notre équipe l&apos;analysera et vous
              contactera avec une proposition sur-mesure.
            </p>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {guarantees.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="text-xs text-slate-500">{desc}</div>
              </div>
            ))}
          </div>

          {/* Form container */}
          <div className="glass rounded-2xl p-8 md:p-12">
            <BriefForm />
          </div>
        </div>
      </div>
    </div>
  );
}
