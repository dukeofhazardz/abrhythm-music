"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { scrollToHash } from "@/lib/scroll";
import { WHATSAPP_PRIMARY } from "@/lib/whatsapp";
import { NAV_LINKS, isNavLinkActive, resolveNavHref } from "@/data/nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();

  /** Gallery is a paper/white page, so the header must stay opaque at all times. */
  const isGallery = pathname === "/gallery";

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled((prev) => {
      const next = v > 24;
      return prev === next ? prev : next;
    });
  });

  /**
   * Navigate to a home-page section from any route. On "/" the native hash
   * anchor is handled by SmoothScroll (Lenis offset). From another route we
   * navigate home and scroll once the new page is mounted, keeping the
   * Lenis header offset.
   */
  function handleSectionLink(e: React.MouseEvent, hash: string) {
    if (pathname === "/") return; // native anchor; SmoothScroll handles it
    e.preventDefault();
    setOpen(false);
    router.push("/");
    // Next's push() is fire-and-forget; poll until the home page is mounted
    // and the target section exists, then scroll with the Lenis offset.
    let attempts = 0;
    const tryScroll = () => {
      if (scrollToHash(hash) || attempts++ > 30) return;
      requestAnimationFrame(tryScroll);
    };
    requestAnimationFrame(tryScroll);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const menuNode = menuRef.current;
    const toggleNode = toggleRef.current;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      document.body.style.overflow = prev;
      // If focus was inside the closing menu, return it to the toggle.
      if (menuNode?.contains(document.activeElement)) {
        toggleNode?.focus();
      }
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 ease-out",
          scrolled || open || isGallery
            ? "border-b border-cream/10 bg-ink-bg backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 md:h-[72px]">
          <a
            href="#top"
            className="pressable flex min-h-[44px] items-center"
            aria-label="Abrhythm Music — back to top"
          >
            {/* Official mark on a white chip: the dark artwork needs a light ground on green. */}
            <span className="flex items-center rounded-md bg-white px-2.5 py-1.5">
              <Image
                src="/images/logo-bg.png"
                alt="Abrhythm Music"
                width={552}
                height={452}
                priority
                className="h-5 w-auto object-contain"
              />
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isNavLinkActive(link, pathname);
              const href = resolveNavHref(link, pathname);
              const isSection = !link.href;
              const Element = link.href ? Link : "a";
              return (
                <Element
                  key={link.href ?? link.hash}
                  href={href}
                  {...(isSection && pathname !== "/"
                    ? { onClick: (e) => handleSectionLink(e, link.hash) }
                    : {})}
                  className={cn(
                    "pressable group relative inline-flex min-h-[44px] items-center px-2 -mx-2 py-2 transition-colors duration-200 ease-out",
                    active ? "text-cream" : "text-cream-soft",
                    active ? "scale-x-100" : "hover:text-cream",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-2 -bottom-px h-px origin-left bg-accent-ink transition-transform duration-200 ease-out",
                      active ? "scale-x-100" : "scale-x-0",
                      !active ? "group-hover:scale-x-100" : undefined,
                    )}
                  />
                </Element>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic>
              <a
                href={WHATSAPP_PRIMARY}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable hidden min-h-[44px] items-center gap-2 bg-accent-ink-deep px-5 py-2.5 text-sm font-medium whitespace-nowrap text-ink-bg sm:inline-flex"
              >
                <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
                Enrol on WhatsApp
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={WHATSAPP_PRIMARY}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enrol on WhatsApp"
                className="pressable inline-flex min-h-[44px] min-w-[44px] items-center justify-center bg-accent-ink-deep text-ink-bg sm:hidden"
              >
                <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </Magnetic>
            <button
              type="button"
              ref={toggleRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="pressable inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-cream lg:hidden"
            >
              {open ? (
                <X size={22} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="theme-ink fixed inset-0 z-40 flex flex-col bg-ink-bg text-cream"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: reduce ? 0.15 : 0.28, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex-1 overflow-y-auto pt-24 pb-10">
              <Container>
                <nav aria-label="Mobile">
                  <ul className="divide-y divide-cream/10 border-y border-cream/10">
                    {NAV_LINKS.map((link, i) => {
                      const active = isNavLinkActive(link, pathname);
                      const href = resolveNavHref(link, pathname);
                      const isSection = !link.href;
                      const Element = link.href ? Link : "a";
                      return (
                        <motion.li
                          key={link.href ?? link.hash}
                          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          exit={{ opacity: 0, transition: { duration: 0.15 } }}
                          transition={{
                            duration: 0.5,
                            delay: reduce ? 0 : 0.08 + i * 0.06,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <Element
                            href={href}
                            {...(isSection && pathname !== "/"
                              ? { onClick: (e) => handleSectionLink(e, link.hash) }
                              : {})}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "pressable flex min-h-[60px] items-center justify-between py-3",
                              active ? "text-accent" : "text-cream",
                            )}
                          >
                            <span className="font-display text-4xl leading-none">
                              {link.label}
                            </span>
                            <span className="mono-label text-accent-ink">
                              0{i + 1}
                            </span>
                          </Element>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{
                    duration: 0.5,
                    delay: reduce ? 0 : 0.08 + NAV_LINKS.length * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-8"
                >
                  <a
                    href={WHATSAPP_PRIMARY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable flex min-h-[52px] items-center justify-center gap-2 bg-accent-ink-deep px-6 py-3.5 font-medium text-ink-bg"
                  >
                    <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
                    Enrol on WhatsApp
                  </a>
                  <p className="mono-label mt-6 text-center text-cream-soft">
                    Rhythm is in you.
                  </p>
                </motion.div>
              </Container>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
