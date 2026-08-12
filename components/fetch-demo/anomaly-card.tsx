import Link from 'next/link'
import { DEMO_BASE } from '@/lib/fetch-demo/data'
import { anomalyLabel } from '@/lib/fetch-demo/selectors'
import type { Anomaly } from '@/lib/fetch-demo/types'
import { cn } from '@/lib/utils'

type AnomalyCardProps = {
  anomaly: Anomaly
  className?: string
}

export function AnomalyCard({ anomaly, className }: AnomalyCardProps) {
  const { glyph, label } = anomalyLabel(anomaly.kind)
  return (
    <Link
      href={`${DEMO_BASE}/stories/${anomaly.storySlug}`}
      className={cn(
        'block rounded-md border border-border bg-card p-4 text-card-foreground outline-none transition-shadow',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'hover:shadow-[var(--elevation-raised)]',
        className,
      )}
    >
      <p className="mb-2 text-small leading-small font-bold tracking-wide uppercase">
        <span aria-hidden="true">{glyph} </span>
        {label}
      </p>
      <p className="text-small leading-small font-medium text-pretty">
        {anomaly.sentence}
      </p>
    </Link>
  )
}
