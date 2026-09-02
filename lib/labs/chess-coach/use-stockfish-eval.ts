'use client'

import { useEffect, useRef, useState } from 'react'
import {
  STOCKFISH_DEPTH,
  STOCKFISH_WORKER_HREF,
} from '@/lib/labs/chess-coach/constants'
import {
  parseUciInfo,
  sideToMove,
  type EngineEval,
} from '@/lib/labs/chess-coach/eval'

function createEngineWorker(): Worker | null {
  try {
    return new Worker(new URL(STOCKFISH_WORKER_HREF, window.location.origin), {
      name: 'stockfish',
    })
  } catch {
    return null
  }
}

export function useStockfishEval(fen: string): EngineEval | null {
  const [evaln, setEvaln] = useState<EngineEval | null>(null)
  const workerRef = useRef<Worker | null>(null)
  const readyRef = useRef(false)
  const fenRef = useRef(fen)

  useEffect(() => {
    fenRef.current = fen
  }, [fen])

  useEffect(() => {
    let cancelled = false
    const worker = createEngineWorker()
    if (!worker) return
    workerRef.current = worker

    const analyze = (nextFen: string) => {
      if (!readyRef.current) return
      worker.postMessage('stop')
      worker.postMessage(`position fen ${nextFen}`)
      worker.postMessage(`go depth ${STOCKFISH_DEPTH}`)
    }

    worker.onmessage = (event: MessageEvent<string>) => {
      if (cancelled) return
      const line = event.data
      if (typeof line !== 'string') return
      if (line === 'uciok') {
        worker.postMessage('setoption name Hash value 16')
        worker.postMessage('isready')
        return
      }
      if (line === 'readyok') {
        readyRef.current = true
        analyze(fenRef.current)
        return
      }
      const parsed = parseUciInfo(line, sideToMove(fenRef.current))
      if (parsed) setEvaln(parsed)
    }

    worker.onerror = () => {
      readyRef.current = false
    }

    worker.postMessage('uci')

    return () => {
      cancelled = true
      readyRef.current = false
      worker.terminate()
      workerRef.current = null
    }
  }, [])

  useEffect(() => {
    const worker = workerRef.current
    if (!worker || !readyRef.current) return
    setEvaln(null)
    worker.postMessage('stop')
    worker.postMessage(`position fen ${fen}`)
    worker.postMessage(`go depth ${STOCKFISH_DEPTH}`)
  }, [fen])

  return evaln
}
