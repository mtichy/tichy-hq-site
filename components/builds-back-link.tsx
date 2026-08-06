import { Hyperlink, controlButtonClassName } from '@/components/hyperlink'
import { cn } from '@/lib/utils'

type BuildsBackLinkProps = {
  className?: string
}

/** Shared back control for build detail pages → `/builds`. */
export function BuildsBackLink({ className }: BuildsBackLinkProps) {
  return (
    <Hyperlink
      href="/builds"
      className={cn(controlButtonClassName, 'w-fit self-start', className)}
    >
      ← Back to Builds
    </Hyperlink>
  )
}
