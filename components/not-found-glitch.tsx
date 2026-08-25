'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

export const NOT_FOUND_HEADING = '404 // PAGE NOT FOUND'

const GLITCH_SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>/?0123456789'
const CANVAS_HEIGHT = 120
const CYCLE_SPEED = 0.03
const TRAIL_ALPHA = 70 / 255
const JITTER_X = 30
const JITTER_Y = 20
/** Floor so faded glyphs still meet WCAG AA large-text (3:1) on the light page. */
const GLYPH_ALPHA_MIN = 191 / 255
const CHROMATIC_ALPHA = 191 / 255

const headingColorClassName =
  'text-[var(--color-brand-cyan-strong)] dark:text-[var(--color-brand-cyan)]'

type CharObject = {
  char: string
  current: string
  x: number
  phase: number
}

type Rgb = { r: number; g: number; b: number }

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

function fade(n: number) {
  return n * n * (3 - 2 * n)
}

function hash2(ix: number, iy: number) {
  let h = ix * 374761393 + iy * 668265263
  h = (h ^ (h >> 13)) * 1274126177
  return ((h ^ (h >> 16)) >>> 0) / 4294967296
}

/** Smooth 2D value noise in [0, 1], stand-in for p5.noise. */
function valueNoise(x: number, y: number) {
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const fx = fade(x - x0)
  const fy = fade(y - y0)
  const v00 = hash2(x0, y0)
  const v10 = hash2(x0 + 1, y0)
  const v01 = hash2(x0, y0 + 1)
  const v11 = hash2(x0 + 1, y0 + 1)
  const x1 = v00 + (v10 - v00) * fx
  const x2 = v01 + (v11 - v01) * fx
  return x1 + (x2 - x1) * fy
}

function parseCssColor(value: string): Rgb | null {
  const trimmed = value.trim()
  const hex = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex) {
    let h = hex[1]
    if (h.length === 3) {
      h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
    }
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    }
  }
  const rgb = trimmed.match(
    /^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i,
  )
  if (rgb) {
    return {
      r: Number(rgb[1]),
      g: Number(rgb[2]),
      b: Number(rgb[3]),
    }
  }
  return null
}

function resolveColor(
  styles: CSSStyleDeclaration,
  property: string,
): Rgb | null {
  const raw = styles.getPropertyValue(property).trim()
  const direct = parseCssColor(raw)
  if (direct) return direct
  if (raw.startsWith('var(')) {
    const inner = raw.slice(4, -1).trim().split(',')[0]
    return parseCssColor(styles.getPropertyValue(inner).trim())
  }
  return null
}

function readTokens(el: HTMLElement) {
  const styles = getComputedStyle(el)
  const background = parseCssColor(styles.backgroundColor) ??
    resolveColor(styles, '--background') ?? { r: 241, g: 247, b: 238 }
  const cyan = parseCssColor(styles.color) ??
    resolveColor(styles, '--color-brand-cyan-strong') ?? {
      r: 31,
      g: 111,
      b: 134,
    }
  const magenta = resolveColor(styles, '--glitch-split') ??
    resolveColor(styles, '--color-brand-magenta-strong') ?? {
      r: 179,
      g: 61,
      b: 90,
    }
  const fontFamily = styles.fontFamily
  const fontSizeRaw = styles.getPropertyValue('--text-large').trim()
  const baseSize = Number.parseFloat(fontSizeRaw) || 33.16
  return { background, cyan, magenta, fontFamily, baseSize }
}

function rgba({ r, g, b }: Rgb, a: number) {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

function layoutChars(
  ctx: CanvasRenderingContext2D,
  fontFamily: string,
  baseSize: number,
  width: number,
): { chars: CharObject[]; font: string } {
  const pad = 8
  let fontSize = baseSize
  let font = `700 ${fontSize}px ${fontFamily}`
  ctx.font = font

  const measure = () =>
    [...NOT_FOUND_HEADING].map((ch) => ctx.measureText(ch).width)

  let widths = measure()
  let total = widths.reduce((sum, w) => sum + w, 0)
  const maxWidth = Math.max(1, width - pad * 2)
  if (total > maxWidth) {
    fontSize = Math.max(14, (baseSize * maxWidth) / total)
    font = `700 ${fontSize}px ${fontFamily}`
    ctx.font = font
    widths = measure()
    total = widths.reduce((sum, w) => sum + w, 0)
  }

  let x = (width - total) / 2
  const chars = [...NOT_FOUND_HEADING].map((char, i) => {
    const obj: CharObject = {
      char,
      current: char,
      x,
      phase: i * 0.15,
    }
    x += widths[i]
    return obj
  })
  return { chars, font }
}

export function NotFoundGlitch() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameCount = 0
    let raf = 0
    let chars: CharObject[] = []
    let font = ''
    let tokens = readTokens(wrap)
    let cssWidth = wrap.clientWidth
    let disposed = false

    const applyLayout = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      cssWidth = wrap.clientWidth
      canvas.width = Math.max(1, Math.floor(cssWidth * dpr))
      canvas.height = Math.floor(CANVAS_HEIGHT * dpr)
      canvas.style.width = `${cssWidth}px`
      canvas.style.height = `${CANVAS_HEIGHT}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      tokens = readTokens(wrap)
      const layout = layoutChars(
        ctx,
        tokens.fontFamily,
        tokens.baseSize,
        cssWidth,
      )
      chars = layout.chars
      font = layout.font
      ctx.fillStyle = rgba(tokens.background, 1)
      ctx.fillRect(0, 0, cssWidth, CANVAS_HEIGHT)
    }

    const onResize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      const nextW = Math.max(1, Math.floor(wrap.clientWidth * dpr))
      const nextH = Math.floor(CANVAS_HEIGHT * dpr)
      if (canvas.width === nextW && canvas.height === nextH) return
      applyLayout()
    }

    const onTheme = () => {
      tokens = readTokens(wrap)
      ctx.fillStyle = rgba(tokens.background, 1)
      ctx.fillRect(0, 0, cssWidth, CANVAS_HEIGHT)
    }

    const draw = () => {
      if (disposed) return
      frameCount += 1
      ctx.font = font
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'

      ctx.fillStyle = rgba(tokens.background, TRAIL_ALPHA)
      ctx.fillRect(0, 0, cssWidth, CANVAS_HEIGHT)

      const rawWave = (Math.sin(frameCount * CYCLE_SPEED - Math.PI / 2) + 1) / 2
      const globalDecay = rawWave ** 3 * 0.75
      const y = CANVAS_HEIGHT / 2

      for (const c of chars) {
        const localDecay = Math.min(
          Math.max(
            globalDecay +
              Math.sin(frameCount * 0.05 + c.phase) * 0.1 * globalDecay,
            0,
          ),
          0.8,
        )

        if (localDecay > 0.05 && Math.random() < localDecay) {
          c.current =
            GLITCH_SYMBOLS[Math.floor(Math.random() * GLITCH_SYMBOLS.length)]
        } else {
          c.current = c.char
        }

        const jitterX =
          (valueNoise(frameCount * 0.2, c.x) - 0.5) * JITTER_X * localDecay
        const jitterY =
          (valueNoise(frameCount * 0.2, y) - 0.5) * JITTER_Y * localDecay

        if (localDecay > 0.35 && Math.random() < 0.4) {
          ctx.fillStyle = rgba(tokens.magenta, CHROMATIC_ALPHA)
          ctx.fillText(
            c.current,
            c.x + jitterX + (Math.random() * 10 - 5),
            y + jitterY,
          )
        }

        const alpha = 1 - ((1 - GLYPH_ALPHA_MIN) * localDecay) / 0.8
        ctx.fillStyle = rgba(tokens.cyan, alpha)
        ctx.fillText(c.current, c.x + jitterX, y + jitterY)
      }

      raf = requestAnimationFrame(draw)
    }

    applyLayout()
    const ro = new ResizeObserver(onResize)
    ro.observe(wrap)

    const themeRoot = document.documentElement
    const mo = new MutationObserver(onTheme)
    mo.observe(themeRoot, { attributes: true, attributeFilter: ['class'] })

    raf = requestAnimationFrame(draw)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <h1
        className={cn(
          'text-center text-large font-bold leading-large text-balance',
          headingColorClassName,
        )}
      >
        {NOT_FOUND_HEADING}
      </h1>
    )
  }

  return (
    <div
      ref={wrapRef}
      className={cn(
        'w-full bg-background',
        headingColorClassName,
        '[--glitch-split:var(--color-brand-magenta-strong)]',
        'dark:[--glitch-split:var(--color-brand-magenta)]',
      )}
    >
      <h1 className="sr-only">{NOT_FOUND_HEADING}</h1>
      <canvas ref={canvasRef} aria-hidden className="block h-[120px] w-full" />
    </div>
  )
}
