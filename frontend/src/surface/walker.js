import * as THREE from 'three'
import { getState } from '../space/store.js'

export const walker = {
  pos: new THREE.Vector3(3, 0, 3),
  target: null,
  stopDist: 0.2,
  onArrive: null,
  heading: 0,
  ground: () => 0,
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
}
