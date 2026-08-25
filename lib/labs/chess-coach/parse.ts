import { Chess } from 'chess.js'
import { openingFamily } from '@/lib/labs/chess-coach/openings'
import { chessCoachPlayer } from '@/lib/labs/chess-coach/player'
import type {
  GameResultKind,
  ParsedGame,
  PlayerColor,
  ReplayMove,
} from '@/lib/labs/chess-coach/types'

function headerValue(
  headers: Record<string, string>,
  ...keys: string[]
): string {
  for (const key of keys) {
    const value = headers[key]
    if (value && value !== '?') return value
  }
  return ''
}

export function splitPgnGames(text: string): string[] {
  const normalized = text.replace(/\r\n/g, '\n').trim()
  if (!normalized) return []
  return normalized
    .split(/\n\s*\n(?=\[)/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.startsWith('[') && /\d+\./.test(chunk))
}

export function nameLooksLikePlayer(name: string): boolean {
  const lower = name.toLowerCase().trim()
  if (lower === chessCoachPlayer.chessComHandle.toLowerCase()) return true
  return chessCoachPlayer.nameTokens.every((token) => lower.includes(token))
}

function parseElo(raw: string): number | null {
  const n = Number.parseInt(raw.replace(/[^\d]/g, ''), 10)
  return Number.isFinite(n) && n > 0 ? n : null
}

function playerResult(color: PlayerColor, result: string): GameResultKind {
  if (result === '1/2-1/2') return 'draw'
  if (result === '1-0') return color === 'white' ? 'win' : 'loss'
  if (result === '0-1') return color === 'black' ? 'win' : 'loss'
  return 'unknown'
}

export function readPgnHeaders(pgn: string): Record<string, string> {
  const headers: Record<string, string> = {}
  const tag = /\[(\w+)\s+"([^"]*)"\]/g
  let match: RegExpExecArray | null
  while ((match = tag.exec(pgn)) !== null) {
    headers[match[1]] = match[2]
  }
  return headers
}

function firstSans(pgn: string): string[] {
  const movetext = pgn.replace(/\[(\w+)\s+"[^"]*"\]\s*/g, '')
  const cleaned = movetext
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/;.*$/gm, ' ')
    .replace(/\([^)]*\)/g, ' ')
  const sans: string[] = []
  const token = /\d+\.+\s+(\S+)(?:\s+(\S+))?/g
  let match: RegExpExecArray | null
  while ((match = token.exec(cleaned)) !== null && sans.length < 4) {
    if (match[1] && match[1] !== '*') sans.push(match[1].replace(/[+#]$/, ''))
    if (match[2] && !/^(1-0|0-1|1\/2-1\/2|\*)$/.test(match[2])) {
      sans.push(match[2].replace(/[+#]$/, ''))
    }
  }
  return sans
}

export function gameFromHeaders(
  headers: Record<string, string>,
  sourceFile: string,
  index: number,
  pgn = '',
): ParsedGame | null {
  const white = headerValue(headers, 'White')
  const black = headerValue(headers, 'Black')
  const whiteIsPlayer = nameLooksLikePlayer(white)
  const blackIsPlayer = nameLooksLikePlayer(black)
  if (whiteIsPlayer === blackIsPlayer) return null

  const color: PlayerColor = whiteIsPlayer ? 'white' : 'black'
  const eco = headerValue(headers, 'ECO')
  const openingName =
    headerValue(headers, 'Opening') || openingFamily(eco, firstSans(pgn))
  const result = headerValue(headers, 'Result') || '*'

  return {
    id: `${sourceFile}-${index}-${headers.Date ?? 'undated'}-${color}`,
    event: headerValue(headers, 'Event') || 'Unnamed event',
    site: headerValue(headers, 'Site'),
    date: headerValue(headers, 'Date', 'UTCDate') || '????.??.??',
    round: headerValue(headers, 'Round'),
    white,
    black,
    result,
    eco,
    opening: openingName,
    color,
    playerResult: playerResult(color, result),
    opponent: color === 'white' ? black : white,
    opponentRating: parseElo(
      headerValue(headers, color === 'white' ? 'BlackElo' : 'WhiteElo'),
    ),
    plyCount: 0,
    sourceFile,
    replay: false,
    moves: [],
  }
}

export function parsePgnIndex(
  pgn: string,
  sourceFile: string,
  index: number,
): ParsedGame | null {
  return gameFromHeaders(readPgnHeaders(pgn), sourceFile, index, pgn)
}

export function parsePgnGame(
  pgn: string,
  sourceFile: string,
  index: number,
): ParsedGame | null {
  const indexed = parsePgnIndex(pgn, sourceFile, index)
  if (!indexed) return null

  const chess = new Chess()
  try {
    chess.loadPgn(pgn, { strict: false })
  } catch {
    return indexed
  }

  const verbose = chess.history({ verbose: true })
  const replayChess = new Chess()
  const moves: ReplayMove[] = verbose.map((move) => {
    replayChess.move({
      from: move.from,
      to: move.to,
      promotion: move.promotion,
    })
    return {
      san: move.san,
      from: move.from,
      to: move.to,
      fen: replayChess.fen(),
    }
  })

  const sans = chess.history()
  return {
    ...indexed,
    opening:
      indexed.opening && indexed.opening !== 'Unknown opening'
        ? indexed.opening
        : openingFamily(indexed.eco, sans),
    plyCount: moves.length,
    replay: moves.length > 0,
    moves,
  }
}

export function stripMovesForIndex(game: ParsedGame): ParsedGame {
  return { ...game, replay: false, moves: [] }
}
