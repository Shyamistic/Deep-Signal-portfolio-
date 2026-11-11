import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { rng } from '../space/noise.js'
import { walkTo } from './walker.js'
import { meet } from './quests.js'
import { WALK_RADIUS } from './terrain.js'

const hover = {
  onPointerOver: () => (document.body.style.cursor = 'pointer'),
  onPointerOut: () => (document.body.style.cursor = ''),
}

function Hopper({ c }) {
  return (
    <group>
      <mesh position={[0, 0.45, 0]} scale={[0.9, 0.75, 1.1]}><sphereGeometry args={[0.45, 14, 12]} /><meshStandardMaterial color={c} roughness={0.8} /></mesh>
      <mesh position={[0, 0.8, -0.38]}><sphereGeometry args={[0.28, 14, 12]} /><meshStandardMaterial color={c} roughness={0.8} /></mesh>
      {[-0.1, 0.1].map((x) => <mesh key={x} position={[x, 0.88, -0.62]}><sphereGeometry args={[0.05, 8, 8]} /><meshBasicMaterial color="#111" /></mesh>)}
      {[-0.12, 0.12].map((x) => <mesh key={x} position={[x, 1.1, -0.35]} rotation={[0.2, 0, x * 2]}><coneGeometry args={[0.07, 0.4, 5]} /><meshStandardMaterial color={c} /></mesh>)}
    </group>
  )
}

function Flyer({ c, wings }) {
  return (
    <group>
      <mesh scale={[0.5, 0.5, 1]}><sphereGeometry args={[0.28, 10, 8]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.3} /></mesh>
      {[-1, 1].map((s, i) => (
        <group key={s} ref={(el) => (wings.current[i] = el)}>
          <mesh position={[s * 0.45, 0, 0]}><boxGeometry args={[0.8, 0.03, 0.45]} /><meshStandardMaterial color={c} side={THREE.DoubleSide} transparent opacity={0.85} /></mesh>
        </group>
      ))}
    </group>
  )
}

function Swimmer({ c }) {
  return (
    <group>
      <mesh scale={[0.45, 0.55, 1.2]}><sphereGeometry args={[0.4, 12, 10]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={1.1} toneMapped={false} /></mesh>
      <mesh position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[0.2, 0.35, 4]} /><meshStandardMaterial color={c} /></mesh>
    </group>
  )
}

function Floater({ c }) {
  return (
    <group scale={2.2}>
      <mesh scale={[1, 0.6, 2.2]}><sphereGeometry args={[1, 20, 14]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.25} roughness={0.9} transparent opacity={0.92} /></mesh>
      {[-1, 1].map((s) => <mesh key={s} position={[s * 1.1, -0.1, -0.2]} rotation={[0, 0, s * 0.4]} scale={[1.2, 0.08, 0.6]}><sphereGeometry args={[1, 10, 6]} /><meshStandardMaterial color={c} /></mesh>)}
      <mesh position={[0, 0, 2.3]} scale={[1.2, 0.08, 0.5]}><sphereGeometry args={[1, 10, 6]} /><meshStandardMaterial color={c} /></mesh>
    </group>
  )
}

function init(seed) {
  const r = rng(seed)
  const a = r() * 6.28
  const d = 8 + r() * 24
  return { r, pos: new THREE.Vector3(Math.cos(a) * d, 0, Math.sin(a) * d), goal: new THREE.Vector3(), wait: r() * 3, phase: r() * 6, h: 3 + r() * 4, rad: 6 + r() * 20 }
}

function Creature({ kind, seed, ground, liquidY }) {
  const ref = useRef()
  const wings = useRef([])
  const state = useRef(null)

  useFrame((s, rawDt) => {
    if (!state.current) state.current = init(seed)
    const st = state.current
    const dt = Math.min(rawDt, 0.05)
    const g = ref.current
    const t = s.clock.elapsedTime + st.phase
    const type = kind.type
    if (type === 'hopper') {
      st.wait -= dt
      if (st.wait <= 0 && st.goal.lengthSq() === 0) {
        const a = st.r() * 6.28
        const d = 4 + st.r() * (WALK_RADIUS - 6)
        st.goal.set(Math.cos(a) * d, 0, Math.sin(a) * d)
      }
      if (st.goal.lengthSq() > 0) {
        const dx = st.goal.x - st.pos.x
        const dz = st.goal.z - st.pos.z
        const dist = Math.hypot(dx, dz)
        if (dist < 0.3) { st.goal.set(0, 0, 0); st.wait = 1.5 + st.r() * 4 }
        else {
          st.pos.x += (dx / dist) * dt * 2.4
          st.pos.z += (dz / dist) * dt * 2.4
          g.rotation.y = Math.atan2(-dx, -dz)
        }
      }
      const hop = st.goal.lengthSq() > 0 ? Math.abs(Math.sin(t * 7)) * 0.5 : 0
      st.pos.y = ground(st.pos.x, st.pos.z) + hop
    } else if (type === 'flyer') {
      const a = t * 0.5
      st.pos.set(Math.cos(a) * st.rad, ground(Math.cos(a) * st.rad, Math.sin(a) * st.rad) + st.h + Math.sin(t * 2) * 0.6, Math.sin(a) * st.rad)
      g.rotation.y = -a
      wings.current.forEach((w, i) => w && (w.rotation.z = Math.sin(t * 16) * 0.7 * (i ? -1 : 1)))
    } else if (type === 'swimmer') {
      const cycle = (t * 0.35) % 1
      const a = Math.floor(t * 0.35) * 2.4 + st.phase
      const cx = Math.cos(a) * st.rad
      const cz = Math.sin(a) * st.rad
      st.pos.set(cx + (cycle - 0.5) * 3, liquidY - 0.6 + Math.sin(cycle * Math.PI) * 2.4, cz)
      g.visible = ground(cx, cz) < liquidY - 0.2
      g.rotation.set(-Math.cos(cycle * Math.PI) * 0.9, a, 0)
    } else {
      const a = t * 0.06
      st.pos.set(Math.cos(a) * (18 + st.rad), 12 + st.h * 1.5 + Math.sin(t * 0.4) * 1.5, Math.sin(a) * (18 + st.rad))
      g.rotation.y = -a + Math.PI
    }
    g.position.copy(st.pos)
  })

  const onClick = (e) => {
    e.stopPropagation()
    if (!state.current) return
    const p = state.current.pos
    walkTo(p.x, p.z, kind.type === 'floater' || kind.type === 'swimmer' ? 3 : 1.8, () => meet(kind.name, kind.lines))
  }
  const Body = { hopper: Hopper, flyer: Flyer, swimmer: Swimmer, floater: Floater }[kind.type]
  return (
    <group ref={ref} onClick={onClick} {...hover}>
      <Body c={kind.color} wings={wings} />
    </group>
  )
}

export function Fauna({ s, ground }) {
  const ly = s.liquid ? s.liquid.y : 0
  return s.fauna.flatMap((k, ki) =>
    Array.from({ length: k.count }, (_, i) => <Creature key={`${k.name}-${i}`} kind={k} seed={ki * 100 + i + 7} ground={ground} liquidY={ly} />),
  )
}
