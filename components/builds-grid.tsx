import { Card } from '@/components/card'
import { buildProjects, projectHref } from '@/lib/builds'

/** Mosaic of project cards for the /builds index. */
export function BuildsGrid() {
  return (
    <div className="columns-1 gap-8 sm:columns-2 xl:columns-3">
      {buildProjects.map((project, index) => (
        <Card
          key={project.slug}
          className="mb-8 max-w-none break-inside-avoid"
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
