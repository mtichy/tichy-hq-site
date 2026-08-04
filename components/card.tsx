import Image from 'next/image'
import { cn } from '@/lib/utils'
import { hyperlinkChromeClassName } from '@/components/hyperlink'

export type CardImage = {
  src: string
  /**
   * Decorative by default when the card title already names the link.
   * Pass a meaningful alt only when the image itself conveys unique info.
   */
  alt?: string
  /** Intrinsic width for next/image; defaults to 760 */
  width?: number
  /** Intrinsic height for next/image; defaults to 428 */
  height?: number
  /** Skip optimization for pixel art / already-sized assets */
  unoptimized?: boolean
  /** Mark as LCP candidate on a landing grid */
  priority?: boolean
}

export type CardProps = {
  title: string
  description: string
  image: CardImage
  /** When present, tags render and a divider appears beneath them */
  tags?: readonly string[]
  href: string
  ctaLabel?: string
  className?: string
}

/**
 * Interactive project card (Figma Component/Card).
 * Single stretched link for a11y; cyan underlay slides 4px left + 4px down on
 * hover/focus. Gutter compensation keeps the underlay visible inside CSS columns.
 */
export function Card({
  title,
  description,
  image,
  tags,
  href,
  ctaLabel = 'View project →',
  className,
}: CardProps) {
  const ctaSpoken = ctaLabel.replace(/\s*→\s*$/, '').trim()

  return (
    <article
      className={cn(
        'group relative isolate h-fit',
        // 4px left/bottom gutter for the underlay; widen + pull back so the
        // face stays full column width (CSS columns clip overflow).
        'w-[calc(100%+0.25rem)] max-w-[calc(392px+0.25rem)]',
        '-ml-1 -mb-1 pl-1 pb-1',
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          'absolute top-0 right-0 bottom-1 left-1 z-0 rounded-md',
          'bg-[var(--color-brand-cyan)]',
          'transition-[translate,background-color] duration-200 ease-out',
          'motion-reduce:transition-none',
          'group-hover:-translate-x-1 group-hover:translate-y-1',
          'group-focus-within:-translate-x-1 group-focus-within:translate-y-1',
          'group-active:-translate-x-1 group-active:translate-y-1 group-active:bg-[var(--color-brand-magenta)]',
        )}
      />

      {/* Link sits above the face so the focus ring is not clipped by overflow */}
      <a
        href={href}
        className={cn(
          'absolute top-0 right-0 bottom-1 left-1 z-20 rounded-md',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
        aria-label={`${title}. ${ctaSpoken}`}
      />

      <div
        className={cn(
          'relative z-10 flex flex-col overflow-hidden rounded-md',
          'bg-card text-card-foreground',
          'shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]',
          'transition-shadow duration-200 ease-out',
          'motion-reduce:transition-none',
          'group-hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.14)]',
          'group-focus-within:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.14)]',
          'dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.35)]',
          'dark:group-hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.55)]',
          'dark:group-focus-within:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.55)]',
        )}
      >
        {/* Figma image frame 380×214 */}
        <div className="relative aspect-[380/214] w-full shrink-0 bg-muted">
          <Image
            src={image.src}
            alt={image.alt ?? ''}
            width={image.width ?? 760}
            height={image.height ?? 428}
            className={cn(
              'h-full w-full object-cover',
              image.unoptimized && '[image-rendering:pixelated]',
            )}
            sizes="(max-width: 640px) 100vw, 380px"
            unoptimized={image.unoptimized}
            priority={image.priority}
          />
        </div>

        <div className="flex flex-col items-start gap-4 p-6">
          <h3 className="text-medium font-bold leading-medium text-balance text-card-foreground">
            {title}
          </h3>
          <p className="text-regular leading-regular text-pretty text-muted-foreground">
            {description}
          </p>

          {tags && tags.length > 0 ? (
            <>
              <ul className="flex list-none flex-wrap content-start items-start gap-2 p-0">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded bg-muted px-2.5 py-1 text-small font-bold leading-small text-card-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <hr className="h-px w-full border-0 bg-border" />
            </>
          ) : null}

          <span
            aria-hidden
            className={cn(
              hyperlinkChromeClassName,
              'pointer-events-none text-regular leading-regular',
              'border-transparent transition-colors duration-150',
              'motion-reduce:transition-none',
              'group-hover:border-[var(--color-brand-magenta)]',
              'group-focus-within:border-[var(--color-brand-magenta)]',
            )}
          >
            {ctaLabel}
          </span>
        </div>
      </div>
    </article>
  )
}
