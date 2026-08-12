'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AnomalyCard } from '@/components/fetch-demo/anomaly-card'
import { HomeLoadingSkeleton } from '@/components/fetch-demo/loading-skeletons'
import { StateBlock } from '@/components/fetch-demo/state-block'
import {
  DEFAULT_FILTERS,
  filterScopeLabel,
  StoryFilters,
  type StoryFilterValue,
} from '@/components/fetch-demo/story-filters'
import { StoryRow } from '@/components/fetch-demo/story-row'
import { DEMO_BASE, SIGNED_IN_AUTHOR_SLUG } from '@/lib/fetch-demo/data'
import { useDemoRole } from '@/lib/fetch-demo/role-context'
import {
  anomaliesForView,
  filterStories,
  getSignedInAuthor,
} from '@/lib/fetch-demo/selectors'
import type { DemoStateParam } from '@/lib/fetch-demo/types'

type HomeViewProps = {
  demoState: DemoStateParam | null
}

function AuthorGreeting({ firstName }: { firstName: string }) {
  return (
    <>
      <span aria-hidden="true">👋🏻 </span>
      {firstName}, here&apos;s how your work is doing
    </>
  )
}

export function HomeView({ demoState }: HomeViewProps) {
  const router = useRouter()
  const { role } = useDemoRole()
  const author = getSignedInAuthor()
  const firstName = author.name.split(' ')[0] ?? author.name
  const [filters, setFilters] = useState<StoryFilterValue>(DEFAULT_FILTERS)

  const scopeLabel = filterScopeLabel(filters)
  // Author default = Dana’s work. Applying filters exits that personalized
  // state and explores the full publication (matches “Explore all content”).
  const exploringAll = role === 'editor' || scopeLabel !== null
  const filterAuthorSlug = exploringAll
    ? filters.authorSlug === 'all'
      ? undefined
      : filters.authorSlug
    : SIGNED_IN_AUTHOR_SLUG

  const filtered =
    demoState === 'firstrun'
      ? []
      : filterStories({
          authorSlug: filterAuthorSlug,
          topic: filters.topic,
          days: filters.days,
        })

  // Author default stays personal. Exploring / editor uses publication cards,
  // always constrained to the same story filters as the list below.
  const anomalyScope =
    role === 'author' && !exploringAll ? 'author' : 'publication'

  const anomalyList =
    demoState === 'empty' || demoState === 'firstrun'
      ? []
      : anomaliesForView({
          scope: anomalyScope,
          authorSlug: filterAuthorSlug,
          topic: filters.topic,
          days: filters.days,
        })

  if (demoState === 'loading') {
    return <HomeLoadingSkeleton />
  }

  if (demoState === 'firstrun') {
    return (
      <div className="flex flex-col gap-8">
        <h1 className="text-large font-bold leading-large text-balance text-foreground">
          {role === 'author' ? (
            <AuthorGreeting firstName={firstName} />
          ) : (
            'The publication this week'
          )}
        </h1>
        <StateBlock kind="firstrun" role={role} />
      </div>
    )
  }

  const heading =
    role === 'author'
      ? scopeLabel
        ? `Showing: ${scopeLabel}`
        : null
      : scopeLabel
        ? `Showing: ${scopeLabel}`
        : 'The publication this week'

  const hideMetrics = demoState === 'error'

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-large font-bold leading-large text-balance text-foreground">
          {heading === null ? (
            <AuthorGreeting firstName={firstName} />
          ) : (
            heading
          )}
        </h1>
        {scopeLabel ? (
          <button
            type="button"
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="self-start text-small leading-small font-medium text-foreground underline decoration-[var(--color-brand-magenta)] underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {role === 'author' ? 'Back to your default view' : 'Clear filters'}
          </button>
        ) : null}
      </div>

      {role === 'editor' ? (
        <StoryFilters
          variant="foreground"
          value={filters}
          onChange={setFilters}
        />
      ) : null}

      {demoState === 'error' ? (
        <StateBlock
          kind="error"
          role={role}
          onRetry={() => router.replace(DEMO_BASE)}
        />
      ) : null}

      {demoState === 'empty' ? (
        <StateBlock kind="empty" role={role} />
      ) : anomalyList.length > 0 ? (
        <section
          aria-labelledby="notable-movement-heading"
          className="flex flex-col gap-3"
        >
          <h2
            id="notable-movement-heading"
            className="text-medium font-bold leading-medium text-foreground"
          >
            Notable movement
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {anomalyList.slice(0, 3).map((anomaly, index) => (
              <AnomalyCard
                key={`${anomaly.kind}-${anomaly.storySlug}-${index}`}
                anomaly={anomaly}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="stories-heading">
        <h2
          id="stories-heading"
          className="mb-2 text-medium font-bold leading-medium text-foreground"
        >
          {role === 'author' && !exploringAll ? 'Your stories' : 'Stories'}
        </h2>
        {filtered.length === 0 ? (
          <p className="text-regular leading-regular text-muted-foreground">
            No stories match these filters.
          </p>
        ) : (
          <ul className="list-none">
            {filtered.map((story) => (
              <StoryRow
                key={story.slug}
                story={story}
                showAuthor={exploringAll}
                hideMetrics={hideMetrics}
              />
            ))}
          </ul>
        )}
      </section>

      {role === 'author' ? (
        <StoryFilters
          variant="disclosure"
          value={filters}
          onChange={setFilters}
        />
      ) : null}
    </div>
  )
}
