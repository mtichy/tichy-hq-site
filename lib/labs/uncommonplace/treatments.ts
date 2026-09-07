export type QuoteTreatment = {
  id: string
  className: string
}

export const quoteTreatments: readonly QuoteTreatment[] = [
  { id: 'shaded', className: 'quote-treatment-shaded' },
  { id: 'shaded-magenta', className: 'quote-treatment-shaded-magenta' },
  { id: 'glow', className: 'quote-treatment-glow' },
  { id: 'glow-cyan', className: 'quote-treatment-glow-cyan' },
  { id: 'outlined', className: 'quote-treatment-outlined' },
  { id: 'outlined-cyan', className: 'quote-treatment-outlined-cyan' },
]

export function pickRandom<T>(items: readonly T[], except?: T): T {
  if (items.length === 0) {
    throw new Error('Cannot pick from an empty list')
  }
  if (except == null || items.length === 1) {
    return items[Math.floor(Math.random() * items.length)]!
  }
  const pool = items.filter((item) => item !== except)
  return pool[Math.floor(Math.random() * pool.length)]!
}
