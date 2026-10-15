"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { audiences } from "@/data/audiences";
import { cn } from "@/lib/cn";

export function Audiences() {
  const [active, setActive] = useState(0);

  return (
    <section aria-label="Who we serve" className="cv-auto scroll-mt-20 border-t border-ink/10 bg-paper py-24 text-ink md:py-32">
      <Container>
        <Reveal>
          <p className="mono-label text-accent-deep">06 / Who We Serve</p>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <Reveal delay={0.08}>
            <h2 className="type-display-xl max-w-[12ch] text-accent-deep">
              <SplitText text="Who We Serve" stagger={0.05} />
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mono-label text-ink-soft">(06 groups)</p>
          </Reveal>
        </div>

        <Stagger className="mt-12" gap={0.05}>
          <ul className="border-t border-ink/15">
            {audiences.map((audience, i) => {
              const isActive = i === active;
              return (
                <li key={audience} className="border-b border-ink/15">
                <StaggerItem y={16}>
                  <button
                    type="button"
                    aria-current={isActive || undefined}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group relative flex min-h-[76px] w-full items-center gap-5 overflow-hidden px-2 py-5 text-left md:min-h-[88px] md:gap-8"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 origin-left bg-accent-soft transition-transform duration-300 ease-out",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mono-label relative w-8 shrink-0 transition-colors duration-200 ease-out",
                        isActive ? "text-accent-deep" : "text-ink-soft",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "relative flex-1 font-display leading-none transition-[transform,color] duration-200 ease-out",
                        "text-3xl md:text-5xl",
                        isActive ? "translate-x-2 text-ink" : "text-ink/70 group-hover:translate-x-2",
                      )}
                    >
                      {audience}
                    </span>
                    <ArrowUpRight
                      size={22}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className={cn(
                        "relative shrink-0 transition-[transform,opacity] duration-200 ease-out",
                        isActive
                          ? "translate-x-0 text-accent-deep opacity-100"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                      )}
                    />
                  </button>
                </StaggerItem>
                </li>
              );
            })}
          </ul>
        </Stagger>
      </Container>
    </section>
  );
}
