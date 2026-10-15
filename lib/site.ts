export const site = {
  name: "Abrhythm Music",
  motto: "Rhythm is in you.",
  tagline: "Empowering the next generation of young talents.",
  profile: "Organizational Profile & Training Services",
  strapline: "Training • Creative Arts • Performance • Mentorship • Artiste Development",
  locale: "en_NG",
  /**
   * Canonical production URL. Set NEXT_PUBLIC_SITE_URL in the hosting
   * environment (e.g. Vercel project settings) to the real domain.
   * Falls back to the Vercel-provided URL, then localhost for dev.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
} as const;

export type Site = typeof site;
