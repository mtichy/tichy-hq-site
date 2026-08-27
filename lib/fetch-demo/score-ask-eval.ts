import { askEvalCases } from '@/lib/fetch-demo/ask-evals'
import { matchAsk } from '@/lib/fetch-demo/selectors'
import type { AskEvalCase, AskMatch } from '@/lib/fetch-demo/types'

export function askMatchesEqual(actual: AskMatch, expected: AskMatch): boolean {
  if (actual.type !== expected.type) return false
  switch (expected.type) {
    case 'person':
      return (
        actual.type === 'person' && actual.personSlug === expected.personSlug
      )
    case 'story':
      return actual.type === 'story' && actual.storySlug === expected.storySlug
    case 'prose':
      return actual.type === 'prose' && actual.answer === expected.answer
    case 'fallback':
      return actual.type === 'fallback' && actual.answer === expected.answer
  }
}

export type AskEvalResult = {
  id: string
  query: string
  pass: boolean
  expected: AskMatch
  actual: AskMatch
  note: string
}

export function scoreAskEvalCase(evalCase: AskEvalCase): AskEvalResult {
  const actual = matchAsk(evalCase.query)
  return {
    id: evalCase.id,
    query: evalCase.query,
    pass: askMatchesEqual(actual, evalCase.expected),
    expected: evalCase.expected,
    actual,
    note: evalCase.note,
  }
}

export function runAskEvals(
  cases: readonly AskEvalCase[] = askEvalCases,
): AskEvalResult[] {
  return cases.map(scoreAskEvalCase)
}
