# Abrhythm Music — DESIGN.md

> Source of truth for all visual / UX work.
> Copy source: `content.md` (Organizational Profile & Training Services).
> Motto: **“Rhythm is in you.”**
> Location: 69A Aba-Owerri Road, Umungasi, Aba, Abia State, Nigeria.
> Status: Design spec only — no code yet.

**Reading this as:** culture-magazine landing + school enrolment page for parents / schools / churches / young artistes, with a printed-jazz-poster-meets-modern-editorial language, leaning toward native CSS + Tailwind v4 + Motion + next/font.

**Impeccable mode:** `Persuade` — visitor decides and acts (enquire / register / partner). Design is the product.

**Dials:** `DESIGN_VARIANCE: 8` / `MOTION_INTENSITY: 5` / `VISUAL_DENSITY: 3`

- High variance justified: editorial, asymmetric, poster-like. Must collapse to strict single-column `< 768px`.
- Mid motion: purposeful, springy, never gimmicky. Page must actually move (hero enter, scroll-reveal, hover physics) but no hijack, no parallax sprawl.
- Low density: art-gallery spacing. Generous whitespace is the luxury signal.

---

## 1. Creative concept — “Printed Rhythm”

A premium editorial music-magazine, not a SaaS site. Think: 1970s jazz posters, Blue Note sleeves, and a contemporary culture magazine bound together.

**Central motif: rhythm made visible.** Every section carries one rhythmic device. Never decoration for its own sake — each device communicates beat, timing, or progression.

Rhythm vocabulary (use only these, repeat deliberately):

1. **Beat Grid** — vertical bar-lines like staff measures or sequencer steps. Used as section dividers, card backs, and the training-approach strip (`Discover → Develop → Practice → Perform → Mentor → Excel`).
2. **Pulse Line** — single horizontal waveform / ECG-like line that spikes on hover or scroll-enter. Used once in hero, once before Contact. Max one animated pulse per viewport.
3. **Vinyl / Drum-skin Circles** — large concentric rings, off-crop, cropped by viewport edge. Used as hero backdrop, kids-section backdrop, contact backdrop. Never centered badge-style; always bled or overlapped.
4. **Staff Lines** — 5 thin horizontal rules that copy or images sit on / break through. Used in About, Vision/Mission, Songwriting.
5. **Measure Numbers** — oversized section numerals `01–08`. Editorial anchor. Always set in display serif italic, always partially overlapped by content.

**What to avoid (explicit bans):**

- No centered hero with floating gradient blob + 3 equal feature cards. No AI-purple glow, no neon outer glow, no glassmorphism-everywhere.
- No emoji as icons. No hand-drawn SVG illustrations as default. No div-based fake screenshots / fake dashboards.
- No random serif-italic word injected into a sans headline. Emphasis = italic/bold of the *same* family.
- No `Inter` as default body. No `Fraunces` / `Instrument Serif` (LLM-default serifs). No pure `#000000` / `#FFFFFF`.
- No centered H1 sections when variance > 4, except the manifesto/motto moment (allowed override: message itself is the design).
- One accent only. Lock it page-wide. No teal badge appearing in section 7 of an orange site.

**Justified overrides of default taste rules:**

- *Serif allowed here* because the brief is genuinely editorial / heritage / publication (music-magazine + jazz poster), and we articulate the fit: high-contrast display serif = printed poster voice.
- *Warm paper + burnt-orange allowed here* because the brand brief explicitly demands warm, confident paper/ink/amber. Per brief-wins principle this overrides the premium-consumer beige+brass ban. We differentiate by going editorial-ink (near-black warm, strong rules, mono labels) rather than DTC-soft (no soft cards, no brass buttons everywhere).

---

## 2. Colour system

Warm, confident, print-like. Paper feels like stock; ink feels like press ink; orange feels like a stamp.

### Tokens

Define as CSS variables (Tailwind v4 `@theme` maps to these). Pick **one strategy**: CSS variables, swapped per section theme. Do not mix `dark:` utilities and variables in the same tree.

**Light — “Paper” (default, reading sections):**

| Token | Value | Use | Contrast on |
|---|---|---|---|
| `--paper` | `#FBF4E8` | page bg, hero paper | — |
| `--paper-2` | `#F3E9D6` | alt band, card wash | — |
| `--ink` | `#191410` | primary text on paper | 14.2:1 on `--paper` ✓ |
| `--ink-soft` | `#5C534A` | secondary text on paper | 6.1:1 on `--paper` ✓ |
| `--line` | `#191410` at 14% (`color-mix`) | rules, staff lines, dividers | decorative only |
| `--accent` | `#C14E15` | stamps, numerals, active states, large display text (≥24px) | 4.4:1 on `--paper` — large/decorative only, never small body text |
| `--accent-deep` | `#8F3510` | text-link / small-text accent on paper | 7.2:1 ✓ |
| `--accent-soft` | `#F5D9BE` | highlight wash behind numerals | — |
| `--secondary` | `#23473A` | palm-green: labels, kids-section wash, focus rings | 8.0:1 on `--paper` ✓ |
| `--secondary-soft` | `#D9E4D8` | secondary wash | — |

**Dark — “Ink” (immersive interludes: hero opener, Live Band / Marching Band band, Approach strip, Contact closer):**

| Token | Value | Use | Contrast on |
|---|---|---|---|
| `--ink-bg` | `#191410` | section bg | — |
| `--ink-bg-2` | `#221B14` | elevated / overlapping card on ink | — |
| `--cream` | `#FBF4E8` | primary text on ink | 14.2:1 ✓ |
| `--cream-soft` | `#CBBFAE` | secondary text on ink | 7.0:1 ✓ |
| `--line-ink` | `#FBF4E8` at 18% | rules on ink | decorative |
| `--accent-ink` | `#FF9E2C` | accent on ink (amber lifted for dark) | 8.1:1 on `--ink-bg` ✓ |
| `--accent-ink-deep` | `#E86A1D` | CTA bg on ink with ink text | ink text 5.9:1 on it ✓ |
| `--secondary-ink` | `#8FC0A8` | secondary text-accents on ink | 7.4:1 ✓ |

> This is an intentional **Color Block Story** (taste-skill exception): the page alternates Paper → Ink → Paper → Ink as full-bleed magazine spreads with hard cuts, not tints. Maximum 3 ink blocks per page. Never sandwich a thin light strip inside a dark block or vice versa. Each block is full-viewport-width, min `py-24 md:py-32`.

**Rules:**

- Max 1 accent family per theme (`--accent*` on paper, `--accent-ink*` on ink). Secondary green is for labels/washes only, never a second CTA colour.
- Body text: only `ink / ink-soft` on paper, `cream / cream-soft` on ink. Never orange body copy except links ≥ `--accent-deep` on paper.
- Buttons: solid fills only. Paper: `bg --accent-deep, text --paper` (7.2:1). Ink: `bg --accent-ink-deep, text --ink-bg` or `bg --cream, text --ink-bg`. Kids band: `bg --accent-deep, text --cream` (7.2:1). `--accent` stays reserved for large display type (≥24px, 3:1) and decoration. Audit every CTA for WCAG AA (4.5:1 body, 3:1 large ≥18px). Ghost buttons over imagery require scrim + stroke.
- Shadows tinted to bg hue (`shadow-[0_20px_60px_-20px_rgba(25,20,16,0.35)]` on paper). No pure-black drop shadows on light.
- Focus: `2px solid --secondary` on paper, `2px solid --accent-ink` on ink, offset 3px. Never remove focus rings.
- Shape lock: **all-sharp** (radius `0`) for editorial blocks, rules, image frames. Full-pill allowed *only* for small tags/pills and the audio-play button, documented as the single exception. Buttons: radius `0` or `2px` max. One rule, everywhere.

---

## 3. Typography

High-contrast expressive display serif + clean grotesk + mono for rhythm labels. Loaded via `next/font` only. No `<link>` Google Fonts in production. `font-display: swap`, reserve space to keep CLS < 0.1.

**Families (via `next/font/google`):**

- **Display:** `DM Serif Display` (400 + Italic). Why this serif: printed-poster voice, high stroke contrast, single weight forces scale/italic for hierarchy instead of weight-hopping. Not an LLM-default serif. Emphasis = same-family italic only.
- **Body / Grotesk:** `Space Grotesk` (400, 500, 700). Why: clean, slightly technical, pairs with beat-grid / sequencer language; not Inter.
- **Mono / Rhythm labels:** `Space Mono` or `Geist Mono` (400, 700). All numerals, measure numbers metadata, eyebrow labels, beat counts, phone numbers, timetables. Mandatory for `VISUAL_DENSITY` data.

```ts
// app/fonts.ts (spec — implement later)
import { DM_Serif_Display, Space_Grotesk, Space_Mono } from "next/font/google";
```

**Scale (clamp for fluid editorial oversize):**

| Step | Size | Leading | Tracking | Use |
|---|---|---|---|---|
| `display-xxl` | `clamp(3.5rem, 10vw, 9rem)` | `0.92` | `-0.04em` | Hero “RHYTHM IS IN YOU.” only. 2 lines max desktop. `pb-1` reserve for italic descenders (y/g). |
| `display-xl` | `clamp(2.75rem, 6vw, 5.5rem)` | `0.95` | `-0.03em` | Section headlines (About, Kids, Contact). |
| `display-lg` | `clamp(2rem, 4vw, 3.25rem)` | `1.0` | `-0.02em` | Training item titles, Vision/Mission. |
| `h3` | `1.25–1.5rem` | `1.2` | `-0.01em` | Card titles, Who-we-serve labels. Grotesk 500. |
| `body` | `1rem (16px base)` | `1.6` | `0` | All paragraphs. `max-w-[65ch]`. Colour `ink-soft / cream-soft`. |
| `lede` | `1.125–1.25rem` | `1.6` | `0` | One lede per major section max. |
| `mono-label` | `0.6875rem (11px)` | `1.4` | `+0.18em` uppercase | Measure tags (`01 / PERCUSSION`), nav, footer labels. |
| `caption` | `0.875rem` | `1.5` | `0` | Image/placeholder captions, address lines. |

**Rules:**

- Display serif for headlines, numerals, pull-quotes only. Never body. Body is always grotesk.
- Oversized type lives in: hero motto, section numerals bleeding off-grid, one full-width manifesto line before Contact (“Rhythm is in you.” repeated as masthead). Elsewhere headlines stay `display-lg` max to preserve hierarchy.
- Italic descender clearance: any italic display word with `y g j p q` gets `leading >= 1.1` + `pb-1`. Audit every italic headline.
- No gradient text on headlines. Colour is ink/cream with a single orange italic word max per headline (same-family italic, not family swap).
- Numbers: always mono tabular (`font-variant-numeric: tabular-nums`).
- Base `16px`, body `line-height 1.5–1.6`. No body text `< 12px`.

---

## 4. Layout principles

Asymmetric editorial grid, big margins, numbered everything, overlap, air.

**Grid & spacing:**

- Page container: `max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16`. Section rhythm: `py-24 md:py-32 lg:py-40` (density 3 = gallery air). Between sections min `96px`.
- 12-col grid desktop (`grid-cols-12 gap-6`). Canonical splits: `7/5`, `8/4`, `5/7` with intentional empty columns (`col-start`). Mobile `<768px`: strict single-column `w-full px-4 py-8` fallback declared per section. No horizontal scroll. No fixed-px containers. `min-h-[100dvh]` for full-height hero, never `h-screen`.
- Hero: **split, left-aligned** (headline left 7 cols, vinyl-ring + pulse-line asset right 5 cols, overlapped by mono measure strip). Centered hero banned except the motto-manifesto interlude (explicit override).
- Numbered sections: every major block carries oversized measure numeral (`01 About`, `02 Training`, … `08 Contact`) set in display-italic, absolutely positioned to overlap headline/rule by `-2rem` (`margin-top: -2rem` overlaps allowed at variance 8). Numeral is `accent / accent-soft`, never body-grey.
- Overlapping: image frames break staff lines; quote cards overlap ring art by `mt-[-3rem]`; footer CTA card overlaps ink/paper cut by `-4rem`. Overlap only via `transform`/`margin`, never animated `width/height`.
- Grouping without cards: prefer `border-t`, `divide-y`, negative space. Cards only when elevation = real hierarchy (training index rows, contact card). Bento only where content fills every cell — no blank filler tiles; min 2–3 cells with visual variation (wash, pattern, or photo later).
- Layout-family rotation (no repetition): hero split → About offset-split → Training index-list (not cards) → Kids wash-block + list → Band full-bleed ink strip → Approach horizontal beat-stepper → Voices/Commitment pull-quote → Contact split + footer masthead. Max 2 consecutive image+text splits; 3rd in a row is a fail — break with full-width strip.
- Eyebrow restraint: max **1 eyebrow per 3 sections**. Count `uppercase tracking-[0.18em]` labels; if > `ceil(sections/3)` it fails. Most sections need headline alone. Split-header (left headline + right small paragraph) banned as default — stack headline over body (`max-w-[65ch]`) unless right column carries a visual/interaction.
- Nav: single line desktop, height `64–72px` max, sticky with paper/ink scrim. Labels: About, Training, Kids, Bands, Approach, Contact + one CTA (`Enquire`). One CTA intent page-wide: **“Contact Abrhythm” / “Enquire”** — no “Get in touch” + “Let’s talk” + “Start a project” duplicates. Button text 1–2 words, fits one line at desktop. Min touch `44×44px`, `8px+` gaps.
- Footer: masthead motto oversized, address, both phones (`0909 899 5532 | 0905 537 3659`), socials (Facebook/Instagram/TikTok as text + Phosphor icons, one family, `strokeWidth 1.5`), small mono colophon. Logo-wall = logos only if added later; no category labels under logos.

**Information architecture (from content.md, order preserved):**

1. Hero (Ink) — motto + empowerment line + 2 CTAs max
2. `01` About (Paper)
3. `02` Training Services index (Paper, 10 rows: Drumming → Oratory; Wind + Kids expandable detail)
4. `03` Kids spotlight (Paper wash + green)
5. `04` Live Band + Marching Band (Ink strip)
6. `05` Other Services: Artiste Management + Mentorship (Paper, quiet)
7. `06` Who We Serve (Paper, pill row / mono list — no card dump)
8. `07` Approach `Discover → … → Excel` (Ink beat-stepper) + Commitment + Vision/Mission
9. `08` Contact (Ink closer) + Footer masthead

---

## 5. Motion principles (Emil Kowalski)

Purposeful, springy, never gimmicky. Motion communicates hierarchy, sequence, feedback, or state — never “looks cool”.

**Decision framework applied:**

- Hero enter, section reveals, CTA press, accordion expand (Wind/Kids lists): animate. Nav toggle, toast: standard. Hover lifts on training rows: subtle. Keyboard-initiated actions, rapid list nav: no animation.
- Animate only `transform` + `opacity`. Never `top/left/width/height`. `will-change` only on animating hero ring. Grain overlay is `fixed inset-0 pointer-events-none`, never on scrolling containers.

**Easing & duration (single source):**

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);   /* enters, reveals — starts fast, feels responsive */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); /* on-screen moves */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);  /* accordions, mobile nav */
```

| Element | Duration | Curve |
|---|---|---|
| CTA / pressable `:active` | `100–160ms` | `ease-out`, `scale(0.97)` |
| Training-row hover (line sweep) | `180–220ms` | `ease-out` |
| Accordion (Wind, Kids detail) | `250–350ms` | `ease-drawer` |
| Hero enter (headline up + ring settle) | `600–800ms` | `ease-out`, spring `stiffness 100 damping 20` optional |
| Scroll reveal (sections, rows) | `600ms` | `ease-out [0.16,1,0.3,1]` |
| Pulse line draw | `1200ms` once on enter | linear draw, then static |
| Exit / dismiss | always faster than enter | `150–200ms ease-out` |

- Never `ease-in` for UI (feels sluggish). Never `transition: all` — list properties. Never `scale(0)` — enter from `scale(0.95–0.97) + opacity 0`. Popovers scale from trigger (`transform-origin: var(--transform-origin)`); modals stay centered.
- Springs: subtle `bounce 0.1–0.2`, `duration ~0.5`. Use for hero ring settle and CTA magnetic nudge (desktop only, via `useMotionValue/useSpring`, never `useState` for pointer). Toasts/lists use CSS transitions (interruptible), not keyframes.
- Stagger: `30–80ms` between items (`delay: i * 0.06`), parent/children in same Client Component. Never block interaction during stagger.
- Scroll-reveal rule: Motion `whileInView` (`initial {opacity:0, y:24}`, `viewport {once:true, amount:0.3}`), not scroll listeners. No `window.addEventListener('scroll')`, no `scrollY`-in-state, no RAF-touching-state. One marquee max per page — here: **none** by default; Approach stepper is a static beat grid, not a marquee.
- Hover behaviour (gated `@media (hover:hover) and (pointer:fine)`): rows shift `translateX(4px)` + orange bar grows; CTA lifts `-translate-y-[1px]` + tinted shadow; vinyl ring rotates `6deg` slowly on hero only. Touch devices: no hover dependency; `:active scale(0.98)` + visible focus.
- Blur-to-mask: if a crossfade feels off, add `blur(2px)` during transition, keep `< 20px`.
- Debug: review next-day, slow-motion check for origin/sync issues.

**Reduced motion (mandatory, `MOTION > 3`):**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

Collapse pulse draw, ring rotation, stagger, parallax to static/instant. Keep opacity fades that aid comprehension (`fade 0.2s ease`, no transform). In Motion: `const reduce = useReducedMotion()` → `initial={false}`.

---

## 6. Imagery strategy — no photos yet, intentional placeholders

Placeholders must look designed, not empty. All placeholders are duotone + grain + rhythm geometry so swapping in photography is a drop-in, not a redesign.

**Placeholder kit (SVG/CSS only, no hand-drawn illustrations, no fake screenshots):**

- `VinylRing` — concentric circles (stroke `line` 1px, one ring `accent`), large, off-crop `translate(20%, -10%)`. Hero + Contact.
- `PulseLine` — inline SVG path waveform, stroke `accent 2px`, on paper/ink rule. Hero under-CTAs, pre-contact divider.
- `BeatGrid` — CSS repeating-linear-gradient verticals (`8px line / 48px gap`), opacity 0.12, as row backs and Approach stepper ticks.
- `StaffLines` — 5 × 1px rules, text breaks through (headline `bg-paper px-4` overlap).
- `KeySlab / DrumSkin / Reed` — flat duotone geometric slabs (ink/green/orange washes, `mix-blend-multiply`) suggesting keys, drum head, horn bell without literal drawing. Abstract, cropped, captioned.
- `Grain` — single `fixed inset-0 z-[60] pointer-events-none opacity-[0.08]` SVG-noise overlay. Never per-card.
- Washes: `paper-2`, `accent-soft`, `secondary-soft` flat fills. No AI-purple gradients. If gradient needed: warm paper→wash linear only, saturation < 80%.

**Rules:**

- Even minimalist sections need visuals: every major section ships one placeholder visual (ring, grid, or slab). Text-only page = incomplete.
- Real photography later: high-contrast B&W or warm duotone (students, drums, keys, choir, marching band). Pair each with scrim for text contrast. Hero image `next/image priority`, AVIF/WebP, lazy-load below fold, reserve `aspect-ratio` to hold CLS < 0.1, `alt` text mandatory, decorative rings `aria-hidden`.
- Icons: one family only — `@phosphor-icons/react` (priority), `strokeWidth 1.5`. Never mix Phosphor + Lucide. Never hand-roll icon paths; never emoji as icons.
- Swap convention (so future photos don’t break layout):

```tsx
{/* TODO(photo): replace PlaceholderSlab with real photo — keep wrapper + aspect */}
<div data-photo-slot="training-drums" data-aspect="4/3" data-tone="duotone-warm">
  <PlaceholderSlab variant="drumskin" />
</div>
```

Slots + aspects to reserve now: `hero 4/3`, `about 3/4 portrait`, `training rows 16/9 thumb (optional)`, `kids 1/1`, `band 21/9 wide`, `contact 1/1`. Each slot lists `alt` + `tone` (`duotone-warm` default). Logo wall later: Simple Icons SVGs, single-colour, both themes; invented marks = monogram SVG, never plain-text wordmarks row.

---

## 7. Voice — keep content.md, edit lightly for scan

Do not invent facts, prices, testimonials, statistics, teacher names, or claims not in `content.md`. No “92% success”, no named instructors, no fee tables.

**Allowed edits:** cut for scannability, restructure into headlines/lists, fix casing. Meaning preserved.

- Headlines ≤ 8 words, sub-paragraphs ≤ 25 words + one visual or CTA per section. Long spec dumps banned: Wind list (6 instruments) and Kids list (10 items) become grouped accordions / 2-col grouped lists, not 10-row hairline tables. Top highlights + “Ask about full syllabus” link.
- One copy register: warm editorial + plainspoken (culture-magazine, parent-friendly). No mono-tech slang mixed with marketing punch. Re-read every string before ship; rewrite AI-cute, broken, or vague lines into plain functional sentences. Typographic quotes (“ ”), never straight ASCII. No em-dash flourishes as design.
- Quotes/testimonials: none in source → ship none. Do not fabricate. Commitment/Vision/Mission rendered as pull-statements from source verbatim.
- Contact block verbatim: `69A Aba-Owerri Road, Beside Rosevine Hospital, Umungasi, Aba, Abia State, Nigeria.` + `0909 899 5532 | 0905 537 3659` + `Facebook / Instagram / TikTok: Abrhythm Music` + line `Training • Creative Arts • Performance • Mentorship • Artiste Development`.
- Forms (enquiry): visible labels above inputs, helper below, error below field, never placeholder-as-label. Labels: Name, Phone/WhatsApp, Who is this for (child/self/school/church/artiste), Interest (select of 10 services), Message. Submit = same single CTA intent (“Enquire” / “Contact Abrhythm”). Inline success + error states, skeletal shape-matched loading, no generic spinner. All inputs AA contrast, `44px` min height.

---

## 8. Guardrails (ui-ux-pro-max pre-delivery)

- **Accessibility:** contrast AA body / AAA hero target, alt text, keyboard nav + visible focus, aria-labels on icon-only buttons, `prefers-reduced-motion` + `prefers-reduced-transparency` fallbacks, no hover-only meaning, live-region for form feedback.
- **Performance:** LCP < 2.5s (hero art is CSS/SVG now, `priority` image later), INP < 200ms (no scroll handlers, Motion values off render), CLS < 0.1 (reserved aspects, `font-display: swap`), lazy-load below fold, tree-shake Motion/Phosphor.
- **Responsive:** mobile-first, `sm 640 md 768 lg 1024 xl 1280 2xl 1536`, `max-w-[1400px]`, viewport meta, no horizontal scroll, explicit `<768px` single-column per section, test light + ink blocks + both colour schemes before ship, z-index scale documented (nav / overlay / grain only).
- **Stack (when code starts):** Next.js RSC + isolated `"use client"` leaves for Motion/scroll/pointer, Tailwind v4 (`@tailwindcss/postcss`), `motion/react`, `next/font`, `@phosphor-icons/react`. Verify `package.json` before importing anything. No `h-screen` heroes, no flex-percentage math (use Grid), no `layout` props on static content.

*End of DESIGN.md — next step is implementation against this spec, copy-locked to content.md.*
