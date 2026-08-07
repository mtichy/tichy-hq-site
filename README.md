# Mark Tichý — Portfolio Site

[![CI](https://github.com/mtichy/tichy-hq-site/actions/workflows/ci.yml/badge.svg)](https://github.com/mtichy/tichy-hq-site/actions/workflows/ci.yml)

I'm an AI-native Product Designer and Design Technologist. This is my personal portfolio and résumé site. The live site is the primary deliverable. This repo is part of the application and is intended to show my AI-powered design-to-development workflow.

**Live site:** [marktichy.com](https://marktichy.com)

![Home page screenshot in dark mode](./docs/home-screenshot.png)

## What's here

| Route                           | Purpose                                                    |
| ------------------------------- | ---------------------------------------------------------- |
| `/`                             | Home — intro, bio, career journey                          |
| `/resume`                       | Full résumé with downloadable PDF                          |
| `/builds`                       | Index of projects, case studies, and labs                  |
| `/builds/thank-a-thon`          | Case study — McKinsey Thank-a-thon                         |
| `/builds/how-i-built-this-site` | Process write-up for how this site was designed and built  |
| `/labs/pixelator-effect`        | Pixel portrait microtool — threshold + grid → PNG (lab)    |
| `/labs/orbital-drawings`        | Interactive 3D orbital interface of archive drawings (lab) |

**Content model:** `/builds/[slug]` pages are articles. `/labs/[slug]` pages are interactive experiments. Labs are discovered from Builds cards (there is no separate Labs nav item).

## Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **UI:** [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org) (`strict: true`)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com), design tokens in `app/globals.css`
- **Components:** [shadcn/ui](https://ui.shadcn.com) (Base UI primitives), [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- **Labs (3D):** [Three.js](https://threejs.org) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei); [GSAP](https://gsap.com) for focus / entrance motion
- **Labs (2D):** Canvas 2D for the Pixelator effect microtool (no p5 runtime on the site; original sketch was p5.js)
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
pnpm build          # production build
pnpm start          # serve production build locally
pnpm lint           # ESLint (Next.js core-web-vitals + TypeScript)
pnpm typecheck      # TypeScript (`tsc --noEmit`)
pnpm format:check   # Prettier formatting check
pnpm format         # Prettier auto-format
```

Pre-commit hooks (Husky + lint-staged) run ESLint and Prettier on staged files automatically.

## Project structure

```
app/                      # Next.js App Router pages and global styles
  layout.tsx              # Root layout, metadata, theme provider
  page.tsx                # Home
  resume/page.tsx
  builds/                 # Builds index + article pages
  labs/                   # Interactive experiments (client-heavy)
  sitemap.ts
  globals.css             # Design tokens (color, type scale, spacing)
components/
  labs/                   # Lab shells, controls, canvases (2D + R3F)
  ui/                     # shadcn/ui primitives
lib/
  site.ts                 # Site URL, tagline, default metadata, OG config
  builds.ts               # Builds index entries (articles + lab links)
  labs/                   # Lab helpers (pixelator process/export, orbital catalog/settings)
  elevation.ts            # Shared card elevation tokens for 3D + CSS
  utils.ts                # Tailwind class merge helper
public/                   # Static assets (favicons, logos, résumé PDF, lab images)
docs/                     # README assets (screenshots)
```

## Labs

**`/labs/pixelator-effect`** — Pixel-a-tor effect microtool. Upload a photo, tune brightness threshold and grid size, preview off-white pixels on charcoal, and export a high-res PNG. Same process used for the site avatar (ported from a p5.js sketch to React + Canvas 2D).

**`/labs/orbital-drawings`** — Drag-to-orbit 3D cloud of drawings with tap/click focus, pinch/scroll zoom, live A/B controls (density, size, orbit feel, shape, elevation), and a WebGL mosaic fallback when WebGL is unavailable. Reduce Motion quiets entrance and inertia but keeps the interactive canvas.

Adding a lab:

1. Create `app/labs/[slug]/page.tsx` and components under `components/labs/`
2. Register catalog / settings under `lib/labs/` as needed
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

## Notes for reviewers

- **TypeScript:** `strict` mode is enabled in `tsconfig.json`. No `any` types in source.
- **Client JS:** Kept minimal on marketing/résumé pages (theme provider, theme toggle, light analytics wrappers). Labs intentionally use client components for WebGL, pointer input, and live controls.
- **Accessibility:** Semantic landmarks (`header`, `nav`, `main`, `footer`), `aria-current` on nav links, focus-visible styles on interactive elements, alt text on images. Lab canvas exposes an accessible label; mosaic fallback when WebGL is missing.
- **Secrets:** No API keys or `.env` files in the repo. `.gitignore` excludes `.env*`, `node_modules`, and `.next`.
- **Rendering:** Marketing and article routes pre-render as static HTML. Lab pages ship a static shell and hydrate the interactive canvas on the client.
- **Git hooks:** Husky runs lint-staged on commit (ESLint + Prettier on staged files).

## License

[MIT](./LICENSE) © 2026 Mark Tichý
