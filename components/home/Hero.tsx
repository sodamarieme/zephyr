"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Copy, Check, Play } from "lucide-react";
import { HeroCanvas } from "@/components/ui/HeroCanvas";

// ─── Carte JSON typewriter ────────────────────────────────────────────────────

const CODE_LINES = [
  { k: '"_type"',        v: '"project"' },
  { k: '"client"',       v: '"PayDakar"' },
  { k: '"service"',      v: '"App Mobile"' },
  { k: '"delivered"',    v: '"6 semaines"' },
  { k: '"satisfaction"', v: '"★★★★★"' },
  { k: '"status"',       v: '"live ✓"' },
];

function CodeCard() {
  const [lines, setLines] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setInterval(() =>
      setLines((n) => { if (n >= CODE_LINES.length) { clearInterval(t); return n; } return n + 1; }),
    240);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-72"
    >
      <div className="absolute -inset-8 bg-brand-600/20 rounded-[2rem] blur-3xl pointer-events-none" />

      <div className="relative bg-[#0d0d14]/90 backdrop-blur border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <span className="text-[10px] text-slate-600 font-mono">project.json</span>
          <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }}
            className="text-slate-700 hover:text-slate-300 transition-colors">
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        <div className="p-4 font-mono text-[11px] leading-[1.8rem] min-h-[168px]">
          <div className="text-slate-600">{"{"}</div>
          {CODE_LINES.slice(0, lines).map(({ k, v }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="pl-4"
            >
              <span className="text-sky-400">{k}</span>
              <span className="text-slate-600">: </span>
              <span className={v.includes("✓") ? "text-green-400" : "text-emerald-400"}>{v}</span>
              {i < CODE_LINES.length - 1 && <span className="text-slate-600">,</span>}
            </motion.div>
          ))}
          {lines < CODE_LINES.length ? (
            <div className="pl-4">
              <motion.span animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.75 }}
                className="inline-block w-[6px] h-[14px] bg-brand-400 align-middle" />
            </div>
          ) : (
            <div className="text-slate-600">{"}"}</div>
          )}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2 }}
        className="absolute -left-12 top-[28%] bg-[#0d0d14]/95 border border-white/[0.08] rounded-xl px-3 py-2 shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-green-400 text-xs font-bold">↑</span>
          </div>
          <div>
            <div className="text-[11px] text-white font-bold leading-none">+300%</div>
            <div className="text-[9px] text-slate-500 mt-0.5">trafic web</div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
        className="absolute -right-10 bottom-10 bg-[#0d0d14]/95 border border-white/[0.08] rounded-xl px-3 py-2 shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
            <span className="text-amber-400 text-xs">★</span>
          </div>
          <div>
            <div className="text-[11px] text-white font-bold leading-none">98%</div>
            <div className="text-[9px] text-slate-500 mt-0.5">satisfaction</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y  = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const op = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-navy">

      <div className="absolute inset-0 bg-navy/95" />
      <div className="absolute inset-0 overflow-hidden">
        <HeroCanvas className="opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,58,255,0.22),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(0,229,255,0.14),transparent_25%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/75 to-navy-950 pointer-events-none" />
      </div>

      <motion.div style={{ y, opacity: op }}
        className="container-custom relative z-10 grid gap-12 xl:grid-cols-[55%_40%] items-center min-h-screen py-24">

        <div className="space-y-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-xs text-brand-100">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-400 animate-pulse" />
            Agence digitale premium · Dakar
          </div>

          <div className="space-y-6">
            <h1 className="text-[clamp(3rem,5vw,5.6rem)] font-display font-black tracking-[-0.05em] leading-[0.95] text-white">
              Une vitrine digitale
              <br />
              prête pour <span className="gradient-text">la scalabilité</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Zephyr conçoit des expériences numériques premium : sites web, applis mobiles et identités de marque qui rassurent, convertissent et évoluent avec vos ambitions.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/devis" className="btn-primary px-8 py-4 text-base">
              Demander un devis
            </Link>
            <Link href="/portfolio" className="btn-outline px-8 py-4 text-base">
              Voir nos réalisations
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: "50+", label: "projets livrés" },
              { value: "98%", label: "clients satisfaits" },
              { value: "48h", label: "réponse garantie" },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-brand-500/15 bg-white/5 p-5 backdrop-blur-xl">
                <div className="text-3xl font-display font-bold text-white">{item.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-card backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Featured work</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Dashboard SaaS</h2>
            </div>
            <span className="rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-200">Premium</span>
          </div>

          <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-navy-light h-[420px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,58,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,229,255,0.18),transparent_32%)]" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs text-slate-200">
                  Interface UX • Tableau de bord
                </div>
                <div className="rounded-3xl bg-black/25 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-[0.22em] mb-4">
                    <span>Traffic</span>
                    <span>+27%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-3/4 rounded-full bg-brand-400" />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
                  <span>CTAs réussi</span>
                  <strong className="text-white">82%</strong>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
                  <span>Temps de réponse</span>
                  <strong className="text-white">1.4s</strong>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
                  <span>Visiteurs qualifiés</span>
                  <strong className="text-white">6.2k</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
