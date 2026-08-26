import { spawnSync } from 'node:child_process'
import { cpSync, rmSync } from 'node:fs'

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

cpSync('storybook-static', 'public/storybook', { recursive: true })
console.log('Copied storybook-static → public/storybook')
