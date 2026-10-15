"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface PulseLineProps {
  className?: string;
  bars?: number;
}

/**
 * Beat-visualiser pulse line. Idle drift + cursor proximity swell.
 * Canvas paint only (no layout work). Static single frame under
 * prefers-reduced-motion; the rAF loop pauses while offscreen.
 */
export function PulseLine({ className, bars = 72 }: PulseLineProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    let stopObserving: (() => void) | null = null;
    let pointerX = 0.5;
    let smoothX = 0.5;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      pointerX = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const draw = (t: number) => {
      smoothX += (pointerX - smoothX) * 0.06;
      ctx.clearRect(0, 0, w, h);
      const mid = h / 2;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid + 0.5);
      ctx.lineTo(w, mid + 0.5);
      ctx.stroke();

      const bw = w / bars;
      for (let i = 0; i < bars; i++) {
        const x = (i + 0.5) / bars;
        const idle = Math.sin(i * 0.55 + t * 0.0016) * 0.5 + 0.5;
        const beat = Math.pow(Math.max(0, Math.sin(i * 0.32 - t * 0.0022)), 3);
        const dx = (x - smoothX) * 6;
        const prox = Math.exp(-dx * dx);
        const amp = 0.1 + idle * 0.22 + beat * 0.32 + prox * 0.6;
        const bh = Math.max(2, amp * (h * 0.46));
        ctx.fillStyle = prox > 0.45 ? "#A8E817" : "rgba(255, 255, 255, 0.72)";
        ctx.fillRect(i * bw + bw * 0.28, mid - bh, Math.max(1.5, bw * 0.44), bh * 2);
      }
    };

    if (reduce) {
      draw(1400);
    } else {
      const loop = (t: number) => {
        raf = 0;
        running = false;
        if (!visible) return;
        draw(t);
        raf = requestAnimationFrame(loop);
        running = true;
      };
      const kick = () => {
        if (!running && visible) {
          raf = requestAnimationFrame(loop);
          running = true;
        }
      };
      kick();
      const io = new IntersectionObserver(
        (entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
          if (visible) kick();
          else if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
            running = false;
          }
        },
        { rootMargin: "20% 0px 20% 0px" },
      );
      io.observe(canvas);
      stopObserving = () => io.disconnect();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      stopObserving?.();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [bars]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("block h-28 w-full md:h-36", className)}
    />
  );
}
