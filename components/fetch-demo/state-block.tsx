import { controlButtonClassName } from '@/components/hyperlink'
import type { DemoRole, DemoStateParam } from '@/lib/fetch-demo/types'
import { cn } from '@/lib/utils'

const COPY: Record<
  DemoStateParam,
  Record<DemoRole, { title: string; body: string }>
> = {
  firstrun: {
    author: {
      title: 'Nothing to measure yet.',
      body: "When you publish your first story, this is where you'll see how it lands. Usually within a day.",
    },
    editor: {
      title: 'Nothing to measure yet.',
      body: 'When the first story publishes, this is where movement across the publication will show up. Usually within a day.',
    },
  },
  empty: {
    author: {
      title: 'Everything is behaving normally.',
      body: "No unusual movement in your stories this week. That's a fine outcome, not a missing one.",
    },
    editor: {
      title: 'Everything is behaving normally.',
      body: "No unusual movement across the publication this week. That's a fine outcome, not a missing one.",
    },
  },
  loading: {
    author: {
      title: 'Loading…',
      body: 'Figures are on the way.',
    },
    editor: {
      title: 'Loading…',
      body: 'Figures are on the way.',
    },
  },
  error: {
    author: {
      title: "We couldn't reach the numbers just now.",
      body: 'Your stories are listed below without figures. Retry, or carry on reading.',
    },
    editor: {
      title: "We couldn't reach the numbers just now.",
      body: 'Stories are listed below without figures. Retry, or carry on reading.',
    },
  },
}

type StateBlockProps = {
  kind: Exclude<DemoStateParam, 'loading'>
  role?: DemoRole
  className?: string
  onRetry?: () => void
}

export function StateBlock({
  kind,
  role = 'author',
  className,
  onRetry,
}: StateBlockProps) {
  const copy = COPY[kind][role]
  return (
    <div
      className={cn(
        'rounded-md border border-border bg-card p-5 text-foreground',
        className,
      )}
      role="status"
    >
      <p className="text-medium font-bold leading-medium text-balance">
        {copy.title}
      </p>
      <p className="mt-2 text-regular leading-regular text-pretty text-muted-foreground">
        {copy.body}
      </p>
      {kind === 'error' && onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className={cn(controlButtonClassName, 'mt-4')}
        >
          Retry
        </button>
      ) : null}
    </div>
  )
}

export function stateCopy(kind: DemoStateParam, role: DemoRole = 'author') {
  return COPY[kind][role]
}
