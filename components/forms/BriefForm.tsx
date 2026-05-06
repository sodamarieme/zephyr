"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Schéma de validation ───────────────────────────────────────────────────

const briefSchema = z.object({
  // Étape 1 — Type de projet
  projectTypes: z.array(z.string()).min(1, "Sélectionnez au moins un type"),
  // Étape 2 — Budget & délais
  budget: z.string().min(1, "Sélectionnez un budget"),
  deadline: z.string().min(1, "Sélectionnez un délai"),
  // Étape 3 — Description
  projectName: z.string().min(2, "Nom du projet requis"),
  description: z.string().min(50, "Décrivez votre projet en au moins 50 caractères"),
  targetAudience: z.string().min(10, "Décrivez votre cible"),
  // Étape 4 — Contact
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  company: z.string().optional(),
  email: z.string().email("Email invalide"),
  phone: z.string().min(9, "Numéro invalide"),
});

type BriefFormData = z.infer<typeof briefSchema>;

const PROJECT_TYPES = [
  { id: "site-vitrine", label: "Site vitrine", icon: "◻" },
  { id: "web-app", label: "Application web", icon: "⟨/⟩" },
  { id: "mobile-app", label: "App mobile", icon: "◻" },
  { id: "e-commerce", label: "E-commerce", icon: "◈" },
  { id: "identity", label: "Identité visuelle", icon: "✦" },
  { id: "marketing", label: "Web marketing", icon: "↗" },
];

const BUDGETS = [
  { id: "500-1500", label: "500k – 1,5M XOF" },
  { id: "1500-3000", label: "1,5M – 3M XOF" },
  { id: "3000-8000", label: "3M – 8M XOF" },
  { id: "8000+", label: "8M+ XOF" },
  { id: "undefined", label: "Budget à définir" },
];

const DEADLINES = [
  { id: "1month", label: "< 1 mois" },
  { id: "1-3months", label: "1 à 3 mois" },
  { id: "3-6months", label: "3 à 6 mois" },
  { id: "6months+", label: "6 mois+" },
  { id: "flexible", label: "Flexible" },
];

const STEPS = [
  { id: 1, title: "Type de projet", description: "Qu&apos;est-ce que vous souhaitez créer ?" },
  { id: 2, title: "Budget & délais", description: "Définissons le cadre du projet" },
  { id: 3, title: "Votre projet", description: "Parlez-nous de votre vision" },
  { id: 4, title: "Vos coordonnées", description: "Pour vous recontacter" },
];

// ─── Composant ──────────────────────────────────────────────────────────────

export function BriefForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BriefFormData>({
    resolver: zodResolver(briefSchema),
    defaultValues: { projectTypes: [] },
  });

  const projectTypes = watch("projectTypes") ?? [];

  const toggleType = (id: string) => {
    const current = projectTypes;
    setValue(
      "projectTypes",
      current.includes(id) ? current.filter((t) => t !== id) : [...current, id]
    );
  };

  const nextStep = async () => {
    const fieldsMap: Record<number, (keyof BriefFormData)[]> = {
      1: ["projectTypes"],
      2: ["budget", "deadline"],
      3: ["projectName", "description", "targetAudience"],
    };
    const valid = await trigger(fieldsMap[step]);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: BriefFormData) => {
    setLoading(true);
    try {
      await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 space-y-6"
      >
        <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Brief envoyé !</h3>
        <p className="text-slate-400 max-w-md mx-auto">
          Merci pour votre demande. Notre équipe analysera votre brief et vous contactera
          sous <strong className="text-white">48h</strong> avec une proposition personnalisée.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-10">
        {STEPS.map((s) => (
          <div key={s.id} className="flex items-center gap-3 flex-1 last:flex-none">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300",
              step > s.id
                ? "bg-brand-600 text-white"
                : step === s.id
                ? "bg-brand-600/20 border-2 border-brand-500 text-brand-300"
                : "bg-white/5 border border-white/10 text-slate-500"
            )}>
              {step > s.id ? <Check className="w-4 h-4" /> : s.id}
            </div>
            {s.id < STEPS.length && (
              <div className={cn(
                "h-0.5 flex-1 transition-all duration-500",
                step > s.id ? "bg-brand-600" : "bg-white/10"
              )} />
            )}
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">{STEPS[step - 1].title}</h2>
        <p className="text-slate-400 mt-1 text-sm"
           dangerouslySetInnerHTML={{ __html: STEPS[step - 1].description }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* ── ÉTAPE 1 ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => toggleType(type.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 text-sm font-medium",
                      projectTypes.includes(type.id)
                        ? "border-brand-500 bg-brand-500/15 text-brand-300"
                        : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                    )}
                  >
                    <span className="text-2xl font-mono">{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>
              {errors.projectTypes && (
                <p className="text-red-400 text-xs">{errors.projectTypes.message}</p>
              )}
            </motion.div>
          )}

          {/* ── ÉTAPE 2 ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Budget estimé</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {BUDGETS.map((b) => (
                    <label key={b.id} className="cursor-pointer">
                      <input type="radio" {...register("budget")} value={b.id} className="sr-only" />
                      <div className={cn(
                        "p-3 rounded-xl border text-sm transition-all",
                        watch("budget") === b.id
                          ? "border-brand-500 bg-brand-500/15 text-brand-300"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                      )}>
                        {b.label}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Délai souhaité</label>
                <div className="flex flex-wrap gap-2">
                  {DEADLINES.map((d) => (
                    <label key={d.id} className="cursor-pointer">
                      <input type="radio" {...register("deadline")} value={d.id} className="sr-only" />
                      <div className={cn(
                        "px-4 py-2 rounded-full border text-sm transition-all",
                        watch("deadline") === d.id
                          ? "border-brand-500 bg-brand-500/15 text-brand-300"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                      )}>
                        {d.label}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.deadline && <p className="text-red-400 text-xs mt-1">{errors.deadline.message}</p>}
              </div>
            </motion.div>
          )}

          {/* ── ÉTAPE 3 ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nom du projet *</label>
                <input
                  {...register("projectName")}
                  placeholder="Ex: Application de livraison Dakar"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
                {errors.projectName && <p className="text-red-400 text-xs mt-1">{errors.projectName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description du projet *</label>
                <textarea
                  {...register("description")}
                  rows={4}
                  placeholder="Décrivez votre projet, vos objectifs, les fonctionnalités souhaitées..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Cible / Audience *</label>
                <input
                  {...register("targetAudience")}
                  placeholder="Ex: PME sénégalaises, Jeunes urbains 25-40 ans..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
                {errors.targetAudience && <p className="text-red-400 text-xs mt-1">{errors.targetAudience.message}</p>}
              </div>
            </motion.div>
          )}

          {/* ── ÉTAPE 4 ── */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Prénom *</label>
                  <input
                    {...register("firstName")}
                    placeholder="Aminata"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nom *</label>
                  <input
                    {...register("lastName")}
                    placeholder="Diallo"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                  {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Entreprise</label>
                <input
                  {...register("company")}
                  placeholder="Nom de votre société (optionnel)"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="vous@entreprise.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Téléphone *</label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+221 77 XXX XX XX"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn-outline text-sm py-2 px-5"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-primary"
            >
              Continuer
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? "Envoi en cours..." : "Envoyer mon brief"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
