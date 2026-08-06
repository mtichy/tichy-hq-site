'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { BuildsBackLink } from '@/components/builds-back-link'
import { OrbitalControlsStrip } from '@/components/labs/orbital-controls-strip'
import { OrbitalDrawingsMosaic } from '@/components/labs/orbital-drawings-mosaic'
import {
  DEFAULT_ORBITAL_SETTINGS,
  nextOrbitalSeed,
  sampleOrbitalDrawings,
  type OrbitalSettings,
} from '@/lib/labs/orbital-settings'

const OrbitalDrawingsCanvas = dynamic(
  () =>
    import('@/components/labs/orbital-drawings-canvas').then(
      (m) => m.OrbitalDrawingsCanvas,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full min-h-[50vh] w-full items-center justify-center text-regular text-muted-foreground"
        aria-busy="true"
      >
        Loading drawings…
      </div>
    ),
  },
)

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

/**
 * Lab layout: sticky back link, left controls rail, right cloud stage.
 * Mirrors the Builds sidebar + content split so the constellation can use
 * the full remaining viewport height.
 */
export default function OrbitalDrawings() {
  const reducedMotion = usePrefersReducedMotion()
  const [settings, setSettings] = useState<OrbitalSettings>(
    DEFAULT_ORBITAL_SETTINGS,
  )

  const drawings = useMemo(
    () => sampleOrbitalDrawings(settings.density, settings.seed),
    [settings.density, settings.seed],
  )

  const onReshuffle = useCallback(() => {
    setSettings((prev) => ({ ...prev, seed: nextOrbitalSeed() }))
  }, [])

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="sticky top-[var(--site-nav-height)] z-40 bg-background">
        <div className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 pt-8 pb-4">
          <BuildsBackLink />
        </div>
      </div>

      <div className="mx-auto flex min-h-0 w-full max-w-[var(--breakpoint-content)] flex-1 flex-col gap-8 px-6 pb-6 lg:flex-row lg:items-stretch lg:gap-12">
        <aside className="w-full shrink-0 lg:sticky lg:top-[calc(var(--site-nav-height)+4.5rem)] lg:max-h-[calc(100vh-var(--site-nav-height)-5.5rem)] lg:w-[288px] lg:self-start lg:overflow-y-auto">
          <div className="flex max-w-[288px] flex-col gap-6">
            <div className="space-y-2">
              <p className="text-small font-bold uppercase tracking-wide text-muted-foreground">
                Lab
              </p>
              <h1 className="text-large font-bold leading-large text-foreground text-balance">
                3d orbital interface experiment
              </h1>
              <p className="text-small text-muted-foreground text-pretty">
                Drag to orbit · click to focus · Esc to reset
              </p>
            </div>
            <OrbitalControlsStrip
              layout="sidebar"
              value={settings}
              onChange={setSettings}
              onReshuffle={onReshuffle}
            />
          </div>
        </aside>

        <div className="relative min-h-[60vh] w-full min-w-0 flex-1 lg:min-h-0">
          {reducedMotion ? (
            <OrbitalDrawingsMosaic drawings={drawings} />
          ) : (
            <OrbitalDrawingsCanvas
              key={`${settings.seed}-${settings.density}-${settings.shape}`}
              settings={settings}
            />
          )}
        </div>
      </div>
    </div>
  )
}
