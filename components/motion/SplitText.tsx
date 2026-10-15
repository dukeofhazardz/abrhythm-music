"use client";

import { motion, type Variants } from "motion/react";
import { Fragment, useMemo } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Base delay before the cascade starts. */
  delay?: number;
  /** Per-word stagger (keep 0.03–0.08). */
  stagger?: number;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Word-level headline reveal. A single in-view trigger on the headline
 * drives a masked word cascade via variants — decorative only, full
 * text stays available to screen readers via aria-label.
 */
export function SplitText({ text, className, delay = 0, stagger = 0.06 }: SplitTextProps) {
  const reduce = useReducedMotionSafe();
  const words = useMemo(() => text.split(" "), [text]);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: "110%" },
    show: { opacity: 1, y: "0%", transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden pb-1 align-bottom"
          >
            <motion.span className="inline-block will-change-transform" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
