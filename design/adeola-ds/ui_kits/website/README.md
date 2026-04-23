# Adeola Website UI Kit

Interactive click-through prototype of adeola.com — a mobile-first artist portfolio for musician Adeola Ikuesan.

## Pages

| Page | Description |
|------|-------------|
| Home | Hero, bio quote, featured video, about card, socials, ADE reflection footer |
| Shows | SHOWS hero with reflection, upcoming + past show rows, ADEOLA footer |
| Audio | Track list with cover art and interactive mock audio player |
| Video | 2-col video grid with play overlays and hover states |
| About | Two-column image + long-form bio |

## Components

| File | Exports |
|------|---------|
| `Nav.jsx` | `Nav`, `CTA`, `PlayTriangle` (also available globally via `window`) |
| `HomePage.jsx` | `HomePage` |
| `ShowsPage.jsx` | `ShowsPage` |
| `AudioPage.jsx` | `AudioPage` |
| `VideoPage.jsx` | `VideoPage` |
| `AboutPage.jsx` | `AboutPage` |

## Design Notes

- **Background**: always `#0e2795`
- **Font**: `Helvetica, Arial, sans-serif` — no web fonts
- **CTA**: pill button, `#161616` bg, `0.4px border-white/40`, white circle + play triangle icon
- **Section headers**: bold, `letter-spacing: 0.1em`, `text-transform: uppercase`, white
- **Reflections**: `scaleY(-1)` + gradient fade — used on giant type in footers and hero
- **Hover states**: opacity reduction on images (0.7), colour fade on text links (white/70)
- **No shadows**, no emoji, no icon libraries

## Usage

Open `index.html` in the browser. Use the **Tweaks** toggle (toolbar) to:
- Switch between pages
- Change accent colour
- Toggle reflection effects
