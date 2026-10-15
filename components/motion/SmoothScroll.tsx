"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { loadGsap } from "@/lib/gsap";
import { scrollToHash, setLenis } from "@/lib/scroll";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Lenis smooth-scroll provider. Skipped entirely when the user
 * prefers reduced motion. Syncs with GSAP ScrollTrigger and
 * intercepts in-page anchor clicks for offset smooth scrolling.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") {
        event.preventDefault();
        return;
      }
      if (scrollToHash(hash)) event.preventDefault();
    };
    document.addEventListener("click", onClick);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => document.removeEventListener("click", onClick);
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // GSAP loads lazily so the ScrollTrigger sync costs nothing
    // until this resolves; Lenis drives its own rAF meanwhile.
    const lenis = new Lenis({ duration: 1.1, autoRaf: true });
    setLenis(lenis);

    loadGsap()
      .then(({ ScrollTrigger }) => {
        if (cancelled) return;
        const sync = () => ScrollTrigger.update();
        lenis.on("scroll", sync);
        cleanup = () => {
          lenis.off("scroll", sync);
        };
      })
      .catch(() => {
        // GSAP failed to load — Lenis smooth scrolling still works.
      });

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      cleanup?.();
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
