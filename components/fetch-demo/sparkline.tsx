import type { TrendDirection } from '@/lib/fetch-demo/types'
import { cn } from '@/lib/utils'

type SparklineProps = {
  values: readonly number[]
  direction: TrendDirection
  width?: number
  height?: number
  className?: string
  showDirectionText?: boolean
}

export function Sparkline({
  values,
  direction,
  width = 72,
  height = 20,
  className,
  showDirectionText = true,
}: SparklineProps) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const padY = 2
  const points = values
    .map((v, i) => {
      const x = values.length === 1 ? 0 : (i / (values.length - 1)) * width
      const y = height - padY - ((v - min) / range) * (height - padY * 2)
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

  const first = values[0] ?? 0
  const last = values[values.length - 1] ?? 0
  const ariaLabel = `Views over 12 weeks, ${direction} from ${first.toLocaleString()} to ${last.toLocaleString()}`

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-foreground',
        className,
      )}
    >
      <svg
        role="img"
        aria-label={ariaLabel}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="shrink-0 overflow-visible"
      >
        <polyline
          fill="none"
          stroke="var(--color-brand-cyan)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
        />
      </svg>
      {showDirectionText ? (
        <span className="text-small leading-small text-muted-foreground">
          {direction}
        </span>
      ) : null}
    </span>
  )
}
