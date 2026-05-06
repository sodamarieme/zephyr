import { CheckCircle2 } from "lucide-react";
import { getTestimonials, type SanityTestimonial } from "@/sanity/lib/queries";
import { testimonials as fallback } from "@/lib/utils";
import { FadeIn } from "@/components/ui/AnimatedText";

export async function Testimonials() {
  let items: SanityTestimonial[];
  try {
    items = await getTestimonials();
  } catch {
    items = fallback.map((t) => ({
      _id: String(t.id),
      name: t.name,
      role: t.role,
      company: "",
      text: t.text,
      rating: t.rating,
    }));
  }

  if (items.length === 0) return null;

  return (
    <section className="py-32 bg-navy">
      <div className="container-custom">
        <FadeIn className="mb-20">
          <span className="tag">Témoignages</span>
          <h2 className="section-title mt-4">
            Ils nous font <span className="gradient-text">confiance</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.slice(0, 6).map((t, i) => (
            <FadeIn key={t._id} delay={i * 0.08}>
              <div className="space-y-6 group">
                {/* Numéro + icône */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-brand-400 font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-brand-400/60 group-hover:text-brand-400 transition-colors" />
                </div>

                {/* Titre (nom du client) */}
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {t.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {t.role}{t.company ? ` · ${t.company}` : ""}
                  </p>
                </div>

                {/* Citation/Description */}
                <p className="text-slate-300 leading-relaxed text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Ligne de séparation */}
                <div className="w-12 h-px bg-gradient-to-r from-brand-400/50 to-transparent" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
