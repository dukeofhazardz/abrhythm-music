"use client";

import { ArrowUp } from "lucide-react";
import { scrollToHash } from "@/lib/scroll";

export function BackToTop() {
  const toTop = () => {
    if (!scrollToHash("#top")) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className="pressable inline-flex min-h-[44px] items-center gap-2 border border-cream/30 px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-200 ease-out hover:border-cream/70"
    >
      Back to top
      <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
