export function MtvLogo({ className }: { className?: string }) {
  // Reassembled from the Figma-exported fragments, each a 2× crop of its
  // Figma layer size. Positioned within the 146×90 (2×) black block.
  return (
    <span
      className={className}
      role="img"
      aria-label="MTV"
      style={{ position: 'relative', display: 'inline-block', width: 73, height: 45 }}
    >
      {/* black block */}
      <img src="/figma/mtv-2.svg" alt="" aria-hidden className="absolute" style={{ left: 0, top: 0, width: 73, height: 45 }} />
      {/* yellow M */}
      <img src="/figma/mtv-3.svg" alt="" aria-hidden className="absolute" style={{ left: 0, top: 2, width: 63, height: 41 }} />
      {/* cyan edge highlights */}
      <img src="/figma/mtv-4.svg" alt="" aria-hidden className="absolute" style={{ left: 31, top: 2, width: 42, height: 41 }} />
      {/* red "T" brushstroke */}
      <img src="/figma/mtv-5.svg" alt="" aria-hidden className="absolute" style={{ left: 26, top: 4, width: 24, height: 37 }} />
      {/* red "V" brushstroke */}
      <img src="/figma/mtv-6.svg" alt="" aria-hidden className="absolute" style={{ left: 44, top: 8, width: 24, height: 31 }} />
    </span>
  )
}
