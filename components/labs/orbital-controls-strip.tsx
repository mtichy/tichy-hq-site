'use client'

import type { ReactNode } from 'react'
import {
  ORBITAL_ELEVATIONS,
  ORBITAL_LAYOUT_SHAPES,
  type OrbitalSettings,
} from '@/lib/labs/orbital-settings'
import { controlButtonClassName } from '@/components/hyperlink'
import { cn } from '@/lib/utils'

type OrbitalControlsStripProps = {
  value: OrbitalSettings
  onChange: (next: OrbitalSettings) => void
  onReshuffle: () => void
  /** Vertical stack for the lab sidebar; default is a wrapping strip */
  layout?: 'strip' | 'sidebar'
  className?: string
}

function ControlField({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="flex w-full flex-col gap-1.5">
      <span className="text-small font-bold leading-small text-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}

/**
 * Lab controls — tokens only, no card chrome.
 * Use `layout="sidebar"` for the left-rail vertical stack.
 */
export function OrbitalControlsStrip({
  value,
  onChange,
  onReshuffle,
  layout = 'strip',
  className,
}: OrbitalControlsStripProps) {
  const patch = (partial: Partial<OrbitalSettings>) =>
    onChange({ ...value, ...partial })

  const isSidebar = layout === 'sidebar'

  const rangeClassName = cn(
    'h-2 cursor-pointer appearance-none rounded-full',
    'bg-muted accent-[var(--color-brand-cyan)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    isSidebar ? 'w-full' : 'w-full max-w-[9rem]',
  )

  return (
    <div
      className={cn(
        isSidebar
          ? 'flex flex-col items-stretch gap-5'
          : 'flex flex-wrap items-end gap-x-6 gap-y-3',
        className,
      )}
      role="group"
      aria-label="Orbital lab controls"
    >
      <ControlField label="Density" htmlFor="orbital-density">
        <input
          id="orbital-density"
          type="range"
          min={0.15}
          max={1}
          step={0.05}
          value={value.density}
          onChange={(e) => patch({ density: Number(e.target.value) })}
          className={rangeClassName}
          aria-valuetext={`${Math.round(value.density * 100)} percent`}
        />
      </ControlField>

      <ControlField label="Card size" htmlFor="orbital-card-size">
        <input
          id="orbital-card-size"
          type="range"
          min={0.5}
          max={2}
          step={0.05}
          value={value.cardSize}
          onChange={(e) => patch({ cardSize: Number(e.target.value) })}
          className={rangeClassName}
        />
      </ControlField>

      <ControlField label="Focus size" htmlFor="orbital-focus-size">
        <input
          id="orbital-focus-size"
          type="range"
          min={0.35}
          max={0.85}
          step={0.05}
          value={value.focusSize}
          onChange={(e) => patch({ focusSize: Number(e.target.value) })}
          className={rangeClassName}
          aria-valuetext={`${Math.round(value.focusSize * 100)} percent of view height`}
        />
      </ControlField>

      <ControlField label="Orbit feel" htmlFor="orbital-sensitivity">
        <input
          id="orbital-sensitivity"
          type="range"
          min={0.002}
          max={0.012}
          step={0.0005}
          value={value.orbitSensitivity}
          onChange={(e) => patch({ orbitSensitivity: Number(e.target.value) })}
          className={rangeClassName}
        />
      </ControlField>

      <ControlField label="Inertia" htmlFor="orbital-inertia">
        <input
          id="orbital-inertia"
          type="range"
          min={0.8}
          max={0.985}
          step={0.005}
          value={value.inertia}
          onChange={(e) => patch({ inertia: Number(e.target.value) })}
          className={rangeClassName}
        />
      </ControlField>

      <div className="flex flex-col gap-1.5">
        <span className="text-small font-bold leading-small text-foreground">
          Shape
        </span>
        <div
          className="flex flex-wrap gap-1"
          role="radiogroup"
          aria-label="Cloud shape"
        >
          {ORBITAL_LAYOUT_SHAPES.map((shape) => {
            const selected = value.shape === shape.id
            return (
              <button
                key={shape.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => patch({ shape: shape.id })}
                className={cn(
                  controlButtonClassName,
                  selected
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {shape.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-small font-bold leading-small text-foreground">
          Elevation
        </span>
        <div
          className="flex flex-wrap gap-1"
          role="radiogroup"
          aria-label="Card elevation"
        >
          {ORBITAL_ELEVATIONS.map((mode) => {
            const selected = value.elevation === mode.id
            return (
              <button
                key={mode.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => patch({ elevation: mode.id })}
                className={cn(
                  controlButtonClassName,
                  selected
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {mode.label}
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onReshuffle}
        className={cn(controlButtonClassName, 'w-fit', isSidebar && 'mt-1')}
      >
        Reshuffle
      </button>
    </div>
  )
}
