import * as THREE from 'three'
import { surfaces } from '../content/surfaces.js'
import { ship, fx, flight, finishLanding } from './store.js'

const DURATION = 3.6
const p = new THREE.Vector3()
const q = new THREE.Vector3()
const e1 = new THREE.Vector3()
const e2 = new THREE.Vector3()
const ease = (t) => t * t * (3 - 2 * t)

function pathAt(l, style, u, out) {
  const end = e1.copy(l.c).addScaledVector(l.n, l.r * 1.01)
  let k = ease(u)
  if (style === 'dive' || style === 'drop') k = Math.pow(u, 2.2)
  if (style === 'retro') k = 1 - Math.pow(1 - u, 2.4)
  if (style === 'beam') {
    const hover = e2.copy(l.c).addScaledVector(l.n, l.r * 1.3)
    if (u < 0.55) return out.copy(l.from).lerp(hover, ease(u / 0.55))
    return out.copy(hover).lerp(end, ease((u - 0.55) / 0.45))
  }
  out.copy(l.from).lerp(end, k)
  if (style === 'spiral') {
    const side = e2.set(0, 1, 0).cross(l.n).normalize()
    const up = q.copy(l.n).cross(side)
    const a = u * Math.PI * 3
    out.addScaledVector(side, Math.cos(a) * (1 - u) * u * l.r * 1.4).addScaledVector(up, Math.sin(a) * (1 - u) * u * l.r * 1.4)
  }
  if (style === 'glide') out.addScaledVector(l.n, Math.sin(u * Math.PI) * l.r * 0.35)
  return out
}

export function stepLanding(dt, camera, group, glow) {
  const l = flight.landing
  const style = surfaces[l.id].landing.style
  fx.landT = Math.min(1, fx.landT + dt / DURATION)
  const u = fx.landT
  pathAt(l, style, u, p)
  const ahead = pathAt(l, style, Math.min(1, u + 0.02), new THREE.Vector3())
  if (ahead.distanceToSquared(p) > 1e-4) { group.lookAt(ahead); group.rotateY(Math.PI) }
  ship.pos.copy(p)
  group.position.copy(p)
  if (style === 'retro' && u > 0.6) { group.lookAt(l.c); group.rotateX(-Math.PI / 2) }
  fx.shake = style === 'dive' ? u * 0.6 : style === 'drop' ? u * 0.25 : 0
  const heat = style === 'beam' || style === 'retro' ? 0.12 : 0.35
  glow.material.color.set(surfaces[l.id].landing.color)
  glow.material.opacity = Math.sin(u * Math.PI) * heat
  const camPos = q.copy(p).addScaledVector(l.n, 6 + (1 - u) * 6).addScaledVector(e2.copy(p).sub(l.from).normalize(), -14)
  camera.position.lerp(camPos, 1 - Math.exp(-dt * 4))
  camera.position.x += (Math.random() - 0.5) * fx.shake
  camera.position.y += (Math.random() - 0.5) * fx.shake
  camera.lookAt(p)
  fx.fade = THREE.MathUtils.smoothstep(u, 0.72, 1)
  fx.fadeColor = surfaces[l.id].sky.bottom
  if (u >= 1) finishLanding()
}
