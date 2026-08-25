/**
 * Pull finished Chess.com games for the coaching dashboard.
 * Writes data/chess-coach/pgn/chesscom-dtspider.pgn and removes samples.pgn
 * once a real dump is on disk.
 *
 * Usage: pnpm chess:pull
 */
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import {
  CHESSCOM_PGN_FILENAME,
  PGN_DIR,
  SAMPLE_PGN_FILENAME,
} from '../lib/labs/chess-coach/constants.ts'
import { chessCoachPlayer } from '../lib/labs/chess-coach/player.ts'
import { email, siteUrl } from '../lib/site.ts'

type ArchivesResponse = { archives?: string[] }

type MonthlyGame = {
  pgn?: string
  rules?: string
}

type MonthlyGamesResponse = { games?: MonthlyGame[] }

const USER_AGENT = `tichy-hq-site chess:pull (+${siteUrl}; ${email})`

async function chessComGet(url: string): Promise<Response> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT,
    },
  })
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`)
  }
  return response
}

function monthFromArchiveUrl(url: string): string {
  const match = url.match(/\/games\/(\d{4})\/(\d{2})$/)
  return match ? `${match[1]}-${match[2]}` : url
}

async function main() {
  const handle = chessCoachPlayer.chessComHandle
  const archivesUrl = `https://api.chess.com/pub/player/${handle}/games/archives`
  const archivesJson = (await chessComGet(archivesUrl).then((r) =>
    r.json(),
  )) as ArchivesResponse
  const archives = archivesJson.archives ?? []
  if (archives.length === 0) {
    throw new Error(`No Chess.com archives for ${handle}`)
  }

  console.log(`Found ${archives.length} month(s) for ${handle}`)

  const pgnParts: string[] = []
  let kept = 0
  let skippedVariant = 0

  for (const [index, archiveUrl] of archives.entries()) {
    const month = monthFromArchiveUrl(archiveUrl)
    const monthly = (await chessComGet(archiveUrl).then((r) =>
      r.json(),
    )) as MonthlyGamesResponse
    const games = monthly.games ?? []
    let monthKept = 0
    for (const game of games) {
      if (game.rules && game.rules !== 'chess') {
        skippedVariant += 1
        continue
      }
      const pgn = game.pgn?.trim()
      if (!pgn) continue
      pgnParts.push(pgn)
      monthKept += 1
      kept += 1
    }
    console.log(
      `  ${month} (${index + 1}/${archives.length}): ${monthKept} standard game(s)`,
    )
  }

  if (kept === 0) {
    throw new Error(`No standard-chess PGNs returned for ${handle}`)
  }

  const dir = path.join(process.cwd(), 'data', 'chess-coach', 'pgn')
  await mkdir(dir, { recursive: true })
  const outPath = path.join(dir, CHESSCOM_PGN_FILENAME)
  await writeFile(outPath, `${pgnParts.join('\n\n')}\n`, 'utf8')
  console.log(`Wrote ${kept} game(s) to ${PGN_DIR}/${CHESSCOM_PGN_FILENAME}`)
  if (skippedVariant > 0) {
    console.log(`Skipped ${skippedVariant} non-standard game(s)`)
  }

  const samplePath = path.join(dir, SAMPLE_PGN_FILENAME)
  try {
    await unlink(samplePath)
    console.log(`Removed ${PGN_DIR}/${SAMPLE_PGN_FILENAME}`)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
