import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type BreakoutItem = {
  label: string
  value: ReactNode
}

export type BreakoutBoxProps = {
  items: readonly BreakoutItem[]
  /** Right-column facts. When omitted, the box is a single column. */
  highlights?: readonly BreakoutItem[]
  title?: string
  className?: string
}

function BreakoutFacts({
  items,
  className,
}: {
  items: readonly BreakoutItem[]
  className?: string
}) {
  return (
    <dl className={cn('m-0 flex min-w-0 flex-1 flex-col gap-4', className)}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <dt className="text-small font-bold leading-small">{item.label}</dt>
          <dd className="m-0 text-small leading-small text-pretty">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * Static project highlight callout (raised Card face, no image or interaction).
 */
export function BreakoutBox({
  items,
  highlights,
  title = 'At a glance',
  className,
}: BreakoutBoxProps) {
  const headingId = useId()
  const hasHighlights = Boolean(highlights && highlights.length > 0)

  return (
    <aside
      aria-labelledby={headingId}
      className={cn(
        'w-full rounded-md bg-card p-6 text-card-foreground',
        'shadow-[var(--elevation-rest)]',
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        <h2
          id={headingId}
          className="text-medium font-bold leading-medium text-balance"
        >
          {title}
        </h2>
        <div
          className={cn(
            'flex flex-col gap-8',
            hasHighlights && 'md:flex-row md:gap-0',
          )}
        >
          <BreakoutFacts items={items} className="md:pr-8" />
          {highlights && highlights.length > 0 ? (
            <>
              <div
                aria-hidden
                className="h-px w-full shrink-0 bg-border md:h-auto md:w-px md:self-stretch"
              />
              <BreakoutFacts items={highlights} className="md:pl-8" />
            </>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
