import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Editorial page container: max 1400px, big margins. */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16", className)}>
      {children}
    </div>
  );
}
