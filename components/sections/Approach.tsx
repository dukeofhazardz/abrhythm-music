"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { approachBelief, approachSteps } from "@/data/approach";
import { loadGsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/**
 * Verbatim fragments of the belief paragraph above — one per stage,
 * in the order their ideas appear in the source sentence.
 */
const STAGE_LINES = [
  "Every learner has potential",
  "Discovered and developed",
  "Consistent practice",
  "Meaningful opportunities to perform",
  "Proper guidance",
  "The right environment",
];

const STAGES = approachSteps.map((word, i) => ({
  word,
  line: STAGE_LINES[i] ?? "",
  index: String(i + 1).padStart(2, "0"),
}));

export function Approach() {
  const reduce = useReducedMotionSafe();
  const [stageIdx, setStageIdx] = useState(0);
  const [armed, setArmed] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);
  const waveLen = useRef(0);

  // Arm the pinned timeline only when the section nears the viewport,
  // so GSAP measurement + ScrollTrigger setup cost nothing up front.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || armed) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    io.observe(viewport);
    return () => io.disconnect();
  }, [armed]);

  useEffect(() => {
    if (!armed) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    loadGsap()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;
        const mm = gsap.matchMedia();

        mm.add(
          {
            desktop: "(min-width: 1024px)",
            motionOK: "(prefers-reduced-motion: no-preference)",
          },
          (context) => {
            const cond = (context.conditions ?? {}) as Record<string, boolean>;
            const viewport = viewportRef.current;
            const track = trackRef.current;
            if (!cond.desktop || !cond.motionOK || !viewport || !track) return undefined;

            try {
              const len = waveRef.current?.getTotalLength() ?? 0;
              if (len > 0) {
                waveLen.current = len;
                waveRef.current?.style.setProperty("stroke-dasharray", `${len}`);
                waveRef.current?.style.setProperty("stroke-dashoffset", `${len}`);
              }
            } catch {
              waveLen.current = 0;
            }

            const tween = gsap.to(track, {
              x: () => -(track.scrollWidth - viewport.clientWidth),
              ease: "none",
              scrollTrigger: {
                trigger: viewport,
                // Pin below the fixed header so stage labels never slide underneath it.
                start: "top top+=88",
                end: () => `+=${track.scrollWidth - viewport.clientWidth}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const p = self.progress;
                  progressRef.current?.style.setProperty("transform", `scaleX(${p})`);
                  if (waveLen.current > 0) {
                    waveRef.current?.style.setProperty(
                      "stroke-dashoffset",
                      `${waveLen.current * (1 - p)}`,
                    );
                  }
                  const idx = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
                  setStageIdx((prev) => (prev === idx ? prev : idx));
                },
              },
            });

            return () => {
              tween.scrollTrigger?.kill();
              tween.kill();
            };
          },
        );

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        const timer = setTimeout(refresh, 600);
        cleanup = () => {
          window.removeEventListener("load", refresh);
          clearTimeout(timer);
          mm.revert();
        };
      })
      .catch(() => {
        // GSAP failed to load — the static vertical timeline remains usable.
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [armed]);

  return (
    <section id="approach" aria-label="Training approach" className="theme-ink scroll-mt-20 bg-ink-bg py-24 text-cream md:py-32">
      <Container>
        <Reveal>
          <p className="mono-label text-accent-ink">04 / Training Approach</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="type-display-xl mt-6 max-w-[12ch]">
            <SplitText text="Training Approach" stagger={0.05} />
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-8 max-w-[65ch] text-[1.05rem] leading-relaxed text-cream-soft">
            {approachBelief}
          </p>
        </Reveal>
      </Container>

      {/* Desktop: pinned horizontal timeline */}
      <div
        ref={viewportRef}
        className={cn("relative mt-14 hidden overflow-hidden lg:block", reduce && "overflow-x-auto")}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
          <div ref={trackRef} className="flex w-max items-stretch gap-10 will-change-transform">
            {STAGES.map((stage) => (
              <article
                key={stage.word}
                className="w-[44vw] max-w-[560px] min-w-[320px] shrink-0 border-t border-cream/20 pt-8 pb-32"
              >
                <p className="mono-label text-accent-ink">
                  Stage {stage.index} / 06
                </p>
                <h3 className="type-display-lg mt-4">{stage.word}</h3>
                <p className="mt-4 max-w-[32ch] text-[1.05rem] leading-relaxed text-cream-soft">
                  {stage.line}
                </p>
                <p
                  aria-hidden="true"
                  className="numeral-outline mt-8 font-display text-[6rem] leading-none text-cream/40 select-none"
                >
                  {stage.index}
                </p>
              </article>
            ))}
            <div aria-hidden="true" className="w-[8vw] shrink-0" />
          </div>
        </div>

        {/* Ascending waveform linking the stages */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-24 hidden lg:block">
          <svg
            className="h-20 w-full text-accent-ink/70"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              ref={waveRef}
              d="M0,100 C80,100 90,60 150,60 C210,60 220,90 280,88 C340,86 350,40 420,38 C490,36 500,70 570,66 C640,62 650,24 730,22 C810,20 820,55 900,52 C980,49 990,30 1050,28 C1110,26 1130,20 1200,14"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Progress rail */}
        <div className="absolute inset-x-0 bottom-10">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
            <div className="relative h-px bg-cream/20">
              <div
                ref={progressRef}
                aria-hidden="true"
                className="absolute inset-0 origin-left bg-accent-ink"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between" aria-hidden="true">
              {STAGES.map((stage, i) => (
                <span
                  key={stage.word}
                  className={cn(
                    "h-2 w-2 rounded-full transition-[transform,background-color] duration-200 ease-out",
                    i <= stageIdx ? "scale-125 bg-accent-ink" : "bg-cream/30",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <Container className="mt-14 lg:hidden">
        <ol className="ml-2 space-y-12 border-l border-cream/20">
          {STAGES.map((stage, i) => (
            <li key={stage.word} className="relative pl-8">
              <Reveal delay={Math.min(i * 0.05, 0.2)}>
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-accent-ink"
                />
                <p className="mono-label text-accent-ink">
                  Stage {stage.index} / 06
                </p>
                <h3 className="mt-2 font-display text-4xl leading-none">{stage.word}</h3>
                <p className="mt-3 max-w-[38ch] leading-relaxed text-cream-soft">
                  {stage.line}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
