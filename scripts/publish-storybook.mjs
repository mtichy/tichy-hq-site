import { spawnSync } from 'node:child_process'
import { cpSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const STORYBOOK_BASE = '/storybook/'

function injectBaseHref(file, extraAttributes = '') {
  let html = readFileSync(file, 'utf8')
  const attrs = `href="${STORYBOOK_BASE}"${extraAttributes}`
  if (/<base\b/i.test(html)) {
    html = html.replace(/<base\b[^>]*>/i, `<base ${attrs} />`)
  } else {
    html = html.replace(/<head([^>]*)>/i, `<head$1>\n    <base ${attrs} />`)
  }
  writeFileSync(file, html)
}

// Remove a previous export so Storybook's staticDirs (../public) cannot
// ingest /storybook and nest a copy of itself.
rmSync('public/storybook', { recursive: true, force: true })

const build = spawnSync(
  'pnpm',
  ['exec', 'storybook', 'build', '-o', 'storybook-static'],
  { stdio: 'inherit' },
)

if (build.status !== 0) {
  process.exit(build.status ?? 1)
}

// Next.js serves this HTML at /storybook (no trailing slash) and redirects
// /storybook/ → /storybook. Without <base>, relative URLs like iframe.html
// and ./sb-manager/* resolve at the site root and 404.
injectBaseHref('storybook-static/index.html')
injectBaseHref('storybook-static/iframe.html', ' target="_parent"')

const index = readFileSync('storybook-static/index.html', 'utf8')
if (!index.includes(`href="${STORYBOOK_BASE}"`)) {
  throw new Error('Failed to inject Storybook <base href="/storybook/">')
}

const ogImage = 'https://marktichy.com/images/og-storybook.jpg'
if (!index.includes(ogImage)) {
  throw new Error(
    'Storybook index.html is missing Open Graph tags from .storybook/manager-head.html',
  )
}

cpSync('storybook-static', 'public/storybook', { recursive: true })
console.log('Copied storybook-static → public/storybook')
