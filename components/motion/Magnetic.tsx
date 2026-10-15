"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useCallback, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Max pull in px. Keep subtle (16–32). */
  strength?: number;
}

/** Springy hover pull for buttons. Desktop fine-pointers only. */
export function Magnetic({ children, className, strength = 24 }: MagneticProps) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const canMagnetize = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduce || !canMagnetize() || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      x.set((relX / rect.width) * strength);
      y.set((relY / rect.height) * strength);
    },
    [canMagnetize, reduce, strength, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={cn("inline-block", className)}>
      <motion.div style={{ x: springX, y: springY }} className="inline-block">
        {children}
      </motion.div>
    </div>
  );
}
