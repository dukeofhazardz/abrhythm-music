import {
  BookOpen,
  Drum,
  Ear,
  Guitar,
  Headphones,
  Mic,
  Music,
  Piano,
  Puzzle,
  Star,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { FloatShapes } from "@/components/sections/FloatShapes";
import { trainingServices } from "@/data/services";
import { waLink } from "@/lib/whatsapp";

const TILE_ICONS = [
  Ear,
  Drum,
  Mic,
  Music,
  Piano,
  Headphones,
  BookOpen,
  Puzzle,
  Users,
  Star,
] as const;

/* Second icon kept for the strings half of the mixed-instruments tile. */
const TILE_SECONDARY_ICONS: Record<number, typeof Guitar | null> = {
  4: Guitar,
};

const ENROL_MESSAGE = "Hello Abrhythm Music, I'd like to enrol my child for Kids Music Training.";

export function Kids() {
  const matches = trainingServices.filter(
    (service) => service.slug === "kids-music-early-development",
  );
  const service = matches.length > 0 ? matches[0] : undefined;
  if (!service) return null;
  const items = service.bullets ?? [];

  return (
    <section id="kids" aria-label="Kids music training" className="theme-ink relative scroll-mt-20 overflow-hidden bg-accent-deep py-24 text-cream md:py-32">
      <FloatShapes />

      <Container className="relative">
        <Reveal>
          <p className="mono-label">03 / Kids Music Training</p>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <Reveal delay={0.08}>
            <h2 className="type-display-xl max-w-[14ch]">
              <SplitText text="Kids Music Training" stagger={0.05} />
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mono-label">(10 activities)</p>
          </Reveal>
        </div>

        <div className="mt-10 max-w-[65ch] space-y-5 text-[1.05rem] leading-relaxed">
          {service.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-5">
          {items.map((item, i) => {
            const Icon = TILE_ICONS[i % TILE_ICONS.length];
            const SecondIcon = TILE_SECONDARY_ICONS[i] ?? null;
            return (
              <StaggerItem key={item}>
                <div className="group flex h-full min-h-[132px] flex-col justify-between gap-4 bg-ink p-5 text-cream transition-transform duration-200 ease-out hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <span className="flex items-center gap-2">
                      <Icon
                        size={26}
                        strokeWidth={1.75}
                        aria-hidden="true"
                        className="text-accent-ink transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"
                      />
                      {SecondIcon ? (
                        <SecondIcon
                          size={22}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="text-cream/50 transition-transform duration-300 ease-out group-hover:rotate-6 group-hover:scale-110"
                        />
                      ) : null}
                    </span>
                    <span className="mono-label text-cream/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-[0.95rem] leading-snug font-medium">{item}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-[65ch] font-display text-[1.5rem] leading-[1.35]">
            {service.outro}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <Magnetic className="mt-8">
            <a
              href={waLink("0909 899 5532", ENROL_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enrol your child for Kids Music Training on WhatsApp"
              className="pressable inline-flex min-h-[52px] items-center gap-2 bg-ink px-8 py-3.5 font-medium whitespace-nowrap text-cream"
            >
              Enrol your child
            </a>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  );
}
