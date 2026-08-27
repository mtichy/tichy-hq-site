import type { AskEvalCase, AskMatch } from '@/lib/fetch-demo/types'

const FALLBACK: AskMatch = {
  type: 'fallback',
  answer:
    "I don't have an answer for that one. Try naming a person or a topic. For example, 'Dana Whitfield' or 'what is resurfacing'.",
}

const RESURFACING: AskMatch = {
  type: 'prose',
  answer:
    'Dana Whitfield’s “The quiet cost of meeting sprawl” is resurfacing — up roughly 240% this week after eight quiet weeks. Chat shares are driving most of the new traffic.',
}

const COMPARE: AskMatch = {
  type: 'prose',
  answer:
    'Dana Whitfield’s recent work is led by resurfacing older pieces; Marcus Oyelaran’s is led by a steady climb on automation. Dana’s strongest readers are Managers; Marcus’s are Analysts.',
}

const AUDIENCE: AskMatch = {
  type: 'prose',
  answer:
    'For Dana Whitfield right now, Managers in EMEA are the largest reader group — a shift from North America–first when meeting sprawl first published.',
}

/**
 * Golden Ask cases. Separate from `askPairs` so canned demo copy can change
 * without silently rewriting the contract — and so collisions / fallbacks
 * are scored on purpose, not only the happy-path keywords.
 */
export const askEvalCases: readonly AskEvalCase[] = [
  {
    id: 'resurfacing-phrase',
    query: 'what is resurfacing',
    expected: RESURFACING,
    note: 'Happy path: first keyword pair (resurfacing).',
  },
  {
    id: 'meeting-sprawl',
    query: 'Tell me about meeting sprawl',
    expected: RESURFACING,
    note: 'Happy path: same pair via a different keyword.',
  },
  {
    id: 'compare-authors',
    query: 'compare Dana and Marcus',
    expected: COMPARE,
    note: 'Happy path: comparison pair. First pair does not steal this query.',
  },
  {
    id: 'audience-who-is-reading',
    query: 'who is reading',
    expected: AUDIENCE,
    note: 'Happy path: audience / seniority pair.',
  },
  {
    id: 'dana-full-name',
    query: 'Dana Whitfield',
    expected: { type: 'person', personSlug: 'dana-whitfield' },
    note: 'Happy path: person keyword pair (walks past earlier pairs).',
  },
  {
    id: 'hannah-story',
    query: 'Hannah',
    expected: {
      type: 'story',
      storySlug: 'ship-smaller-what-we-changed-after-the-outage',
    },
    note: 'Happy path: story pair for Lindqvist / ship smaller.',
  },
  {
    id: 'priya-onboarding',
    query: 'Priya onboarding',
    expected: {
      type: 'story',
      storySlug: 'the-onboarding-problem-nobody-owns',
    },
    note: 'Happy path: onboarding story pair.',
  },
  {
    id: 'empty-query',
    query: '',
    expected: FALLBACK,
    note: 'Empty input is a scored fallback, not an unhandled hole.',
  },
  {
    id: 'whitespace-query',
    query: '   ',
    expected: FALLBACK,
    note: 'Whitespace-only trims to empty and must still fallback.',
  },
  {
    id: 'unknown-topic',
    query: 'what is the weather this week',
    expected: FALLBACK,
    note: 'Should-fallback: a question with no keyword, person, or story hit.',
  },
  {
    id: 'emea-steals-audience',
    query: 'what is the weather in EMEA',
    expected: AUDIENCE,
    note: 'Collision: “emea” is an audience keyword, so a weather question still routes to Dana’s readers.',
  },
  {
    id: 'unknown-person-shaped',
    query: 'how did Jordan Patel do last month',
    expected: FALLBACK,
    note: 'Should-fallback: person-shaped question for someone not in fixtures.',
  },
  {
    id: 'keyword-order-sprawl-vs',
    query: 'Is there meeting sprawl vs automation?',
    expected: RESURFACING,
    note: 'Collision: first matching pair wins. “sprawl” beats later “vs”.',
  },
  {
    id: 'vs-steals-compare',
    query: 'what about Dana vs Marcus',
    expected: COMPARE,
    note: 'Collision: “vs” hits the compare pair before the Dana person pair.',
  },
  {
    id: 'partial-marcus',
    query: 'Marcus',
    expected: FALLBACK,
    note: 'Gap: first name alone is not a keyword and person lookup needs the full name or slug phrase.',
  },
  {
    id: 'marcus-full-name',
    query: 'Marcus Oyelaran',
    expected: { type: 'person', personSlug: 'marcus-oyelaran' },
    note: 'Name lookup beyond keyword pairs (Marcus is not a solo keyword).',
  },
  {
    id: 'story-headline-lookup',
    query: 'What we learned running 200 hybrid teams',
    expected: {
      type: 'story',
      storySlug: 'what-we-learned-running-200-hybrid-teams',
    },
    note: 'Headline lookup when no keyword pair fires.',
  },
]
