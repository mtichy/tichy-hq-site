---
name: portfolio-site-audit
description: >-
  Audits personal portfolio and marketing sites (especially Next.js App Router)
  for production readiness, SEO, GitHub/repo presentation, accessibility,
  performance, analytics, and deploy hygiene. Use when the user asks to audit a
  portfolio, run a production checklist, polish a site for hiring managers, or
  apply the tichy-hq / Mark Tichý portfolio audit playbook.
disable-model-invocation: true
---

# Portfolio site audit

Run this playbook when polishing a portfolio, résumé, or marketing site meant to
be read by hiring managers and engineers—not only browsed live.

Copy the checklist below, mark items as you go, and report findings as:
**Done / Gap / N/A (with reason)**. Prefer small, high-signal fixes over scope
creep. Ask before committing or deploying.

## Checklist

### 1. Repo presentation (GitHub first impression)

- [ ] Real README (not generator boilerplate): purpose, live URL, routes, stack, setup
- [ ] Homepage or key screenshot in `docs/`
- [ ] CI badge linked to Actions
- [ ] MIT (or chosen) LICENSE; footer/README license text consistent (no “All Rights Reserved” with MIT)
- [ ] Prerequisites match reality (Node/`engines`/`.nvmrc`, package manager)
- [ ] “Notes for reviewers” covering TS strictness, client JS surface, a11y, secrets, deploy

### 2. Site identity & SEO

- [ ] Central site config (`siteUrl`, title, description)—not scattered defaults
- [ ] `metadataBase` + Open Graph / Twitter use the **canonical production URL**
- [ ] Dedicated OG image (~1200×630), **opaque** background (transparent fails in dark iMessage)
- [ ] `app/sitemap.ts` and `app/robots.ts` (or static equivalents)
- [ ] Person (or Org) JSON-LD when appropriate; contact links shared with footer
- [ ] After custom domain: update `siteUrl` + README; verify `/robots.txt` and `/sitemap.xml`

### 3. Quality gates

- [ ] ESLint + Prettier (or project equivalent); no `ignoreBuildErrors`
- [ ] `typecheck` script (`tsc --noEmit`) and CI runs lint + typecheck + build
- [ ] Pre-commit hooks optional but valuable (lint-staged)
- [ ] Pin Node (`.nvmrc` + `engines`) and `packageManager` for reproducible installs

### 4. Code & dependency hygiene

- [ ] Remove unused components, assets, and deps
- [ ] Don’t treat transitive packages (e.g. `msw` via CLI tools) as “unused test scaffolding”
- [ ] Minimize `"use client"`—push client islands to leaves (theme toggle, tracked links)
- [ ] Skip loading skeletons unless there is real async data fetching

### 5. Accessibility

- [ ] Landmarks: `header`/`nav`/`main`/`footer`
- [ ] `aria-current` on nav; labels on icon-only controls
- [ ] Decorative images `alt=""` / `aria-hidden`; meaningful alts elsewhere
- [ ] Focus-visible styles; contrast check for accent text on light/dark
- [ ] Note: Lighthouse ≠ screen reader pass; only claim SR testing if actually done

### 6. Performance & media

- [ ] Prefer framework image component; resize oversized sources
- [ ] Pixel art: `unoptimized` + `image-rendering: pixelated` when needed
- [ ] Theme-aware favicons via `prefers-color-scheme`; light icon = light bg + dark fg
- [ ] Light/dark content images if design requires (don’t leave `dark:hidden` with no dark asset)

### 7. Analytics & product signals

- [ ] Analytics in production only
- [ ] Custom events for key conversions (résumé download, contact clicks)
- [ ] Speed Insights optional; enable in host dashboard after package install

### 8. Deploy & domain

- [ ] Production URL documented; previews on PRs if available
- [ ] Custom domain: www ↔ apex redirect; SSL valid
- [ ] If HTTPS fails but `.vercel.app` works: check network/firewall before blaming deploy
- [ ] Git author email must be allowed by the host team if deploy is blocked

### 9. Content polish

- [ ] Grammar/consistency pass on résumé and process pages
- [ ] Filename/`<code>` styling consistent where docs mention files
- [ ] Downloadable PDF path matches the link

## Output format

```markdown
## Audit summary

- Verdict: ship-ready / needs X before share
- Top 3 gaps

## Checklist results

| Area              | Status       | Notes |
| ----------------- | ------------ | ----- |
| Repo presentation | Done/Gap/N/A | ...   |

## Recommended next actions

1. ...
```

## Out of scope unless asked

Full PWA/service workers, inventing test suites for static sites, rewriting visual design, force-pushing, or changing git config.
