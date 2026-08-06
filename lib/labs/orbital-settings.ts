import {
  orbitalDrawings,
  type OrbitalDrawing,
} from '@/lib/labs/orbital-drawings'

export type OrbitalLayoutShape = 'sphere' | 'disk' | 'gaussian' | 'grid'

export type OrbitalElevation = 'off' | 'soft' | 'focus'

export type OrbitalSettings = {
  /** Fraction of archive drawings to show (0.15–1) */
  density: number
  /** Seed for sampling + layout jitter */
  seed: number
  shape: OrbitalLayoutShape
  /** Multiplier on per-card plane size (0.5–2) */
  cardSize: number
  /** Drag → radians per pixel */
  orbitSensitivity: number
  /** Post-drag coast damping (higher = longer spin; ~0.8–0.985) */
  inertia: number
  /** Focused card height as fraction of viewport (0.35–0.85) */
  focusSize: number
  /**
   * Card elevation (Figma Component/Card).
   * Soft = rest shadow on cards; Focus = rest shadow only while a card is focused
   * (on background cards). Focused card never shows elevation.
   */
  elevation: OrbitalElevation
}

export const ORBITAL_LAYOUT_SHAPES: readonly {
  id: OrbitalLayoutShape
  label: string
}[] = [
  { id: 'sphere', label: 'Sphere' },
  { id: 'disk', label: 'Disk' },
  { id: 'gaussian', label: 'Cloud' },
  { id: 'grid', label: 'Grid' },
] as const

export const ORBITAL_ELEVATIONS: readonly {
  id: OrbitalElevation
  label: string
}[] = [
  { id: 'off', label: 'Off' },
  { id: 'soft', label: 'Soft' },
  { id: 'focus', label: 'Focus' },
] as const

export const DEFAULT_ORBITAL_SETTINGS: OrbitalSettings = {
  density: 0.5,
  seed: 42,
  shape: 'sphere',
  cardSize: 1,
  orbitSensitivity: 0.0055,
  inertia: 0.94,
  focusSize: 0.6,
  elevation: 'off',
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Seeded subset of the archive for the live lab. */
export function sampleOrbitalDrawings(
  density: number,
  seed: number,
  source: readonly OrbitalDrawing[] = orbitalDrawings,
): OrbitalDrawing[] {
  const fraction = Math.min(1, Math.max(0.05, density))
  const rand = mulberry32(seed)
  const ranked = source.map((item) => ({ item, rank: rand() }))
  ranked.sort((a, b) => a.rank - b.rank)
  const count = Math.max(1, Math.round(source.length * fraction))
  return ranked.slice(0, count).map((entry) => entry.item)
}

export function nextOrbitalSeed() {
  return (Math.floor(Math.random() * 0xffffffff) || 1) >>> 0
}
