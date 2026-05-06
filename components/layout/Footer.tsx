import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const footerLinks = {
  Services: [
    { label: "Web Design",          href: "/services#web-design" },
    { label: "Web Développement",   href: "/services#web-dev" },
    { label: "Application Mobile",  href: "/services#mobile" },
    { label: "Identité Visuelle",   href: "/services#identity" },
    { label: "Web Marketing",       href: "/services#marketing" },
  ],
  Entreprise: [
    { label: "À propos",  href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog",      href: "/blog" },
    { label: "Carrières", href: "/about#careers" },
  ],
  Contact: [
    { label: "Demander un devis", href: "/devis" },
    { label: "Nous contacter",    href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-brand-500/10 bg-surface-800/40">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Logo size="md" showText={true} href="/" />

            <p className="text-silver text-sm leading-relaxed max-w-xs">
              Agence digitale premium basée à Dakar. Nous concevons des expériences
              digitales qui font la différence pour les entreprises ambitieuses
              d&apos;Afrique de l&apos;Ouest.
            </p>

            <div className="space-y-2 text-sm text-silver">
              {[
                { icon: Mail,   value: "msourang@zephyr.sn",  href: "mailto:msourang@zephyr.sn" },
                { icon: Phone,  value: "+221 77 106 22 01",    href: "tel:+221771062201" },
                { icon: MapPin, value: "Dakar, Sénégal",       href: "#" },
              ].map(({ icon: Icon, value, href }) => (
                <a key={value} href={href}
                  className="flex items-center gap-2 hover:text-white transition-colors">
                  <Icon className="w-4 h-4 text-electric shrink-0" />
                  {value}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {[
                {
                  label: "Instagram", href: "#",
                  svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
                },
                {
                  label: "X (Twitter)", href: "#",
                  svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                },
                {
                  label: "LinkedIn", href: "#",
                  svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                },
              ].map(({ label, href, svg }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg border border-brand-500/20 flex items-center justify-center
                    text-silver hover:text-white hover:border-brand-500/60 hover:bg-brand-500/10
                    transition-all duration-200">
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-accent font-semibold text-white mb-4 uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="text-sm text-silver hover:text-white transition-colors
                        hover:translate-x-1 inline-flex items-center gap-1">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 rounded-2xl border border-brand-500/20 flex flex-col md:flex-row
          items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, rgba(26,58,255,0.12), rgba(0,229,255,0.08))" }}>
          <div>
            <h3 className="text-xl font-display font-semibold text-white mb-1">
              Prêt à lancer votre projet ?
            </h3>
            <p className="text-silver text-sm">Réponse garantie sous 48h.</p>
          </div>
          <Link href="/devis" className="btn-primary shrink-0">
            Démarrer maintenant
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-brand-500/10 flex flex-col md:flex-row
          items-center justify-between gap-4 text-sm text-silver/50">
          <p>© {new Date().getFullYear()} Zephyr. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/legal"   className="hover:text-silver transition-colors">Mentions légales</Link>
            <Link href="/privacy" className="hover:text-silver transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
