export type EngineEval = {
  depth: number
  /** Centipawns from White's perspective. */
  cp: number | null
  /** Mate in N from White's perspective (negative = Black mates). */
  mate: number | null
}

export function parseUciInfo(
  line: string,
  sideToMove: 'w' | 'b',
): EngineEval | null {
  if (!line.startsWith('info ') || !/\bscore\b/.test(line)) return null
  const depthMatch = line.match(/\bdepth (\d+)\b/)
  const mateMatch = line.match(/\bscore mate (-?\d+)\b/)
  const cpMatch = line.match(/\bscore cp (-?\d+)\b/)
  if (!depthMatch) return null
  const depth = Number.parseInt(depthMatch[1], 10)
  const flip = sideToMove === 'b' ? -1 : 1
  if (mateMatch) {
    return {
      depth,
      cp: null,
      mate: Number.parseInt(mateMatch[1], 10) * flip,
    }
  }
  if (cpMatch) {
    return {
      depth,
      cp: Number.parseInt(cpMatch[1], 10) * flip,
      mate: null,
    }
  }
  return null
}

export function sideToMove(fen: string): 'w' | 'b' {
  return fen.split(' ')[1] === 'b' ? 'b' : 'w'
}

/** Map White's eval to 0–100 for a vertical bar (50 = equal). */
export function whiteBarPercent(evaln: EngineEval | null): number {
  if (!evaln) return 50
  if (evaln.mate != null) return evaln.mate > 0 ? 100 : 0
  const cp = evaln.cp ?? 0
  const scaled = 50 + 50 * Math.tanh(cp / 400)
  return Math.min(100, Math.max(0, scaled))
}

export function formatEval(evaln: EngineEval | null): string {
  if (!evaln) return '…'
  if (evaln.mate != null) {
    const abs = Math.abs(evaln.mate)
    return evaln.mate > 0 ? `M${abs}` : `-M${abs}`
  }
  const pawns = (evaln.cp ?? 0) / 100
  const abs = Math.abs(pawns).toFixed(1)
  if (pawns > 0.04) return `+${abs}`
  if (pawns < -0.04) return `-${abs}`
  return '0.0'
}
