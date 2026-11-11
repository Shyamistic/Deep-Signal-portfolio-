import { useSyncExternalStore } from 'react'
import { Vector3 } from 'three'
import { worlds } from '../content/worlds.js'

const listeners = new Set()
let state = {
  started: false,
  mode: 'space',
  surfaceId: null,
  openWorld: null,
  near: null,
  mapOpen: false,
  autopilot: null,
  toasts: [],
  score: 0,
  defeated: [],
  visited: [],
  heard: '',
  quests: {},
  met: [],
  dialogue: null,
  muted: false,
  narrating: null,
  dossierOpen: false,
  ending: false,
}

const SAVE_KEY = 'deep-signal-save-v1'
const saved = ['quests', 'defeated', 'visited', 'score', 'met']
try {
  const s = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')
  saved.forEach((k) => { if (s[k] !== undefined) state[k] = s[k] })
} catch { /* fresh start */ }

export const getState = () => state

export function setState(patch) {
  state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) }
  listeners.forEach((l) => l())
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(Object.fromEntries(saved.map((k) => [k, state[k]])))) } catch { /* storage full or blocked */ }
}

export function resetProgress() {
  localStorage.removeItem(SAVE_KEY)
  location.reload()
}

const subscribe = (l) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export const useGame = (sel) => useSyncExternalStore(subscribe, () => sel(state))

let toastId = 0
export function pushToast(toast, ms = 6000) {
  const id = ++toastId
  setState((s) => ({ toasts: [...s.toasts.slice(-2), { ...toast, id }] }))
  setTimeout(() => setState((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), ms)
}

const markVisited = (s, id) => (s.visited.includes(id) ? s.visited : [...s.visited, id])

export function openWorld(id) {
  ship.speed = 0
  setState((s) => ({ openWorld: id, autopilot: null, mapOpen: false, dialogue: null, dossierOpen: false, visited: markVisited(s, id) }))
}

export const ship = {
  pos: new Vector3(0, 0, 30),
  yaw: 0,
  pitch: 0,
  yawRate: 0,
  speed: 0,
  forward: new Vector3(0, 0, -1),
}

export const input = { keys: {}, mx: 0, my: 0, firing: false, touchThrust: false }

export const fx = { fade: 0, fadeColor: '#000000', landT: 0, touch: 0, lift: 0, shake: 0 }
export const flight = { landing: null }

export const flightLocked = () => !state.started || state.openWorld || state.mapOpen || state.mode !== 'space'

export function startLanding(id) {
  if (state.mode !== 'space') return
  const w = worlds.find((x) => x.id === id)
  const c = new Vector3(...w.position)
  flight.landing = { id, from: ship.pos.clone(), c, r: w.radius, n: ship.pos.clone().sub(c).normalize() }
  fx.landT = 0
  setState((s) => ({ mode: 'landing', surfaceId: id, autopilot: null, mapOpen: false, openWorld: null, visited: markVisited(s, id) }))
}

export function finishLanding() {
  fx.touch = 0
  fx.fade = 1
  setState({ mode: 'surface' })
}

export function startTakeoff() {
  if (state.mode !== 'surface') return
  fx.lift = 0
  setState({ mode: 'takeoff', dialogue: null, openWorld: null })
}

export function finishTakeoff() {
  const l = flight.landing
  ship.pos.copy(l.c).addScaledVector(l.n, l.r * 1.12 + 45)
  ship.yaw = Math.atan2(-l.n.x, -l.n.z)
  ship.pitch = 0
  ship.speed = 30
  fx.fade = 1
  setState({ mode: 'space', surfaceId: null, near: null })
}
