import { cn } from "@/lib/cn";

export function GrainOverlay({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("grain-overlay", className)} />;
}
