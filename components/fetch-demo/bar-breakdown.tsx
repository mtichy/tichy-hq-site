import type { BarItem } from '@/lib/fetch-demo/types'
import { cn } from '@/lib/utils'

type BarBreakdownProps = {
  id: string
  title: string
  caption: string
  items: readonly BarItem[]
  className?: string
}

export function BarBreakdown({
  id,
  title,
  caption,
  items,
  className,
}: BarBreakdownProps) {
  const captionId = `${id}-caption`
  const max = Math.max(...items.map((i) => i.percent), 1)

  return (
    <section
      className={cn('flex flex-col gap-3', className)}
      aria-labelledby={id}
    >
      <div>
        <h3
          id={id}
          className="text-medium font-bold leading-medium text-foreground"
        >
          {title}
        </h3>
        <p
          id={captionId}
          className="text-small leading-small text-muted-foreground"
        >
          {caption}
        </p>
      </div>
      <ul className="flex flex-col gap-2" aria-labelledby={captionId}>
        {items.map((item) => {
          const widthPct = Math.max((item.percent / max) * 100, 8)
          return (
            <li
              key={item.label}
              className="grid grid-cols-[minmax(7rem,9rem)_1fr_auto] items-center gap-2 sm:grid-cols-[minmax(8rem,10rem)_1fr_auto]"
            >
              <span className="text-small leading-small text-foreground">
                {item.label}
              </span>
              <div className="min-w-0">
                <div
                  className="h-3 min-w-[0.5rem] rounded-sm bg-primary"
                  style={{ width: `${widthPct}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className="text-small leading-small tabular-nums text-foreground">
                {item.percent}%
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
