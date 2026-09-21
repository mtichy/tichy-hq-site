import { Card } from '@/components/card'
import { Hyperlink } from '@/components/hyperlink'
import { homepageProjects, projectHref } from '@/lib/builds'

/**
 * Homepage Projects grid: four flush cards on the page, then a link to /builds.
 * Four columns at lg match the 12-col canvas (288px cards + 24px gutters = 1224).
 */
export function ProjectsSection() {
  const projects = homepageProjects()

  return (
    <section className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 py-16 lg:pb-32">
      <header className="flex flex-col gap-4">
        <h2 className="text-mega font-bold leading-mega text-balance text-foreground">
          Projects
        </h2>
        <p className="text-regular leading-regular text-foreground">
          View more work on my <Hyperlink href="/builds">Builds page</Hyperlink>
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, index) => (
          <Card
            key={project.slug}
            variant="flush"
            className="max-w-none"
            title={project.title}
            description={project.description}
            image={{
              ...project.image,
              priority: index === 0,
            }}
            href={projectHref(project)}
            ctaLabel={project.ctaLabel}
          />
        ))}
      </div>
    </section>
  )
}
