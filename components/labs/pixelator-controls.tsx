'use client'

import type { CSSProperties, ChangeEvent, ReactNode } from 'react'
import type { PixelatorSettings } from '@/lib/labs/pixelator'
import { controlButtonClassName } from '@/components/hyperlink'
import { cn } from '@/lib/utils'

type PixelatorControlsProps = {
  value: PixelatorSettings
  onChange: (next: PixelatorSettings) => void
  onFile: (file: File) => void
  onSave: () => void
  canSave: boolean
  /** Prefix input ids when two strips mount (desktop + mobile). */
  idPrefix?: string
  className?: string
}

function ControlField({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string
  htmlFor: string
  children: ReactNode
  hint?: string
}) {
  return (
    <label htmlFor={htmlFor} className="flex w-full flex-col gap-1.5">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-small font-bold leading-small text-foreground">
          {label}
        </span>
        {hint ? (
          <span className="text-small tabular-nums text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </span>
      {children}
    </label>
  )
}

function rangeProgress(value: number, min: number, max: number): string {
  if (max <= min) return '0%'
  return `${((value - min) / (max - min)) * 100}%`
}

function rangeStyle(value: number, min: number, max: number): CSSProperties {
  return {
    ['--range-progress' as string]: rangeProgress(value, min, max),
  }
}

/**
 * Pixelator lab controls — tokens only, no card chrome.
 * Vertical stack for the lab sidebar (desktop + mobile).
 */
export function PixelatorControls({
  value,
  onChange,
  onFile,
  onSave,
  canSave,
  idPrefix = 'pixelator',
  className,
}: PixelatorControlsProps) {
  const patch = (partial: Partial<PixelatorSettings>) =>
    onChange({ ...value, ...partial })

  const id = (name: string) => `${idPrefix}-${name}`

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFile(file)
    e.target.value = ''
  }

  return (
    <div
      className={cn('flex flex-col items-stretch gap-5', className)}
      role="group"
      aria-label="Pixelator lab controls"
    >
      <ControlField label="Image" htmlFor={id('file')}>
        <input
          id={id('file')}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className={cn(
            'block w-full cursor-pointer text-small text-foreground',
            'file:mr-3 file:cursor-pointer file:border-0 file:bg-accent',
            'file:px-2.5 file:py-1 file:text-small file:font-bold',
            'file:leading-small file:text-accent-foreground',
          )}
        />
      </ControlField>

      <ControlField
        label="Threshold"
        htmlFor={id('threshold')}
        hint={String(value.threshold)}
      >
        <input
          id={id('threshold')}
          type="range"
          min={0}
          max={255}
          step={1}
          value={value.threshold}
          onChange={(e) => patch({ threshold: Number(e.target.value) })}
          className="control-range w-full"
          style={rangeStyle(value.threshold, 0, 255)}
          aria-valuetext={`${value.threshold}`}
        />
      </ControlField>

      <ControlField
        label="Grid size"
        htmlFor={id('grid-size')}
        hint={String(value.gridSize)}
      >
        <input
          id={id('grid-size')}
          type="range"
          min={10}
          max={200}
          step={1}
          value={value.gridSize}
          onChange={(e) => patch({ gridSize: Number(e.target.value) })}
          className="control-range w-full"
          style={rangeStyle(value.gridSize, 10, 200)}
          aria-valuetext={`${value.gridSize} columns`}
        />
      </ControlField>

      <button
        type="button"
        onClick={onSave}
        disabled={!canSave}
        className={cn(
          controlButtonClassName,
          'mt-1 w-fit',
          !canSave && 'cursor-not-allowed opacity-50',
        )}
      >
        Save image
      </button>
    </div>
  )
}
