'use client'

import Image from 'next/image'
import { useEffect, useId, useState } from 'react'
import { controlButtonClassName } from '@/components/hyperlink'
import { cn } from '@/lib/utils'

type ExpandableImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  /** Optional caption under the inline image. */
  caption?: string
}

/**
 * Inline image with a click/tap lightbox — important for dense diagrams on
 * mobile and small viewports where the inline size is hard to read.
 */
export function ExpandableImage({
  src,
  alt,
  width,
  height,
  className,
  caption,
}: ExpandableImageProps) {
  const [open, setOpen] = useState(false)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <figure className={cn('flex w-full flex-col gap-3', className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'group relative block w-full overflow-hidden rounded-md bg-muted text-left outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
        aria-label={`Expand image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(max-width: 808px) 100vw, 808px"
          unoptimized
        />
        <span
          className={cn(
            'pointer-events-none absolute bottom-3 right-3 rounded-md bg-background/90 px-2.5 py-1',
            'text-small leading-small font-bold text-foreground shadow-[var(--elevation-rest)]',
            'lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100',
          )}
        >
          <span className="lg:hidden">Tap to expand</span>
          <span className="hidden lg:inline">Click to expand</span>
        </span>
      </button>
      {caption ? (
        <figcaption className="text-center text-small leading-small text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-3 sm:p-6"
          onClick={() => setOpen(false)}
        >
          <p id={titleId} className="sr-only">
            {alt}
          </p>
          <button
            type="button"
            className={cn(
              controlButtonClassName,
              'absolute top-4 right-4 z-10',
            )}
            onClick={() => setOpen(false)}
          >
            Close
          </button>
          <div
            className="max-h-[90vh] w-full max-w-[min(100%,96rem)] overflow-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            {/*
              On small screens, render wider than the viewport so the diagram
              stays readable and can be panned; desktop fits to height.
            */}
            <Image
              src={src}
              alt=""
              width={width}
              height={height}
              className="mx-auto h-auto w-[min(200vw,80rem)] max-w-none object-contain sm:w-auto sm:max-h-[85vh]"
              unoptimized
            />
          </div>
        </div>
      ) : null}
    </figure>
  )
}
