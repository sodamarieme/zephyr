import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe Zephyr pour discuter de votre projet digital.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className="space-y-8">
              <div>
                <span className="tag">Contact</span>
                <h1 className="section-title mt-3 mb-4">
                  Parlons de votre <span className="gradient-text">projet</span>
                </h1>
                <p className="text-slate-400 leading-relaxed">
                  Une idée, un projet, une question ? Notre équipe est là pour vous
                  écouter et construire avec vous la meilleure solution.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "msourang@zephyr.sn", href: "mailto:msourang@zephyr.sn" },
                  { icon: Phone, label: "Téléphone", value: "+221 77 106 22 01", href: "tel:+221771062201" },
                  { icon: MapPin, label: "Adresse", value: "Dakar, Sénégal", href: "#" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:border-brand-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-500/15 border border-brand-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">{label}</div>
                      <div className="text-white font-medium group-hover:text-brand-300 transition-colors">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="p-6 glass rounded-xl border-brand-500/20 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-300 font-medium">Disponibilité actuelle</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Nous acceptons de nouveaux projets. Réponse garantie sous <strong className="text-white">48h</strong>.
                </p>
                <Link href="/devis" className="btn-primary text-sm py-2 inline-flex">
                  Demander un devis gratuit
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right — Simple contact form */}
            <div className="glass rounded-2xl p-8 space-y-5">
              <h2 className="text-xl font-semibold text-white">Envoyez-nous un message</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-2">Prénom</label>
                  <input
                    placeholder="Aminata"
                    className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2">Nom</label>
                  <input
                    placeholder="Diallo"
                    className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="vous@entreprise.com"
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-2">Sujet</label>
                <input
                  placeholder="Demande de devis, Question..."
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Décrivez votre besoin..."
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                />
              </div>
              <button className="btn-primary w-full justify-center">
                Envoyer le message
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
