export type PlayerColor = 'white' | 'black'

export type GameResultKind = 'win' | 'loss' | 'draw' | 'unknown'

export type ReplayMove = {
  san: string
  from: string
  to: string
  fen: string
}

export type ParsedGame = {
  id: string
  event: string
  site: string
  date: string
  round: string
  white: string
  black: string
  result: string
  eco: string
  opening: string
  color: PlayerColor
  playerResult: GameResultKind
  opponent: string
  opponentRating: number | null
  plyCount: number
  sourceFile: string
  replay: boolean
  moves: ReplayMove[]
}

export type ScoreLine = {
  games: number
  wins: number
  draws: number
  losses: number
  scorePercent: number
}

export type OpeningStat = ScoreLine & {
  name: string
  asWhite: number
  asBlack: number
}

export type BandStat = ScoreLine & {
  label: string
}

export type RepertoireStats = {
  total: number
  skipped: number
  replayCount: number
  byColor: { white: ScoreLine; black: ScoreLine }
  openings: OpeningStat[]
  ratingBands: BandStat[]
}
