"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimate, stagger } from "framer-motion";

const LINES = [
  { text: "Design.",        accent: false },
  { text: "Développement.", accent: false },
  { text: "Impact.",        accent: true  },
];

const STORAGE_KEY = "zephyr_intro_seen";

export function IntroAnimation() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"lines" | "logo" | "exit">("lines");
  const [scope, animate] = useAnimate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || hasRun.current) return;
    hasRun.current = true;

    const run = async () => {
      await new Promise((r) => setTimeout(r, 350));
      await animate(
        ".intro-word",
        { opacity: [0, 1], y: [44, 0], filter: ["blur(14px)", "blur(0px)"] },
        { duration: 0.8, delay: stagger(0.2), ease: [0.25, 0.46, 0.45, 0.94] }
      );
      await new Promise((r) => setTimeout(r, 750));
      setPhase("logo");
      await new Promise((r) => setTimeout(r, 1200));
      setPhase("exit");
      await new Promise((r) => setTimeout(r, 900));
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
    };
    run();
  }, [visible, animate]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div ref={scope}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Fond gradient sombre charte */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #000000 0%, #0A1628 50%, #0D1F4E 100%)" }} />
          <div className="absolute inset-0 noise opacity-30 pointer-events-none" />

          {/* Orbs */}
          <motion.div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{ top: "5%", left: "15%", background: "radial-gradient(circle, rgba(26,58,255,0.22), transparent 70%)" }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ bottom: "10%", right: "15%", background: "radial-gradient(circle, rgba(0,229,255,0.18), transparent 70%)" }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />

          {/* Grille */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(26,58,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(26,58,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />

          {/* Contenu */}
          <div className="relative z-10 text-center select-none px-8">
            <AnimatePresence mode="wait">

              {/* Phase 1 — Lignes de texte */}
              {phase === "lines" && (
                <motion.div key="lines" className="space-y-2 md:space-y-4"
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                  transition={{ duration: 0.4 }}>
                  {LINES.map((line) => (
                    <div key={line.text} className="overflow-hidden">
                      <span className={`intro-word block text-5xl md:text-8xl lg:text-[7rem]
                        font-display font-bold tracking-tight opacity-0
                        ${line.accent ? "gradient-text" : "text-white"}`}>
                        {line.text}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Phase 2 — Logo réel */}
              {phase === "logo" && (
                <motion.div key="logo"
                  className="flex flex-col items-center gap-6"
                  initial={{ opacity: 0, scale: 0.75, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1,    filter: "blur(0px)" }}
                  exit={{   opacity: 0, scale: 1.08,  filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Logo image */}
                  <motion.div
                    className="relative"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Halo glow derrière le logo */}
                    <div className="absolute inset-0 rounded-full blur-3xl scale-150 opacity-40"
                      style={{ background: "radial-gradient(circle, #1A3AFF, #00E5FF, transparent)" }} />
                    <div className="relative w-36 h-36 md:w-48 md:h-48">
                      <Image
                        src="/images/logo.png"
                        alt="Zephyr"
                        fill
                        className="object-contain"
                        style={{ mixBlendMode: "screen" }}
                        priority
                      />
                    </div>
                  </motion.div>

                  {/* Nom */}
                  <motion.span
                    className="text-5xl md:text-7xl font-display font-bold text-white tracking-wide"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Zephyr
                  </motion.span>

                  {/* Tagline */}
                  <motion.p
                    className="text-silver text-sm md:text-base tracking-[0.35em] uppercase font-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    Agence Digitale Premium
                  </motion.p>

                  {/* Ligne déco */}
                  <motion.div
                    className="h-px w-32 rounded-full"
                    style={{ background: "linear-gradient(90deg, transparent, #1A3AFF, #00E5FF, transparent)" }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Barre de progression */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-36 h-[2px] bg-white/8 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #1A3AFF, #00C4FF, #00E5FF)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.6, ease: "linear" }} />
          </div>

          {/* Skip */}
          <button
            onClick={() => { sessionStorage.setItem(STORAGE_KEY, "1"); setVisible(false); }}
            className="absolute bottom-7 right-8 text-xs text-silver/40 hover:text-silver/80 transition-colors font-accent"
          >
            Passer →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
