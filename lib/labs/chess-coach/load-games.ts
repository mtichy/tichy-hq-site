import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { REPLAY_GAME_LIMIT } from '@/lib/labs/chess-coach/constants'
import {
  parsePgnGame,
  parsePgnIndex,
  splitPgnGames,
} from '@/lib/labs/chess-coach/parse'
import { buildRepertoireStats } from '@/lib/labs/chess-coach/stats'
import type { ParsedGame, RepertoireStats } from '@/lib/labs/chess-coach/types'

function dateSortKey(date: string): string {
  return date.replace(/\./g, '-').replace(/\?/g, '0')
}

export async function loadCoachGames(): Promise<{
  games: ParsedGame[]
  stats: RepertoireStats
}> {
  const dir = path.join(process.cwd(), 'data', 'chess-coach', 'pgn')
  let names: string[] = []
  try {
    names = (await readdir(dir)).filter((name) =>
      name.toLowerCase().endsWith('.pgn'),
    )
  } catch {
    return {
      games: [],
      stats: buildRepertoireStats([], 0),
    }
  }

  const indexed: { game: ParsedGame; pgn: string; index: number }[] = []
  let skipped = 0

  for (const name of names.sort()) {
    const text = await readFile(path.join(dir, name), 'utf8')
    const chunks = splitPgnGames(text)
    chunks.forEach((chunk, index) => {
      const game = parsePgnIndex(chunk, name, index)
      if (game) indexed.push({ game, pgn: chunk, index })
      else skipped += 1
    })
  }

  indexed.sort((a, b) =>
    dateSortKey(b.game.date).localeCompare(dateSortKey(a.game.date)),
  )

  const stats = buildRepertoireStats(
    indexed.map((row) => row.game),
    skipped,
  )

  const games = indexed.slice(0, REPLAY_GAME_LIMIT).map((row) => {
    const withMoves = parsePgnGame(row.pgn, row.game.sourceFile, row.index)
    return withMoves ?? row.game
  })

  return {
    games,
    stats: {
      ...stats,
      replayCount: games.filter((game) => game.replay).length,
    },
  }
}
