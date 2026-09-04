/**
 * Print Ask Fetch golden evals as a pass-rate table.
 *
 * Usage: pnpm eval:ask
 */
import { runAskEvals } from '@/lib/fetch-demo/score-ask-eval'

function summarize(match: {
  type: string
  personSlug?: string
  storySlug?: string
}) {
  if (match.type === 'person') return `person:${match.personSlug}`
  if (match.type === 'story') return `story:${match.storySlug}`
  return match.type
}

const results = runAskEvals()
const passed = results.filter((r) => r.pass).length
const failed = results.filter((r) => !r.pass)

console.log('Ask Fetch evals')
console.log(`${passed}/${results.length} passed`)
console.log('')
console.log('id'.padEnd(32), 'result', 'expected'.padEnd(28), 'query')
for (const row of results) {
  const mark = row.pass ? 'pass' : 'FAIL'
  console.log(
    row.id.padEnd(32),
    mark.padEnd(6),
    summarize(row.expected).padEnd(28),
    JSON.stringify(row.query),
  )
}

if (failed.length > 0) {
  console.log('')
  console.log('Failing ids:', failed.map((r) => r.id).join(', '))
  process.exitCode = 1
}
