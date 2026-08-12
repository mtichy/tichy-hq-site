import {
  anomalies,
  askPairs,
  ARRIVAL_SOURCE,
  DEMO_TODAY,
  people,
  READER_LOCATION,
  READER_SENIORITY,
  SIGNED_IN_AUTHOR_SLUG,
  stories,
} from '@/lib/fetch-demo/data'
import type {
  Anomaly,
  AnomalyScope,
  ArrivalSource,
  AskMatch,
  BarItem,
  BreakdownShare,
  DemoRole,
  DemoStateParam,
  Person,
  ReaderLocation,
  ReaderSeniority,
  Story,
  Topic,
} from '@/lib/fetch-demo/types'

export function getPerson(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug)
}

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug)
}

export function getSignedInAuthor(): Person {
  const author = getPerson(SIGNED_IN_AUTHOR_SLUG)
  if (!author) {
    throw new Error(`Missing signed-in author: ${SIGNED_IN_AUTHOR_SLUG}`)
  }
  return author
}

export function storiesForAuthor(authorSlug: string): Story[] {
  return stories
    .filter((s) => s.authorSlug === authorSlug)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
}

export function storiesByTopic(topic: Topic): Story[] {
  return stories
    .filter((s) => s.topic === topic)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
}

export function allStoriesRecentFirst(): Story[] {
  return [...stories].sort((a, b) => b.publishDate.localeCompare(a.publishDate))
}

export function relatedStories(story: Story, limit = 3): Story[] {
  return stories
    .filter((s) => s.topic === story.topic && s.slug !== story.slug)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    .slice(0, limit)
}

export function anomaliesForScope(scope: AnomalyScope): Anomaly[] {
  return anomalies.filter((a) => a.scope === scope)
}

function anomalyKindFromStory(story: Story): Anomaly['kind'] {
  if (story.trendDirection === 'rising') return 'breakout'
  if (story.trendDirection === 'falling') return 'underperforming'
  return 'quiet'
}

function anomalySentenceFromStory(story: Story, scope: AnomalyScope): string {
  const note =
    scope === 'author' ? story.listNote.author : story.listNote.editor
  if (scope === 'author') {
    return note.endsWith('.') ? note : `${note}.`
  }
  const person = getPerson(story.authorSlug)
  const name = person?.name ?? 'This author'
  const noteTail = note.charAt(0).toLowerCase() + note.slice(1)
  return `${name}’s “${story.headline}” — ${noteTail}`
}

function anomalyFromStory(story: Story, scope: AnomalyScope): Anomaly {
  return {
    kind: anomalyKindFromStory(story),
    scope,
    storySlug: story.slug,
    sentence: anomalySentenceFromStory(story, scope),
  }
}

/**
 * Notable-movement cards for the current home filters.
 * Prefers curated catalog rows whose stories match, then backfills from the
 * filtered story list so Topic / Author / Time always reshapes the section.
 */
export function anomaliesForView(opts: {
  scope: AnomalyScope
  authorSlug?: string
  topic?: Topic | 'all'
  days?: number | 'all'
  limit?: number
}): Anomaly[] {
  const limit = opts.limit ?? 3
  const matchingStories = filterStories({
    authorSlug: opts.authorSlug,
    topic: opts.topic,
    days: opts.days,
  })
  if (matchingStories.length === 0) return []

  const matchingSlugs = new Set(matchingStories.map((s) => s.slug))
  const curated = anomalies.filter(
    (a) => a.scope === opts.scope && matchingSlugs.has(a.storySlug),
  )

  const usedSlugs = new Set(curated.map((a) => a.storySlug))
  const result = curated.slice(0, limit)

  for (const story of matchingStories) {
    if (result.length >= limit) break
    if (usedSlugs.has(story.slug)) continue
    result.push(anomalyFromStory(story, opts.scope))
    usedSlugs.add(story.slug)
  }

  return result
}

/**
 * Author voice only for the signed-in writer's own work while Viewing as Author.
 * Everyone else (editor view, other people's stories) gets editor/third-person voice.
 */
export function storyCopyVoice(
  story: Story,
  role: DemoRole,
  viewerSlug: string = SIGNED_IN_AUTHOR_SLUG,
): 'author' | 'editor' {
  return role === 'author' && story.authorSlug === viewerSlug
    ? 'author'
    : 'editor'
}

export function storyListNote(story: Story, role: DemoRole): string {
  return story.listNote[storyCopyVoice(story, role)]
}

export function storySummary(story: Story, role: DemoRole): string {
  return story.plainLanguageSummary[storyCopyVoice(story, role)]
}

export function breakdownToItems<T extends string>(
  share: BreakdownShare<T>,
  order: readonly T[],
): BarItem[] {
  return order.map((label) => ({
    label,
    percent: share[label],
  }))
}

export function storySeniorityItems(story: Story): BarItem[] {
  return breakdownToItems(story.readerSeniority, READER_SENIORITY)
}

export function storyLocationItems(story: Story): BarItem[] {
  return breakdownToItems(story.readerLocation, READER_LOCATION)
}

export function storyArrivalItems(story: Story): BarItem[] {
  return breakdownToItems(story.arrivalSource, ARRIVAL_SOURCE)
}

function emptySeniority(): Record<ReaderSeniority, number> {
  return {
    Manager: 0,
    Associate: 0,
    Director: 0,
    Analyst: 0,
    Support: 0,
  }
}

function emptyLocation(): Record<ReaderLocation, number> {
  return {
    'North America': 0,
    EMEA: 0,
    'Asia-Pacific': 0,
    'Latin America': 0,
  }
}

function emptyArrival(): Record<ArrivalSource, number> {
  return {
    'Email digest': 0,
    'Intranet home': 0,
    'Direct link': 0,
    'Chat share': 0,
  }
}

function normalizeShare<T extends string>(
  weighted: Record<T, number>,
  keys: readonly T[],
): BreakdownShare<T> {
  const total = keys.reduce((sum, k) => sum + weighted[k], 0)
  if (total === 0) {
    const even = Math.floor(100 / keys.length)
    const result = {} as Record<T, number>
    let remaining = 100
    keys.forEach((k, i) => {
      const value = i === keys.length - 1 ? remaining : even
      result[k] = value
      remaining -= value
    })
    return result
  }

  const raw = keys.map((k) => ({
    key: k,
    value: (weighted[k] / total) * 100,
  }))
  const floored = raw.map((r) => ({
    key: r.key,
    value: Math.floor(r.value),
    frac: r.value - Math.floor(r.value),
  }))
  let used = floored.reduce((sum, r) => sum + r.value, 0)
  const byFrac = [...floored].sort((a, b) => b.frac - a.frac)
  let i = 0
  while (used < 100 && i < byFrac.length) {
    byFrac[i].value += 1
    used += 1
    i += 1
  }
  const result = {} as Record<T, number>
  for (const row of floored) {
    result[row.key] = row.value
  }
  return result
}

/** Weight breakdowns by pageviews, then normalize to 100. */
export function aggregateBreakdowns(storyList: readonly Story[]): {
  seniority: BarItem[]
  location: BarItem[]
  arrival: BarItem[]
} {
  const sen = emptySeniority()
  const loc = emptyLocation()
  const arr = emptyArrival()

  for (const story of storyList) {
    const w = story.pageviews
    for (const key of READER_SENIORITY) {
      sen[key] += story.readerSeniority[key] * w
    }
    for (const key of READER_LOCATION) {
      loc[key] += story.readerLocation[key] * w
    }
    for (const key of ARRIVAL_SOURCE) {
      arr[key] += story.arrivalSource[key] * w
    }
  }

  return {
    seniority: breakdownToItems(
      normalizeShare(sen, READER_SENIORITY),
      READER_SENIORITY,
    ),
    location: breakdownToItems(
      normalizeShare(loc, READER_LOCATION),
      READER_LOCATION,
    ),
    arrival: breakdownToItems(
      normalizeShare(arr, ARRIVAL_SOURCE),
      ARRIVAL_SOURCE,
    ),
  }
}

export function personOverallSummary(
  person: Person,
  role: DemoRole = 'editor',
): string {
  const theirs = storiesForAuthor(person.slug)
  if (theirs.length === 0) {
    return `${person.name} has no published stories in this demo yet.`
  }
  const rising = theirs.filter((s) => s.trendDirection === 'rising').length
  const totalViews = theirs.reduce((sum, s) => sum + s.pageviews, 0)
  const top = [...theirs].sort((a, b) => b.pageviews - a.pageviews)[0]
  const ownAuthorVoice =
    role === 'author' && person.slug === SIGNED_IN_AUTHOR_SLUG
  if (ownAuthorVoice) {
    return `Across ${theirs.length} stories, you’ve drawn ${totalViews.toLocaleString()} views. ${rising} ${rising === 1 ? 'is' : 'are'} rising right now. Your strongest piece is “${top.headline}.”`
  }
  return `Across ${theirs.length} stories, ${person.name} has drawn ${totalViews.toLocaleString()} views. ${rising} ${rising === 1 ? 'is' : 'are'} rising right now. Strongest piece: “${top.headline}.”`
}

export function matchAsk(query: string): AskMatch {
  const q = query.trim().toLowerCase()
  if (!q) {
    return (
      askPairs.find((p) => p.response.type === 'fallback')?.response ?? {
        type: 'fallback',
        answer:
          "I don't have an answer for that one. Try naming a person or a topic.",
      }
    )
  }

  for (const pair of askPairs) {
    if (pair.response.type === 'fallback') continue
    if (pair.keywords.some((kw) => q.includes(kw))) {
      return pair.response
    }
  }

  // Direct person / story name lookup beyond keyword pairs
  const personHit = people.find(
    (p) =>
      q.includes(p.name.toLowerCase()) || q.includes(p.slug.replace(/-/g, ' ')),
  )
  if (personHit) {
    return { type: 'person', personSlug: personHit.slug }
  }

  const storyHit = stories.find(
    (s) =>
      q.includes(s.headline.toLowerCase()) ||
      q.includes(s.slug.replace(/-/g, ' ')),
  )
  if (storyHit) {
    return { type: 'story', storySlug: storyHit.slug }
  }

  return (
    askPairs.find((p) => p.response.type === 'fallback')?.response ?? {
      type: 'fallback',
      answer:
        "I don't have an answer for that one. Try naming a person or a topic. For example, 'Dana Whitfield' or 'what is resurfacing'.",
    }
  )
}

export function parseDemoState(
  value: string | string[] | undefined,
): DemoStateParam | null {
  const raw = Array.isArray(value) ? value[0] : value
  if (
    raw === 'empty' ||
    raw === 'loading' ||
    raw === 'error' ||
    raw === 'firstrun'
  ) {
    return raw
  }
  return null
}

export function filterStories(opts: {
  authorSlug?: string
  topic?: Topic | 'all'
  days?: number | 'all'
}): Story[] {
  let list =
    opts.authorSlug !== undefined
      ? storiesForAuthor(opts.authorSlug)
      : allStoriesRecentFirst()

  if (opts.topic && opts.topic !== 'all') {
    list = list.filter((s) => s.topic === opts.topic)
  }

  if (opts.days && opts.days !== 'all') {
    const cutoff = new Date(`${DEMO_TODAY}T12:00:00Z`)
    cutoff.setUTCDate(cutoff.getUTCDate() - opts.days)
    const cutoffIso = cutoff.toISOString().slice(0, 10)
    list = list.filter((s) => s.publishDate >= cutoffIso)
  }

  return list
}

export function formatPublishDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function anomalyLabel(kind: Anomaly['kind']): {
  glyph: string
  label: string
} {
  switch (kind) {
    case 'resurfacing':
      return { glyph: '↑', label: 'RESURFACING' }
    case 'underperforming':
      return { glyph: '↓', label: 'UNDERPERFORMING' }
    case 'new-audience':
      return { glyph: '◆', label: 'NEW AUDIENCE' }
    case 'breakout':
      return { glyph: '↑', label: 'BREAKOUT' }
    case 'quiet':
      return { glyph: '·', label: 'QUIET WEEK' }
  }
}
