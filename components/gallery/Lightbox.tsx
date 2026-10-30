"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { type GalleryYearEntry } from "@/data/gallery";
import { driveDirectUrl, driveThumbnailUrl } from "@/lib/drive";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

interface LightboxProps {
  year: GalleryYearEntry;
  index: number;
  onClose: () => void;
  trigger: HTMLElement | null;
}

export function Lightbox({
  year,
  index: initialIndex,
  onClose,
  trigger,
}: LightboxProps) {
  const images = year.images;
  const [index, setIndex] = useState(initialIndex);
  const mountedRef = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const reduce = useReducedMotionSafe();
  const image = images[index];
  const src = driveThumbnailUrl(image.id, 1600);

  // Preload neighbours at full size so the next/previous image is ready.
  useEffect(() => {
    [index - 1, index, index + 1]
      .filter((i) => i >= 0 && i < images.length)
      .forEach((i) => {
        const img = new Image();
        img.src = driveThumbnailUrl(images[i].id, 1600);
        img.onerror = () => {
          img.src = driveDirectUrl(images[i].id, 1600);
        };
      });
  }, [index, images]);

  const focusOrder = useCallback(() => {
    return [prevRef.current, closeRef.current, nextRef.current].filter(
      Boolean,
    ) as HTMLElement[];
  }, []);

  const nextImage = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const onKey = useCallback((e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      }
      if (e.key === "Tab") {
        e.preventDefault();
        const order = focusOrder();
        const current = order.indexOf(document.activeElement as HTMLElement);
        const next =
          current === -1 || current >= order.length - 1 ? 0 : current + 1;
        order[next]?.focus();
      }
    },
    [onClose, nextImage, prevImage, focusOrder],
  );

  const onDragEnd = useCallback(
    (_e: PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
      const { offset, velocity } = info;
      if (offset.x < -50 || velocity.x < -0.3) nextImage();
      else if (offset.x > 50 || velocity.x > 0.3) prevImage();
    },
    [nextImage, prevImage],
  );

  // Open: focus the close button and lock background scroll (Lenis + native).
  // Close (unmount): release the lock and return focus to the trigger.
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    closeRef.current?.focus();
    lockScroll();
    return () => {
      mountedRef.current = false;
      unlockScroll();
      trigger?.focus();
    };
  }, [trigger]);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        // Native handler type for window.addEventListener; safe to cast for
        // React's JSX handler signature at runtime.
        onKeyDown={onKey as unknown as (e: React.KeyboardEvent<HTMLDivElement>) => void}
        className="theme-ink fixed inset-0 z-[100] bg-ink-bg/[92] backdrop-blur-2xl text-cream"
        tabIndex={-1}
      >
        {/* Backdrop click closes. */}
        <button
          type="button"
          aria-label="Close gallery"
          onClick={onClose}
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 flex h-[100svh] h-[100dvh] w-full items-center justify-center p-6 md:p-12">
          <button
            type="button"
            ref={prevRef}
            onClick={prevImage}
            aria-label="Previous image"
            className="pressable absolute left-0 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-none bg-ink-bg/50 px-4 py-12 text-cream-soft hover:bg-ink-bg/80 hover:text-cream transition-colors duration-200 ease-out"
          >
            <ArrowLeft size={24} strokeWidth={2} aria-hidden="true" />
          </button>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={onDragEnd}
            className="flex items-center justify-center w-full"
          >
            <motion.img
              layoutId={`gallery-${year.year}-${image.id}`}
              layout={reduce ? undefined : ("position" as const)}
              src={src}
              alt={image.alt ?? `Abrhythm Music gallery photo, ${year.year}`}
              className="max-w-[92vw] max-h-[80vh] object-contain rounded-md"
              decoding="async"
            />
          </motion.div>
          <button
            type="button"
            ref={nextRef}
            onClick={nextImage}
            aria-label="Next image"
            className="pressable absolute right-0 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-none bg-ink-bg/50 px-4 py-12 text-cream-soft hover:bg-ink-bg/80 hover:text-cream transition-colors duration-200 ease-out"
          >
            <ArrowRight size={24} strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            ref={closeRef}
            onClick={onClose}
            aria-label="Close gallery"
            className="pressable absolute right-6 top-6 z-20 min-w-[44px] min-h-[44px] rounded-none bg-ink-bg/80 px-2 py-2 text-cream hover:bg-accent transition-colors duration-200 ease-out"
          >
            <X size={22} strokeWidth={2} aria-hidden="true" />
          </button>
          <div className="absolute left-6 bottom-6 z-20 text-cream-soft">
            <p className="mono-label text-accent">{index + 1} / {images.length}</p>
            <p className="mono-label mt-1 text-accent-deep">{year.year}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
