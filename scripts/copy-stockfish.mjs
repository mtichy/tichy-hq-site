import { access, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const FILES = ['stockfish-18-lite-single.js', 'stockfish-18-lite-single.wasm']
const RELEASE =
  'https://github.com/nmrugg/stockfish.js/releases/download/v18.0.0'

async function main() {
  const toDir = path.join(process.cwd(), 'public', 'vendor', 'stockfish')
  await mkdir(toDir, { recursive: true })

  for (const file of FILES) {
    const dest = path.join(toDir, file)
    try {
      await access(dest)
      console.log(`Keeping ${file}`)
      continue
    } catch {
      // download
    }
    const url = `${RELEASE}/${file}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to download ${file}: ${response.status}`)
    }
    await writeFile(dest, Buffer.from(await response.arrayBuffer()))
    console.log(`Downloaded ${file}`)
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
