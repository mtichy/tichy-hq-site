'use client'

import { useState } from 'react'
import { BuildsGrid } from '@/components/builds-grid'
import { navLinkClassName } from '@/components/nav-link'
import { type BuildsFilter, publishedBuildProjects } from '@/lib/builds'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'projects', label: 'Projects' },
  { id: 'labs', label: 'Labs' },
] as const satisfies readonly { id: BuildsFilter; label: string }[]

/**
 * /builds mosaic with All / Projects / Labs filters.
 * Filter chrome is the NavLink filter variant (regular size, no default blur).
 */
export function BuildsMosaic() {
  const [filter, setFilter] = useState<BuildsFilter>('all')
  const projects = publishedBuildProjects(filter)

  return (
    <div className="flex flex-col gap-8">
      <div
        role="group"
        aria-label="Filter builds"
        className="flex flex-wrap items-center gap-8"
      >
        {FILTERS.map((item) => {
          const selected = filter === item.id
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(item.id)}
              className={navLinkClassName({ selected, variant: 'filter' })}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <BuildsGrid projects={projects} />
    </div>
  )
}
