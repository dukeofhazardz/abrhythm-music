"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Circle, Music, Music2, Star } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

interface Shape {
  Icon: typeof Music;
  position: string;
  size: number;
  opacity: string;
  duration: string;
  delay: string;
}

const SHAPES: Shape[] = [
  { Icon: Music, position: "top-[8%] left-[4%]", size: 44, opacity: "text-cream/25", duration: "7s", delay: "0s" },
  { Icon: Star, position: "top-[14%] right-[6%]", size: 36, opacity: "text-cream/40", duration: "8.5s", delay: "1.2s" },
  { Icon: Music2, position: "bottom-[28%] left-[8%]", size: 30, opacity: "text-cream/35", duration: "6s", delay: "0.6s" },
  { Icon: Circle, position: "bottom-[18%] right-[10%]", size: 52, opacity: "text-cream/20", duration: "9s", delay: "2s" },
  { Icon: Star, position: "top-[46%] left-[45%]", size: 22, opacity: "text-cream/25", duration: "7.5s", delay: "1.8s" },
];

/**
 * Floating musical shapes: scroll-linked parallax drift (outer) +
 * gentle CSS float loop (inner). Static under reduced motion.
 */
export function FloatShapes() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ySlow = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const yFast = useTransform(scrollYProgress, [0, 1], [48, -48]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {SHAPES.map(({ Icon, position, size, opacity, duration, delay }, i) => {
        if (reduce) {
          return (
            <div key={position} className={cn("absolute", position)}>
              <Icon size={size} strokeWidth={1.5} className={opacity} />
            </div>
          );
        }
        return (
          <motion.div
            key={position}
            style={{ y: i % 2 === 0 ? ySlow : yFast }}
            className={cn("absolute", position)}
          >
            <span
              className="animate-float block"
              style={{ animationDuration: duration, animationDelay: delay }}
            >
              <Icon size={size} strokeWidth={1.5} className={opacity} />
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
