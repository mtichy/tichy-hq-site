import ChessCoach from '@/components/labs/chess-coach'
import { NavBar } from '@/components/nav-bar'
import { loadCoachGames } from '@/lib/labs/chess-coach/load-games'
import {
  daysUntilEventStart,
  nysChampionship,
} from '@/lib/labs/chess-coach/tournament'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Chess coach',
  description:
    'Private chess prep dashboard for an upcoming state championship.',
  path: '/labs/chess-coach',
  noIndex: true,
})

export default async function ChessCoachPage() {
  const { games, stats } = await loadCoachGames()
  const daysToEvent = daysUntilEventStart(nysChampionship.startDate)

  return (
    <div className="chess-coach-lab-page flex min-h-screen flex-col bg-background">
      <NavBar />
      <main className="relative flex min-h-0 flex-1 flex-col">
        <ChessCoach games={games} stats={stats} daysToEvent={daysToEvent} />
      </main>
    </div>
  )
}
