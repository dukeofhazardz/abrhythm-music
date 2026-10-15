"use client";

import { useEffect, useState } from "react";

/**
 * Hydration-safe reduced-motion flag. Always `false` on the first render
 * (matching SSR output), then reflects the OS setting post-hydration.
 * The raw `useReducedMotion` from motion reads matchMedia during render,
 * which diverges from SSR whenever the OS requests reduced motion and
 * breaks hydration.
 */
export function useReducedMotionSafe(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setReduce(true);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return reduce;
}
