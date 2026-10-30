"use client";

import { Container } from "@/components/layout/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_PRIMARY } from "@/lib/whatsapp";

export function GalleryCta() {
  return (
    <section className="bg-paper py-16 md:py-20 border-t border-ink/15">
      <Container>
        <Reveal>
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="mono-label text-accent-deep">Next chapter</p>
              <h2 className="type-display-lg mt-2 mb-6 text-accent-deep">
                Be part of the next story
              </h2>
              <p className="max-w-[55ch] text-ink-soft leading-relaxed">
                Join drums, piano, winds, guitar, voice, marching band,
                songwriting or oratory training — for children, schools,
                churches and artistes.
              </p>
            </div>
            <div className="mt-12 lg:mt-0">
              <Magnetic>
                <a
                  href={WHATSAPP_PRIMARY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable inline-flex min-h-[48px] items-center justify-center gap-2 bg-accent-ink-deep px-7 py-3 font-medium whitespace-nowrap text-ink-bg"
                >
                  <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
                  Enrol on WhatsApp
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
