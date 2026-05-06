"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { portfolioItems } from "@/lib/utils";
import { FadeIn } from "@/components/ui/AnimatedText";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "Tous" },
  { id: "web-design", label: "Web Design" },
  { id: "web-dev", label: "Web Dev" },
  { id: "mobile", label: "Mobile" },
  { id: "identity", label: "Identité" },
];

export function Portfolio() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.tags.includes(active));

  return (
    <section className="py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/3 to-transparent pointer-events-none" />

      <div className="container-custom">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <span className="tag">Portfolio</span>
            <h2 className="section-title mt-3">
              Nos <span className="gradient-text">réalisations</span>
            </h2>
            <p className="section-subtitle">
              Des projets qui parlent d&apos;eux-mêmes.
            </p>
          </div>
          <Link href="/portfolio" className="btn-outline shrink-0">
            Voir tout
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>

        {/* Filters */}
        <FadeIn className="flex flex-wrap gap-2 mb-8" delay={0.1}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                active === f.id
                  ? "bg-brand-600 text-white"
                  : "glass text-slate-400 hover:text-white hover:border-white/20"
              )}
            >
              {f.label}
            </button>
          ))}
        </FadeIn>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden bg-surface-700 border border-white/5 hover:border-brand-500/30 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-surface-600">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-white group-hover:gradient-text transition-all">
                      {item.title}
                    </h3>
                    <span className="text-xs text-slate-500 shrink-0">{item.year}</span>
                  </div>
                  <p className="text-sm text-slate-400">{item.description}</p>
                  <span className="tag text-xs">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
