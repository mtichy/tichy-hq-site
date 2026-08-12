'use client'

import { useState } from 'react'
import { controlButtonClassName } from '@/components/hyperlink'
import { people, TOPICS } from '@/lib/fetch-demo/data'
import type { Topic } from '@/lib/fetch-demo/types'
import { cn } from '@/lib/utils'

export type StoryFilterValue = {
  authorSlug: string | 'all'
  topic: Topic | 'all'
  days: 30 | 90 | 'all'
}

type StoryFiltersProps = {
  value: StoryFilterValue
  onChange: (next: StoryFilterValue) => void
  /** Author view: collapsed disclosure. Editor: always visible. */
  variant: 'disclosure' | 'foreground'
  className?: string
}

const DAY_OPTIONS: { value: 30 | 90 | 'all'; label: string }[] = [
  { value: 30, label: 'Last 30 days' },
  { value: 90, label: 'Last 90 days' },
  { value: 'all', label: 'All time' },
]

const AUTHORS = [...people].sort((a, b) => a.name.localeCompare(b.name))

function FilterControls({
  value,
  onChange,
}: {
  value: StoryFilterValue
  onChange: (next: StoryFilterValue) => void
}) {
  return (
    <fieldset className="flex flex-col gap-3 border-0 p-0 sm:flex-row sm:flex-wrap sm:items-end">
      <legend className="sr-only">Filter stories</legend>
      <label className="flex flex-col gap-1 text-small leading-small">
        <span className="text-muted-foreground">Topic</span>
        <select
          value={value.topic}
          onChange={(e) =>
            onChange({
              ...value,
              topic: e.target.value as Topic | 'all',
            })
          }
          className="rounded-md border border-border bg-card px-3 py-2 text-small leading-small font-bold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="all">All topics</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-small leading-small">
        <span className="text-muted-foreground">Author</span>
        <select
          value={value.authorSlug}
          onChange={(e) =>
            onChange({
              ...value,
              authorSlug: e.target.value,
            })
          }
          className="rounded-md border border-border bg-card px-3 py-2 text-small leading-small font-bold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="all">All authors</option>
          {AUTHORS.map((person) => (
            <option key={person.slug} value={person.slug}>
              {person.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-small leading-small">
        <span className="text-muted-foreground">Time range</span>
        <select
          value={String(value.days)}
          onChange={(e) => {
            const raw = e.target.value
            const days = raw === 'all' ? 'all' : (Number(raw) as 30 | 90)
            onChange({ ...value, days })
          }}
          className="rounded-md border border-border bg-card px-3 py-2 text-small leading-small font-bold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {DAY_OPTIONS.map((o) => (
            <option key={String(o.value)} value={String(o.value)}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    </fieldset>
  )
}

export function StoryFilters({
  value,
  onChange,
  variant,
  className,
}: StoryFiltersProps) {
  const [open, setOpen] = useState(false)

  if (variant === 'foreground') {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <FilterControls value={value} onChange={onChange} />
      </div>
    )
  }

  return (
    <details
      className={cn('group', className)}
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary
        className={cn(
          controlButtonClassName,
          'list-none marker:content-none [&::-webkit-details-marker]:hidden',
        )}
      >
        Explore all content {open ? '−' : '+'}
      </summary>
      <div className="mt-4">
        <FilterControls value={value} onChange={onChange} />
      </div>
    </details>
  )
}

export function filterScopeLabel(value: StoryFilterValue): string | null {
  const parts: string[] = []
  if (value.topic !== 'all') parts.push(value.topic)
  if (value.authorSlug !== 'all') {
    const person = people.find((p) => p.slug === value.authorSlug)
    parts.push(person?.name ?? value.authorSlug)
  }
  if (value.days === 30) parts.push('last 30 days')
  if (value.days === 90) parts.push('last 90 days')
  if (parts.length === 0) return null
  return parts.join(' · ')
}

export const DEFAULT_FILTERS: StoryFilterValue = {
  authorSlug: 'all',
  topic: 'all',
  days: 'all',
}
