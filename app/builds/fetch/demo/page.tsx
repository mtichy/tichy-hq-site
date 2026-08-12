import type { Metadata } from 'next'
import { HomeView } from '@/components/fetch-demo/home-view'
import { parseDemoState } from '@/lib/fetch-demo/selectors'

export const metadata: Metadata = {
  title: 'Fetch demo',
  description:
    'Interactive demo of Fetch — synthetic editorial analytics. Illustrative only.',
  robots: { index: false, follow: false },
}

type PageProps = {
  searchParams: Promise<{ state?: string | string[] }>
}

export default async function FetchDemoHomePage({ searchParams }: PageProps) {
  const params = await searchParams
  const demoState = parseDemoState(params.state)
  return <HomeView demoState={demoState} />
}
