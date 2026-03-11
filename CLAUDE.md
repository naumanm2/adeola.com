# adeola.com — Claude Code Instructions

## Project Overview

Portfolio site for musician Adeola. Built with:

- **Next.js 15** App Router (Turbopack in dev)
- **Sanity CMS** (v3) for content management
- **Tailwind CSS 4** for styling
- **TypeScript**

## Key File Paths

- `app/` — Next.js App Router pages and layouts
- `sanity/` — Sanity schema definitions and config
- `components/` — Shared React components
- `app/studio/` — Embedded Sanity Studio

## Conventions

### Styling

- Use Tailwind utility classes throughout
- Opacity pattern: `text-white/60` (not `text-opacity-60`)
- Prettier configured (`.prettierrc`): no semis, single quotes, ES5 trailing commas
- ESLint via `next lint`

### Colors (CSS tokens in globals.css)

- `--background: #0e2795` (deep blue)
- `--foreground: #ffffff` (white)
- `--button: #161616` (near-black)

### Typography

- Font stack: Helvetica, Arial, sans-serif (system fonts — no web fonts loaded)

### Data Fetching

- Use `sanityFetch` from `next-sanity` for all CMS queries
- Use `urlFor()` from `@sanity/image-url` for image URLs
- Queries are GROQ strings

### Sanity Schema Types

- `show` — live performances/events
- `audio` — audio tracks/releases
- `video` — video content
- `general` — site-wide settings/content

## Environment Variables

See `.env.example` for required variables.

## Scripts

- `npm run dev` — start dev server with Turbopack
- `npm run build` — production build
- `npm run lint` — ESLint via next lint
- `npm run typecheck` — TypeScript type checking (no emit)
- `npm run format` — format all files with Prettier
- `npm run format:check` — check formatting without writing
