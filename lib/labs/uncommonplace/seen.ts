import { quotes, type Quote } from '@/lib/labs/uncommonplace/quotes'

export const UNCOMMONPLACE_SEEN_KEY = 'uncommonplace-seen-ids'

export const UNCOMMONPLACE_ALL_READ_MESSAGE =
  "Nice, you've read all I have for now but there will be more to come. You can reload the prior batch if you want to."

function knownIds() {
  return new Set(quotes.map((quote) => quote.id))
}

export function readSeenQuoteIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(UNCOMMONPLACE_SEEN_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const known = knownIds()
    return parsed.filter(
      (id): id is string => typeof id === 'string' && known.has(id),
    )
  } catch {
    return []
  }
}

export function writeSeenQuoteIds(ids: string[]) {
  window.localStorage.setItem(UNCOMMONPLACE_SEEN_KEY, JSON.stringify(ids))
}

export function clearSeenQuoteIds() {
  writeSeenQuoteIds([])
}

export function markQuoteSeen(
  id: string,
  alreadySeen: readonly string[],
): string[] {
  if (alreadySeen.includes(id)) return [...alreadySeen]
  const next = [...alreadySeen, id]
  writeSeenQuoteIds(next)
  return next
}

export function unseenQuotes(seenIds: readonly string[]): Quote[] {
  const seen = new Set(seenIds)
  return quotes.filter((quote) => !seen.has(quote.id))
}
