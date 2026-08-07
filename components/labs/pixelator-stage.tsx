'use client'

import { useEffect, useRef } from 'react'
import {
  PIXELATOR_BACKGROUND_COLOR,
  PIXELATOR_PIXEL_COLOR,
  drawGrid,
  type PixelGrid,
} from '@/lib/labs/pixelator'
import { cn } from '@/lib/utils'

type PixelatorStageProps = {
  grid: PixelGrid | null
  /** CSS pixel size of the stage (already aspect-fitted). */
  width: number
  height: number
  status: 'loading' | 'ready' | 'empty'
  className?: string
}

/**
 * Preview canvas sized to the source image aspect ratio.
 * Charcoal stage with off-white pixels — matches the PNG export.
 */
export function PixelatorStage({
  grid,
  width,
  height,
  status,
  className,
}: PixelatorStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || width <= 0 || height <= 0) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.imageSmoothingEnabled = false

    if (!grid || grid.cols === 0) {
      ctx.fillStyle = PIXELATOR_BACKGROUND_COLOR
      ctx.fillRect(0, 0, width, height)
      return
    }

    drawGrid(ctx, grid, PIXELATOR_PIXEL_COLOR, width, height)
  }, [grid, width, height])

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        width,
        height,
        backgroundColor: PIXELATOR_BACKGROUND_COLOR,
      }}
    >
      <canvas ref={canvasRef} aria-label="Pixelator preview" />
      {status === 'loading' ? (
        <div
          className="absolute inset-0 flex items-center justify-center text-regular text-[var(--color-surface-page)]"
          aria-busy="true"
        >
          Processing…
        </div>
      ) : null}
      {status === 'empty' ? (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-regular text-[var(--color-surface-page)]">
          Choose a file to upload your image
        </div>
      ) : null}
    </div>
  )
}
