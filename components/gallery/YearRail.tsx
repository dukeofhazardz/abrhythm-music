"use client";

import { useEffect, useState, type RefObject } from "react";
import { cn } from "@/lib/cn";
import { scrollToHash } from "@/lib/scroll";
import { HEADER_OFFSET } from "@/lib/scroll";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { type GalleryYearEntry } from "@/data/gallery";

interface YearRailProps {
  years: GalleryYearEntry[];
  /** Ref map owned by GalleryBody; YearSection registers its section element. */
  sectionRefs: RefObject<Map<number, HTMLElement>>;
}

export function YearRail({ years, sectionRefs }: YearRailProps) {
  const reduce = useReducedMotionSafe();

  const [activeYear, setActiveYear] = useState(() => {
    if (typeof window === "undefined") return years.length ? years[0].year : null;
    const hashYear = Number(window.location.hash.replace(/^#/, ""));
    if (
      Number.isFinite(hashYear) &&
      years.some((y) => y.year === hashYear)
    ) {
      return hashYear;
    }
    return years.length ? years[0].year : null;
  });
  useEffect(() => {
    if (years.length === 0 || !sectionRefs.current) return;

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      let best: { year: number; ratio: number } | null = null;
      for (const entry of entries) {
        const year = Number((entry.target as HTMLElement).dataset.year);
        if (!Number.isFinite(year) || entry.intersectionRatio <= 0) continue;
        if (!best || entry.intersectionRatio > best.ratio) {
          best = { year, ratio: entry.intersectionRatio };
        }
      }
      if (best && best.year !== activeYear) {
        setActiveYear(best.year);
        if (`#${best.year}` !== window.location.hash) {
          window.history.replaceState(null, "", `#${best.year}`);
        }
      }
    };

    const observer = new IntersectionObserver(onIntersect, {
      rootMargin: `-${HEADER_OFFSET}px 0% -60% 0%`,
      threshold: [0, 0.05, 0.25, 0.5, 1],
    });

    sectionRefs.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [years, activeYear, sectionRefs]);

  // Deep-link: scroll to a year hash on arrival (no state change here).
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const year = Number(hash);
    if (Number.isFinite(year) && years.some((y) => y.year === year)) {
      requestAnimationFrame(() => scrollToHash(`#${year}`));
    }
  }, [years]);

  const shortYear = (year: number) => String(year).slice(-2);

  const goToYear = (year: number) => {
    setActiveYear(year);
    scrollToHash(`#${year}`);
  };

  return (
    <>
      {/* Mobile: horizontal rail below the hero. */}
      <nav
        aria-label="Gallery years"
        className={cn(
          "sticky top-16 z-20 flex items-center gap-1 overflow-x-auto scrollbar-hide px-4 pb-4 md:hidden",
          reduce ? "bg-paper" : "bg-paper/80 backdrop-blur-md border-b border-ink/10",
        )}
      >
        <span className="flex-shrink-0 mono-label text-accent-deep pr-2">
          Jump to year
        </span>
        {years.map((year) => {
          const active = activeYear === year.year;
          return (
            <a
              key={year.year}
              href={`#${year.year}`}
              onClick={() => goToYear(year.year)}
              className={cn(
                "pressable flex-shrink-0 snap-center",
                active
                  ? "bg-accent-deep text-accent font-display text-2xl leading-none px-3 py-1.5 rounded-md"
                  : "text-ink numeral-outline font-display text-[2rem] leading-none px-3 py-1.5",
              )}
              data-year={year.year}
            >
              {shortYear(year.year)}
            </a>
          );
        })}
      </nav>

      {/* Desktop: vertical numbered rail fixed at the right edge. */}
      <nav
        aria-label="Gallery years"
        className="fixed right-6 top-[50%] -translate-y-[50%] z-20 flex flex-col gap-4 hidden md:flex"
      >
        {years.map((year) => {
          const active = activeYear === year.year;
          return (
            <a
              key={year.year}
              href={`#${year.year}`}
              onClick={() => goToYear(year.year)}
              className={cn(
                "pressable flex items-center justify-center",
                active
                  ? "bg-accent-deep text-accent rounded-sm px-2.5 py-1.5"
                  : "text-ink",
              )}
              title={String(year.year)}
              data-year={year.year}
            >
              <span
                className={cn(
                  "numeral-outline font-display leading-none",
                  active ? "text-accent" : "text-ink",
                  active ? "text-[2.25rem]" : "text-[1.75rem]",
                )}
              >
                {shortYear(year.year)}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
