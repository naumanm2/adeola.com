# Adeola Design System

Portfolio website design system for **Adeola Ikuesan** — singer, songwriter, and artist based in the contemporary R&B/pop scene.

## Sources

- **Codebase**: `naumanm2/adeola.com` (GitHub) — Next.js 15 + Sanity CMS + Tailwind CSS 4 + TypeScript
- **CMS**: Sanity v3 (embedded studio at `/studio`)
- **Figma**: `Adeola.fig` — 1 page, 6 frames: Mobile main, Mobile shows, Mobile about, Mobile videos, Desktop shows, Components

---

## Product Overview

A single product: **adeola.com** — a mobile-first artist portfolio website with five main pages:

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, featured video, bio snippet, social links, giant typographic footer |
| Shows | `/shows` | Upcoming + past live performances, ticketing links |
| Audio | `/audio` | Tracks/EPs with album art and native HTML audio player |
| Video | `/video` | Grid of music video thumbnails linking to external URLs |
| About | `/about` | Two-column bio with image + long-form PortableText |

**CMS Content Types**: `general` (site settings), `show`, `audio`, `video`

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Terse and atmospheric.** Copy is minimal — short bursts, not paragraphs on the surface.
- **All-caps for section headers and key labels.** e.g. `SINGER`, `SONGWRITER`, `VIDEOS`, `UPCOMING`, `PAST`.
- **Lowercase for conversational meta.** e.g. nav links (`Shows`, `Audio`), CTA text (`See all videos`, `EP OUT NOW`).
- **First-person implied.** The site speaks of Adeola in third person for the bio, but CTAs and labels are direct.
- **No emoji used anywhere.** The brand is typographic and visual — not emoji-forward.
- **Numbers used as accent.** Show counts shown as `(N)` in gold gradient — purely typographic.
- **Copyright style**: `cc. Adeola Ikuesan 2026` (lowercase `cc.`, not ©).
- **Dot separators**: role labels use `•` (e.g. `SINGER • SONGWRITER`), video subtitles use ` · ` (middle dot spaced).

### Examples of Copy
- Hero label: `SINGER • SONGWRITER`
- CTA: `EP OUT NOW` / `See all videos` / `See full bio` / `Tickets` / `Contact`
- Section headers: `VIDEOS`, `SHOWS`, `UPCOMING`, `PAST`, `ABOUT`
- Footer: `cc. Adeola Ikuesan 2026`
- Shows page explore prompt: `Explore ▶`

---

## VISUAL FOUNDATIONS

### Colors
- **Primary background**: `#0e2795` — deep cobalt blue. Used as the *only* page background. No light mode variation.
- **Foreground**: `#ffffff` — white, used for all primary text and borders.
- **Button background**: `#161616` — near-black, used only for the CTA pill button.
- **Border**: `rgba(246,246,246,0.25)` — very subtle white, used as CTA border and card borders.
- **Opacity-scaled whites**: Tailwind's `text-white/60`, `/50`, `/40`, `/30`, `/20`, `/10`, `/05` pattern — used extensively for muted text, borders, overlays.
- **Gradient — pink-to-blue**: `linear-gradient(180deg, #ffcee5 0%, #ffcee5 50%, #002f6d 100%)` — for the bio quote text.
- **Gradient — gold**: `linear-gradient(207deg, rgb(255,212,133) 6%, rgb(249,192,88) 88%)` — for show counts `(N)`.
- **Gradient — white fade**: `linear-gradient(180deg, #f6f6f6 0%, rgba(246,246,246,0) 100%)` — for the about section text fade.

### Typography
- **Font stack**: `Helvetica, Arial, sans-serif` — no web fonts loaded. System font only.
- **Weights used**: bold (700) for display/headings, medium (500) for body/quotes.
- **H1**: fluid — `clamp(2.33rem, 1.77rem + 2.81vw, 3.95rem)`, weight bold, line-height 1.
- **Display giant**: `clamp(60px, 24vw, 357px)` — ADEOLA footer; `clamp(80px, 14vw, 200px)` — SHOWS hero.
- **Tracking**: `tracking-widest` (0.1em) for section labels and show titles; `tracking-tight` (-0.025em) for display text; `tracking-tighter` for giant footers.
- **All-caps** for branding, section headers, show titles — via `uppercase` class or literal caps in data.
- **Text transforms**: `bg-clip-text text-transparent` + gradient `backgroundImage` for coloured text effects.

### Spacing & Layout
- **Container**: `p-4` mobile, `p-8` desktop — full-width, no max-width cap.
- **Section gap**: `gap-6` (1.5rem) between page sections.
- **Item gap**: `gap-3` (0.75rem) between cards/rows.
- **Mobile-first**: designed primarily for narrow screens; grid and two-column layouts kick in at `md:`.

### Backgrounds & Imagery
- **Single solid colour background** — always `#0e2795`. No gradients on the page background itself.
- **No textures, patterns, or background images.**
- **Hero image**: rendered with `mix-blend-lighten` for a "ghost" effect — image bleeds into the blue background.
- **Profile/cover images**: standard `object-cover` fills in aspect-ratio boxes.
- **Imagery colour vibe**: warm portraiture photography against the cool blue background. High contrast.

### Animation & Interaction
- **Transitions**: simple `transition-opacity duration-300` on image hovers (opacity drops to 70%), `transition-colors duration-200` on text links.
- **No bounce, no spring animations.** Linear/ease transitions only.
- **Hover states**: opacity reduction (`hover:opacity-70`) on images; colour shift (`hover:text-white/70`) on links.
- **No press/scale effects.**

### Borders
- **Dividers**: `border-t border-white/20` — hairline white at 20% opacity, used between show rows and sections.
- **Card border**: `border border-white rounded-xl` — full white 1px border with xl radius — used on the About card on homepage.
- **CTA border**: `border-[.4px] border-white/40` — ultra-thin white border on pill button.
- **No drop shadows used anywhere.**

### Reflections (Signature Effect)
- Large typographic text is given a "reflection" clone beneath it using `transform: scaleY(-1)` + gradient fade to near-invisible. Used on `ADE` (homepage), `SHOWS` (shows page), `ADEOLA` (shows footer).

### Corner Radii
- **Pill (CTA button)**: `rounded-full` — fully round.
- **Card (About)**: `rounded-xl` (0.75rem).
- **Images**: no rounding (`rounded-none`).
- **Video thumbnails**: no rounding.

### Iconography
- A single inline SVG is used: a small **play triangle** (`8×9`, path `M8 4.5L0 9L0 0L8 4.5Z` fill white or `#161616`).
- Used in the CTA button (black triangle in white circle) and on video thumbnail overlays (white triangle on `bg-white/10` circle).
- No icon library or icon font used.
- No emoji anywhere.

---

## ICONOGRAPHY

- **Approach**: Minimal. One custom SVG — a play triangle — is the only icon in the entire site.
- **Format**: Inline SVG, no external libraries.
- **Play icon specs**: `viewBox="0 0 8 9"`, path `d="M8 4.5L0 9L0 0L8 4.5Z"`. Fill is `#161616` (in CTA) or `white` (on video overlays).
- **CTA usage**: White circle (`bg-white rounded-full`) containing the black play triangle at left of pill button.
- **Video usage**: Semi-transparent white circle (`bg-white/10`) containing white play triangle, centered on thumbnail.
- **No other icons, emoji, or Unicode icon characters** are used anywhere in the codebase.

---

## File Index

```
README.md                   — This file (sources: GitHub codebase + Adeola.fig)
SKILL.md                    — Agent skill descriptor
colors_and_type.css         — CSS custom properties (colors, type, spacing, effects)

assets/
  play-triangle.svg         — The only icon in the site
  hero-image.png            — Main artist photo (used with mix-blend-lighten on blue bg)
  profile-photo.jpg         — Portrait photo (used in bio + shows page)
  video-thumbnail.png       — Golden-hour outdoor portrait (used for video thumbnails + audio covers)

preview/
  colors-brand.html         — Brand color swatches
  colors-opacity.html       — White opacity scale
  colors-gradients.html     — Gradient text swatches
  type-display.html         — Display / heading type specimens
  type-body.html            — Body + label type specimens
  spacing-tokens.html       — Spacing & border radius tokens
  component-cta.html        — CTA pill button component
  component-nav.html        — Navigation bar
  component-show-row.html   — Show listing row
  component-video-card.html — Video thumbnail card
  component-audio-track.html— Audio track row
  component-card-about.html — About card with border
  effects-reflection.html   — Reflection text effect
  effects-gradient-text.html— Gradient text treatments

ui_kits/website/
  index.html                — Interactive portfolio prototype
  Nav.jsx                   — Navigation component
  CTA.jsx                   — Pill button component
  HomePage.jsx              — Home page layout
  ShowsPage.jsx             — Shows page
  AudioPage.jsx             — Audio page
  VideoPage.jsx             — Video page
```
