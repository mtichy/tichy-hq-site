'use client'

import { useDemoRole } from '@/lib/fetch-demo/role-context'
import { storySummary } from '@/lib/fetch-demo/selectors'
import type { Story } from '@/lib/fetch-demo/types'

export function StorySummary({ story }: { story: Story }) {
  const { role } = useDemoRole()
  return (
    <section
      aria-label="Plain-language summary"
      className="rounded-md border border-border bg-card p-5 text-card-foreground"
    >
      <p className="text-regular leading-regular text-pretty text-card-foreground">
        {storySummary(story, role)}
      </p>
    </section>
  )
}
