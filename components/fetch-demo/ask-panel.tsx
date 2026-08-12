'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { PersonCard } from '@/components/fetch-demo/person-card'
import { controlButtonClassName } from '@/components/hyperlink'
import { DEMO_BASE } from '@/lib/fetch-demo/data'
import { useDemoRole } from '@/lib/fetch-demo/role-context'
import {
  getPerson,
  getStory,
  matchAsk,
  storyListNote,
} from '@/lib/fetch-demo/selectors'
import type { AskMatch } from '@/lib/fetch-demo/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SUGGESTIONS = [
  'What is resurfacing?',
  'Compare Dana and Marcus',
  'Who is reading in EMEA?',
  'Dana Whitfield',
] as const

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function AskResponseView({ result }: { result: AskMatch }) {
  const { role } = useDemoRole()
  if (result.type === 'person') {
    const person = getPerson(result.personSlug)
    if (!person) return null
    return <PersonCard person={person} />
  }
  if (result.type === 'story') {
    const story = getStory(result.storySlug)
    if (!story) return null
    return (
      <div className="rounded-md border border-border bg-card p-4">
        <p className="text-small leading-small text-muted-foreground">Story</p>
        <Link
          href={`${DEMO_BASE}/stories/${story.slug}`}
          className="mt-1 block text-regular font-medium leading-regular text-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          {story.headline}
        </Link>
        <p className="mt-2 text-small leading-small font-medium text-pretty text-muted-foreground">
          {storyListNote(story, role)}
        </p>
      </div>
    )
  }
  return (
    <p className="text-small leading-small font-medium text-pretty text-foreground">
      {result.answer}
    </p>
  )
}

export function AskPanel({ className }: { className?: string }) {
  const inputId = useId()
  const reducedMotion = usePrefersReducedMotion()
  const [query, setQuery] = useState('')
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState<AskMatch | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function runAsk(text: string) {
    setQuery(text)
    setPending(true)
    setResult(null)
    if (timerRef.current) clearTimeout(timerRef.current)
    const delay = reducedMotion ? 0 : 650
    timerRef.current = setTimeout(() => {
      setResult(matchAsk(text))
      setPending(false)
    }, delay)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          runAsk(query)
        }}
        className="flex flex-col gap-3"
      >
        <label htmlFor={inputId} className="sr-only">
          Ask a question, or type a name
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question, or type a name…"
          className="w-full rounded-md border border-border bg-card px-4 py-3 text-small leading-small font-medium text-foreground outline-none placeholder:text-small placeholder:leading-small placeholder:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          autoComplete="off"
        />
        <button
          type="submit"
          className={cn(controlButtonClassName, 'self-start')}
        >
          Ask
        </button>
      </form>

      <ul className="flex flex-wrap gap-2" aria-label="Suggested prompts">
        {SUGGESTIONS.map((s) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => runAsk(s)}
              className="rounded-md border border-border bg-card px-3 py-1.5 text-small leading-small font-medium text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              {s}
            </button>
          </li>
        ))}
      </ul>

      <div
        aria-live="polite"
        aria-busy={pending}
        className="min-h-[4rem] rounded-md border border-border bg-card p-4"
      >
        {pending ? (
          <p className="text-small leading-small font-medium text-muted-foreground">
            Looking that up…
          </p>
        ) : result ? (
          <AskResponseView result={result} />
        ) : (
          <p className="text-small leading-small font-medium text-muted-foreground">
            Ask about a trend, a person, or a story. Answers are keyword-matched
            from synthetic demo data.
          </p>
        )}
      </div>
    </div>
  )
}
