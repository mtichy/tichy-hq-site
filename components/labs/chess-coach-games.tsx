'use client'

import { useMemo, useState } from 'react'
import { controlButtonClassName } from '@/components/hyperlink'
import { ChessCoachBoard } from '@/components/labs/chess-coach-board'
import { ChessCoachEvalBar } from '@/components/labs/chess-coach-eval-bar'
import {
  PGN_DIR,
  START_FEN,
  STOCKFISH_DEPTH,
} from '@/lib/labs/chess-coach/constants'
import type {
  GameResultKind,
  ParsedGame,
  PlayerColor,
} from '@/lib/labs/chess-coach/types'
import { cn } from '@/lib/utils'

type ColorFilter = 'all' | PlayerColor
type ResultFilter = 'all' | GameResultKind

type ChessCoachGamesProps = {
  games: readonly ParsedGame[]
}

function resultLabel(game: ParsedGame): string {
  if (game.playerResult === 'win') return 'Win'
  if (game.playerResult === 'loss') return 'Loss'
  if (game.playerResult === 'draw') return 'Draw'
  return game.result
}

export function ChessCoachGames({ games }: ChessCoachGamesProps) {
  const [color, setColor] = useState<ColorFilter>('all')
  const [result, setResult] = useState<ResultFilter>('all')
  const [eventQuery, setEventQuery] = useState('')
  const [selectedId, setSelectedId] = useState(games[0]?.id ?? '')
  const [ply, setPly] = useState(0)

  const filtered = useMemo(() => {
    const q = eventQuery.trim().toLowerCase()
    return games.filter((game) => {
      if (color !== 'all' && game.color !== color) return false
      if (result !== 'all' && game.playerResult !== result) return false
      if (q && !game.event.toLowerCase().includes(q)) return false
      return true
    })
  }, [color, eventQuery, games, result])

  const selected =
    filtered.find((game) => game.id === selectedId) ?? filtered[0] ?? null

  const maxPly = selected?.moves.length ?? 0
  const plyClamped = Math.min(ply, maxPly)
  const currentMove =
    selected && plyClamped > 0 ? selected.moves[plyClamped - 1] : undefined
  const currentFen = currentMove?.fen ?? START_FEN
  const currentSan = currentMove?.san ?? 'Start'

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_minmax(0,16rem)]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['all', 'All colors'],
              ['white', 'White'],
              ['black', 'Black'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={cn(
                controlButtonClassName,
                color !== value && 'bg-muted text-foreground',
              )}
              aria-pressed={color === value}
              onClick={() => {
                setColor(value)
                setPly(0)
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['all', 'All results'],
              ['win', 'Wins'],
              ['loss', 'Losses'],
              ['draw', 'Draws'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={cn(
                controlButtonClassName,
                result !== value && 'bg-muted text-foreground',
              )}
              aria-pressed={result === value}
              onClick={() => {
                setResult(value)
                setPly(0)
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex flex-col gap-1 text-small leading-small text-muted-foreground">
          Event
          <input
            type="search"
            value={eventQuery}
            onChange={(e) => setEventQuery(e.target.value)}
            className="rounded-md border border-input bg-card px-2 py-1.5 text-small leading-small text-foreground"
          />
        </label>
        <ul className="max-h-[28rem] overflow-y-auto rounded-md border border-border bg-card">
          {filtered.length === 0 ? (
            <li className="p-3 text-small leading-small text-muted-foreground">
              No games match these filters.
            </li>
          ) : (
            filtered.map((game) => {
              const active = game.id === selected?.id
              return (
                <li
                  key={game.id}
                  className="border-b border-border last:border-0"
                >
                  <button
                    type="button"
                    className={cn(
                      'flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-small leading-small',
                      active ? 'bg-muted' : 'hover:bg-muted/60',
                    )}
                    onClick={() => {
                      setSelectedId(game.id)
                      setPly(0)
                    }}
                  >
                    <span className="font-bold text-foreground">
                      {game.date} · {resultLabel(game)}
                    </span>
                    <span className="text-muted-foreground">
                      {game.color === 'white' ? 'White' : 'Black'} vs{' '}
                      {game.opponent}
                      {game.opponentRating ? ` (${game.opponentRating})` : ''}
                    </span>
                    <span className="text-muted-foreground">
                      {game.opening}
                    </span>
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        {selected && selected.replay && selected.moves.length > 0 ? (
          <>
            <div className="mx-auto flex w-full max-w-[min(100%,30rem)] items-stretch gap-2">
              <ChessCoachEvalBar fen={currentFen} />
              <div className="min-w-0 flex-1">
                <ChessCoachBoard
                  fen={currentFen}
                  lastFrom={currentMove?.from}
                  lastTo={currentMove?.to}
                  orientation={selected.color}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className={controlButtonClassName}
                onClick={() => setPly(0)}
              >
                Start
              </button>
              <button
                type="button"
                className={controlButtonClassName}
                onClick={() => setPly((n) => Math.max(0, n - 1))}
              >
                Prev
              </button>
              <button
                type="button"
                className={controlButtonClassName}
                onClick={() => setPly((n) => Math.min(maxPly, n + 1))}
              >
                Next
              </button>
              <button
                type="button"
                className={controlButtonClassName}
                onClick={() => setPly(maxPly)}
              >
                End
              </button>
              <span className="text-small leading-small text-muted-foreground">
                {currentSan} · {plyClamped}/{maxPly} · Stockfish 18 lite, depth{' '}
                {STOCKFISH_DEPTH}
              </span>
            </div>
          </>
        ) : selected ? (
          <p className="text-small leading-small text-muted-foreground">
            This game is in the index for stats, but the move list was omitted
            to keep the page light. Put it in a recent PGN dump to replay it.
          </p>
        ) : (
          <p className="text-small leading-small text-muted-foreground">
            Drop PGN files into {PGN_DIR} and rebuild to replay games.
          </p>
        )}
      </div>

      <ol className="max-h-[32rem] overflow-y-auto font-mono text-small leading-small">
        {selected?.moves.map((move, index) => {
          const n = index + 1
          const isWhite = index % 2 === 0
          const moveNum = Math.floor(index / 2) + 1
          return (
            <li key={`${move.san}-${n}`} className="inline">
              {isWhite ? (
                <span className="text-muted-foreground"> {moveNum}. </span>
              ) : null}
              <button
                type="button"
                className={cn(
                  'rounded-sm px-0.5',
                  ply === n
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted',
                )}
                onClick={() => setPly(n)}
              >
                {move.san}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
