import { fbm } from '../space/noise.js'

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export const WALK_RADIUS = 36

export function spotsOf(s) {
  return [
    { x: 0, z: 0, r: 7 },
    { x: s.npc.pos[0], z: s.npc.pos[1], r: 3.5 },
    ...s.relics.map((r) => ({ x: r.pos[0], z: r.pos[1], r: 3.2 })),
    ...s.talkers.map((t) => ({ x: t.pos[0], z: t.pos[1], r: 2.4 })),
  ]
}

export function makeGround(s, seed) {
  const spots = spotsOf(s)
  const flat = s.liquid ? s.liquid.y + 0.9 : 0.3
  return (x, z) => {
    const n = (fbm(x * 0.045 + seed, 0.37, z * 0.045 - seed, 4) - 0.5) * 8
    let f = 1
    for (const p of spots) f = Math.min(f, smooth(p.r, p.r + 5, Math.hypot(x - p.x, z - p.z)))
    const d = Math.hypot(x, z)
    const rim = Math.pow(smooth(WALK_RADIUS + 2, 66, d), 1.6) * 26
    return flat + (n - flat) * f + rim
  }
}
