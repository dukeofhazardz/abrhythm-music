"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { coreCommitment, motto } from "@/data/approach";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

function FillWord({
  word,
  progress,
  range,
  reduce,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  // Fill from dim (cream-soft, 10.1:1) to full cream (16.7:1): the
  // scroll-linked brightening never drops below AA at any point.
  const color = useTransform(progress, range, ["#A8E817", "#FFFFFF"]);
  if (reduce) {
    return <span className="inline-block">{word}&nbsp;</span>;
  }
  return (
    <motion.span style={{ color }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

export function Commitment() {
  const targetRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = motto.split(" ");

  return (
    <section aria-label="Our commitment" className="theme-ink cv-auto bg-ink-bg py-28 text-cream md:py-40">
      <Container>
        <Reveal>
          <p className="mx-auto max-w-[60ch] text-center text-lg leading-relaxed text-cream-soft md:text-xl">
            {coreCommitment}
          </p>
        </Reveal>

        <div ref={targetRef} className="mt-14 md:mt-20">
          <p
            aria-label={motto}
            className="type-display-xxl mx-auto max-w-[16ch] text-center"
          >
            {words.map((word, i) => (
              <FillWord
                key={`${word}-${i}`}
                word={word}
                progress={scrollYProgress}
                range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
                reduce={reduce}
              />
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
}
