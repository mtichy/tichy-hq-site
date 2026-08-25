import type {
  BandStat,
  OpeningStat,
  ParsedGame,
  RepertoireStats,
  ScoreLine,
} from '@/lib/labs/chess-coach/types'

function emptyScore(): ScoreLine {
  return { games: 0, wins: 0, draws: 0, losses: 0, scorePercent: 0 }
}

function addResult(line: ScoreLine, result: ParsedGame['playerResult']) {
  line.games += 1
  if (result === 'win') line.wins += 1
  else if (result === 'draw') line.draws += 1
  else if (result === 'loss') line.losses += 1
}

function finalize(line: ScoreLine) {
  const decided = line.wins + line.draws + line.losses
  line.scorePercent =
    decided === 0
      ? 0
      : Math.round(((line.wins + line.draws * 0.5) / decided) * 1000) / 10
}

function ratingBand(rating: number | null): string {
  if (rating == null) return 'Unrated / unknown'
  if (rating < 1600) return 'U1600'
  if (rating < 1800) return '1600–1799'
  if (rating < 2000) return '1800–1999'
  if (rating < 2200) return '2000–2199'
  return '2200+'
}

export function buildRepertoireStats(
  games: readonly ParsedGame[],
  skipped: number,
): RepertoireStats {
  const white = emptyScore()
  const black = emptyScore()
  const openingMap = new Map<string, OpeningStat>()
  const bandMap = new Map<string, BandStat>()

  for (const game of games) {
    addResult(game.color === 'white' ? white : black, game.playerResult)

    const opening =
      openingMap.get(game.opening) ??
      ({
        name: game.opening,
        asWhite: 0,
        asBlack: 0,
        ...emptyScore(),
      } satisfies OpeningStat)
    addResult(opening, game.playerResult)
    if (game.color === 'white') opening.asWhite += 1
    else opening.asBlack += 1
    openingMap.set(game.opening, opening)

    const label = ratingBand(game.opponentRating)
    const band =
      bandMap.get(label) ??
      ({
        label,
        ...emptyScore(),
      } satisfies BandStat)
    addResult(band, game.playerResult)
    bandMap.set(label, band)
  }

  finalize(white)
  finalize(black)
  for (const row of openingMap.values()) finalize(row)
  for (const row of bandMap.values()) finalize(row)

  const openings = [...openingMap.values()].sort((a, b) => b.games - a.games)
  const bandOrder = [
    'U1600',
    '1600–1799',
    '1800–1999',
    '2000–2199',
    '2200+',
    'Unrated / unknown',
  ]
  const ratingBands = [...bandMap.values()].sort(
    (a, b) => bandOrder.indexOf(a.label) - bandOrder.indexOf(b.label),
  )

  return {
    total: games.length,
    skipped,
    replayCount: games.filter((g) => g.replay).length,
    byColor: { white, black },
    openings,
    ratingBands,
  }
}
