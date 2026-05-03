---
name: 'Adeola'
description: 'Artist portfolio for Finnish-Nigerian singer-songwriter Adeola'
colors:
  cobalt: '#0e2795'
  cobalt-deep: '#002f6d'
  near-black: '#161616'
  white: '#ffffff'
  off-white: '#f6f6f6'
  blush: '#ffcee5'
  gold-warm: '#ffd485'
typography:
  display:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 'clamp(5rem, 24vw, 22.3125rem)'
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: '-0.055em'
  headline:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 'clamp(3.2rem, 11vw, 7.5rem)'
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: '-0.035em'
  title:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 'clamp(2rem, 5vw, 3rem)'
    fontWeight: 700
    lineHeight: 1
    letterSpacing: '0.1em'
  body:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: '1rem'
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: '0.025em'
  label:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: '0.75rem'
    fontWeight: 700
    lineHeight: 1
    letterSpacing: '0.1em'
rounded:
  none: '0px'
  card: '12px'
  modal: '16px'
  pill: '9999px'
spacing:
  xs: '8px'
  sm: '16px'
  md: '28px'
  lg: '40px'
  xl: '60px'
components:
  cta-pill:
    backgroundColor: '{colors.near-black}'
    textColor: '{colors.white}'
    rounded: '{rounded.pill}'
    padding: '8px 16px 8px 8px'
  cta-pill-hover:
    backgroundColor: '{colors.near-black}'
    textColor: '{colors.white}'
    padding: '8px 16px 8px 8px'
  about-card:
    backgroundColor: 'transparent'
    textColor: '{colors.white}'
    rounded: '{rounded.card}'
    padding: 'clamp(20px, 4vw, 36px)'
  contact-modal:
    backgroundColor: '{colors.cobalt}'
    textColor: '{colors.white}'
    rounded: '{rounded.modal}'
    padding: 'clamp(28px, 5vw, 48px)'
---

# Design System: Adeola

## 1. Overview: The Warm Signal System

**Creative North Star: "Warm Signal"**

The cobalt blue is not cold — it is the deep from which warmth rises. Pink and gold are the signal: music bleeding through the surface, emotion transmitted through type. Every design decision asks: does this carry the signal, or does it interfere with it?

This system is built on a single surface — one unwavering cobalt blue — and trusts that restraint creates more emotional weight than variety. The photography is not placed on the background; it becomes the background, ghosted in via mix-blend-lighten so Adeola inhabits the blue rather than floating above it. Giant display type reflects itself into the void below, vanishing into cobalt like sound fading out. Warmth lives only in the text: the blush-to-deep-blue gradient on emotional copy, gold on numerical accents, the pink text selection state. Everything else is white on cobalt.

The system explicitly rejects the streaming platform aesthetic (Spotify's cold metric grids, Apple Music's corporate geometry), the EDM festival register (neon, busy layouts, hype overload), and over-designed indie portfolios (competing effects, maximalist decoration). The site speaks of intimacy, not spectacle.

**Key Characteristics:**

- Single cobalt surface — no tonal variants, no page background gradients, ever
- System font only — Helvetica Neue is the intentional choice, not a fallback
- Warmth lives in text treatments — blush and gold appear only as accent fills, never as surfaces
- Ghost photography — `mix-blend-lighten` dissolves the artist into the blue
- Reflection signature — giant display type mirrors itself below, fading into cobalt
- White opacity hierarchy — `white/60`, `/40`, `/30`, `/20`, `/10` replace introducing new greys

## 2. Colors: The Cobalt-and-Signal Palette

One surface, three signals. The palette is strict: cobalt holds everything, white reads on it, and blush + gold are reserved for emotional punctuation.

### Primary

- **Deep Cobalt** (`#0e2795`): The only page background. Applied globally and nowhere else as a background — not on cards, not in overlays, not as a tint. The entire site lives on this single surface.
- **Cobalt Deep** (`#002f6d`): The dark gradient endpoint. Appears only inside gradient text treatments (the bio quote fade-to-deep) and as the modal overlay base mixed with near-black.

### Secondary

- **Blush** (`#ffcee5`): The warm signal. Used as the bright end of the bio quote gradient text and as the browser text-selection background color. Never used as a solid fill on a surface.
- **Gold Warm** (`#ffd485`): Numerical accent. Appears only on the show count `(N)` typographic numerals as a gradient fill. A single deliberate note of warmth in a field of white.

### Neutral

- **White** (`#ffffff`): Primary foreground. All readable text, borders, and iconography.
- **Near-Black** (`#161616`): The CTA pill background. The only surface in the system that isn't cobalt.
- **Off-White** (`#f6f6f6`): Gradient endpoint for the reflection fade effect. Never used as a visible surface color.

### Named Rules

**The Cobalt-Only Rule.** The page background is always `#0e2795`. It is not layered, tinted, or broken by sections. If you're adding a background color anywhere, the answer is cobalt.

**The Warmth-Rises Rule.** Blush and gold appear only as gradient fills inside `background-clip: text` treatments. They are never used as button backgrounds, card tints, border colors, or any other surface. Their rarity is the signal.

**The Opacity Hierarchy.** Muted text and subtle borders are always achieved by reducing white's opacity — `rgba(255,255,255,N)` — never by introducing a new grey. The scale in use: `0.70`, `0.60`, `0.55`, `0.40`, `0.35`, `0.30`, `0.25`, `0.20`, `0.10`, `0.06`, `0.05`.

## 3. Typography: Helvetica as Architecture

**Display / Headline / Title / Body / Label Font:** `'Helvetica Neue', Helvetica, Arial, sans-serif` — system stack, no web fonts loaded.

**Character:** A single typeface at five different scales. The warmth comes from proportion, spacing, and case — not from personality. All-caps with wide tracking for identifiers; tight negative tracking for giants; loose positive tracking for body. The system font choice is a deliberate statement: the design doesn't need a decorative font because the typography itself is the decoration.

### Hierarchy

- **Display** (700, `clamp(5rem, 24vw, 22.3125rem)`, lh 0.92, ls -0.055em): The ADEOLA footer wordmark. Full-width, centered, paired with the reflection effect. One instance only.
- **Headline** (700, `clamp(3.2rem, 11vw, 7.5rem)`, lh 0.92, ls -0.035em): The artist name `<h1>`. Tight negative tracking, uppercase. One per page.
- **Title** (700, `clamp(2rem, 5vw, 3rem)`, lh 1, ls +0.1em): Section headings (SHOWS, VIDEOS, MUSIC, ABOUT, NEWSLETTER). Wide positive tracking, always uppercase, always paired with the reflection effect below.
- **Body** (500, `1rem`, lh 1.5, ls +0.025em): Bio text, description copy, modal content. Capped at `max-width: 720px`. Color is white at 80–85% opacity for long passages.
- **Label** (700, `0.75rem`, lh 1, ls +0.1em, `uppercase`): Copyright, sublabels (UPCOMING, NEW RELEASE), small metadata. Wide tracking at small size. Color is `white/55` to `white/60`.

### Named Rules

**The Caps-for-Identity Rule.** All-caps is reserved for section headers, show titles, identity labels (SINGER · SONGWRITER), and the CTA when it carries a product statement (EP OUT NOW). Navigation links and conversational CTAs are mixed case (Shows, See all videos). Never use all-caps on body copy.

**The System-Only Rule.** No web fonts. Helvetica Neue ships with macOS and Windows; Arial covers Android and older systems. The type feels intentional because the sizing, tracking, and case do the work — not the face.

## 4. Elevation

This system is flat. There are no box-shadows anywhere in the codebase. Depth is conveyed through three techniques instead:

1. **Opacity layering**: White at reduced opacity (`white/06`, `white/08`, `white/10`) creates subtle surface distinctions without shadows.
2. **Ghost photography**: The hero image uses `mix-blend-lighten` — not a shadow, but a blending mode that makes the subject part of the cobalt surface rather than above it.
3. **Bordered cards**: The about section card uses a 1px `rgba(255,255,255,0.70)` border — a bright edge without depth or lift.

The contact modal uses `backdrop-filter: blur(4px)` on its overlay for a scrim effect on open. This is the system's only blur — acceptable because it is user-triggered and functional.

### Named Rules

**The No-Shadow Rule.** No `box-shadow` anywhere. If an element needs to feel elevated, use a border or opacity tint. If that doesn't work, reconsider whether the element needs elevation at all.

## 5. Components

### CTA Pill (Primary Action)

The only button shape in the system. Used for every call-to-action: EP releases, ticket links, contact, newsletter submit.

- **Shape:** Fully round (9999px). Non-negotiable — this is the system's only interactive shape.
- **Background:** Near-black (`#161616`) — the only non-cobalt surface in the system.
- **Border:** 0.4px `rgba(246,246,246,0.40)` — ultra-thin, barely-there edge.
- **Internal structure:** Left-aligned white circle (28px, `bg-white rounded-full`) containing a black play triangle SVG; right side carries the label text.
- **Padding:** 8px all sides, 16px on the right (`p-2 pr-4`). Minimum height 44px for touch compliance.
- **Hover:** `opacity: 0.80`. No background shift, no transform.
- **Focus:** `ring-2 ring-white ring-offset-2 ring-offset-[#0e2795]` — white ring, cobalt offset.

### Navigation

- **Desktop:** Horizontal pill-shaped link row, centered. Links are `white/60`, transition to `white` on hover. Active state adds a 1px `border-b border-white`. Gap of 28px (`gap-7`) between links.
- **Mobile:** Full-screen cobalt overlay triggered by a 44×44px hamburger. Links render at `text-3xl font-bold uppercase tracking-widest` — large enough to tap comfortably. Active link is full white, inactive links are `white/60`.
- **Keyboard:** Tab wraps within the mobile drawer. Escape closes. `aria-expanded` on the trigger. Body scroll locks when open.

### Show Row

Three-column grid: date (64px) | city+venue (1fr, `min-width: 0`) | ticket CTA (auto).

- **Dividers:** 1px `rgba(255,255,255,0.20)` hairlines above each row and below the last.
- **Date:** Bold, 1rem, ls +0.05em.
- **City:** Bold, `clamp(1rem, 2vw, 1.15rem)`, uppercase, ls +0.08em, truncate with ellipsis on overflow.
- **Venue:** 0.8rem, `white/60` below the city.
- **Tickets:** CTA pill in the right column. When no ticket URL: empty div (preserves grid alignment).

### Video Card

Featured video at 16:9 ratio; secondary videos at 16:10 in an `auto-fit minmax(220px, 1fr)` grid.

- **Thumbnail:** `object-cover`, opacity 0.60 (featured) / 0.70 (grid). Overlaid with a subtle `rgba(255,206,229,0.08) → rgba(0,47,109,0.60)` directional gradient on grid items.
- **Play button:** Centered white circle, `rgba(255,255,255,0.16–0.18)` fill (no blur), containing a white play triangle.
- **Caption:** Title in bold uppercase (`0.78rem`, ls +0.1em) left-aligned; subtitle in `white/55` right-aligned, same baseline.

### About Card

The only card in the system. Appears once.

- **Border:** 1px `rgba(255,255,255,0.70)` — notably brighter than the standard divider at 0.20–0.25, giving it a framed feeling.
- **Background:** Transparent — the cobalt surface shows through.
- **Radius:** 12px.
- **Padding:** `clamp(20px, 4vw, 36px)` — expands generously on larger screens.
- **Internal layout:** Heading (`<h2>`) → body paragraph → (optional) CTA.

### Contact Modal

- **Overlay:** `rgba(4,12,40,0.72)` with `blur(4px)`. Click-outside closes.
- **Panel:** Cobalt background (`#0e2795`), 1px `rgba(255,255,255,0.25)` border, 16px radius, max-width 480px.
- **Fields:** Borderless inputs on cobalt, 0.5px `rgba(255,255,255,0.35)` bottom border only. Labels are 0.7rem, uppercase, `white/55`, ls +0.22em.
- **Accessibility:** `role="dialog" aria-modal="true" aria-labelledby="contact-modal-title"`. Focus moves to first input on open; returns to trigger on close.

### Reflection Effect (Signature)

Applied below every section heading and the footer wordmark. Encapsulated in `<Reflection>` component (`app/components/reflection.tsx`).

- **Mechanism:** `aria-hidden="true"` span, `transform: scaleY(-1)`, `background-clip: text`, gradient `linear-gradient(to top, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%)`.
- **Clipping:** Outer wrapper `height: 1.25rem`, `overflow: hidden`, `margin-top: -0.22em` — limits the reflection to a sliver below the text baseline.
- **Rule:** Every section heading (`<h2>`) gets a reflection. No exceptions. The ADEOLA footer wordmark gets a taller reflection (`clamp(3rem, 10vw, 8rem)` clip height).

## 6. Do's and Don'ts

### Do:

- **Do** use `#0e2795` for every page background. The single surface is the identity.
- **Do** use white opacity variants (`white/60`, `white/40`, etc.) for hierarchy — never introduce a new grey.
- **Do** pair every section `<h2>` with a `<Reflection>` component underneath.
- **Do** use `mix-blend-lighten` for the hero/artist photograph — the subject inhabits the blue, not floats above it.
- **Do** use `text-gradient-pink-blue` and `text-gradient-gold` only for their designated contexts: bio quote and show count numerals, respectively.
- **Do** use all-caps + wide tracking (`0.1em`) for section headers, show titles, and identity labels. Use mixed case for nav links and conversational CTAs.
- **Do** keep the CTA pill shape (fully round) as the only button form. One shape, everywhere.
- **Do** add `<Reflection>` to any new section heading added to the page.
- **Do** use the system font stack (`'Helvetica Neue', Helvetica, Arial, sans-serif`) — no web font imports.
- **Do** set `min-height: 44px` on every interactive element for mobile touch compliance.

### Don't:

- **Don't** introduce a second background color. Not a darker cobalt section, not a near-black hero band, not a white "light section". One surface.
- **Don't** add box-shadows. If you feel the need for depth, use a 1px white border at low opacity instead.
- **Don't** use blush or gold as surface colors, border colors, or button backgrounds. They are signal-in-text only.
- **Don't** load a web font. The type warmth comes from scale and tracking, not from font personality.
- **Don't** make the site feel like a streaming platform artist profile — no cold metric grids, no algorithm-driven "similar artists" layouts, no platform chrome.
- **Don't** use the EDM festival register — no neon, no busy layered layouts, no aggressive countdown timers or hype copy.
- **Don't** over-design with competing effects — glassmorphism cards, multi-layer gradients, decorative illustrations, or icon libraries. One effect at a time; the reflection is already doing work.
- **Don't** add new grey values. If something needs to be muted, use `rgba(255,255,255,N)` over cobalt.
- **Don't** use `backdrop-filter: blur()` on persistent elements (e.g., thumbnails, cards). It is reserved for the contact modal overlay — a user-triggered, transient overlay. Blur on always-visible elements is expensive on mobile and visually noisy.
- **Don't** use `border-left` or `border-right` as a colored accent stripe. Full borders, opacity tints, or nothing.
