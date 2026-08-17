import { HomeView } from '@/components/fetch-demo/home-view'
import { parseDemoState } from '@/lib/fetch-demo/selectors'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Fetch demo',
  description:
    'Interactive demo of Fetch — synthetic editorial analytics. Illustrative only.',
  path: '/builds/fetch/demo',
  noIndex: true,
})

type PageProps = {
  searchParams: Promise<{ state?: string | string[] }>
}

export default async function FetchDemoHomePage({ searchParams }: PageProps) {
  const params = await searchParams
  const demoState = parseDemoState(params.state)
  return <HomeView demoState={demoState} />
}
