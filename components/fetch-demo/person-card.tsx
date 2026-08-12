import Link from 'next/link'
import { DEMO_BASE } from '@/lib/fetch-demo/data'
import type { Person } from '@/lib/fetch-demo/types'
import { cn } from '@/lib/utils'

type PersonCardProps = {
  person: Person
  className?: string
}

export function PersonCard({ person, className }: PersonCardProps) {
  return (
    <Link
      href={`${DEMO_BASE}/people/${person.slug}`}
      className={cn(
        'flex items-center gap-4 rounded-md border border-border bg-card p-4 text-foreground outline-none',
        'hover:shadow-[var(--elevation-raised)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <span
        className="flex size-12 shrink-0 items-center justify-center rounded-md bg-secondary text-regular font-bold text-secondary-foreground"
        aria-hidden="true"
      >
        {person.initials}
      </span>
      <span className="min-w-0">
        <span className="block text-regular font-medium leading-regular">
          {person.name}
        </span>
        <span className="block text-small leading-small text-muted-foreground">
          {person.roleTitle} · {person.storyCount}{' '}
          {person.storyCount === 1 ? 'story' : 'stories'}
        </span>
      </span>
    </Link>
  )
}
