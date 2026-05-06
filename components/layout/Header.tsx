"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/",          label: "Accueil" },
  { href: "/services",  label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog",      label: "Blog" },
  { href: "/about",     label: "À propos" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-navy/90 backdrop-blur-xl border-b border-brand-500/20 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container-custom flex items-center justify-between">

          {/* Logo */}
          <Logo size="sm" showText={true} href="/" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-accent font-medium rounded-lg transition-all duration-200",
                  pathname === link.href
                    ? "text-white"
                    : "text-silver hover:text-white hover:bg-white/5"
                )}>
                {pathname === link.href && (
                  <motion.span layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(26,58,255,0.18)", border: "1px solid rgba(26,58,255,0.3)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex">
            <Link href="/devis" className="btn-primary text-sm py-2 px-5">
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-silver hover:text-white hover:bg-white/5 transition-colors">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[58px] z-40 bg-navy/95 backdrop-blur-xl border-b border-brand-500/20 p-4 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}>
                  <Link href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-sm font-accent font-medium transition-colors",
                      pathname === link.href
                        ? "text-white"
                        : "text-silver hover:text-white hover:bg-white/5"
                    )}
                    style={pathname === link.href ? {
                      background: "rgba(26,58,255,0.15)",
                      border: "1px solid rgba(26,58,255,0.25)",
                    } : {}}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
                className="pt-3 mt-2 border-t border-brand-500/20">
                <Link href="/devis" className="btn-primary w-full justify-center text-sm">
                  Demander un devis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
