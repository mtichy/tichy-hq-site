'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import type { DemoRole } from '@/lib/fetch-demo/types'

type RoleToggleProps = {
  value: DemoRole
  onChange: (role: DemoRole) => void
  className?: string
}

const OPTIONS: { value: DemoRole; label: string }[] = [
  { value: 'author', label: 'Author' },
  { value: 'editor', label: 'Editor' },
]

export function RoleToggle({ value, onChange, className }: RoleToggleProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function select(role: DemoRole) {
    onChange(role)
    const index = OPTIONS.findIndex((o) => o.value === role)
    queueMicrotask(() => {
      refs.current[index]?.focus()
    })
  }

  return (
    <div
      role="radiogroup"
      aria-label="Viewing as"
      className={cn('flex flex-wrap items-center gap-2', className)}
    >
      <span className="text-small leading-small text-muted-foreground">
        Viewing as:
      </span>
      <div className="flex overflow-hidden rounded-md border border-border">
        {OPTIONS.map((opt, index) => {
          const checked = value === opt.value
          return (
            <button
              key={opt.value}
              ref={(el) => {
                refs.current[index] = el
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => select(opt.value)}
              onKeyDown={(e) => {
                if (
                  e.key === 'ArrowRight' ||
                  e.key === 'ArrowLeft' ||
                  e.key === 'ArrowDown' ||
                  e.key === 'ArrowUp'
                ) {
                  e.preventDefault()
                  const next = value === 'author' ? 'editor' : 'author'
                  select(next)
                }
              }}
              className={cn(
                'px-3 py-1.5 text-small leading-small font-bold outline-none transition-colors',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                checked
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-card text-card-foreground hover:bg-muted',
              )}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
