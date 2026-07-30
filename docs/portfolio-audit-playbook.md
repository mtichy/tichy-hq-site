# Portfolio audit playbook — tichy-hq-site

**Project:** [mtichy/tichy-hq-site](https://github.com/mtichy/tichy-hq-site)  
**Live:** [marktichy.com](https://marktichy.com)  
**Reusable skill:** `portfolio-site-audit` (personal Cursor skill)

This doc summarizes the production / hiring-manager audits and double-checks applied to this repo. Use it as a project record; use the skill to run the same playbook on other sites.

---

## How we used this playbook here

### GitHub / repo presentation

| Check                                | Result                                                                      |
| ------------------------------------ | --------------------------------------------------------------------------- |
| Replace v0 README boilerplate        | Done — purpose, routes, stack, setup, structure, reviewer notes, screenshot |
| CI status badge                      | Done — Actions badge in README                                              |
| Live URL in README                   | Done — `marktichy.com`                                                      |
| MIT LICENSE + README license section | Done — footer no longer says “All Rights Reserved”                          |
| GitHub Actions CI                    | Done — lint + typecheck + build on push/PR                                  |
| Node / pnpm pins                     | Done — `.nvmrc`, `engines`, `packageManager`                                |

### Site identity & SEO

| Check                                | Result                  |
| ------------------------------------ | ----------------------- |
| Shared metadata (`lib/site.ts`)      | Done                    |
| Sitemap + robots                     | Done                    |
| Person JSON-LD                       | Done                    |
| Dedicated 1200×630 OG image (opaque) | Done — `/images/og.png` |
| Custom domain `siteUrl` update       | Done                    |

### Quality gates & hygiene

| Check                                       | Result                                     |
| ------------------------------------------- | ------------------------------------------ |
| ESLint + Prettier; drop `ignoreBuildErrors` | Done                                       |
| Husky + lint-staged                         | Done                                       |
| Trim unused UI/deps/assets                  | Done                                       |
| NavBar as server component                  | Done                                       |
| `msw` not a direct dep (via shadcn CLI)     | Noted — leave or remove `shadcn` if unused |
| Loading skeletons                           | Skipped — fully static site                |

### Accessibility

| Check                                         | Result                                    |
| --------------------------------------------- | ----------------------------------------- |
| Landmarks, `aria-current`, focus styles, alts | Done                                      |
| Builds number contrast (light mode)           | Done                                      |
| Real screen-reader pass (VoiceOver/NVDA)      | **Not done** — Lighthouse/structural only |

### Performance & media

| Check                         | Result |
| ----------------------------- | ------ |
| `next/image` + resized assets | Done   |
| Dark-mode portrait            | Done   |
| Light favicon semantic colors | Done   |
| Mobile hero ↔ journey spacing | Done   |

### Analytics & ops

| Check                            | Result                                       |
| -------------------------------- | -------------------------------------------- |
| Vercel Analytics + custom events | Done — résumé download, contact clicks       |
| Speed Insights                   | Done — package + layout; enable in dashboard |
| Web app manifest (lightweight)   | Done — `display: browser`                    |
| Domain SSL troubleshooting       | Validated — campus firewall false alarm      |

### Content

| Check                               | Result |
| ----------------------------------- | ------ |
| Résumé grammar/consistency          | Done   |
| Builds page copy + `<code>` styling | Done   |

---

## Suggested skill triggers

In another Cursor project, ask for example:

- “Run the portfolio site audit”
- “Apply `portfolio-site-audit`”
- “Production checklist for this hiring portfolio”

---

## Related local docs

- Session changelog: [`session-log-2026-07-20.md`](./session-log-2026-07-20.md)
