"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/utils";
import { FadeIn } from "@/components/ui/AnimatedText";

export function Services() {
  return (
    <section className="py-32 relative">
      <div className="container-custom">
        <FadeIn className="text-center space-y-4 mb-16">
          <span className="tag">Nos expertises</span>
          <h2 className="section-title mt-3">
            L&apos;offre{" "}
            <span className="gradient-text">360°</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Du design à la livraison, Zephyr couvre l&apos;ensemble de votre écosystème digital.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="card group relative overflow-hidden"
              >
                {/* Gradient accent */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-full -translate-y-1/2 translate-x-1/2`}
                />

                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} text-white text-2xl font-mono`}>
                    {service.icon}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:gradient-text transition-all">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="tag text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-sm text-brand-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    En savoir plus
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-12" delay={0.4}>
          <Link href="/services" className="btn-outline">
            Découvrir tous nos services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
