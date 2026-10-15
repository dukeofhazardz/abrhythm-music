import type Lenis from "lenis";

let lenis: Lenis | null = null;

/** Sticky header height (72px) + breathing room. */
export const HEADER_OFFSET = 88;

export function setLenis(instance: Lenis | null): void {
  lenis = instance;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Smooth-scroll to an in-page hash. Returns false if there is no target. */export function scrollToHash(hash: string): boolean {
  if (typeof document === "undefined") return false;
  let target: Element | null = null;
  try {
    target = hash === "#top" ? document.body : document.querySelector(hash);
  } catch {
    return false;
  }
  if (!target) return false;

  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(target as HTMLElement, {
      offset: hash === "#top" ? 0 : -HEADER_OFFSET,
      duration: 1.4,
    });
  } else if (hash === "#top") {
    window.scrollTo({ top: 0, behavior: "auto" });
  } else {
    // Native jump; scroll-mt on sections covers the sticky header.
    target.scrollIntoView({ behavior: "auto" });
  }
  return true;
}

/**
 * Fully stop background scrolling (Lenis + native). Use for overlays
 * like the mobile menu — body overflow alone doesn't hold on iOS.
 */
export function lockScroll(): void {
  lenis?.stop();
  document.body.style.overflow = "hidden";
}

/** Release a previous lockScroll(). */
export function unlockScroll(): void {
  lenis?.start();
  document.body.style.overflow = "";
}
