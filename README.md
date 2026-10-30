# Abrhythm Music

Marketing site for **Abrhythm Music**, a music school and creative arts
organisation in Aba, Nigeria. Motto: “Rhythm is in you.”

Stack: Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4 ·
Motion · GSAP ScrollTrigger (lazy) · Lenis smooth scroll · Lucide icons.

Copy source of truth: [`content.md`](./content.md).
Design source of truth: [`DESIGN.md`](./DESIGN.md).

## Run / build

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (must pass with zero warnings)
npm run typecheck  # tsc --noEmit
```

## Environment

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, OG images, sitemap, robots | Vercel URL, else `http://localhost:3000` |
| `GOOGLE_DRIVE_API_KEY` | Google Drive API key for automatic gallery sync (`lib/drive.ts` MODE A). Optional — falls back to manual file lists in `data/gallery.ts` | (unset) |


## Deploy (Vercel)

1. Push to GitHub and import the repo in Vercel (framework preset: Next.js).
2. Set `NEXT_PUBLIC_SITE_URL` to the production domain (e.g.
   `https://www.abrhythm.com`).
3. Deploy. `sitemap.xml`, `robots.txt`, `/opengraph-image` and
   `/apple-icon` are generated automatically.

## Replace later

- [ ] **Real photos** — swap each `PlaceholderSlab` for a `next/image`
  photo, keeping the wrapper, aspect ratio and `data-photo-slot`
  convention (`hero 4/3`, `kids 1/1`, `band 21/9 wide`, `contact 1/1`).
  Mark decorative images `aria-hidden`, give meaningful images `alt` text.
- [ ] **Real social URLs** — replace the `"#"` placeholders in
  `components/layout/Footer.tsx` and `components/sections/Contact.tsx`
  (marked `TODO(social)`).
- [ ] **Testimonials** — none exist in `content.md`; do not invent any.
  Add only with real, permissioned quotes.
- [ ] **Class schedules** — no timetable exists yet; add a real one before
  publishing any dates or times.
- [ ] **Fees** — no prices exist yet; never publish invented prices.
- [ ] **Gallery Drive links** — paste Google Drive folder links into
  `data/gallery.ts` (folder IDs are extracted automatically) and set
  `GOOGLE_DRIVE_API_KEY` to enable automatic MODE A sync. Without them the
  gallery runs in MODE B using the manually listed file IDs.

## Accessibility notes

- Contrast-audited palette (see `DESIGN.md` §2): body copy ≥ 4.5:1,
  large display type ≥ 3:1. `--accent` is reserved for large type and
  decoration; solid buttons use `--accent-deep`.
- Skip link, named section landmarks, labelled icon buttons, focus-visible
  rings, keyboard-operable accordion/menu/form with error focus, and
  `prefers-reduced-motion` fallbacks throughout.
