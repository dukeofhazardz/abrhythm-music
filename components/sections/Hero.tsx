import { ArrowDown, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { PulseLine } from "@/components/sections/PulseLine";
import { WHATSAPP_PRIMARY } from "@/lib/whatsapp";
import { site } from "@/lib/site";

const STRIP = [
  "Drums",
  "Piano",
  "Saxophone",
  "Flute",
  "Guitar",
  "Voice",
  "Marching Band",
  "Songwriting",
  "Oratory",
] as const;

export function Hero() {
  return (
    <section id="top" aria-label="Abrhythm Music introduction" className="theme-ink relative overflow-hidden bg-ink-bg text-cream">
      {/* Vinyl / drum-skin rings, bled off-crop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[12vmin] -right-[12vmin] h-[74vmin] w-[74vmin]">
          <div className="absolute inset-0 rounded-full border border-cream/15" />
          <div className="absolute inset-[13%] rounded-full border border-cream/15" />
          <div className="absolute inset-[27%] rounded-full border border-accent-ink/50" />
          <div className="absolute inset-[41%] rounded-full bg-accent-ink/15" />
        </div>
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-10 pt-28 pb-14 md:pt-36 lg:grid-cols-12 lg:pb-20">
        <div className="lg:col-span-6">
          <p className="mono-label text-accent-ink">
            {site.name} — Aba, Nigeria
          </p>
          <h1 className="type-display-xxl mt-6">
            <SplitText text="Rhythm is in you." stagger={0.07} />
          </h1>
          <Reveal delay={0.35} y={16}>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-cream-soft">
              Empowering the next generation of young talents.
            </p>
          </Reveal>
          <Reveal delay={0.45} y={16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <a
                  href="#training"
                  className="pressable inline-flex min-h-[48px] items-center justify-center gap-2 bg-cream px-7 py-3 font-medium whitespace-nowrap text-ink-bg"
                >
                  Explore Training
                  <ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={WHATSAPP_PRIMARY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable inline-flex min-h-[48px] items-center justify-center gap-2 border border-cream/30 px-7 py-3 font-medium whitespace-nowrap text-cream transition-colors duration-200 ease-out hover:border-cream/70"
                >
                  <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={24} className="lg:col-span-6">
          <div className="relative">
            <Image
              src="/images/hero.png"
              alt="Abrhythm Music — students in training"
              width={800}
              height={600}
              priority
              className="block w-full h-full object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
            <p className="mono-label mt-3 text-cream-soft">
              01 / Percussion — Drums
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-12">
          <PulseLine />
        </div>
      </Container>

      <div className="relative border-t border-cream/15">
        <Marquee className="py-4" innerClassName="gap-10">
          {STRIP.map((item) => (
            <span key={item} className="flex items-center gap-10">
              <span className="mono-label whitespace-nowrap text-cream-soft">
                {item}
              </span>
              <span aria-hidden="true" className="text-[11px] text-accent-ink">
                •
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
