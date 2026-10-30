"use client";

import { useRef } from "react";
import { YearRail } from "./YearRail";
import { YearSection } from "./YearSection";
import { type GalleryYearEntry } from "@/data/gallery";

interface GalleryBodyProps {
  years: GalleryYearEntry[];
}

export function GalleryBody({ years }: GalleryBodyProps) {
  // One shared ref map, owned here. Children read `.current` inside effects
  // only — never during render.
  const sectionRefs = useRef<Map<number, HTMLElement>>(new Map());

  return (
    <>
      <YearRail years={years} sectionRefs={sectionRefs} />
      {years.map((year) => (
        <YearSection
          key={year.year}
          year={year}
          sectionRefs={sectionRefs}
        />
      ))}
    </>
  );
}
