import { cn } from "@/lib/cn";

const BAR_COUNT = 28;

/**
 * Subtle animated beat-grid backdrop: vertical bar-lines rising and
 * falling in a slow staggered loop. Transform-only animation; frozen
 * by the global prefers-reduced-motion rule.
 */
export function BeatGridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none flex items-end justify-between gap-2 overflow-hidden",
        className,
      )}
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <span
          key={i}
          className="beat-bar w-px shrink-0 bg-current"
          style={{
            height: `${36 + ((i * 37) % 88)}px`,
            animationDelay: `${(i % 12) * 0.22}s`,
            animationDuration: `${2.6 + ((i * 13) % 20) / 10}s`,
          }}
        />
      ))}
    </div>
  );
}
