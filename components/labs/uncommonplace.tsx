'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { BuildsBackLink } from '@/components/builds-back-link'
import { Hyperlink, controlButtonClassName } from '@/components/hyperlink'
import { UNCOMMONPLACE_HREF } from '@/lib/labs/uncommonplace'
import { type Quote } from '@/lib/labs/uncommonplace/quotes'
import {
  clearSeenQuoteIds,
  markQuoteSeen,
  readSeenQuoteIds,
  unseenQuotes,
} from '@/lib/labs/uncommonplace/seen'
import {
  pickRandom,
  quoteTreatments,
  type QuoteTreatment,
} from '@/lib/labs/uncommonplace/treatments'
import { cn } from '@/lib/utils'

const QUOTE_SIZE_MIN = 18.66
const QUOTE_SIZE_MAX = 58.92
const CROSSFADE_MS = 200

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type Pair = {
  quote: Quote
  treatment: QuoteTreatment
}

type LabState =
  | { status: 'loading' }
  | { status: 'quote'; pair: Pair; seenIds: string[] }
  | { status: 'exhausted' }

function pickFromUnseen(seenIds: readonly string[]): Pair | null {
  const remaining = unseenQuotes(seenIds)
  if (remaining.length === 0) return null
  return {
    quote: pickRandom(remaining),
    treatment: pickRandom(quoteTreatments),
  }
}

function contentSize(el: HTMLElement) {
  const styles = getComputedStyle(el)
  return {
    width:
      el.clientWidth -
      parseFloat(styles.paddingLeft) -
      parseFloat(styles.paddingRight),
    height:
      el.clientHeight -
      parseFloat(styles.paddingTop) -
      parseFloat(styles.paddingBottom),
  }
}

function fitQuoteToStage(
  stage: HTMLElement,
  figure: HTMLElement,
  quote: HTMLElement,
) {
  const box = contentSize(stage)
  const viewportCap = Math.max(120, window.innerHeight - 180)
  const maxH = Math.min(box.height, viewportCap)
  const maxW = box.width
  if (maxH < 8 || maxW < 8) return

  let lo = QUOTE_SIZE_MIN
  let hi = QUOTE_SIZE_MAX
  for (let i = 0; i < 14; i++) {
    const mid = (lo + hi) / 2
    quote.style.setProperty('--quote-size', `${mid}px`)
    const fits = figure.scrollHeight <= maxH && figure.scrollWidth <= maxW
    if (fits) lo = mid
    else hi = mid
  }
  quote.style.setProperty('--quote-size', `${lo}px`)
}

export default function Uncommonplace() {
  const [state, setState] = useState<LabState>({ status: 'loading' })
  const [opaque, setOpaque] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const figureRef = useRef<HTMLElement>(null)
  const fadeInAfterSwap = useRef(false)
  const fadeTimer = useRef<number>(0)
  const fadeInTimer = useRef<number>(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const seenIds = readSeenQuoteIds()
      const pair = pickFromUnseen(seenIds)
      if (!pair) {
        setState({ status: 'exhausted' })
        return
      }
      setState({
        status: 'quote',
        pair,
        seenIds: markQuoteSeen(pair.quote.id, seenIds),
      })
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const swapQuote = useCallback(() => {
    setState((current) => {
      if (current.status !== 'quote') return current
      const pair = pickFromUnseen(current.seenIds)
      if (!pair) return { status: 'exhausted' }
      return {
        status: 'quote',
        pair,
        seenIds: markQuoteSeen(pair.quote.id, current.seenIds),
      }
    })
  }, [])

  const refresh = useCallback(() => {
    if (isFading) return
    if (prefersReducedMotion()) {
      swapQuote()
      return
    }
    setIsFading(true)
    setOpaque(false)
    window.clearTimeout(fadeTimer.current)
    fadeTimer.current = window.setTimeout(() => {
      fadeInAfterSwap.current = true
      swapQuote()
    }, CROSSFADE_MS)
  }, [isFading, swapQuote])

  const resetBatch = useCallback(() => {
    if (isFading) return
    clearSeenQuoteIds()
    const pair = pickFromUnseen([])
    if (!pair) return
    const next: LabState = {
      status: 'quote',
      pair,
      seenIds: markQuoteSeen(pair.quote.id, []),
    }
    if (prefersReducedMotion()) {
      setState(next)
      return
    }
    setIsFading(true)
    setOpaque(false)
    window.clearTimeout(fadeTimer.current)
    fadeTimer.current = window.setTimeout(() => {
      fadeInAfterSwap.current = true
      setState(next)
    }, CROSSFADE_MS)
  }, [isFading])

  useEffect(() => {
    return () => {
      window.clearTimeout(fadeTimer.current)
      window.clearTimeout(fadeInTimer.current)
    }
  }, [])

  const quoteKey =
    state.status === 'quote'
      ? `${state.pair.quote.id}:${state.pair.treatment.id}`
      : state.status

  const fit = useCallback(() => {
    const stage = stageRef.current
    const figure = figureRef.current
    const quote = figure?.querySelector('blockquote')
    if (!stage || !figure || !(quote instanceof HTMLElement)) return
    fitQuoteToStage(stage, figure, quote)
  }, [])

  useLayoutEffect(() => {
    if (state.status === 'quote') fit()
    if (fadeInAfterSwap.current) {
      fadeInAfterSwap.current = false
      requestAnimationFrame(() => {
        setOpaque(true)
        window.clearTimeout(fadeInTimer.current)
        fadeInTimer.current = window.setTimeout(
          () => setIsFading(false),
          CROSSFADE_MS,
        )
      })
    }
    if (state.status !== 'quote') return
    const stage = stageRef.current
    if (!stage) return
    const ro = new ResizeObserver(fit)
    ro.observe(stage)
    void document.fonts.ready.then(fit)
    return () => ro.disconnect()
  }, [fit, quoteKey, state.status])

  const hasQuote = state.status === 'quote'

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="sticky top-[var(--site-nav-height)] z-40 bg-background">
        <div className="mx-auto w-full max-w-[var(--breakpoint-content)] px-6 pt-8 pb-4">
          <BuildsBackLink />
        </div>
      </div>

      <div className="mx-auto flex min-h-0 w-full max-w-[var(--breakpoint-content)] flex-1 flex-col gap-4 px-6 pb-6 lg:flex-row lg:items-stretch lg:gap-12">
        <aside className="order-3 w-full shrink-0 lg:sticky lg:top-[calc(var(--site-nav-height)+4.5rem)] lg:order-1 lg:max-h-[calc(100vh-var(--site-nav-height)-5.5rem)] lg:w-[288px] lg:self-start">
          <div className="flex max-w-[288px] flex-col gap-4 lg:gap-6">
            <div className="space-y-2">
              <p className="text-small font-bold uppercase tracking-wide text-muted-foreground">
                Lab
              </p>
              <h1 className="min-w-0 w-full text-large font-bold leading-large text-foreground">
                (Un)
                <wbr />
                Commonplace
              </h1>
              <p className="text-small text-muted-foreground text-pretty">
                Commonplace books are an ancient practice of capturing bits of
                knowledge and inspiration in notebooks. This is my emerging
                digital version drawn from my own notebooks and CSS experiments.
              </p>
            </div>
            {hasQuote ? (
              <button
                type="button"
                onClick={refresh}
                disabled={isFading}
                className={cn(
                  controlButtonClassName,
                  'hidden w-fit lg:inline-flex',
                  isFading && 'cursor-not-allowed opacity-50',
                )}
              >
                Load another quote
              </button>
            ) : null}
          </div>
        </aside>

        <div
          ref={stageRef}
          className="order-1 flex h-[50svh] min-h-[min(20rem,calc(100svh-var(--site-nav-height)-5.5rem))] max-h-[calc(100svh-var(--site-nav-height)-7rem)] w-full min-w-0 shrink-0 items-center justify-center overflow-visible px-2 py-6 lg:order-2 lg:h-auto lg:max-h-[calc(100svh-var(--site-nav-height)-7rem)] lg:min-h-0 lg:flex-1 lg:py-10"
        >
          <div
            className={cn(
              'flex w-full max-w-full items-center justify-center',
              'transition-opacity duration-200 ease-out motion-reduce:transition-none',
              opaque ? 'opacity-100' : 'opacity-0',
            )}
          >
            {hasQuote ? (
              <figure
                ref={figureRef}
                className="mx-auto flex w-full min-w-0 max-w-full flex-col gap-4 p-2 text-center max-[500px]:gap-2 sm:gap-6 sm:p-3"
              >
                <blockquote
                  className={cn(
                    'quote-display m-0',
                    state.pair.treatment.className,
                  )}
                >
                  {state.pair.quote.text}
                </blockquote>
                {state.pair.quote.author ? (
                  <figcaption className="text-small leading-small font-sans font-normal uppercase tracking-wide text-muted-foreground">
                    {state.pair.quote.author}
                  </figcaption>
                ) : null}
              </figure>
            ) : state.status === 'exhausted' ? (
              <p className="max-w-[40ch] text-center text-medium leading-medium font-sans font-medium text-balance text-foreground">
                Nice, you&apos;ve read all I have for now but there will be more
                to come. You can{' '}
                <Hyperlink
                  href={UNCOMMONPLACE_HREF}
                  className="text-medium leading-medium"
                  onClick={(event) => {
                    event.preventDefault()
                    resetBatch()
                  }}
                >
                  reload the prior batch
                </Hyperlink>{' '}
                if you want to.
              </p>
            ) : (
              <p className="sr-only">Loading a quote</p>
            )}
          </div>
        </div>

        {hasQuote ? (
          <div className="order-2 flex justify-center lg:hidden">
            <button
              type="button"
              onClick={refresh}
              disabled={isFading}
              className={cn(
                controlButtonClassName,
                'w-fit',
                isFading && 'cursor-not-allowed opacity-50',
              )}
            >
              Load another quote
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
