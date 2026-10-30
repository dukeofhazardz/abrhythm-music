"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { BeatGridBackdrop } from "@/components/sections/BeatGridBackdrop";

export function GalleryHero() {
  return (
    <section
      id="gallery-hero"
      aria-label="Gallery"
      className="relative overflow-hidden bg-paper py-20 md:py-28"
    >
      {/* Beat-grid / waveform motif behind the intro, cropped by the viewport edge. */}
      <BeatGridBackdrop
        className="absolute inset-x-0 top-0 h-40 text-ink opacity-15 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <Container>
        <Reveal>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="pressable mono-label text-ink-soft link-underline"
              aria-label="Back to home"
            >
              Home
            </Link>
            <span aria-hidden="true" className="text-ink-soft">
              /
            </span>
            <span className="mono-label font-medium text-accent-deep">
              Gallery
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="type-display-xl mt-6 max-w-[32ch] text-accent-deep">
            <SplitText text="Gallery" stagger={0.06} />
          </h2>
        </Reveal>

        <Reveal delay={0.16} y={16}>
          <p className="mt-6 max-w-[44ch] text-[1.1rem] leading-relaxed text-ink-soft">
            Moments from Abrhythm Music
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
