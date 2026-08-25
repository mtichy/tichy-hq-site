'use client'

import { Chessground } from '@lichess-org/chessground'
import type { Api } from '@lichess-org/chessground/api'
import type { Key } from '@lichess-org/chessground/types'
import { useEffect, useRef } from 'react'
import '@lichess-org/chessground/assets/chessground.base.css'
import '@lichess-org/chessground/assets/chessground.brown.css'
import '@lichess-org/chessground/assets/chessground.cburnett.css'
import type { PlayerColor } from '@/lib/labs/chess-coach/types'

type ChessCoachBoardProps = {
  fen: string
  lastFrom?: string
  lastTo?: string
  orientation: PlayerColor
}

export function ChessCoachBoard({
  fen,
  lastFrom,
  lastTo,
  orientation,
}: ChessCoachBoardProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<Api | null>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    apiRef.current = Chessground(el, {
      viewOnly: true,
      disableContextMenu: true,
      coordinates: true,
      animation: { enabled: true, duration: 160 },
      highlight: { lastMove: true, check: true },
      draggable: { enabled: false },
      selectable: { enabled: false },
    })
    return () => {
      apiRef.current?.destroy()
      apiRef.current = null
    }
  }, [])

  useEffect(() => {
    const api = apiRef.current
    if (!api) return
    const lastMove: Key[] | undefined =
      lastFrom && lastTo ? [lastFrom as Key, lastTo as Key] : undefined
    api.set({
      fen,
      lastMove,
      orientation,
      turnColor: fen.split(' ')[1] === 'b' ? 'black' : 'white',
    })
  }, [fen, lastFrom, lastTo, orientation])

  return (
    <div className="chess-coach-board aspect-square w-full">
      <div ref={wrapRef} className="h-full w-full" />
    </div>
  )
}
