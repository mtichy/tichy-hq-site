export const PIXELATOR_EFFECT_HREF = '/labs/pixelator-effect'

export const PIXELATOR_DEFAULT_IMAGE = '/images/avatar-333333.png'

/** Pixel fill — site surface off-white. */
export const PIXELATOR_PIXEL_COLOR = '#F1F7EE'

/** Longest edge for high-res PNG export. */
export const PIXELATOR_EXPORT_MAX = 2000
export const PIXELATOR_EXPORT_FILENAME = 'cleanHighResTransparentPortrait.png'

/** Preview stage max bounds (css px). Large uploads shrink to fit. */
export const PIXELATOR_STAGE_MAX_WIDTH = 900
export const PIXELATOR_STAGE_MAX_HEIGHT = 620

export type PixelatorSettings = {
  threshold: number
  gridSize: number
}

export const DEFAULT_PIXELATOR_SETTINGS: PixelatorSettings = {
  threshold: 120,
  gridSize: 80,
}

/** Binary occupancy grid: cols × rows of 0 | 1 */
export type PixelGrid = {
  cols: number
  rows: number
  /** row-major: index = y * cols + x */
  cells: Uint8Array
}

/** p5 brightness() equivalent (Rec. 601 luma, 0–255). */
export function pixelBrightness(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b
}

/**
 * Fit `srcW×srcH` inside `maxW×maxH`, preserving aspect ratio.
 * Never upscales — large images shrink; small ones keep their size
 * only when both dimensions already fit (caller may still set a floor).
 */
export function fitWithin(
  srcW: number,
  srcH: number,
  maxW: number,
  maxH: number,
): { width: number; height: number } {
  if (srcW <= 0 || srcH <= 0 || maxW <= 0 || maxH <= 0) {
    return { width: 0, height: 0 }
  }
  const scale = Math.min(1, maxW / srcW, maxH / srcH)
  return {
    width: Math.max(1, Math.round(srcW * scale)),
    height: Math.max(1, Math.round(srcH * scale)),
  }
}

/**
 * Resize source to `gridSize` width (aspect-preserving height), then
 * threshold by brightness — same pipeline as the original p5 sketch.
 */
export function processImage(
  source: CanvasImageSource,
  options: { gridSize: number; threshold: number },
): PixelGrid {
  const { gridSize, threshold } = options

  const srcW =
    'naturalWidth' in source
      ? (source as HTMLImageElement).naturalWidth ||
        (source as HTMLImageElement).width
      : (source as HTMLCanvasElement).width
  const srcH =
    'naturalHeight' in source
      ? (source as HTMLImageElement).naturalHeight ||
        (source as HTMLImageElement).height
      : (source as HTMLCanvasElement).height

  if (!srcW || !srcH) {
    return { cols: 0, rows: 0, cells: new Uint8Array(0) }
  }

  const cols = Math.max(1, Math.round(gridSize))
  const rows = Math.max(1, Math.round((srcH / srcW) * cols))

  const canvas = document.createElement('canvas')
  canvas.width = cols
  canvas.height = rows
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) {
    return { cols: 0, rows: 0, cells: new Uint8Array(0) }
  }

  ctx.imageSmoothingEnabled = true
  ctx.drawImage(source, 0, 0, cols, rows)
  const { data } = ctx.getImageData(0, 0, cols, rows)

  const cells = new Uint8Array(cols * rows)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4
      const a = data[i + 3]
      if (a < 8) {
        cells[y * cols + x] = 0
        continue
      }
      const b = pixelBrightness(data[i], data[i + 1], data[i + 2])
      cells[y * cols + x] = b < threshold ? 1 : 0
    }
  }

  return { cols, rows, cells }
}

export function layoutGrid(
  cols: number,
  rows: number,
  width: number,
  height: number,
): { cellSize: number; xOffset: number; yOffset: number } {
  if (cols <= 0 || rows <= 0 || width <= 0 || height <= 0) {
    return { cellSize: 0, xOffset: 0, yOffset: 0 }
  }
  const cellSize = Math.min(width / cols, height / rows)
  const xOffset = (width - cols * cellSize) / 2
  const yOffset = (height - rows * cellSize) / 2
  return { cellSize, xOffset, yOffset }
}

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  grid: PixelGrid,
  color: string,
  width: number,
  height: number,
): void {
  ctx.clearRect(0, 0, width, height)
  if (grid.cols === 0 || grid.rows === 0) return

  const { cellSize, xOffset, yOffset } = layoutGrid(
    grid.cols,
    grid.rows,
    width,
    height,
  )
  if (cellSize <= 0) return

  ctx.fillStyle = color
  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      if (grid.cells[y * grid.cols + x] === 1) {
        ctx.fillRect(
          xOffset + x * cellSize,
          yOffset + y * cellSize,
          cellSize,
          cellSize,
        )
      }
    }
  }
}

/**
 * Transparent PNG export. Longest edge is PIXELATOR_EXPORT_MAX;
 * aspect matches the pixel grid (source image).
 */
export function exportPortrait(grid: PixelGrid): Promise<Blob | null> {
  if (grid.cols === 0 || grid.rows === 0) return Promise.resolve(null)

  const scale = PIXELATOR_EXPORT_MAX / Math.max(grid.cols, grid.rows)
  const exportW = Math.max(1, Math.round(grid.cols * scale))
  const exportH = Math.max(1, Math.round(grid.rows * scale))

  const canvas = document.createElement('canvas')
  canvas.width = exportW
  canvas.height = exportH
  const ctx = canvas.getContext('2d')
  if (!ctx) return Promise.resolve(null)

  ctx.clearRect(0, 0, exportW, exportH)
  drawGrid(ctx, grid, PIXELATOR_PIXEL_COLOR, exportW, exportH)

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png')
  })
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
