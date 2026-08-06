/**
 * Card elevation from Figma Component/Card (node 354:68).
 * Keep CSS vars in app/globals.css in sync with these values.
 */
export type ElevationLevel = 'rest' | 'raised'

export const ELEVATION = {
  rest: {
    /** CSS: 0px 2px 8px 0px */
    offsetX: 0,
    offsetY: 2,
    blur: 8,
    opacityLight: 0.06,
    opacityDark: 0.35,
  },
  raised: {
    /** CSS: 0px 8px 24px 0px */
    offsetX: 0,
    offsetY: 8,
    blur: 24,
    opacityLight: 0.14,
    opacityDark: 0.55,
  },
} as const

/** Reference card face height in Figma (image frame), for px → world mapping. */
export const ELEVATION_REF_HEIGHT_PX = 214

export function elevationOpacity(level: ElevationLevel, dark: boolean): number {
  const token = ELEVATION[level]
  return dark ? token.opacityDark : token.opacityLight
}

/** World-space shadow layout for a plane of the given height. */
export function elevationWorldLayout(
  level: ElevationLevel,
  planeHeight: number,
) {
  const token = ELEVATION[level]
  const unit = planeHeight / ELEVATION_REF_HEIGHT_PX
  return {
    offsetX: token.offsetX * unit,
    offsetY: -token.offsetY * unit,
    /** Extra size so blurred edges fall outside the card */
    pad: (token.blur * 2 * unit) / planeHeight,
  }
}
