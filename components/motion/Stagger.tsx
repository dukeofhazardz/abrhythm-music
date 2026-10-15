"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Delay before the cascade starts. */
  delay?: number;
  /** Gap between items. Keep 0.05–0.08. */
  gap?: number;
}

/**
 * Shared scroll-reveal cascade. Opacity + translate only, fires once.
 * Renders static content under reduced motion.
 */
export function Stagger({ children, className, delay = 0.05, gap = 0.07 }: StaggerProps) {
  const reduce = useReducedMotionSafe();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
}

export function StaggerItem({ children, className, y = 20 }: StaggerItemProps) {
  const reduce = useReducedMotionSafe();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const item: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <motion.div className={cn(className)} variants={item}>
      {children}
    </motion.div>
  );
}
