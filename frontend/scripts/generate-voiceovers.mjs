// Generates the world narration MP3s with the Gnani (Vachana) TTS REST API.
//
//   node scripts/generate-voiceovers.mjs            # all worlds missing an mp3
//   node scripts/generate-voiceovers.mjs --force    # regenerate everything
//   node scripts/generate-voiceovers.mjs vault      # only the listed world ids
//
// The API key is read from the GNANI_API_KEY environment variable or from
// frontend/.env.local (gitignored). It is never bundled into the browser build.
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ENDPOINT = 'https://api.vachana.ai/api/v1/tts/inference'
const VOICE = { model: 'timbre-v3.0', voice: 'Yashraj', language: 'en-IN', speed: 1.0 }
const MAX_CHARS = 450 // keep each request short; long text can be rejected with a 500

async function loadKey() {
  if (process.env.GNANI_API_KEY) return process.env.GNANI_API_KEY.trim()
  try {
    const env = await readFile(join(root, '.env.local'), 'utf8')
    const m = env.match(/^GNANI_API_KEY=(.+)$/m)
    if (m) return m[1].trim()
  } catch { /* no file */ }
  throw new Error('GNANI_API_KEY is not set (env var or frontend/.env.local)')
}

const exists = (p) => stat(p).then(() => true, () => false)

// Split on sentence boundaries into chunks <= MAX_CHARS.
function chunk(text) {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [text]
  const out = []
  let cur = ''
  for (const s of sentences) {
    if (cur && (cur + s).length > MAX_CHARS) { out.push(cur.trim()); cur = '' }
    cur += s
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

async function synth(key, text, attempt = 1) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key-ID': key },
    body: JSON.stringify({
      text,
      ...VOICE,
      audio_config: { sample_rate: 44100, num_channels: 1, sample_width: 2, encoding: 'linear_pcm', container: 'mp3', bitrate: '96k' },
    }),
  })
  if (res.status === 429 && attempt < 6) {
    await new Promise((r) => setTimeout(r, 1500 * attempt))
    return synth(key, text, attempt + 1)
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Gnani TTS ${res.status}: ${body.slice(0, 300)}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

const args = process.argv.slice(2)
const force = args.includes('--force')
const only = args.filter((a) => !a.startsWith('--'))

const key = await loadKey()
const narration = JSON.parse(await readFile(join(root, 'src/content/narration.json'), 'utf8'))
const outDir = join(root, 'public-signal/media')
await mkdir(outDir, { recursive: true })

for (const [id, n] of Object.entries(narration)) {
  if (only.length && !only.includes(id)) continue
  const file = join(outDir, `narration-${id}.mp3`)
  if (!force && (await exists(file))) { console.log(`skip   ${id} (exists)`); continue }
  const parts = chunk(n.text)
  const buffers = []
  for (let i = 0; i < parts.length; i++) {
    buffers.push(await synth(key, parts[i]))
    process.stdout.write(`\r${id}: ${i + 1}/${parts.length} chunks`)
  }
  await writeFile(file, Buffer.concat(buffers))
  console.log(`\rwrote  ${id}: ${(Buffer.concat(buffers).length / 1024).toFixed(0)} KB, ${parts.length} chunks`)
}
console.log('done')
