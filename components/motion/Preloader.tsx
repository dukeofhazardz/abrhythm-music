"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "abrhythm-seen";

/**
 * Short branded preloader: waveform draws in, holds, then the veil
 * wipes away. First visit per session only; skipped entirely under
 * prefers-reduced-motion. Transform/opacity only.
 */
export function Preloader() {
  // Always render null on the first pass (server + hydration) so the
  // sessionStorage check below can never diverge from SSR output.
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let stored: string | null = null;
      try {
        stored = window.sessionStorage.getItem(STORAGE_KEY);
      } catch {
        return;
      }
      if (stored) return;
      setShow(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!show) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const wipeTimer = window.setTimeout(() => setLeaving(true), 850);
    const doneTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* storage unavailable — preloader simply replays next visit */
      }
      document.body.style.overflow = prevOverflow;
      setShow(false);
    }, 1750);

    return () => {
      window.clearTimeout(wipeTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="theme-ink fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-ink-bg text-cream"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
          animate={leaving ? { y: "-100%" } : { y: "0%" }}
        >
          <motion.svg
            width="180"
            height="40"
            viewBox="0 0 180 40"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <motion.path
              d="M4 20 H44 L54 20 L60 8 L66 32 L72 20 H96 L102 14 L108 26 L114 20 H138 L144 6 L150 34 L156 20 H176"
              stroke="#A8E817"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.svg>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Official mark on a white chip: the dark artwork needs a light ground on green. */}
            <span className="flex items-center rounded-md bg-white px-4 py-2.5">
              <Image
                src="/images/logo-bg.png"
                alt="Abrhythm Music"
                width={552}
                height={452}
                className="h-12 w-auto object-contain"
              />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
