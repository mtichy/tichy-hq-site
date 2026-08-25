export const chessCoachPlayer = {
  firstName: 'Dean',
  /** Tokens that must all appear in a PGN White/Black name (case-insensitive). */
  nameTokens: ['dean', 'tichy'] as const,
  uscfId: '31329150',
  uscfProfileUrl: 'https://ratings.uschess.org/player/31329150',
  chessComHandle: 'dtspider',
  chessComUrl: 'https://www.chess.com/member/dtspider',
  state: 'NY',
  /**
   * Age 16 at NYS (Sep 2026). USCF Top 100 age is as of the 1st of the list month,
   * so Age 17 lists start Oct 2026. Working Regular is live, not the supplement.
   */
  regularRating: 1954,
  /** USCF rating printed on the NYS advance-entry list (snapshot). */
  entryListRating: 1945,
  lastUpdated: '2026-08-13',
  goals: {
    /** First published 2000+ — waypoint before the Age 17 list. */
    shortTermRating: 2000,
    nationalMasterRating: 2200,
    nmBeforeAge: 19,
    /** Day before he turns 19. */
    nmDeadline: '2028-09-20',
    /**
     * USCF Top 100 age is as of the 1st of the list month.
     * Still 16 through the Sep 2026 (NYS) lists; Age 17 lists begin Oct 2026.
     */
    top100AgeGroup: 17,
    /** May 2026 Regular Top Age 17 #100 was 2003. Edit when you check a newer list. */
    top100CutoffRating: 2003,
  },
} as const

export type ChessCoachPlayer = typeof chessCoachPlayer
