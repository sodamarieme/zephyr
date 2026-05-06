"use client";

import { useEffect, useRef } from "react";

interface Cell {
  x: number; y: number; size: number;
  opacity: number; target: number;
  r: number; g: number; b: number;
  speed: number;
}

// Palette charte Zephyr : bleu royal + electric + cyan
const PALETTE = [
  { r: 26,  g: 58,  b: 255 }, // Bleu Royal   #1A3AFF
  { r: 26,  g: 58,  b: 255 }, // Bleu Royal   (poids double)
  { r: 0,   g: 196, b: 255 }, // Bleu Electric #00C4FF
  { r: 0,   g: 229, b: 255 }, // Cyan Lumineux #00E5FF
  { r: 0,   g: 102, b: 255 }, // Bleu intermédiaire
  { r: 255, g: 255, b: 255 }, // Blanc
  { r: 176, g: 190, b: 197 }, // Argent
];

export function AnimatedGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let cells: Cell[] = [];
    const SIZE = 58;
    const GAP  = 1;
    const STEP = SIZE + GAP;

    const build = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.ceil(canvas.width  / STEP) + 1;
      const rows = Math.ceil(canvas.height / STEP) + 1;
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hot = Math.random() < 0.08;
          const pal = PALETTE[Math.floor(Math.random() * PALETTE.length)];
          cells.push({
            x: c * STEP, y: r * STEP, size: SIZE,
            opacity: hot ? Math.random() * 0.5 : 0.03 + Math.random() * 0.05,
            target:  hot ? 0.12 + Math.random() * 0.55 : 0.025,
            r: pal.r, g: pal.g, b: pal.b,
            speed: 0.005 + Math.random() * 0.014,
          });
        }
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cells.forEach((c) => {
        c.opacity += (c.target - c.opacity) * c.speed;
        if (Math.abs(c.opacity - c.target) < 0.003) {
          const hot = Math.random() < 0.07;
          const pal = PALETTE[Math.floor(Math.random() * PALETTE.length)];
          c.target = hot ? 0.08 + Math.random() * 0.65 : 0.02 + Math.random() * 0.04;
          c.r = pal.r; c.g = pal.g; c.b = pal.b;
          c.speed = 0.004 + Math.random() * 0.012;
        }
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${c.opacity})`;
        ctx.fillRect(c.x, c.y, c.size, c.size);
      });
      raf = requestAnimationFrame(tick);
    };

    build();
    raf = requestAnimationFrame(tick);
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />;
}
