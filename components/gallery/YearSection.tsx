"use client";

import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, type RefObject, useState } from "react";
import { Container } from "@/components/layout/Container";
import { GalleryGrid, LAYOUT_BY_YEAR } from "@/components/gallery/GalleryGrid";
import { Lightbox } from "@/components/gallery/Lightbox";
import { type GalleryYearEntry } from "@/data/gallery";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

interface YearSectionProps {
  year: GalleryYearEntry;
  /** Ref map shared with YearRail (year → section element). */
  sectionRefs: RefObject<Map<number, HTMLElement>>;
}

export function YearSection({
  year,
  sectionRefs,
}: YearSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const [batch, setBatch] = useState(12);
  const [lightbox, setLightbox] = useState<{
    year: number;
    index: number;
    trigger: HTMLElement | null;
  } | null>(null);

  // Register this section so the year rail can track scroll position.
  useEffect(() => {
    const refs = sectionRefs.current;
    if (sectionRef.current && refs) {
      refs.set(year.year, sectionRef.current);
    }
    return () => {
      refs?.delete(year.year);
    };
  }, [year.year, sectionRefs]);

  const handleView = (index: number, trigger: HTMLElement) => {
    setLightbox({ year: year.year, index, trigger });
  };

  // Subtle parallax drift for the giant year numeral while the section
  // passes through the viewport (transform only).
  const parallaxY = useNumeralParallax(sectionRef as React.RefObject<HTMLDivElement | null>);

  const layout = LAYOUT_BY_YEAR[year.year] ?? "masonry";
  const images = year.images.map((image, i) => ({ image, index: i }));
  const hasFolder = Boolean(year.folderUrl);

  return (
    <section
      id={String(year.year)}
      data-year={String(year.year)}
      ref={sectionRef}
      aria-label={`Gallery ${year.year}`}
      className="relative scroll-mt-20"
    >
      <Container className="pb-40 md:pb-48">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-24">
          {/* Giant outlined year numeral: parallaxes on scroll, fills with colour when the section enters. */}
          <div className="flex-shrink-0 relative">
            <motion.div
              className="text-accent-deep"
              style={{ y: reduce ? 0 : parallaxY }}
            >
              <span
                aria-hidden="true"
                className="numeral-outline font-display leading-none text-[10rem] md:text-[14rem] lg:text-[18rem]"
              >
                {shortYear(year.year)}
              </span>
            </motion.div>
            {!reduce && (
              <motion.div
                className="absolute inset-0"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top" }}
              >
                <span
                  aria-hidden="true"
                  className="bg-accent text-transparent bg-clip-text font-display leading-none text-[10rem] md:text-[14rem] lg:text-[18rem]"
                >
                  {shortYear(year.year)}
                </span>
              </motion.div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-end md:gap-8">
              <div>
                <p className="mono-label text-accent-deep">{year.year}</p>
                <h2 className="type-display-lg mt-2 mb-2 text-accent-deep">
                  {year.year}
                </h2>
              </div>
              {year.countFromRealData && (
                <p className="mono-label text-ink-soft">
                  {year.imageCount} photos
                </p>
              )}
            </div>

            {year.error ? (
              <div className="mt-6 rounded-lg border border-ink/20 bg-paper-2 p-6 md:p-8 text-ink-soft">
                <p className="mono-label text-accent-deep">
                  Could not load photos
                </p>
                <p className="mt-2">{year.error}</p>
                {hasFolder && (
                  <a
                    href={year.folderUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block pressable mono-label text-accent-deep link-underline"
                  >
                    Open year folder in Google Drive
                  </a>
                )}
              </div>
            ) : year.images.length === 0 ? (
              <div className="mt-6 flex h-64 flex-col items-center justify-center rounded-lg border border-ink/20 bg-paper-2 p-6 md:p-12 text-center">
                <p className="mono-label text-accent-deep">No photos yet</p>
                <p className="mt-2 text-ink-soft">
                  No images have been added for {year.year} yet.
                </p>
                {hasFolder && (
                  <a
                    href={year.folderUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block pressable mono-label text-accent-deep link-underline"
                  >
                    Open {year.year} folder in Google Drive
                  </a>
                )}
              </div>
            ) : (
              <>
                {hasFolder && (
                  <a
                    href={year.folderUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable inline-flex items-center gap-2 mono-label text-accent-deep link-underline mb-8"
                  >
                    Open {year.year} folder in Google Drive
                  </a>
                )}
                <GalleryGrid
                  year={year.year}
                  images={images}
                  layout={layout}
                  batch={batch}
                  setBatch={setBatch}
                  onView={handleView}
                />
                {lightbox && lightbox.year === year.year && (
                  <Lightbox
                    year={year}
                    index={lightbox.index}
                    onClose={() => setLightbox(null)}
                    trigger={lightbox.trigger}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function shortYear(year: number): string {
  return String(year).slice(-2);
}

/**
 * Subtle parallax drift for the year numeral while its section passes
 * through the viewport. Measured once (positions are static) and driven
 * by the viewport scroll motion value — transform only.
 */
function useNumeralParallax(
  ref: React.RefObject<HTMLDivElement | null>,
): MotionValue<number> | 0 {
  const { scrollY } = useScroll();
  const [range, setRange] = useState<[number, number] | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY ?? 0;
      const vh = window.innerHeight;
      const absTop = rect.top + scrollY;
      setRange([absTop - vh, absTop + rect.height]);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [ref]);

  // Always call hooks in the same order: when the range isn't measured yet
  // the output is simply 0 (no parallax).
  return useTransform(scrollY, range ?? [0, 1], [0, 0], { clamp: false });
}
