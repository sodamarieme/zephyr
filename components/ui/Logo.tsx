import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  href?: string;
  className?: string;
}

const sizes = {
  sm: { img: 28, text: "text-lg"  },
  md: { img: 40, text: "text-xl"  },
  lg: { img: 56, text: "text-2xl" },
  xl: { img: 96, text: "text-4xl" },
};

function ZephyrSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Cheval */}
      <path
        d="M60 80 Q50 70 40 75 Q30 80 35 90 Q50 85 60 95 Z"
        fill="#001a4d"
      />
      <ellipse cx="55" cy="85" rx="12" ry="15" fill="#001a4d" />
      
      {/* Tête du cheval */}
      <path
        d="M70 75 Q75 65 85 70 Q90 75 85 85 Q75 80 70 85 Z"
        fill="#001a4d"
      />
      <circle cx="82" cy="75" r="2" fill="#0088ff" />
      <circle cx="86" cy="73" r="2" fill="#0088ff" />

      {/* Crinière */}
      <path
        d="M85 70 Q90 60 95 65 Q92 72 88 75 Z"
        fill="#001a4d"
      />
      <path
        d="M88 75 Q95 70 100 78 Q95 82 90 80 Z"
        fill="#001a4d"
      />

      {/* Ailes gauches */}
      <path
        d="M75 100 Q65 95 60 110 Q70 105 75 115 Z"
        fill="#0088ff"
      />
      <path
        d="M72 110 Q60 108 52 125 Q68 115 75 125 Z"
        fill="#00ccff"
      />
      <path
        d="M70 120 Q55 120 45 140 Q65 125 75 135 Z"
        fill="#0088ff"
      />

      {/* Ailes droites */}
      <path
        d="M95 100 Q105 95 110 110 Q100 105 95 115 Z"
        fill="#0088ff"
      />
      <path
        d="M98 110 Q110 108 118 125 Q102 115 95 125 Z"
        fill="#00ccff"
      />
      <path
        d="M100 120 Q115 120 125 140 Q105 125 95 135 Z"
        fill="#0088ff"
      />

      {/* Corps */}
      <rect x="65" y="95" width="30" height="35" rx="8" fill="#001a4d" />
      
      {/* "Z" stylisé */}
      <path
        d="M75 110 L90 110 L75 130 L90 130"
        stroke="#00ccff"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ size = "md", showText = true, href = "/", className }: LogoProps) {
  const { img, text } = sizes[size];

  const inner = (
    <span className={cn("inline-flex items-center gap-2.5 group", className)}>
      <span className="relative shrink-0 block">
        <ZephyrSVG size={img} />
      </span>
      {showText && (
        <span className={cn(
          "font-display font-bold tracking-wide text-white",
          "group-hover:gradient-text transition-all duration-300",
          text
        )}>
          Zephyr
        </span>
      )}
    </span>
  );

  if (!href) return inner;
  return <Link href={href}>{inner}</Link>;
}

/** Version uniquement icône — pour les favicons / petits espaces */
export function LogoIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={cn("relative block shrink-0", className)}>
      <ZephyrSVG size={size} />
    </span>
  );
}
