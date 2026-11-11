import { worlds } from '../content/worlds.js'
import { getState, setState, pushToast, startTakeoff } from './store.js'
import { landIfNear, closeOverlays } from './useFlightInput.js'
import { advanceDialogue, talkToNpc } from '../surface/quests.js'
import { walkTo } from '../surface/walker.js'
import { surfaces } from '../content/surfaces.js'

const keywords = {
  scholaris: ['scholaris', 'education', 'school', 'study', 'studies', 'iit', 'college', 'university', 'academic'],
  stillwater: ['stillwater', 'still water', 'vri', 'vipassana', 'volunteer', 'meditation', 'service'],
  wordwatch: ['crownfall', 'crown fall', 'wordwatch', 'word watch', 'compliance', 'work', 'job', 'saas'],
  foundry: ['foundry', 'project', 'nexus', 'vayu', 'astra', 'aura', 'forge'],
  meridian: ['meridian', 'research', 'paper', 'observatory', 'ieee'],
  breath: ['wispr', 'whisper', 'flow', 'breath', 'growth', 'launch pad', 'test'],
}

export function matchWorld(text) {
  const t = text.toLowerCase()
  return worlds.find((w) => keywords[w.id].some((k) => t.includes(k)))
}

export function runCommand(raw) {
  const text = raw.toLowerCase().trim()
  setState({ heard: raw.trim() })
  const mode = getState().mode
  if (getState().dialogue && /\b(next|continue|okay|ok|go on|done)\b/.test(text)) return advanceDialogue()
  if (mode === 'surface' && /\b(talk|hello|hi|speak)\b/.test(text)) {
    const id = getState().surfaceId
    const [x, z] = surfaces[id].npc.pos
    return walkTo(x, z, 2.6, () => talkToNpc(id))
  }
  if (/\b(dossier|summary|resume|résumé)\b/.test(text)) return setState({ dossierOpen: true })
  if (mode === 'surface' && /\b(take off|takeoff|leave|launch)\b/.test(text)) return startTakeoff()
  if (mode !== 'space' && mode !== 'surface') return
  if (mode === 'space' && /\b(map|star map|chart)\b/.test(text)) return setState({ mapOpen: true, openWorld: null })
  if (/\b(close|back|take off|leave|exit)\b/.test(text)) return closeOverlays()
  if (/\b(land|dock)\b/.test(text) && getState().near) return landIfNear()
  if (/\b(stop|halt|cancel)\b/.test(text)) return setState({ autopilot: null })
  const w = mode === 'space' && matchWorld(text)
  if (w) {
    setState({ autopilot: w.id, openWorld: null, mapOpen: false, started: true })
    return pushToast({ tone: 'info', title: `Autopilot → ${w.planet}`, body: w.kicker }, 3500)
  }
  pushToast({ tone: 'info', title: 'Didn’t catch a destination', body: mode === 'surface' ? 'On the surface, try “take off” or “close”.' : 'Try “go to Research”, “open the map”, or “land”.' }, 4000)
}

export const speechSupported = () => typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)

export function createRecognizer({ onState }) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  const rec = new SR()
  rec.continuous = true
  rec.interimResults = false
  rec.lang = 'en-US'
  let wanted = false
  rec.onresult = (e) => {
    const r = e.results[e.results.length - 1]
    if (r.isFinal) runCommand(r[0].transcript)
  }
  rec.onerror = (e) => {
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
      wanted = false
      onState('denied')
    }
  }
  rec.onend = () => {
    if (wanted) { try { rec.start() } catch { /* already running */ } }
    else onState('off')
  }
  return {
    start() { wanted = true; rec.start(); onState('listening') },
    stop() { wanted = false; rec.stop() },
  }
}
