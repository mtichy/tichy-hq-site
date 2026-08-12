export type TrendDirection = 'rising' | 'steady' | 'falling'

export type Topic =
  | 'Operations'
  | 'Technology'
  | 'People & Culture'
  | 'Sustainability'
  | 'Client Impact'
  | 'Research'

export type ReaderSeniority =
  'Manager' | 'Associate' | 'Director' | 'Analyst' | 'Support'

export type ReaderLocation =
  'North America' | 'EMEA' | 'Asia-Pacific' | 'Latin America'

export type ArrivalSource =
  'Email digest' | 'Intranet home' | 'Direct link' | 'Chat share'

/** Percent shares; must sum to 100 per story (and for aggregates). */
export type BreakdownShare<T extends string> = Readonly<Record<T, number>>

export type Person = {
  name: string
  slug: string
  roleTitle: string
  initials: string
  storyCount: number
}

export type Trend12 = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
]

/** Author voice is second person; editor voice is third person / publication. */
export type RoleAwareCopy = {
  readonly author: string
  readonly editor: string
}

export type Story = {
  headline: string
  slug: string
  authorSlug: string
  topic: Topic
  publishDate: string // ISO date
  pageviews: number
  trend: Trend12
  trendDirection: TrendDirection
  readerSeniority: BreakdownShare<ReaderSeniority>
  readerLocation: BreakdownShare<ReaderLocation>
  arrivalSource: BreakdownShare<ArrivalSource>
  /** Plain-language story read — voice depends on Viewing as. */
  plainLanguageSummary: RoleAwareCopy
  /** One-line note for story list rows — voice depends on Viewing as. */
  listNote: RoleAwareCopy
}

export type AnomalyKind =
  'resurfacing' | 'underperforming' | 'new-audience' | 'breakout' | 'quiet'

export type AnomalyScope = 'author' | 'publication'

export type Anomaly = {
  kind: AnomalyKind
  scope: AnomalyScope
  storySlug: string
  sentence: string
}

export type DemoRole = 'author' | 'editor'

export type DemoStateParam = 'empty' | 'loading' | 'error' | 'firstrun'

export type AskMatch =
  | { type: 'prose'; answer: string }
  | { type: 'person'; personSlug: string }
  | { type: 'story'; storySlug: string }
  | { type: 'fallback'; answer: string }

export type AskPair = {
  /** Lowercased keywords; any hit selects this pair. */
  keywords: readonly string[]
  response: AskMatch
}

export type BarItem = {
  label: string
  percent: number
}
