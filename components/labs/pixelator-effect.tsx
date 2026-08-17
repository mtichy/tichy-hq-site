'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { BuildsBackLink } from '@/components/builds-back-link'
import { PixelatorControls } from '@/components/labs/pixelator-controls'
import { PixelatorStage } from '@/components/labs/pixelator-stage'
import {
  DEFAULT_PIXELATOR_SETTINGS,
  PIXELATOR_DEFAULT_IMAGE,
  PIXELATOR_EXPORT_FILENAME,
  PIXELATOR_STAGE_MAX_HEIGHT,
  PIXELATOR_STAGE_MAX_WIDTH,
  downloadBlob,
  exportPortrait,
  fitWithin,
  processImage,
  type PixelGrid,
  type PixelatorSettings,
} from '@/lib/labs/pixelator'

type StageSize = { width: number; height: number }

const EMPTY_STAGE: StageSize = {
  width: Math.min(PIXELATOR_STAGE_MAX_WIDTH, 480),
  height: Math.min(PIXELATOR_STAGE_MAX_WIDTH, 480),
}

/**
 * Lab layout: sticky back link, controls rail + preview stage.
 * Mobile: title → stage → controls. Desktop: sidebar + stage.
 * Stage size follows the source image aspect ratio (capped for large uploads).
 */
export default function PixelatorEffect() {
  const [settings, setSettings] = useState<PixelatorSettings>(
    DEFAULT_PIXELATOR_SETTINGS,
  )
  const [grid, setGrid] = useState<PixelGrid | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty'>('loading')
  const [stageSize, setStageSize] = useState<StageSize>(EMPTY_STAGE)
  const [slotWidth, setSlotWidth] = useState(PIXELATOR_STAGE_MAX_WIDTH)
  const [sourceUrl, setSourceUrl] = useState(PIXELATOR_DEFAULT_IMAGE)

  const imageRef = useRef<HTMLImageElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const settingsRef = useRef(settings)
  const stageSlotRef = useRef<HTMLDivElement>(null)
  const sourceSizeRef = useRef<{ w: number; h: number } | null>(null)
  const slotWidthRef = useRef(slotWidth)

  useEffect(() => {
    settingsRef.current = settings
  }, [settings])

  useEffect(() => {
    slotWidthRef.current = slotWidth
  }, [slotWidth])

  const revokeObjectUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
  }, [])

  const updateStageSize = useCallback(
    (srcW: number, srcH: number, maxW: number) => {
      const fitted = fitWithin(
        srcW,
        srcH,
        Math.min(maxW, PIXELATOR_STAGE_MAX_WIDTH),
        PIXELATOR_STAGE_MAX_HEIGHT,
      )
      setStageSize(fitted)
    },
    [],
  )

  const reprocess = useCallback(
    (img: HTMLImageElement, next: PixelatorSettings) => {
      const result = processImage(img, {
        gridSize: next.gridSize,
        threshold: next.threshold,
        softness: next.softness,
        invert: next.invert,
      })
      setGrid(result)
      setStatus(result.cols > 0 ? 'ready' : 'empty')
    },
    [],
  )

  // Load / reload source image. setState only runs from async image callbacks.
  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      if (cancelled) return
      imageRef.current = img
      const w = img.naturalWidth || img.width
      const h = img.naturalHeight || img.height
      sourceSizeRef.current = { w, h }
      updateStageSize(w, h, slotWidthRef.current)
      reprocess(img, settingsRef.current)
    }
    img.onerror = () => {
      if (cancelled) return
      imageRef.current = null
      sourceSizeRef.current = null
      setGrid(null)
      setStatus('empty')
    }
    img.src = sourceUrl
    return () => {
      cancelled = true
    }
  }, [sourceUrl, reprocess, updateStageSize])

  useEffect(() => {
    return () => revokeObjectUrl()
  }, [revokeObjectUrl])

  useEffect(() => {
    const img = imageRef.current
    if (!img?.complete || !img.naturalWidth) return
    reprocess(img, settings)
  }, [
    settings.threshold,
    settings.softness,
    settings.invert,
    settings.gridSize,
    reprocess,
    settings,
  ])

  useEffect(() => {
    const slot = stageSlotRef.current
    if (!slot) return

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const w = Math.floor(entry.contentRect.width)
      if (w <= 0) return
      setSlotWidth(w)
      const src = sourceSizeRef.current
      if (src) updateStageSize(src.w, src.h, w)
    })
    ro.observe(slot)
    return () => ro.disconnect()
  }, [updateStageSize])

  const onFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return
      revokeObjectUrl()
      const url = URL.createObjectURL(file)
      objectUrlRef.current = url
      setStatus('loading')
      setSourceUrl(url)
    },
    [revokeObjectUrl],
  )

  const onSave = useCallback(async () => {
    if (!grid || grid.cols === 0) return
    const blob = await exportPortrait(grid)
    if (blob) downloadBlob(blob, PIXELATOR_EXPORT_FILENAME)
  }, [grid])

  const canSave = status === 'ready' && Boolean(grid && grid.cols > 0)

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="sticky top-[var(--site-nav-height)] z-40 bg-background">
        <div className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 pt-8 pb-4">
          <BuildsBackLink />
        </div>
      </div>

      <div className="mx-auto flex min-h-0 w-full max-w-[var(--breakpoint-content)] flex-1 flex-col gap-4 px-6 pb-6 lg:flex-row lg:items-start lg:gap-12">
        <aside className="order-2 w-full shrink-0 lg:sticky lg:top-[calc(var(--site-nav-height)+4.5rem)] lg:order-1 lg:max-h-[calc(100vh-var(--site-nav-height)-5.5rem)] lg:w-[288px] lg:self-start lg:overflow-y-auto">
          <div className="flex max-w-[288px] flex-col gap-4 lg:gap-6">
            <div className="space-y-2">
              <p className="text-small font-bold uppercase tracking-wide text-muted-foreground">
                Lab
              </p>
              <h1 className="text-large font-bold leading-large text-foreground text-balance">
                Pixelator effect
              </h1>
              <p className="text-small text-muted-foreground text-pretty">
                Upload a photo, tune threshold, softness, and grid size, export
                as a PNG. Softness at 0 is the hard cut I used for the avatar.
              </p>
            </div>
            <div className="hidden lg:block">
              <PixelatorControls
                idPrefix="pixelator-desktop"
                value={settings}
                onChange={setSettings}
                onFile={onFile}
                onSave={onSave}
                canSave={canSave}
              />
            </div>
          </div>
        </aside>

        <div
          ref={stageSlotRef}
          className="order-1 flex w-full min-w-0 shrink-0 justify-center lg:order-2 lg:flex-1"
        >
          <PixelatorStage
            grid={grid}
            width={stageSize.width}
            height={stageSize.height}
            status={status}
          />
        </div>

        <div className="order-3 w-full max-w-[288px] pb-2 lg:hidden">
          <PixelatorControls
            idPrefix="pixelator-mobile"
            value={settings}
            onChange={setSettings}
            onFile={onFile}
            onSave={onSave}
            canSave={canSave}
          />
        </div>
      </div>
    </div>
  )
}
