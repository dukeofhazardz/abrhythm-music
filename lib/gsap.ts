import type gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

type GsapBundle = { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger };

let pending: Promise<GsapBundle> | null = null;

/**
 * Lazily load GSAP + ScrollTrigger (first call only, cached after).
 * Keeps ~70KB out of the initial bundle — only the Approach timeline
 * needs it, and only once it nears the viewport.
 */
export function loadGsap(): Promise<GsapBundle> {
  pending ??= (async () => {
    const [{ default: gsapInstance }, { ScrollTrigger: ST }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);
    gsapInstance.registerPlugin(ST);
    return { gsap: gsapInstance, ScrollTrigger: ST };
  })();
  return pending;
}
