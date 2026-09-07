# Mark Tichý — Portfolio Site

[![CI](https://github.com/mtichy/tichy-hq-site/actions/workflows/ci.yml/badge.svg)](https://github.com/mtichy/tichy-hq-site/actions/workflows/ci.yml)

I'm an AI-native Product Designer and Design Technologist. This is my personal portfolio and résumé site. The live site is the primary deliverable. This repo is part of the application and is intended to show my AI-powered design-to-development workflow.

**Live site:** [marktichy.com](https://marktichy.com)

![Home page screenshot in dark mode](./docs/home-screenshot.png)

## What's here

| Route                           | Purpose                                                            |
| ------------------------------- | ------------------------------------------------------------------ |
| `/`                             | Home — intro, bio, career journey                                  |
| `/resume`                       | Full résumé with downloadable PDF                                  |
| `/builds`                       | Index of projects, case studies, and labs                          |
| `/builds/fetch`                 | Case study — people-first editorial analytics (Fetch)              |
| `/builds/fetch/demo`            | Interactive Fetch demo (synthetic data; Author/Editor role toggle) |
| `/builds/thank-a-thon`          | Case study — McKinsey Thank-a-thon                                 |
| `/builds/how-i-built-this-site` | Process write-up for how this site was designed and built          |
| `/labs/pixelator-effect`        | Pixel portrait microtool — threshold + grid → PNG (lab)            |
| `/labs/orbital-drawings`        | Interactive 3D orbital interface of archive drawings (lab)         |
| `/labs/motion-studies`          | Article — motion studies (Procreate, p5.js, After Effects)         |
| `/labs/uncommonplace`           | Quote lab — random notebook excerpt + CSS type treatment           |
| Unknown URLs                    | Custom 404 — decaying/reforming glitch heading (Canvas 2D)         |

**Content model:** `/builds/[slug]` pages are articles. `/labs/[slug]` pages are labs: interactive experiments or article-style studies with media. Labs are discovered from Builds cards (there is no separate Labs nav item). Fetch is a Builds case study with an embedded interactive demo under `/builds/fetch/demo` (synthetic fixtures only — no backend, API, or browser storage).

## Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **UI:** [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org) (`strict: true`)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com), design tokens in `app/globals.css`
- **Components:** [shadcn/ui](https://ui.shadcn.com) (Base UI primitives), [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- **Labs (3D):** [Three.js](https://threejs.org) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei); [GSAP](https://gsap.com) for focus / entrance motion
- **Labs (2D):** Canvas 2D for the Pixelator effect microtool (no p5 runtime on the site; original sketch was p5.js)
- **404:** Canvas 2D glitch heading (ported from a p5.js sketch; theme tokens, no p5 runtime)
- **Labs (media):** H.264 MP4 embeds for motion studies (`LabVideo`); looping clips respect `prefers-reduced-motion` and always expose pause controls
- **Labs (type):** [Bungee](https://fonts.google.com/specimen/Bungee) via `next/font` on `(Un)Commonplace`; six CSS treatments (shaded / glow / outlined and color variants) in `app/globals.css`; type size fit to the stage with a binary search on `--quote-size`
- **Analytics:** [@vercel/analytics](https://vercel.com/docs/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights) (production only)
- **Deploy:** [Vercel](https://vercel.com) — auto-deploy on push to `main`

No environment variables are required to run or build the site locally.

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org) 22+ (see `.nvmrc`) and [pnpm](https://pnpm.io) 11+

```bash
git clone https://github.com/mtichy/tichy-hq-site.git
cd tichy-hq-site
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
pnpm build          # production build (includes Storybook → public/storybook)
pnpm start          # serve production build locally
pnpm lint           # ESLint (Next.js core-web-vitals + TypeScript)
pnpm typecheck      # TypeScript (`tsc --noEmit`)
pnpm format:check   # Prettier formatting check
pnpm format         # Prettier auto-format
pnpm storybook      # Storybook dev server (http://localhost:6006)
```

Pre-commit hooks (Husky + lint-staged) run ESLint and Prettier on staged files automatically.

## Project structure

```
app/                      # Next.js App Router pages and global styles
  layout.tsx              # Root layout, metadata, theme provider
  page.tsx                # Home
  not-found.tsx           # Custom 404
  resume/page.tsx
  builds/                 # Builds index + article pages
    fetch/                # Fetch case study + nested interactive demo
  labs/                   # Labs: interactive experiments + article-style studies
  sitemap.ts
  globals.css             # Design tokens (color, type scale, spacing)
components/
  fetch-demo/             # Fetch demo chrome, anomaly cards, Ask, sparklines
  labs/                   # Lab shells, controls, canvases, article media
  not-found-glitch.tsx    # Theme-aware 404 glitch canvas
  ui/                     # shadcn/ui primitives
lib/
  site.ts                 # Site URL, tagline, default metadata, OG config
  builds.ts               # Builds index entries (articles + lab links)
  fetch-demo/             # Typed synthetic fixtures + selectors for Fetch
  labs/                   # Lab helpers (pixelator, orbital, uncommonplace quotes/treatments/seen)
  elevation.ts            # Shared card elevation tokens for 3D + CSS
  utils.ts                # Tailwind class merge helper
public/                   # Static assets (favicons, logos, résumé PDF, lab images/video)
docs/                     # README assets (screenshots)
```

## Builds

**`/builds/fetch`** — Case study for Fetch, a sanitized rebuild of an editorial analytics product. Thesis: writers think in people and stories, not charts or query builders. The write-up covers the Author/Editor default decision, what shipped in the demo, and what was cut (Search route, foreground author filters, always-on Reset).

**`/builds/fetch/demo`** — Interactive demo on synthetic data only. Persistent Author | Editor toggle, anomaly cards, story/person detail with sparklines and horizontal reader breakdowns, Ask Fetch (keyword-matched answers), and demonstrable states via `?state=firstrun|empty|loading|error`.

Adding a Builds article:

1. Create `app/builds/[slug]/page.tsx` (and optional content component)
2. Append a card in `lib/builds.ts`
3. Add the route to `app/sitemap.ts`

## Labs

**`/labs/pixelator-effect`** — Pixel-a-tor effect microtool. Upload a photo, tune brightness threshold and grid size, preview off-white pixels on charcoal, and export a high-res PNG. Same process used for the site avatar (ported from a p5.js sketch to React + Canvas 2D).

**`/labs/orbital-drawings`** — Drag-to-orbit 3D cloud of drawings with tap/click focus, pinch/scroll zoom, live A/B controls (density, size, orbit feel, shape, elevation), and a WebGL mosaic fallback when WebGL is unavailable. Reduce Motion quiets entrance and inertia but keeps the interactive canvas.

**`/labs/motion-studies`** — Article: how little is enough? Five studies (three-frame Procreate loops, calligraphic stroke animation, live p5.js webcam effects, After Effects time displacement with score, and a shipped glitch banner). Looping clips are muted, pausable, and do not autoplay when Reduce Motion is on.

**`/labs/uncommonplace`** — Random quote from a typed in-repo list (`lib/labs/uncommonplace/quotes.ts`; not Obsidian at runtime) plus a random CSS type treatment. Display face is Bungee (lab-only, all-caps); chrome stays Quicksand. Six treatments: shaded and shaded-magenta (extruded fill), glow and glow-cyan (`text-shadow` halo, `0.45em` padding so layout reserves part of the 1em glow; the rest paints into stage padding with `overflow-visible`), outlined and outlined-cyan (stroke). **Load another quote** crossfades 200ms; `prefers-reduced-motion: reduce` swaps immediately. Seen IDs live in `localStorage` under `uncommonplace-seen-ids`; exhausted copy offers reload of the prior batch. Type size binary-searches `--quote-size` between 18.66px and 58.92px against the stage content box, capped by viewport height so a flex stage that has not resolved a max height still shrinks instead of growing with the quote.

Adding a lab:

1. Create `app/labs/[slug]/page.tsx` and components under `components/labs/`
2. Register catalog / settings / data under `lib/labs/` as needed (quotes and treatments for (Un)Commonplace)
3. Append a Builds card in `lib/builds.ts` with `href` pointing at `/labs/...` and a lab CTA

Builds cards use a row-major CSS grid (`sm: 2` / `xl: 3` columns) so leftover cards on a new row start on the left.

## Design system

Typography, color, and spacing are defined as CSS custom properties in `app/globals.css`, exported from a Figma design system before any code generation. Semantic tokens map primitives to light and dark themes (for example `--background`, `--foreground`, `--accent`). Brand accents: lime for control fills, cyan for links/sliders/chrome, magenta for underlines.

The `/builds/how-i-built-this-site` page documents the full workflow: Figma tokens → v0 prototyping → GitHub → Cursor refinement → Vercel deployment.

## Configuration

Site-wide metadata lives in `lib/site.ts`:

- Production URL (`metadataBase`)
- Tagline, default title and description
- Open Graph / Twitter card defaults

Builds and lab discovery live in `lib/builds.ts`.

## Deployment

The repo is connected to Vercel. Every push to `main` triggers a production deploy; branches and pull requests get preview URLs.

Production URL: **https://marktichy.com**

Storybook is built into `public/storybook` during `pnpm build` and ships with the site:

- Local: `pnpm storybook` → [http://localhost:6006](http://localhost:6006)
- Production: [https://marktichy.com/storybook/](https://marktichy.com/storybook/)
- Preview: `https://<preview>.vercel.app/storybook/`

## Notes for reviewers

- **TypeScript:** `strict` mode is enabled in `tsconfig.json`. No `any` types in source.
- **Client JS:** Kept minimal on marketing/résumé pages (theme provider, theme toggle, light analytics wrappers). Labs intentionally use client components for WebGL, pointer input, live controls, and (Un)Commonplace quote fit / seen-state.
- **Accessibility:** Semantic landmarks (`header`, `nav`, `main`, `footer`), `aria-current` on nav links, focus-visible styles on interactive elements, alt text on images. Lab canvas exposes an accessible label; mosaic fallback when WebGL is missing. The Fetch demo adds radiogroup role toggle, live regions for Ask, sparkline `role="img"` labels, and reduced-motion handling for Ask delay and skeletons. Motion studies videos have pause controls, descriptive labels, and reduced-motion (no autoplay). (Un)Commonplace quotes are real HTML text (not canvas); Reduce Motion skips the quote crossfade. The custom 404 uses cyan-strong (light) / cyan (dark) for WCAG AA large-text contrast and a static heading when Reduce Motion is on.
- **Secrets:** No API keys or `.env` files in the repo. `.gitignore` excludes `.env*`, `node_modules`, and `.next`.
- **Rendering:** Marketing and article routes pre-render as static HTML. Lab pages ship a static shell and hydrate interactive UI on the client (canvas/WebGL where used; (Un)Commonplace hydrates quote pick, fit, and localStorage). Fetch demo routes use a mix of static shells and client islands for role/filters/Ask (still no network I/O). (Un)Commonplace is the only lab that writes to `localStorage` (`uncommonplace-seen-ids`).
- **Git hooks:** Husky runs lint-staged on commit (ESLint + Prettier on staged files).

## License

[MIT](./LICENSE) © 2026 Mark Tichý
