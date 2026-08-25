export const CHESS_COACH_HREF = '/labs/chess-coach'

export const PGN_DIR = 'data/chess-coach/pgn'

export const CHESSCOM_PGN_FILENAME = 'chesscom-dtspider.pgn'

export const SAMPLE_PGN_FILENAME = 'samples.pgn'

/** Cap how many games ship move lists for the board (stats still use every game). */
export const REPLAY_GAME_LIMIT = 120

export const START_FEN =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export const STOCKFISH_WORKER_HREF =
  '/vendor/stockfish/stockfish-18-lite-single.js'

/** Lite-single engine depth — enough for a coaching bar without stalling the tab. */
export const STOCKFISH_DEPTH = 14
