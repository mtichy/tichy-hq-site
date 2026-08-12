'use client'

import { useDemoRole } from '@/lib/fetch-demo/role-context'
import { personOverallSummary } from '@/lib/fetch-demo/selectors'
import type { Person } from '@/lib/fetch-demo/types'

export function PersonSummary({ person }: { person: Person }) {
  const { role } = useDemoRole()
  return (
    <section
      aria-label="Overall summary"
      className="rounded-md border border-border bg-card p-5"
    >
      <p className="text-regular leading-regular text-pretty text-foreground">
        {personOverallSummary(person, role)}
      </p>
    </section>
  )
}
