import { describe, expect, it } from 'vitest'
import { askEvalCases } from '@/lib/fetch-demo/ask-evals'
import { runAskEvals } from '@/lib/fetch-demo/score-ask-eval'

describe('Ask Fetch golden evals', () => {
  it('has a frozen case list', () => {
    expect(askEvalCases.length).toBeGreaterThan(0)
  })

  it.each(askEvalCases.map((c) => [c.id, c] as const))(
    '%s',
    (_id, evalCase) => {
      const [result] = runAskEvals([evalCase])
      expect(result.actual, evalCase.note).toEqual(evalCase.expected)
      expect(result.pass).toBe(true)
    },
  )
})
