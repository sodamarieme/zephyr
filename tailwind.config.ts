import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Charte Zephyr ──────────────────────────────
        brand: {
          50:  "#e8edff",
          100: "#c5d0ff",
          200: "#99aeff",
          300: "#6685ff",
          400: "#3d5eff",
          500: "#1A3AFF", // Bleu Royal — PRIORITÉ 1
          600: "#1430e0",
          700: "#0f25b8",
          800: "#0a1a90",
          900: "#060f68",
          950: "#030840",
        },
        navy: {
          DEFAULT: "#0A1628", // Bleu Nuit — PRIORITÉ 2
          light:   "#0D1F4E", // Bleu Profond
          dark:    "#060e1c",
        },
        electric: {
          DEFAULT: "#00C4FF", // Bleu Electric
          light:   "#33d0ff",
          dark:    "#009acc",
        },
        cyan: {
          zephyr:  "#00E5FF", // Cyan Lumineux
          light:   "#33ecff",
          dark:    "#00b8cc",
        },
        silver: {
          DEFAULT: "#B0BEC5", // Argent
          light:   "#CFD8DC",
          dark:    "#78909C",
        },
        surface: {
          DEFAULT: "#0A1628",
          900: "#060e1c",   // plus sombre que Bleu Nuit
          800: "#0A1628",   // Bleu Nuit
          700: "#0D1F4E",   // Bleu Profond
          600: "#162460",
          500: "#1e2f80",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "Rajdhani", "sans-serif"],
        sans:    ["var(--font-inter)", "Roboto", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "Fira Code", "monospace"],
        accent:  ["var(--font-exo2)", "Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand":   "linear-gradient(135deg, #1A3AFF, #00B4FF, #00E5FF)",
        "gradient-dark":    "linear-gradient(135deg, #000000, #0A1628, #0D1F4E)",
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "mesh-brand":       "radial-gradient(at 30% 30%, rgba(26,58,255,0.25) 0, transparent 60%), radial-gradient(at 70% 70%, rgba(0,229,255,0.15) 0, transparent 60%)",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.4s ease forwards",
        "float":      "float 6s ease-in-out infinite",
        "glow-blue":  "glowBlue 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan":       "scan 3s linear infinite",
      },
      keyframes: {
        fadeUp:    { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:    { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-16px)" } },
        glowBlue:  { "0%": { boxShadow: "0 0 20px rgba(26,58,255,0.4)" }, "100%": { boxShadow: "0 0 50px rgba(0,229,255,0.6)" } },
        scan:      { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100vh)" } },
      },
      boxShadow: {
        "brand":    "0 0 30px rgba(26,58,255,0.3)",
        "electric": "0 0 30px rgba(0,229,255,0.3)",
        "card":     "0 4px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
