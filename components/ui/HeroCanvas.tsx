"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GridCell {
  x: number; y: number; size: number;
  opacity: number; target: number;
  r: number; g: number; b: number;
  speed: number;
}

interface Blob {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  r: number; g: number; b: number;
  opacity: number;
}

// ─── Palette ──────────────────────────────────────────────────────────────────

const GRID_PALETTE = [
  { r: 255, g: 255, b: 255 }, // blanc   — dominant
  { r: 245, g: 250, b: 255 }, // bleu très clair
  { r: 185, g: 210, b: 255 }, // bleu clair
  { r: 26,  g: 58,  b: 255 }, // Bleu Royal
  { r: 0,   g: 196, b: 255 }, // Bleu Electric
  { r: 0,   g: 229, b: 255 }, // Cyan Lumineux
  { r: 10,  g: 22,  b: 40  }, // Bleu Nuit foncé
];

const BLOB_COLORS = [
  { r: 26,  g: 58,  b: 255 }, // Bleu Royal
  { r: 0,   g: 196, b: 255 }, // Bleu Electric
  { r: 0,   g: 229, b: 255 }, // Cyan Lumineux
  { r: 10,  g: 22,  b: 40  }, // Bleu Nuit
  { r: 13,  g: 31,  b: 78  }, // Bleu Profond
];

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let cells: GridCell[] = [];
    let blobs: Blob[] = [];

    // ── Grille ──────────────────────────────────────────────────────────────
    const CELL_SIZE = 58;
    const CELL_GAP  = 1;
    const STEP = CELL_SIZE + CELL_GAP;

    const buildGrid = () => {
      const cols = Math.ceil(canvas.width  / STEP) + 1;
      const rows = Math.ceil(canvas.height / STEP) + 1;
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hot = Math.random() < 0.09;
          const pal = GRID_PALETTE[Math.floor(Math.random() * GRID_PALETTE.length)];
          cells.push({
            x: c * STEP, y: r * STEP, size: CELL_SIZE,
            opacity: hot ? Math.random() * 0.45 : 0.03 + Math.random() * 0.05,
            target:  hot ? 0.1 + Math.random() * 0.55 : 0.025,
            r: pal.r, g: pal.g, b: pal.b,
            speed: 0.005 + Math.random() * 0.015,
          });
        }
      }
    };

    // ── Blobs ────────────────────────────────────────────────────────────────
    const buildBlobs = () => {
      blobs = BLOB_COLORS.map((col, i) => ({
        x: canvas.width  * (0.2 + 0.15 * i),
        y: canvas.height * (0.3 + 0.1 * (i % 3)),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.25,
        radius: canvas.width * (0.18 + Math.random() * 0.12),
        r: col.r, g: col.g, b: col.b,
        opacity: 0.18 + Math.random() * 0.12,
      }));
    };

    const init = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildGrid();
      buildBlobs();
    };

    // ── Tick ─────────────────────────────────────────────────────────────────
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Blobs (soft gradients — donnent la "vidéo de fond colorée")
      blobs.forEach((b) => {
        // Bouncing
        b.x += b.vx;
        b.y += b.vy;
        if (b.x - b.radius < 0 || b.x + b.radius > canvas.width)  b.vx *= -1;
        if (b.y - b.radius < 0 || b.y + b.radius > canvas.height) b.vy *= -1;

        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        g.addColorStop(0,   `rgba(${b.r},${b.g},${b.b},${b.opacity})`);
        g.addColorStop(0.5, `rgba(${b.r},${b.g},${b.b},${b.opacity * 0.4})`);
        g.addColorStop(1,   `rgba(${b.r},${b.g},${b.b},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Grille par-dessus les blobs
      cells.forEach((c) => {
        c.opacity += (c.target - c.opacity) * c.speed;

        if (Math.abs(c.opacity - c.target) < 0.003) {
          const hot = Math.random() < 0.07;
          const pal = GRID_PALETTE[Math.floor(Math.random() * GRID_PALETTE.length)];
          c.target = hot
            ? 0.07 + Math.random() * 0.7   // square très brillant quand actif
            : 0.02 + Math.random() * 0.04;  // presque invisible au repos
          c.r = pal.r; c.g = pal.g; c.b = pal.b;
          c.speed = 0.004 + Math.random() * 0.013;
        }

        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${c.opacity})`;
        ctx.fillRect(c.x, c.y, c.size, c.size);
      });

      raf = requestAnimationFrame(tick);
    };

    init();
    raf = requestAnimationFrame(tick);

    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
