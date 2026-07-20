'use client'

import { track } from '@vercel/analytics'
import * as React from 'react'
import { Hyperlink } from '@/components/hyperlink'

type TrackedHyperlinkProps = React.ComponentProps<typeof Hyperlink> & {
  event: string
  eventData?: Record<string, string | number | boolean | null>
}

export function TrackedHyperlink({
  event,
  eventData,
  onClick,
  ...props
}: TrackedHyperlinkProps) {
  return (
    <Hyperlink
      {...props}
      onClick={(e) => {
        track(event, eventData)
        onClick?.(e)
      }}
    />
  )
}
