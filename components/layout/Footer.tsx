import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BackToTop } from "@/components/layout/BackToTop";
import { contact } from "@/data/contact";
import { site } from "@/lib/site";
import { WHATSAPP_ALT, WHATSAPP_PRIMARY } from "@/lib/whatsapp";

const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
] as const;

/* TODO(social): replace "#" hrefs above with the real
   Facebook / Instagram / TikTok profile URLs for Abrhythm Music. */

const TEL = [
  { display: contact.phones[0], href: "tel:+2349098995532" },
  { display: contact.phones[1], href: "tel:+2349055373659" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="theme-ink relative overflow-hidden bg-ink-bg text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-[24vmin] -left-[12vmin] h-[60vmin] w-[60vmin]">
          <div className="absolute inset-0 rounded-full border border-cream/10" />
          <div className="absolute inset-[18%] rounded-full border border-cream/10" />
          <div className="absolute inset-[36%] rounded-full border border-accent-ink/40" />
        </div>
      </div>

      <Container className="relative py-16 md:py-24">
        <h2 className="type-display-xl max-w-[12ch]">Rhythm is in you.</h2>
        <p className="mono-label mt-5 text-cream-soft">{contact.strapline}</p>

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-cream/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="mono-label flex items-center gap-2 text-accent-ink">
              <MapPin size={14} strokeWidth={2} aria-hidden="true" />
              Visit
            </p>
            <address className="mt-4 text-[0.95rem] leading-relaxed text-cream-soft not-italic">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div>
            <p className="mono-label flex items-center gap-2 text-accent-ink">
              <Phone size={14} strokeWidth={2} aria-hidden="true" />
              Talk
            </p>
            <ul className="mt-4 space-y-2.5">
              {TEL.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="pressable link-underline inline-flex min-h-[44px] items-center font-mono text-[0.95rem] text-cream tabular-nums hover:text-accent-ink"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href={WHATSAPP_PRIMARY}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable link-underline inline-flex min-h-[44px] items-center gap-2 text-sm text-cream-soft hover:text-cream"
              >
                <MessageCircle size={15} strokeWidth={2} aria-hidden="true" />
                Chat on 0909 899 5532
              </a>
              <a
                href={WHATSAPP_ALT}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable link-underline inline-flex min-h-[44px] items-center gap-2 text-sm text-cream-soft hover:text-cream"
              >
                <MessageCircle size={15} strokeWidth={2} aria-hidden="true" />
                Chat on 0905 537 3659
              </a>
            </div>
          </div>

          <div>
            <p className="mono-label text-accent-ink">Follow</p>
            <ul className="mt-4 space-y-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="pressable group inline-flex min-h-[44px] items-center gap-2"
                    aria-label={`${social.label} Abrhythm Music (link coming soon)`}
                  >
                    <span className="mono-label w-24 text-cream-soft transition-colors duration-200 ease-out group-hover:text-cream">
                      {social.label}
                    </span>{" "}
                    <span className="link-underline text-[0.95rem] text-cream">Abrhythm Music</span>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="text-accent-ink"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label text-cream-soft">
            © {year} {site.name} — {site.tagline}
          </p>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
