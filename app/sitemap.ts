import type { MetadataRoute } from 'next'
import { buildProjects, projectHref } from '@/lib/builds'
import { siteUrl } from '@/lib/site'

const standaloneRoutes = ['', '/resume', '/builds'] as const

const routes = [...standaloneRoutes, ...buildProjects.map(projectHref)]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))
}
