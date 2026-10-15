"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MessageCircle, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { PlaceholderSlab, type SlabVariant } from "@/components/ui/PlaceholderSlab";
import { trainingServices, type TrainingService } from "@/data/services";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { waEnquire } from "@/lib/whatsapp";

interface ServiceArt {
  variant: SlabVariant;
  /** Distinct accent shade per card. */
  bar: string;
  /** Short caption for the art slot. */
  caption: string;
}

/** Unique placeholder-art pairing per discipline (variant + accent). */
const ART: ServiceArt[] = [
  { variant: "drumskin", bar: "bg-accent", caption: "Drums" },
  { variant: "keys", bar: "bg-ink", caption: "Piano" },
  { variant: "reed", bar: "bg-secondary", caption: "Winds" },
  { variant: "staff", bar: "bg-accent-deep", caption: "Strings" },
  { variant: "vinyl", bar: "bg-accent", caption: "Voice" },
  { variant: "keys", bar: "bg-secondary", caption: "Kids" },
  { variant: "drumskin", bar: "bg-ink", caption: "Live Band" },
  { variant: "staff", bar: "bg-accent", caption: "Marching" },
  { variant: "reed", bar: "bg-accent-deep", caption: "Songwriting" },
  { variant: "vinyl", bar: "bg-secondary", caption: "Oratory" },
];

function ServiceCopy({ service }: { service: TrainingService }) {
  return (
    <div className="space-y-4 text-[1rem] leading-relaxed text-ink-soft">
      {service.body.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
      {service.bullets ? (
        <ul className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
          {service.bullets.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-ink">
              <span
                aria-hidden="true"
                className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-accent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {service.outro ? <p>{service.outro}</p> : null}
    </div>
  );
}

function EnquireButton({ title, className }: { title: string; className?: string }) {
  return (
    <Magnetic className={className}>
      <a
        href={waEnquire(title)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Enquire about ${title} on WhatsApp`}
        className="pressable inline-flex min-h-[48px] items-center gap-2 bg-accent-deep px-6 py-3 font-medium whitespace-nowrap text-paper"
      >
        <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
        Enquire
        <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
      </a>
    </Magnetic>
  );
}

function ServiceArt({
  service,
  art,
  className,
}: {
  service: TrainingService;
  art: ServiceArt;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <PlaceholderSlab
        variant={art.variant}
        slot={`training-${service.slug}`}
        aspect="4/3"
        label={`${service.index} / ${art.caption}`}
      />
      <span
        aria-hidden="true"
        className={cn("absolute -top-3 left-4 h-6 w-16", art.bar)}
      />
      <span
        aria-hidden="true"
        className="numeral-outline pointer-events-none absolute -right-1 -bottom-7 font-display text-[5.5rem] leading-none text-ink opacity-60 select-none"
      >
        {service.index}
      </span>
    </div>
  );
}

export function Training() {
  const reduce = useReducedMotionSafe();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const hoveringRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Scrolling through a row moves it into the band → preview follows.
  // Hover (or tap) always wins while the pointer is over the list.
  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-row-index]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hoveringRef.current) {
            const i = Number((entry.target as HTMLElement).dataset.rowIndex);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    rows.forEach((row) => io.observe(row));
    return () => io.disconnect();
  }, []);

  const activeService = trainingServices[active];
  const activeArt = ART[active];

  return (
    <section id="training" aria-label="Training services" className="scroll-mt-20 border-t border-ink/10 bg-paper py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="mono-label text-accent-deep">02 / Our Training Services</p>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <Reveal delay={0.08}>
            <h2 className="type-display-xl max-w-[12ch] text-accent-deep">
              <SplitText text="Training Services" stagger={0.05} />
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mono-label text-ink-soft">(10 disciplines)</p>
          </Reveal>
        </div>

        {/* Desktop: sticky numbered list + sticky preview panel */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-12 lg:gap-12">
          <div
            ref={listRef}
            onMouseEnter={() => {
              hoveringRef.current = true;
            }}
            onMouseLeave={() => {
              hoveringRef.current = false;
            }}
            className="lg:col-span-7"
          >
            {trainingServices.map((service, i) => {
              const isActive = i === active;
              return (
                <button
                  key={service.slug}
                  type="button"
                  data-row-index={i}
                  data-cursor="View"
                  aria-current={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex min-h-[88px] w-full items-center gap-6 border-t border-ink/12 px-2 py-5 text-left transition-transform duration-200 ease-out",
                    "hover:translate-x-2 focus-visible:translate-x-2",
                    i === trainingServices.length - 1 && "border-b",
                    isActive && "translate-x-2",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-display text-5xl leading-none transition-colors duration-200 ease-out",
                      isActive ? "text-accent-deep" : "numeral-outline text-ink/35",
                    )}
                  >
                    {service.index}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block text-lg font-medium transition-colors duration-200 ease-out",
                        isActive ? "text-ink" : "text-ink-soft group-hover:text-ink",
                      )}
                    >
                      {service.title}
                    </span>
                    <span className="mono-label mt-1 block text-ink-soft/80">
                      {ART[i].caption}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className={cn(
                      "shrink-0 transition-[transform,opacity,color] duration-200 ease-out",
                      isActive
                        ? "translate-x-0 text-accent-deep opacity-100"
                        : "-translate-x-1 text-ink/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeService.slug}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                  }
                  aria-live="polite"
                  className="border border-ink/12 bg-paper-2/60 p-7"
                >
                  <p className="mono-label text-accent-deep">
                    {activeService.index} / {ART[active].caption}
                  </p>
                  <h3 className="type-display-lg mt-3 text-accent-deep">{activeService.title}</h3>
                  <ServiceArt
                    service={activeService}
                    art={activeArt}
                    className="mt-6 mb-9"
                  />
                  <ServiceCopy service={activeService} />
                  <EnquireButton title={activeService.title} className="mt-7" />
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: stacked accordion cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 lg:hidden">
          {trainingServices.map((service, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={service.slug} delay={Math.min(i * 0.04, 0.2)}>
                <div
                  className={cn(
                    "border bg-paper-2/50 transition-colors duration-200 ease-out",
                    isOpen ? "border-accent/50" : "border-ink/12",
                  )}
                >
                  <button
                    type="button"
                    data-cursor="Enquire"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${service.slug}`}
                    className="flex min-h-[68px] w-full items-center gap-4 p-5 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-display text-4xl leading-none",
                        isOpen ? "text-accent-deep" : "numeral-outline text-ink/40",
                      )}
                    >
                      {service.index}
                    </span>
                    <span className="flex-1 text-[1.05rem] font-medium text-ink">
                      {service.title}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.25, ease: [0.32, 0.72, 0, 1] }
                      }
                      className="grid h-11 w-11 shrink-0 place-items-center border border-ink/15 text-ink"
                    >
                      <Plus size={18} strokeWidth={2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`service-panel-${service.slug}`}
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { duration: 0.32, ease: [0.32, 0.72, 0, 1] }
                        }
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6">
                          <ServiceArt
                            service={service}
                            art={ART[i]}
                            className="mt-1 mb-9"
                          />
                          <ServiceCopy service={service} />
                          <EnquireButton title={service.title} className="mt-6" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
