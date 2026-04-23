# adeola.com — Claude Code Instructions

## Project Overview

Portfolio site for Finnish-Nigerian singer-songwriter Adeola. Built with:

- **Next.js 15** App Router (Turbopack in dev)
- **Sanity CMS v3** for content management (embedded studio at `/studio`)
- **Tailwind CSS 4** for styling
- **TypeScript**

## Key File Paths

- `app/` — Next.js App Router pages and layouts
- `app/components/` — Shared React components (`Container`, `Nav`, `CTA`)
- `app/studio/` — Embedded Sanity Studio
- `sanity/` — Sanity schema definitions, client, and live-fetch config
- `design/adeola-ds/` — Canonical design system (README, tokens, UI kit, assets)

## Design System

The Adeola Design System under `design/adeola-ds/` is the source of truth for visual decisions. Read it before making styling changes.

- `design/adeola-ds/README.md` — tone, voice, component rules, signature effects
- `design/adeola-ds/colors_and_type.css` — color/gradient/type/spacing tokens
- `design/adeola-ds/ui_kits/website/` — reference layouts for each page

### Colors (CSS tokens in `app/globals.css`)

- `--background: #0e2795` — deep cobalt blue, the only page background
- `--foreground: #ffffff` — white, all primary text
- `--button: #161616` — near-black, only used on the CTA pill
- `--border: rgba(246, 246, 246, 0.25)` — subtle card/CTA border
- Opacity-scaled whites (`text-white/60`, `/40`, `/30`, …) for muted text

### Gradients (utility classes in `app/globals.css`)

Prefer these helpers over inline `style={{ backgroundImage: … }}` for the three canonical gradients:

- `.text-gradient-pink-blue` — bio/quote text (pink → deep blue)
- `.text-gradient-gold` — numeric counters like `(N)` on Shows
- `.text-gradient-fade` — white → transparent about-card fade

### Typography

- Font stack: `"Helvetica Neue", Helvetica, Arial, sans-serif` (system, no web fonts)
- `h1` is fluid via `clamp()` in `globals.css` — don't override with fixed `text-*` classes
- Section headers: bold, `uppercase`, `tracking-widest`
- Display giants: fluid `clamp()` sizes (`SHOWS`, `ADEOLA`, `ADE`)

## Responsive Conventions

- **Mobile-first.** Always style the base case, then add `md:` / `lg:` overrides
- **Breakpoints**: Tailwind defaults — `sm` 640, `md` 768, `lg` 1024, `xl` 1280
- **Container**: `app/components/container.tsx` caps content at `max-w-[1440px]` with responsive padding (`p-4 md:p-8`). Wrap new page-level content inside it when a new layout is added; existing pages already inherit it from `app/layout.tsx`
- **`next/image`**: always pass a `sizes` attribute so the CDN picks the right width
- **Card rows**: horizontal scroll on mobile → grid at `md:` (see the "more videos" row in `app/page.tsx`)
- **Show rows / intro sections**: stack vertically (`flex-col`) below `md`, go horizontal above

## Accessibility Conventions

- Every page renders inside `<main id="main-content">` (set in `app/layout.tsx`) — do not wrap individual pages in their own `<main>`
- A skip-to-content link sits at the top of `<body>` — keep it there
- Navigation uses `<nav aria-label="Primary">` with `aria-expanded` + Escape-to-close on the mobile drawer (`app/components/nav.tsx`)
- Interactive elements need `focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e2795]`
- Decorative SVGs: `aria-hidden="true"`
- Reduced motion is handled globally in `globals.css` (`@media (prefers-reduced-motion: reduce)`) — avoid JS-driven animation that bypasses CSS transitions
- Tap targets: 44px minimum on mobile (e.g., the hamburger button is `h-11 w-11`)

## Styling

- Use Tailwind utility classes throughout
- Opacity pattern: `text-white/60` (not `text-opacity-60`)
- Prefer the `.text-gradient-*` utilities over repeating the gradient inline
- Prettier: no semis, single quotes, ES5 trailing commas, 80 print width, 2-space tabs (`.prettierrc`)
- ESLint via `next lint`

## Components

- `Container` (`app/components/container.tsx`) — full-bleed wrapper with `mx-auto max-w-[1440px]` + responsive padding
- `Nav` (`app/components/nav.tsx`) — **client component**; hamburger drawer below `md`, horizontal links above. Handles Escape, click-outside, route-change auto-close, and body-scroll lock
- `CTA` (`app/components/cta.tsx`) — pill button rendered as a single `<a>` (do not wrap in `<Link><div>` again); accepts `link`, `text`, optional `external`

## Signature Patterns

- **Reflection effect**: clone of the text with `transform: scaleY(-1)` + a near-transparent gradient and `textShadow` for the glow. Used on giant display type (`ADE`, `SHOWS`, `ADEOLA`)
- **Ghost hero image**: `mix-blend-lighten` so the photograph bleeds into the blue background
- **Muted hierarchy**: rely on white opacity (`/60`, `/30`) rather than introducing new greys

## Data Fetching

- Use `sanityFetch` from `@/sanity/lib/live` for CMS queries
- Use `urlFor()` from `@/sanity/lib/image` for image URLs — always set a width for the served size
- Queries are GROQ strings

## Sanity Schema Types

- `general` — site-wide settings (hero image, profile image, short/long intro, socials)
- `show` — live performances/events (title, subtitle, date, `live` flag, tickets)
- `audio` — audio tracks/releases (title, subtitle, audio file, cover)
- `video` — video content (title, subtitle, thumbnail, external URL, date)

## Environment Variables

Copy `.env.example` → `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`

## Scripts

- `npm run dev` — dev server with Turbopack
- `npm run build` — production build (run this before finishing significant changes)
- `npm run start` — serve the production build
- `npm run lint` — ESLint via `next lint`
- `npm run typecheck` — TypeScript type checking, no emit
- `npm run format` — Prettier write
- `npm run format:check` — Prettier verify
