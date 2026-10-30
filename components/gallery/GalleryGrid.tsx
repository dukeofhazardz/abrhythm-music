"use client";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GalleryItem } from "@/components/gallery/GalleryItem";
import { type GalleryImage } from "@/data/gallery";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/** How many images are revealed at first; everything else is lazy + paginated. */
const BATCH = 12;
/** First-row images load eager; the rest lazy. */
const EAGER_COUNT = 4;

export type Layout = "masonry" | "collage" | "film" | "bento";

export const LAYOUT_BY_YEAR: Record<number, Layout> = {
  2022: "masonry",
  2023: "collage",
  2025: "film",
  2026: "bento",
};

interface GalleryGridProps {
  year: number;
  images: { image: GalleryImage; width?: number; height?: number }[];
  layout: Layout;
  batch: number;
  setBatch: (batch: number) => void;
  onView: (index: number, button: HTMLElement) => void;
}

export function GalleryGrid({
  year,
  images,
  layout,
  batch,
  setBatch,
  onView,
}: GalleryGridProps) {
  const reduce = useReducedMotionSafe();
  const visible = images.slice(0, batch);
  const hasMore = batch < images.length;

  return (
    <div className="gallery-grid mb-16" data-layout={layout}>
      <Stagger gap={0.07} className={layoutClasses[layout]}>
        {visible.map((entry, i) => (
          <StaggerItem
            key={`photo-${year}-${entry.image.id}`}
            y={layout === "film" ? 0 : 18}
            className={spanFor(i, layout)}
          >
            <GalleryItem
              image={entry.image}
              year={year}
              index={i}
              width={entry.width}
              height={entry.height}
              priority={i < EAGER_COUNT}
              reduce={reduce}
              onView={onView}
            />
          </StaggerItem>
        ))}
      </Stagger>

      {hasMore && (
        <button
          type="button"
          onClick={() => setBatch(Math.min(batch + BATCH, images.length))}
          className="pressable inline-flex items-center justify-center gap-2 mt-12 md:mt-16 border border-ink/20 rounded-lg px-8 py-4 text-ink font-medium hover:bg-ink hover:text-paper transition-colors duration-200 ease-out"
        >
          Show more
        </button>
      )}
    </div>
  );
}

const layoutClasses: Record<Layout, string> = {
  // Masonry: CSS columns, images never split across columns.
  masonry: "columns-1 sm:columns-2 lg:columns-3 column-gap-6",
  // Collage: asymmetric grid with intentional spans and offsets.
  collage: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start",
  // Film strip: horizontal row, overflow scroll with visible affordance.
  film: "flex flex-nowrap items-start gap-6 overflow-x-scroll pb-2",
  // Bento: varied cells in a 4-column grid.
  bento: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8",
};

/**
 * Placement modifiers so each year's arrangement differs.
 * Returned classes are applied to the StaggerItem wrapper.
 */
export function spanFor(index: number, layout: Layout): string {
  if (layout === "collage") {
    return [
      "",
      "lg:col-span-2 lg:row-span-2 place-self-center",
      "lg:col-start-3 lg:row-span-2 place-self-end",
      "lg:col-span-2 lg:row-start-2 place-self-start",
    ][index % 4];
  }
  if (layout === "bento") {
    return [
      "lg:col-span-2 lg:row-span-2",
      "lg:row-span-2",
      "",
      "lg:col-start-3 lg:row-span-2",
    ][index % 4];
  }
  return "";
}
