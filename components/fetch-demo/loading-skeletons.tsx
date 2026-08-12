'use client'

import { useDemoRole } from '@/lib/fetch-demo/role-context'
import { cn } from '@/lib/utils'

const pulseClass = 'motion-safe:animate-pulse motion-reduce:animate-none'

export function AnomalyCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-[7.5rem] rounded-md border border-border bg-muted',
        pulseClass,
        className,
      )}
      aria-hidden="true"
    />
  )
}

export function StoryRowSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-[5.5rem] flex-col justify-center gap-2 border-b border-border py-4',
        pulseClass,
        className,
      )}
      aria-hidden="true"
    >
      <div className="h-4 w-3/4 rounded bg-muted" />
      <div className="h-3 w-1/3 rounded bg-muted" />
      <div className="h-3 w-1/2 rounded bg-muted" />
    </div>
  )
}

export function HomeLoadingSkeleton() {
  const { role } = useDemoRole()
  return (
    <div className="flex flex-col gap-8" aria-busy="true">
      <p className="sr-only" role="status" aria-live="polite">
        {role === 'author' ? 'Loading your stories…' : 'Loading stories…'}
      </p>
      <div
        className={cn('h-8 w-2/3 rounded bg-muted', pulseClass)}
        aria-hidden="true"
      />
      <div className="grid gap-3 sm:grid-cols-3" aria-hidden="true">
        <AnomalyCardSkeleton />
        <AnomalyCardSkeleton />
        <AnomalyCardSkeleton />
      </div>
      <div aria-hidden="true">
        <div className={cn('mb-3 h-6 w-40 rounded bg-muted', pulseClass)} />
        <StoryRowSkeleton />
        <StoryRowSkeleton />
        <StoryRowSkeleton />
        <StoryRowSkeleton />
      </div>
    </div>
  )
}
