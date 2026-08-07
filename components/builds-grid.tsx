import { Card } from '@/components/card'
import { buildProjects, projectHref } from '@/lib/builds'

/** Mosaic of project cards for the /builds index. Row-major grid so
 * leftover cards on a new row start at the left. */
export function BuildsGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {buildProjects.map((project, index) => (
        <Card
          key={project.slug}
          className="max-w-none"
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
