import { Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { BeatGridBackdrop } from "@/components/sections/BeatGridBackdrop";
import { about, approachBelief, mission, vision } from "@/data/approach";

export function About() {
  return (
    <section id="about" aria-label="About Abrhythm Music" className="relative scroll-mt-20 overflow-hidden bg-paper py-24 md:py-32">
      <BeatGridBackdrop className="absolute inset-x-0 top-0 h-36 text-ink opacity-15 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <Container className="relative">
        <Reveal>
          <p className="mono-label text-accent-deep">01 / About Abrhythm Music</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="type-display-xl mt-6 max-w-[14ch] text-accent-deep">
            <SplitText text="About Abrhythm Music" stagger={0.05} />
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="max-w-[65ch] space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
              {about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18} className="lg:col-span-5">
            <figure className="relative border-t-2 border-accent bg-paper-2 p-7 md:p-8">
              <Quote
                size={28}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-accent"
              />
              <blockquote className="mt-4 font-display text-[1.65rem] leading-[1.25]">
                {approachBelief}
              </blockquote>
              <figcaption className="mono-label mt-5 text-ink-soft">
                Our training approach
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <Reveal delay={0.05}>
            <article className="theme-ink flex h-full flex-col bg-ink-bg p-7 text-cream md:p-9">
              <p className="mono-label text-accent-ink">Our Vision</p>
              <p className="mt-5 font-display text-[1.5rem] leading-[1.35]">{vision}</p>
            </article>
          </Reveal>
          <Reveal delay={0.12}>
            <article className="flex h-full flex-col border border-ink/15 bg-paper p-7 md:p-9">
              <p className="mono-label text-accent-deep">Our Mission</p>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">
                {mission}
              </p>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
