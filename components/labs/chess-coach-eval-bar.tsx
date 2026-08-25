'use client'

import { formatEval, whiteBarPercent } from '@/lib/labs/chess-coach/eval'
import { useStockfishEval } from '@/lib/labs/chess-coach/use-stockfish-eval'
import { cn } from '@/lib/utils'

type ChessCoachEvalBarProps = {
  fen: string
  className?: string
}

export function ChessCoachEvalBar({ fen, className }: ChessCoachEvalBarProps) {
  const evaln = useStockfishEval(fen)
  const whitePct = whiteBarPercent(evaln)
  const label = formatEval(evaln)

  return (
    <div
      className={cn(
        'relative w-8 shrink-0 overflow-hidden rounded-sm border border-border',
        className,
      )}
      role="meter"
      aria-label={`Engine evaluation ${label}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(whitePct)}
      aria-valuetext={label}
    >
      <div
        className="absolute inset-0 bg-[var(--color-neutral-black)]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 bg-[var(--color-neutral-white)]"
        style={{ height: `${whitePct}%` }}
        aria-hidden="true"
      />
      <span
        className={cn(
          'pointer-events-none absolute inset-x-0 text-center text-[10px] font-bold leading-none',
          whitePct >= 50
            ? 'bottom-1 text-[var(--color-neutral-black)]'
            : 'top-1 text-[var(--color-neutral-white)]',
        )}
      >
        {label}
      </span>
    </div>
  )
}
