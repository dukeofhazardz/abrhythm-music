"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Subtle cursor follower: a small dot plus a trailing ring that grows
 * over interactive elements and shows a label over [data-cursor]
 * surfaces (e.g. service cards). Desktop fine-pointers only — never
 * renders on touch devices or under reduced motion. The native
 * cursor stays visible; this is an accent, not a replacement.
 */
export function Cursor() {
  // Always render null on the first pass (server + hydration); capability
  // is evaluated post-hydration so SSR output can never diverge.
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setEnabled(true);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const labeled = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const interactive = target?.closest?.("a, button") as HTMLElement | null;
      const nextLabel = labeled?.dataset.cursor ?? null;
      const nextHovering = Boolean(labeled ?? interactive);
      setLabel((prev) => (prev === nextLabel ? prev : nextLabel));
      setHovering((prev) => (prev === nextHovering ? prev : nextHovering));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100]"
    >
      <motion.div className="absolute" style={{ x, y, opacity: visible ? 1 : 0 }}>
        {/* Tight dot */}
        <div
          className={cn(
            "absolute -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference transition-opacity duration-150",
            label ? "opacity-0" : "opacity-100",
          )}
        />
      </motion.div>
      {/* Trailing ring / label bubble (margins center it; scale grows around center) */}
      <motion.div className="absolute" style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}>
        <motion.div
          className={cn(
            label
              ? "-mt-8 -ml-8 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-ink-bg"
              : "-mt-4 -ml-4 h-8 w-8 rounded-full border border-white mix-blend-difference",
          )}
          animate={{ scale: label ? 1 : hovering ? 1.5 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          {label ? (
            <span className="mono-label text-[10px]">{label}</span>
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}
