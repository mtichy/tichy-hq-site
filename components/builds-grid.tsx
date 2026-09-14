'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/card'
import {
  type BuildProject,
  publishedBuildProjects,
  projectHref,
} from '@/lib/builds'

const GAP_PX = 32

function useViewportColumns() {
  const [columns, setColumns] = useState(1)

  useEffect(() => {
    const sm = window.matchMedia('(min-width: 640px)')
    const xl = window.matchMedia('(min-width: 1280px)')
    const update = () => setColumns(xl.matches ? 3 : sm.matches ? 2 : 1)
    update()
    sm.addEventListener('change', update)
    xl.addEventListener('change', update)
    return () => {
      sm.removeEventListener('change', update)
      xl.removeEventListener('change', update)
    }
  }, [])

  return columns
}

/** Mosaic of project cards for the /builds index. Packs into the shortest
 * column so staggered heights keep a consistent 32px gap. */
export function BuildsGrid({
  projects = publishedBuildProjects(),
}: {
  projects?: readonly BuildProject[]
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const columns = useViewportColumns()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const items = [...root.children] as HTMLElement[]

    const reset = () => {
      items.forEach((el) => {
        el.style.position = ''
        el.style.left = ''
        el.style.top = ''
        el.style.width = ''
      })
      root.style.height = ''
    }

    const layout = () => {
      if (columns === 1) {
        reset()
        return
      }

      const colWidth = (root.clientWidth - GAP_PX * (columns - 1)) / columns
      const heights = Array.from({ length: columns }, () => 0)

      items.forEach((el) => {
        const col = heights.indexOf(Math.min(...heights))
        el.style.position = 'absolute'
        el.style.width = `${colWidth}px`
        el.style.left = `${col * (colWidth + GAP_PX)}px`
        el.style.top = `${heights[col]}px`
        heights[col] += el.offsetHeight + GAP_PX
      })

      root.style.height = `${Math.max(0, ...heights) - GAP_PX}px`
    }

    layout()
    const observer = new ResizeObserver(layout)
    observer.observe(root)
    items.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      reset()
    }
  }, [columns, projects])

  return (
    <div ref={rootRef} className="relative">
      {projects.map((project, index) => (
        <Card
          key={project.slug}
          className="mb-8 max-w-none sm:mb-0"
          title={project.title}
          description={project.description}
          tags={project.tags}
          image={{
            ...project.image,
            priority: index === 0 ? true : project.image.priority,
          }}
          href={projectHref(project)}
          ctaLabel={project.ctaLabel}
        />
      ))}
    </div>
  )
}
