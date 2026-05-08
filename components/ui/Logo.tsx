import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  href?: string;
  className?: string;
}

const sizes = {
  sm: { img: 32, text: "text-lg"  },
  md: { img: 44, text: "text-xl"  },
  lg: { img: 60, text: "text-2xl" },
  xl: { img: 96, text: "text-4xl" },
};

export function Logo({ size = "md", showText = true, href = "/", className }: LogoProps) {
  const { img, text } = sizes[size];

  const inner = (
    <span className={cn("inline-flex items-center gap-2.5 group", className)}>
      <Image
        src="/images/logo.png"
        alt="Zephyr"
        width={img}
        height={img}
        className="object-contain shrink-0"
      />
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

export function LogoIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Zephyr"
      width={size}
      height={size}
      className={cn("object-contain shrink-0", className)}
    />
  );
}
