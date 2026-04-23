# adeola.com

Portfolio site for London-based singer-songwriter **Adeola Ikuesan** — hero, shows, audio releases, music videos, and long-form bio, all backed by an embedded Sanity Studio.

## Tech stack

- [Next.js 15](https://nextjs.org) — App Router, Turbopack in dev
- [Sanity v3](https://www.sanity.io) — content management, embedded at `/studio`
- [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Sanity values
npm run dev
```

- Public site: <http://localhost:3000>
- Sanity Studio: <http://localhost:3000/studio>

### Required env vars

| Variable                        | Purpose                            |
| ------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID                  |
| `NEXT_PUBLIC_SANITY_DATASET`    | Sanity dataset (e.g. `production`) |
| `SANITY_API_READ_TOKEN`         | Read token for live queries        |

## Scripts

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Dev server with Turbopack          |
| `npm run build`        | Production build                   |
| `npm run start`        | Serve the production build         |
| `npm run lint`         | ESLint via `next lint`             |
| `npm run typecheck`    | TypeScript type checking (no emit) |
| `npm run format`       | Format all files with Prettier     |
| `npm run format:check` | Verify formatting without writing  |

## Design system

The visual language is defined in [`design/adeola-ds/`](./design/adeola-ds/). It contains the token CSS, a markdown design brief, and a reference UI kit covering every page. Colors, typography, gradients, and signature effects (reflections, `mix-blend-lighten` hero) all derive from it.

## Content model

Four Sanity document types drive the site:

- `general` — site-wide settings: hero image, profile image, short/long intro, social links
- `show` — live performances (title, date, location, tickets, live/past flag)
- `audio` — tracks and releases with audio file + cover art
- `video` — music videos and visuals linking to external URLs

## Project structure

```
app/
  components/        # Container, Nav, CTA
  studio/            # Embedded Sanity Studio
  (about|audio|shows|video)/
  globals.css        # DS tokens + gradient utilities
  layout.tsx
  page.tsx           # Home
sanity/              # Schemas, client, live-fetch config
design/adeola-ds/    # Design system (README, tokens, UI kit, assets)
```

## Deploy

Any Node-capable host works. [Vercel](https://vercel.com/new) is the simplest path given the Next.js stack — connect the repo, add the env vars above, and it deploys on push.
