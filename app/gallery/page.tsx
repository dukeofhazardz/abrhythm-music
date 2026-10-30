import type { Metadata } from "next";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryBody } from "@/components/gallery/GalleryBody";
import { GalleryCta } from "@/components/gallery/GalleryCta";
import { GALLERY_YEARS } from "@/data/gallery";
import { listFolderImages } from "@/lib/drive";
import { site } from "@/lib/site";
import type { GalleryYearEntry } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments from Abrhythm Music — a year-by-year gallery of training, performances and creative work from our music school in Aba, Nigeria.",
  openGraph: {
    title: "Gallery — Abrhythm Music",
    description:
      "Moments from Abrhythm Music — a year-by-year gallery of training, performances and creative work from our music school in Aba, Nigeria.",
    type: "website",
    url: new URL("/gallery", site.url).href,
  },
};

async function buildYears(): Promise<GalleryYearEntry[]> {
  return Promise.all(
    GALLERY_YEARS.map(async (year) => {
      const entry: GalleryYearEntry = {
        year: year.year,
        title: year.title,
        folderUrl: year.folderUrl,
        folderId: year.folderId,
        images: [...(year.images ?? [])],
        imageCount: (year.images ?? []).length,
        countFromRealData: false,
        error: null,
      };

      // MODE A: when a Drive folder is configured and the API key exists,
      // fetch the folder's images server-side. MODE B (manual file list) is
      // the fallback — including when no key is set, so the page never
      // depends on the API.
      if (!entry.folderId || !process.env.GOOGLE_DRIVE_API_KEY) return entry;
      try {
        const fetched = await listFolderImages(entry.folderId);
        entry.images = fetched.map((img) => ({ id: img.id, alt: img.alt }));
        entry.imageCount = entry.images.length;
        entry.countFromRealData = true;
        entry.error = null;
      } catch (err) {
        // Private folder, quota, or network trouble: keep the manual list
        // (if any) and render a friendly fallback instead of crashing.
        entry.error =
          err instanceof Error ? err.message : "Could not load photos from Drive.";
      }
      return entry;
    }),
  );
}

export default async function GalleryPage() {
  const years = await buildYears();
  return (
    <main id="main" className="bg-paper text-ink">
      <GalleryHero />
      <GalleryBody years={years} />
      <GalleryCta />
    </main>
  );
}
