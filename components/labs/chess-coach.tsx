'use client'

import { Hyperlink } from '@/components/hyperlink'
import { ChessCoachGames } from '@/components/labs/chess-coach-games'
import { PGN_DIR } from '@/lib/labs/chess-coach/constants'
import { chessCoachPlayer } from '@/lib/labs/chess-coach/player'
import { nysChampionship } from '@/lib/labs/chess-coach/tournament'
import type {
  ParsedGame,
  RepertoireStats,
  ScoreLine,
} from '@/lib/labs/chess-coach/types'
import { cn } from '@/lib/utils'

function ScoreBar({ label, line }: { label: string; line: ScoreLine }) {
  const widthPct =
    line.games === 0 ? 0 : Math.max(Math.min(line.scorePercent, 100), 8)
  return (
    <div className="grid grid-cols-[minmax(7rem,14rem)_1fr_auto] items-center gap-2">
      <span className="text-small leading-small text-foreground">{label}</span>
      <div className="min-w-0">
        <div
          className="h-3 rounded-sm bg-primary"
          style={{ width: `${widthPct}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="text-small leading-small tabular-nums text-foreground">
        {line.wins}-{line.draws}-{line.losses} · {line.scorePercent}%
      </span>
    </div>
  )
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4 shadow-[var(--elevation-rest)]">
      <p className="text-small leading-small text-muted-foreground">{label}</p>
      <p className="text-large font-bold leading-large tabular-nums text-foreground">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-small leading-small text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

type ChessCoachProps = {
  games: ParsedGame[]
  stats: RepertoireStats
  daysToEvent: number
}

export default function ChessCoach({
  games,
  stats,
  daysToEvent,
}: ChessCoachProps) {
  const { goals, regularRating } = chessCoachPlayer
  const to2000 = Math.max(0, goals.shortTermRating - regularRating)
  const toNm = Math.max(0, goals.nationalMasterRating - regularRating)
  const toTop100 = Math.max(0, goals.top100CutoffRating - regularRating)
  const activeField = nysChampionship.field
    .filter((row) => !row.withdrawn)
    .slice()
    .sort((a, b) => b.uscfRating - a.uscfRating)
  const withdrawn = nysChampionship.field.filter((row) => row.withdrawn)

  return (
    <div className="mx-auto flex w-full max-w-[var(--breakpoint-content)] flex-col gap-12 px-6 py-8">
      <header className="flex flex-col gap-3">
        <p className="text-small leading-small text-muted-foreground">
          Unlisted lab · not in Builds or search
        </p>
        <h1 className="text-xlarge font-bold leading-xlarge text-foreground">
          Chess coach
        </h1>
        <p className="max-w-3xl text-regular leading-regular text-pretty text-foreground">
          Prep board for {chessCoachPlayer.firstName} ahead of the{' '}
          {nysChampionship.shortTitle}. Ratings and the Championship field are a
          snapshot, not a live feed. Drop more PGN files into{' '}
          <code className="text-small">{PGN_DIR}</code> and rebuild to refresh
          repertoire stats.
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-2 text-small leading-small">
          <Hyperlink
            href={chessCoachPlayer.uscfProfileUrl}
            target="_blank"
            rel="noreferrer"
          >
            USCF {chessCoachPlayer.uscfId}
          </Hyperlink>
          <Hyperlink
            href={chessCoachPlayer.chessComUrl}
            target="_blank"
            rel="noreferrer"
          >
            Chess.com/{chessCoachPlayer.chessComHandle}
          </Hyperlink>
          <Hyperlink
            href={nysChampionship.entryListUrl}
            target="_blank"
            rel="noreferrer"
          >
            NYS advance entry list
          </Hyperlink>
        </p>
      </header>

      <section aria-labelledby="goals-heading" className="flex flex-col gap-4">
        <h2
          id="goals-heading"
          className="text-medium font-bold leading-medium text-foreground"
        >
          Goals
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Metric
            label="Regular rating"
            value={String(regularRating)}
            hint={`Snapshot ${chessCoachPlayer.lastUpdated} · entry list ${chessCoachPlayer.entryListRating}`}
          />
          <Metric
            label={`Age ${goals.top100AgeGroup} Top 100`}
            value={`+${toTop100}`}
            hint={`Cutoff ${goals.top100CutoffRating} (May 2026 Age 17 list). Clear ${goals.shortTermRating} first (+${to2000}). Age 17 lists start Oct 2026.`}
          />
          <Metric
            label={`National Master before ${goals.nmBeforeAge}`}
            value={`+${toNm}`}
            hint={`${goals.nationalMasterRating} Regular by ${goals.nmDeadline}`}
          />
          <Metric
            label="Days to NYS"
            value={String(daysToEvent)}
            hint={`${nysChampionship.startDate}–${nysChampionship.endDate} · ${nysChampionship.section}`}
          />
        </div>
      </section>

      <section aria-labelledby="field-heading" className="flex flex-col gap-4">
        <div>
          <h2
            id="field-heading"
            className="text-medium font-bold leading-medium text-foreground"
          >
            Championship field
          </h2>
          <p className="text-small leading-small text-muted-foreground">
            {nysChampionship.location} · {nysChampionship.timeControl} ·{' '}
            {nysChampionship.format}. Snapshot{' '}
            {nysChampionship.fieldSnapshotDate}. Refresh from the advance list
            before round 1.
          </p>
        </div>
        <ol className="grid gap-2 text-small leading-small sm:grid-cols-2">
          {nysChampionship.schedule.map((item) => (
            <li key={item.label} className="rounded-md bg-muted px-3 py-2">
              <span className="font-bold">{item.label}</span>
              <span className="text-muted-foreground"> · {item.when}</span>
            </li>
          ))}
        </ol>
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <table className="w-full text-left text-small leading-small">
            <caption className="sr-only">
              Championship advance entries by USCF rating
            </caption>
            <thead className="border-b border-border bg-muted">
              <tr>
                <th className="px-3 py-2 font-bold">#</th>
                <th className="px-3 py-2 font-bold">Name</th>
                <th className="px-3 py-2 font-bold">USCF</th>
                <th className="px-3 py-2 font-bold">FIDE</th>
                <th className="px-3 py-2 font-bold">St</th>
                <th className="px-3 py-2 font-bold">Sched</th>
                <th className="px-3 py-2 font-bold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {activeField.map((row, index) => (
                <tr
                  key={row.uscfId}
                  className={cn(
                    'border-b border-border last:border-0',
                    row.isPlayer && 'bg-accent/40',
                  )}
                >
                  <td className="px-3 py-2 tabular-nums">{index + 1}</td>
                  <td className="px-3 py-2 font-bold">
                    {row.isPlayer ? `${row.name} (you)` : row.name}
                  </td>
                  <td className="px-3 py-2 tabular-nums">{row.uscfRating}</td>
                  <td className="px-3 py-2 tabular-nums">
                    {row.fideRating ?? '—'}
                  </td>
                  <td className="px-3 py-2">{row.state || '—'}</td>
                  <td className="px-3 py-2">{row.schedule}</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {row.notes}
                  </td>
                </tr>
              ))}
              {withdrawn.map((row) => (
                <tr
                  key={row.uscfId}
                  className="border-b border-border text-muted-foreground last:border-0"
                >
                  <td className="px-3 py-2">—</td>
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2 tabular-nums">{row.uscfRating}</td>
                  <td className="px-3 py-2 tabular-nums">
                    {row.fideRating ?? '—'}
                  </td>
                  <td className="px-3 py-2">{row.state || '—'}</td>
                  <td className="px-3 py-2">{row.schedule}</td>
                  <td className="px-3 py-2">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="repertoire-heading"
        className="flex flex-col gap-4"
      >
        <div>
          <h2
            id="repertoire-heading"
            className="text-medium font-bold leading-medium text-foreground"
          >
            Repertoire
          </h2>
          <p className="text-small leading-small text-muted-foreground">
            {stats.total === 0
              ? 'No matching games yet. Add PGNs, or run pnpm chess:pull for Chess.com.'
              : `${stats.total} games in stats · ${stats.replayCount} most recent in the viewer · score is (wins + half draws) / decided games.`}
            {stats.skipped > 0
              ? ` ${stats.skipped} PGN game(s) skipped (parse error or name mismatch).`
              : ''}
          </p>
        </div>
        {stats.total === 0 ? null : (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-regular font-bold leading-regular">
                By color
              </h3>
              <ScoreBar label="White" line={stats.byColor.white} />
              <ScoreBar label="Black" line={stats.byColor.black} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-regular font-bold leading-regular">
                Vs rating bands
              </h3>
              {stats.ratingBands.map((band) => (
                <ScoreBar key={band.label} label={band.label} line={band} />
              ))}
            </div>
            <div className="flex flex-col gap-2 lg:col-span-2">
              <h3 className="text-regular font-bold leading-regular">
                Openings
              </h3>
              <ul className="flex flex-col gap-2">
                {stats.openings.map((row) => (
                  <li key={row.name}>
                    <ScoreBar
                      label={`${row.name} (W${row.asWhite}/B${row.asBlack})`}
                      line={row}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      <section aria-labelledby="games-heading" className="flex flex-col gap-4">
        <h2
          id="games-heading"
          className="text-medium font-bold leading-medium text-foreground"
        >
          Game viewer
        </h2>
        <ChessCoachGames games={games} />
      </section>
    </div>
  )
}
