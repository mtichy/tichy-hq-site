'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from 'react'
import { cn } from '@/lib/utils'

type LabVideoProps = {
  src: string
  poster: string
  width: number
  height: number
  label: string
  /** Looping silent studies vs. a scored clip the visitor plays. */
  mode: 'loop' | 'sound'
  className?: string
}

export function LabVideo({
  src,
  poster,
  width,
  height,
  label,
  mode,
  className,
}: LabVideoProps) {
  const silent = mode === 'loop'
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const autoplay = silent && !reduceMotion

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (silent) video.muted = true
    if (autoplay) {
      void video.play()
    } else {
      video.pause()
    }
  }, [silent, autoplay, src])

  const restartIfLooping = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      if (!silent || reduceMotion) return
      const video = event.currentTarget
      video.currentTime = 0
      void video.play()
    },
    [silent, reduceMotion],
  )

  return (
    <div className={cn('overflow-hidden rounded-md bg-muted', className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        width={width}
        height={height}
        className="h-auto w-full"
        aria-label={label}
        playsInline
        preload="metadata"
        autoPlay={autoplay}
        muted={silent}
        loop={autoplay}
        controls
        onEnded={restartIfLooping}
      />
    </div>
  )
}
