import { access, mkdir, stat, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

const FILES = [
  { name: 'stockfish-18-lite-single.js', minBytes: 10_000 },
  { name: 'stockfish-18-lite-single.wasm', minBytes: 1_000_000 },
]
const RELEASE =
  'https://github.com/nmrugg/stockfish.js/releases/download/v18.0.0'

async function isUsable(dest, minBytes) {
  try {
    await access(dest)
    const { size } = await stat(dest)
    return size >= minBytes
  } catch {
    return false
  }
}

async function main() {
  const toDir = path.join(process.cwd(), 'public', 'vendor', 'stockfish')
  await mkdir(toDir, { recursive: true })

  for (const { name, minBytes } of FILES) {
    const dest = path.join(toDir, name)
    if (await isUsable(dest, minBytes)) {
      console.log(`Keeping ${name}`)
      continue
    }
    try {
      await unlink(dest)
    } catch {
      // missing or unreadable — download a fresh copy
    }
    const url = `${RELEASE}/${name}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to download ${name}: ${response.status}`)
    }
    const buffer = Buffer.from(await response.arrayBuffer())
    if (buffer.byteLength < minBytes) {
      throw new Error(
        `Downloaded ${name} is too small (${buffer.byteLength} bytes)`,
      )
    }
    await writeFile(dest, buffer)
    console.log(`Downloaded ${name} (${buffer.byteLength} bytes)`)
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
