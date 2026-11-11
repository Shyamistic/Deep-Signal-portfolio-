import * as THREE from 'three'
import { getState, pushToast } from '../space/store.js'

export const walker = {
  pos: new THREE.Vector3(3, 0, 3),
  target: null,
  stopDist: 0.2,
  onArrive: null,
  heading: 0,
  ground: () => 0,
  hop: 0,
  vy: 0,
  jumpQueued: false,
  waveT: 0,
}

export function walkTo(x, z, stopDist = 0.2, onArrive = null) {
  if (getState().dialogue) return
  walker.target = new THREE.Vector3(x, 0, z)
  walker.stopDist = stopDist
  walker.onArrive = onArrive
}

export function resetWalker(ground) {
  walker.ground = ground
  walker.pos.set(3.5, ground(3.5, 3.5), 3.5)
  walker.target = null
  walker.onArrive = null
  walker.hop = 0
  walker.vy = 0
  walker.jumpQueued = false
  walker.waveT = 0
}

/*
  Keyboard interaction: characters, relics and talking plants register here so
  the player can press E when standing close, instead of clicking.
*/
const interactables = new Map()

export function registerInteractable(key, item) {
  interactables.set(key, item)
  return () => interactables.delete(key)
}

export function nearestInteractable(maxRange = Infinity, kind = null) {
  let best = null
  let bestD = Infinity
  for (const item of interactables.values()) {
    if (kind && item.kind !== kind) continue
    const d = Math.hypot(item.x - walker.pos.x, item.z - walker.pos.z)
    if (d <= Math.min(item.range, maxRange) && d < bestD) {
      best = item
      bestD = d
    }
  }
  return best
}

export function jump() {
  if (getState().dialogue) return
  walker.jumpQueued = true
}

export function wave() {
  if (getState().dialogue) return
  walker.waveT = 1.5
  const npc = nearestInteractable(7, 'npc')
  if (npc) pushToast({ tone: 'info', title: `${npc.name} waves back`, body: 'Press E to talk.' }, 2500)
}

export function interact() {
  const item = nearestInteractable()
  if (!item) return false
  walker.target = null
  walker.onArrive = null
  item.run()
  return true
}
