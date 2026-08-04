import { notFound } from 'next/navigation'

/**
 * Private component lab under `/test/*`.
 * Available in `next dev` / local builds only — 404s in production.
 * Also disallowed in `app/robots.ts`.
 */
export default function TestLabLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return children
}
