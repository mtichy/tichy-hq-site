'use client'

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react'
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
        className="flex h-full min-h-[50svh] w-full items-center justify-center text-regular text-muted-foreground"
        aria-busy="true"
      >
        Loading drawings…
      </div>
    ),
  },
)

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false })
    return Boolean(gl)
  } catch {
    return false
  }
}

/** Only fall back to mosaic when WebGL is unavailable — not for Reduce Motion. */
function useWebGLAvailable() {
  return useSyncExternalStore(
    () => () => {},
    detectWebGL,
    () => true,
  )
}

/**
 * Lab layout: sticky back link, controls rail + cloud stage.
 * Mobile: compact title → stage (interactive) → controls.
 * Desktop: sidebar + stage.
 * Reduce Motion quiets animation but keeps the 3D orbit/focus experience.
 */
export default function OrbitalDrawings() {
  const reducedMotion = usePrefersReducedMotion()
  const webglOk = useWebGLAvailable()
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

      <div className="mx-auto flex min-h-0 w-full max-w-[var(--breakpoint-content)] flex-1 flex-col gap-4 px-6 pb-6 lg:flex-row lg:items-stretch lg:gap-12">
        <aside className="order-2 w-full shrink-0 lg:sticky lg:top-[calc(var(--site-nav-height)+4.5rem)] lg:order-1 lg:max-h-[calc(100vh-var(--site-nav-height)-5.5rem)] lg:w-[288px] lg:self-start lg:overflow-y-auto">
          <div className="flex max-w-[288px] flex-col gap-4 lg:gap-6">
            <div className="space-y-2">
              <p className="text-small font-bold uppercase tracking-wide text-muted-foreground">
                Lab
              </p>
              <h1 className="text-large font-bold leading-large text-foreground text-balance">
                3d orbital interface experiment
              </h1>
              <p className="text-small text-muted-foreground text-pretty lg:hidden">
                Drag to orbit · pinch to zoom · tap to focus · Close or tap
                empty space to reset
              </p>
              <p className="hidden text-small text-muted-foreground text-pretty lg:block">
                Drag to orbit · scroll to zoom · click to focus · Esc to reset
              </p>
            </div>
            <div className="hidden lg:block">
              <OrbitalControlsStrip
                layout="sidebar"
                value={settings}
                onChange={setSettings}
                onReshuffle={onReshuffle}
              />
            </div>
          </div>
        </aside>

        <div className="relative order-1 h-[min(72svh,620px)] w-full min-w-0 shrink-0 overflow-hidden lg:order-2 lg:h-auto lg:min-h-0 lg:flex-1 lg:shrink">
          {webglOk ? (
            <OrbitalDrawingsCanvas
              key={`${settings.seed}-${settings.density}-${settings.shape}`}
              settings={settings}
              reducedMotion={reducedMotion}
            />
          ) : (
            <OrbitalDrawingsMosaic drawings={drawings} />
          )}
        </div>

        <div className="order-3 w-full max-w-[288px] pb-2 lg:hidden">
          <OrbitalControlsStrip
            layout="sidebar"
            value={settings}
            onChange={setSettings}
            onReshuffle={onReshuffle}
          />
        </div>
      </div>
    </div>
  )
}
