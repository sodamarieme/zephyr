"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { FadeIn } from "@/components/ui/AnimatedText";

export function CTA() {
  return (
    <section className="py-32">
      <div className="container-custom">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600/20 via-cyan-zephyr/10 to-cyan-zephyr/20 border border-brand-500/20 p-12 md:p-20 text-center">
            {/* Background effects */}
            <div className="absolute inset-0 bg-mesh-brand opacity-50 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600/20 border border-brand-500/30 mb-4"
              >
                <Zap className="w-6 h-6 text-brand-400" />
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                Votre projet mérite
                <br />
                <span className="gradient-text">le meilleur</span>
              </h2>

              <p className="text-xl text-slate-400">
                Discutons de votre vision. Notre équipe vous répond sous 48h avec
                une proposition personnalisée et un devis détaillé.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/devis" className="btn-primary text-base px-8 py-4">
                  Lancer mon projet maintenant
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-outline text-base px-8 py-4">
                  Nous contacter
                </Link>
              </div>

              <p className="text-sm text-slate-500 pt-2">
                Réponse garantie sous 48h · Devis gratuit · Sans engagement
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
