/** Map ECO or the first two plies to a coaching-friendly opening family. */
export function openingFamily(eco: string, sans: readonly string[]): string {
  const code = eco.trim().toUpperCase()
  if (code) {
    const letter = code[0]
    if (letter === 'B' && /^B2[0-9]$|^B[3-9]/.test(code))
      return 'Sicilian Defence'
    if (letter === 'C') {
      if (/^C0[0-9]$/.test(code)) return 'French Defence'
      if (/^C1[0-9]$/.test(code)) return 'Caro-Kann / other 1.e4'
      if (/^C2[0-4]$/.test(code)) return "King's Pawn Game"
      if (/^C2[5-9]$|^C3[0-9]$|^C4[0-9]$|^C5[0-9]$/.test(code))
        return 'Ruy Lopez / Italian'
      if (/^C6/.test(code)) return 'Ruy Lopez'
    }
    if (letter === 'D') {
      if (/^D0[0-5]$/.test(code)) return "Queen's Pawn Game"
      return "Queen's Gambit / Slav"
    }
    if (letter === 'E') return 'Indian Defences'
    if (letter === 'A') {
      if (/^A0[0-3]$/.test(code)) return 'Irregular / English'
      if (/^A1/.test(code)) return 'English Opening'
      if (/^A4[0-5]$/.test(code)) return "Queen's Pawn / Dutch"
      if (/^A8|^A9/.test(code)) return 'Dutch Defence'
    }
  }

  const w = sans[0] ?? ''
  const b = sans[1] ?? ''
  if (w === 'e4') {
    if (b === 'c5') return 'Sicilian Defence'
    if (b === 'e6') return 'French Defence'
    if (b === 'c6') return 'Caro-Kann Defence'
    if (b === 'e5') return "King's Pawn Game"
    if (b === 'd6' || b === 'g6') return 'Pirc / Modern'
    if (b === 'd5') return 'Scandinavian Defence'
    if (b === 'Nf6') return 'Alekhine Defence'
    return 'Other 1.e4'
  }
  if (w === 'd4') {
    if (b === 'Nf6') return 'Indian Defences'
    if (b === 'd5') return "Queen's Gambit / d4 d5"
    if (b === 'f5') return 'Dutch Defence'
    if (b === 'e6') return "Queen's Pawn / French-style"
    return 'Other 1.d4'
  }
  if (w === 'c4') return 'English Opening'
  if (w === 'Nf3') return 'Réti / 1.Nf3'
  if (w === 'g3' || w === 'b3' || w === 'f4') return 'Flank / irregular'
  return eco || (w ? `1.${w}` : 'Unknown opening')
}
