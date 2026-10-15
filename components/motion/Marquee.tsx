"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

/**
 * Single-purpose marquee. Use at most once per page (DESIGN.md).
 * Collapses to static wrapped content under reduced motion.
 */
export function Marquee({ children, className, innerClassName }: MarqueeProps) {
  const reduce = useReducedMotionSafe();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className={cn("animate-marquee flex w-max items-center gap-8", innerClassName)}>
        <div className="flex items-center gap-8">{children}</div>
        <div className="flex items-center gap-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
