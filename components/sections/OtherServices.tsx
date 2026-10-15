import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { otherServices } from "@/data/otherServices";
import { waEnquire } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export function OtherServices() {
  return (
    <section aria-label="Other services" className="theme-ink cv-auto scroll-mt-20 bg-ink-bg py-24 text-cream md:py-32">
      <Container>
        <Reveal>
          <p className="mono-label text-accent-ink">05 / Other Services</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="type-display-xl mt-6 max-w-[12ch]">
            <SplitText text="Other Services" stagger={0.05} />
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {otherServices.map((service, i) => {
            const filled = i === 0;
            return (
              <Reveal key={service.slug} delay={0.08 + i * 0.06}>
                <article
                  className={cn(
                    "flex h-full flex-col p-8 md:p-10",
                    filled ? "bg-accent-ink text-ink-bg" : "border border-cream/20 text-cream",
                  )}
                >
                  <p className={cn("mono-label", filled ? "text-ink-bg/70" : "text-accent-ink")}>
                    0{i + 1}
                  </p>
                  <h3 className="type-display-lg mt-5">{service.title}</h3>
                  <div className="mt-5 space-y-4 leading-relaxed">
                    {service.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className={filled ? "text-ink-bg/85" : "text-cream-soft"}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <Magnetic className="mt-8">
                    <a
                      href={waEnquire(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire about ${service.title} on WhatsApp`}
                      className={cn(
                        "pressable inline-flex min-h-[48px] items-center gap-2 font-medium whitespace-nowrap",
                        filled
                          ? "border-b-2 border-ink-bg/60 pb-1 hover:border-ink-bg"
                          : "border-b-2 border-accent-ink/60 pb-1 hover:border-accent-ink",
                      )}
                    >
                      Enquire
                      <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                    </a>
                  </Magnetic>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
