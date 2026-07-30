# Work session — tichy-hq-site

**Date:** 2026-07-20  
**Repo:** [mtichy/tichy-hq-site](https://github.com/mtichy/tichy-hq-site)  
**Live:** https://v0-tichy-hq.vercel.app

Portfolio / résumé site polish for the job application: credibility, ship quality, SEO, and reviewer-facing signals.

---

## Changes (oldest → newest)

### Ship & identity

1. **Personal home metadata** — Replaced v0 defaults with a credibility-first title and description.
2. **Trigger Vercel production deploy** — Empty commit to redeploy after a blocked deploy from a non-GitHub-linked local git identity.
3. **Shared site metadata / Open Graph** — Centralized `metadataBase`, title, description, and OG config in `lib/site.ts`; removed v0 generator defaults.
4. **Favicons** — Light/dark 32×32 tab icons and Apple touch icon for proper browser/OS presentation.
5. **Résumé PDF** — Served the downloadable PDF at the path the resume page already linked to.

### Cleanup

6. **Remove unused public assets** — Deleted unreferenced portraits and SVG; ignored `.DS_Store`.
7. **Real README** — Replaced v0 boilerplate with stack, setup, structure, and reviewer notes (plus homepage screenshot).
8. **ESLint + Prettier** — Flat ESLint (core-web-vitals + TypeScript), Prettier, theme-toggle hydration fix; consistent formatting for reviewers and CI.
9. **Enable TypeScript in production builds** — Removed `ignoreBuildErrors` so `next build` actually typechecks.
10. **Trim unused UI / deps** — Removed unused Button scaffold and related packages; moved `shadcn` to devDependencies.
11. **Fix Vercel pnpm lockfile mismatch** — Dropped stale `pnpm.overrides` that broke frozen installs on deploy.

### Architecture & quality gates

12. **NavBar → server component** — Pages pass `activePath`; only theme pieces stay client, less client JS.
13. **README client-JS note** — Updated docs after the NavBar refactor.
14. **Husky + lint-staged** — ESLint/Prettier on staged files before commit.
15. **A11y: landmarks + Builds contrast** — Home wrapped in `<main>`; section numbers use stronger cyan in light mode for WCAG AA.
16. **Renumber Builds Vercel section** — Fixed duplicate “4” so deploy is step 5.
17. **Image performance** — Enabled `next/image`, resized oversized PNGs, kept pixel art crisp with `unoptimized` + `pixelated`.

### Visual / UX (this afternoon)

18. **Dark-mode portrait** — Swapped in the lime-on-black avatar and showed it in dark mode (was hidden).
19. **Hero ↔ Journey mobile spacing** — More air between bio and portrait; less empty gap before “My journey” on small viewports.

### Portfolio / SEO / ops signals

20. **GitHub Actions CI** — Lint, typecheck, and build on push/PR; high-signal for engineers opening the repo.
21. **`sitemap.ts` + `robots.ts`** — Native Next metadata routes so crawlers can discover pages.
22. **Person JSON-LD** — Structured data (name, role, links) for SEO / entity understanding; footer contacts share the same source.
23. **CI badge in README** — Makes green builds visible without opening Actions.
24. **Vercel Analytics custom events** — Track résumé download and email/LinkedIn clicks.
25. **Lightweight web manifest** — Name, theme colors, icons (`display: browser`); not a full PWA.
26. **MIT `LICENSE`** — Signals open-source norms for a portfolio repo.
27. **Pin Node / pnpm** — `.nvmrc`, `engines`, `packageManager`; CI reads them; README prerequisites aligned.
28. **Footer copyright ↔ MIT** — Replaced “All Rights Reserved” with linked “MIT License”; fixed “Tichý” spelling.

---

## Discussed, not done

- **Loading skeletons** — Skipped: site is fully static; no data-fetching states to skeleton yet.
- **`msw`** — Not a direct dependency; pulled by the `shadcn` CLI. Don’t add fake tests just to “use” it; removing `shadcn` would drop it if the CLI isn’t needed.

---

## Quick reference (today’s later commits)

| Commit    | Summary                     |
| --------- | --------------------------- |
| `b7d3879` | Dark-mode portrait          |
| `a89c2d2` | Mobile hero/journey spacing |
| `27f696b` | GitHub Actions CI           |
| `4029015` | Sitemap + robots            |
| `fcc3c5d` | Person JSON-LD              |
| `897aa68` | CI README badge             |
| `f4b8c6d` | Analytics events            |
| `1c2d410` | Web manifest                |
| `7752d83` | MIT license                 |
| `453d1c6` | Node/pnpm pins              |
| `39a1d02` | Footer MIT alignment        |
