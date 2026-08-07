'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { OrbitalDrawing } from '@/lib/labs/orbital-drawings'
import { controlButtonClassName } from '@/components/hyperlink'
import { cn } from '@/lib/utils'

type OrbitalDrawingsMosaicProps = {
  drawings: readonly OrbitalDrawing[]
}

/**
 * Static mosaic fallback when WebGL is unavailable.
 * Prefer the 3D canvas even when prefers-reduced-motion is on —
 * that path quiets entrance/inertia instead of swapping UIs.
 */
export function OrbitalDrawingsMosaic({
  drawings,
}: OrbitalDrawingsMosaicProps) {
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const focused = drawings.find((d) => d.id === focusedId)

  return (
    <div className="absolute inset-0 h-full w-full overflow-auto px-6 py-8">
      <ul className="mx-auto grid max-w-[var(--breakpoint-content)] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {drawings.map((drawing) => (
          <li key={drawing.id}>
            <button
              type="button"
              className={cn(
                'block w-full overflow-hidden rounded-md focus-visible:outline-none',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'focus-visible:ring-offset-background',
              )}
              onClick={() => setFocusedId(drawing.id)}
              aria-label={`View ${drawing.alt}`}
            >
              <Image
                src={drawing.src}
                alt={drawing.alt}
                width={drawing.width}
                height={drawing.height}
                className="h-auto w-full object-cover"
                unoptimized
              />
            </button>
          </li>
        ))}
      </ul>

      {focused ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={focused.alt}
          className="fixed inset-0 z-40 flex items-center justify-center bg-background/90 p-6"
          onClick={() => setFocusedId(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setFocusedId(null)
          }}
        >
          <button
            type="button"
            className={cn(controlButtonClassName, 'absolute top-4 right-4')}
            onClick={() => setFocusedId(null)}
          >
            Close
          </button>
          <Image
            src={focused.src}
            alt={focused.alt}
            width={focused.width}
            height={focused.height}
            className="max-h-[85vh] w-auto max-w-full object-contain"
            unoptimized
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  )
}
