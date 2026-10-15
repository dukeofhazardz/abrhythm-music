import { cn } from "@/lib/cn";

export type SlabVariant = "drumskin" | "keys" | "reed" | "vinyl" | "staff";

interface PlaceholderSlabProps {
  variant?: SlabVariant;
  /** DESIGN.md photo-slot id, e.g. "hero", "about". */
  slot?: string;
  aspect?: string;
  label?: string;
  className?: string;
}

const variantStyles: Record<SlabVariant, string> = {
  drumskin: "bg-accent-soft text-accent",
  keys: "bg-paper-2 text-ink",
  reed: "bg-secondary-soft text-secondary",
  vinyl: "bg-ink-bg text-cream",
  staff: "bg-paper-2 text-ink",
};

/**
 * Intentional placeholder for future photography.
 * Keep wrapper + aspect when swapping in a real photo.
 */
export function PlaceholderSlab({
  variant = "drumskin",
  slot = "untitled",
  aspect = "4/3",
  label,
  className,
}: PlaceholderSlabProps) {
  return (
    <div
      data-photo-slot={slot}
      data-aspect={aspect}
      data-tone="duotone-warm"
      className={cn("relative overflow-hidden", variantStyles[variant], className)}
      style={{ aspectRatio: aspect.replace("/", " / ") }}
    >
      <div aria-hidden="true" className="beat-grid absolute inset-0 opacity-20" />
      <div
        aria-hidden="true"
        className="absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full border border-current opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute -right-1/5 -top-1/5 h-1/2 w-1/2 rounded-full border border-current opacity-60"
      />
      {label ? (
        <p className="mono-label absolute bottom-3 left-3 bg-ink-bg px-2 py-1 text-cream">
          {label}
        </p>
      ) : null}
    </div>
  );
}
