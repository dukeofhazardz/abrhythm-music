"use client";

import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { driveDirectUrl, driveThumbnailUrl } from "@/lib/drive";
import { type GalleryImage } from "@/data/gallery";

const FALLBACK_RATIO = 4 / 3;

interface GalleryItemProps {
  image: GalleryImage;
  year: number;
  /** Position in the year's image list, for the shared lightbox id. */
  index: number;
  width?: number; // Drive API imageMediaMetadata width (MODE A)
  height?: number; // Drive API imageMediaMetadata height (MODE A)
  /** First row loads eager; everything else lazy. */
  priority?: boolean;
  /** Disables the shared-element layout animation under reduced motion. */
  reduce?: boolean;
  onView: (index: number, button: HTMLElement) => void;
}

export function GalleryItem({
  image,
  year,
  index,
  width,
  height,
  priority = false,
  reduce = false,
  onView,
}: GalleryItemProps) {
  const ratio = (width && height ? width / height : FALLBACK_RATIO) as number;
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);
  const alt = image.alt ?? `Abrhythm Music gallery photo, ${year}`;
  const src = driveThumbnailUrl(image.id, 600);
  const fallback = driveDirectUrl(image.id, 600);

  const onError = useCallback(() => {
    if (broken) return;
    setBroken(true);
  }, [broken]);

  const handleView = useCallback(
    (e: React.MouseEvent) => {
      onView(index, e.currentTarget as HTMLElement);
    },
    [index, onView],
  );

  return (
    <figure
      role="button"
      tabIndex={0}
      aria-label={alt}
      onClick={handleView}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleView(e as unknown as React.MouseEvent);
        }
      }}
      className="relative overflow-hidden rounded-lg bg-paper-2 pressable"
      style={{ aspectRatio: ratio }}
      data-cursor="View"
    >
      {/* Blur-up skeleton shimmer while the thumbnail loads. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          !loaded && "bg-paper-2 animate-shimmer",
          loaded ? "bg-transparent" : "",
        )}
      />

      <motion.img
        ref={imgRef}
        layoutId={`gallery-${year}-${index}`}
        layout={reduce ? undefined : ("position" as const)}
        src={broken ? fallback : src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        onError={onError}
        className={cn(
          "block w-full h-full object-cover",
          loaded ? "opacity-100" : "opacity-0",
          "transition-opacity duration-500 ease-out",
          // Gentle scale on hover.
          "group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform",
        )}
      />

      {/* Green-tinted overlay at rest, removed on hover → true colour. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-accent/20 mix-blend-multiply",
          "transition-opacity duration-500 ease-out group-hover:opacity-0",
        )}
      />

      {!loaded && !broken ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="mono-label text-ink-soft opacity-40">loading</span>
        </div>
      ) : null}

      {/* Designed fallback when the Drive thumbnail cannot be loaded. */}
      {broken && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-ink-soft opacity-60">
          <span className="mono-label mb-1">Image unavailable</span>
          <span className="mono-label text-[10px]">{image.id}</span>
        </div>
      )}
    </figure>
  );
}
