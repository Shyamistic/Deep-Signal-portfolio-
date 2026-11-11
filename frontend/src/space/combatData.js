import * as THREE from 'three'
import { worlds } from '../content/worlds.js'
import { failures } from '../content/failures.js'
import { rng } from './noise.js'
import { getState } from './store.js'

const rand = rng(4242)
const centers = worlds.map((w) => ({ c: new THREE.Vector3(...w.position), r: w.radius }))

function freeSpot(v, avoid, minFromAvoid) {
  for (let t = 0; t < 40; t++) {
    const a = rand() * Math.PI * 2
    const d = 60 + rand() * 280
    v.set(Math.cos(a) * d, (rand() - 0.5) * 110, Math.sin(a) * d)
    const clear = centers.every(({ c, r }) => v.distanceTo(c) > r * 1.7 + 10)
    if (clear && (!avoid || v.distanceTo(avoid) > minFromAvoid) && v.distanceTo(new THREE.Vector3(0, 0, 30)) > 25) return v
  }
  return v
}

export const ASTEROIDS = 170
export const asteroids = Array.from({ length: ASTEROIDS }, () => {
  const pos = freeSpot(new THREE.Vector3())
  return {
    pos,
    size: 1 + rand() * 3.6,
    rot: new THREE.Euler(rand() * 6, rand() * 6, rand() * 6),
    spin: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(0.8),
    drift: new THREE.Vector3(rand() - 0.5, (rand() - 0.5) * 0.3, rand() - 0.5).multiplyScalar(1.2),
    alive: true,
    respawnAt: 0,
  }
})

export function respawnAsteroid(a, shipPos) {
  freeSpot(a.pos, shipPos, 140)
  a.alive = true
}

export const enemies = failures.map((f) => {
  let home
  if (f.near) {
    const w = centers[worlds.findIndex((x) => x.id === f.near)]
    home = w.c.clone().add(w.c.clone().negate().normalize().multiplyScalar(w.r + 55)).add(new THREE.Vector3(0, 10, 0))
  } else home = new THREE.Vector3(...f.home)
  const alive = !getState().defeated.includes(f.id)
  return { ...f, homeV: home, pos: home.clone(), hp: 3, alive, flash: 0, phase: rand() * 6 }
})

export const BULLETS = 80
export const bullets = Array.from({ length: BULLETS }, () => ({ pos: new THREE.Vector3(), vel: new THREE.Vector3(), life: 0 }))

export const PARTS = 600
export const parts = Array.from({ length: PARTS }, () => ({
  pos: new THREE.Vector3(),
  vel: new THREE.Vector3(),
  life: 0,
  max: 1,
  size: 0.3,
  color: new THREE.Color(),
}))
let partCursor = 0

export function burst(pos, color, n = 26, power = 18, size = 0.35) {
  for (let i = 0; i < n; i++) {
    const p = parts[partCursor]
    partCursor = (partCursor + 1) % PARTS
    p.pos.copy(pos)
    p.vel.set(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize().multiplyScalar(power * (0.3 + rand()))
    p.max = p.life = 0.7 + rand() * 0.9
    p.size = size * (0.5 + rand())
    p.color.set(color).offsetHSL(0, 0, (rand() - 0.5) * 0.2)
  }
}
