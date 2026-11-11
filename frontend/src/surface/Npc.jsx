import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Tag } from '../space/tags.jsx'
import { walker, walkTo, registerInteractable } from './walker.js'
import { talkToNpc } from './quests.js'
import { useGame } from '../space/store.js'
import { surfaces } from '../content/surfaces.js'

const M = ({ c, e, i = 0, r = 0.6, m = 0.1 }) => <meshStandardMaterial color={c} emissive={e || '#000'} emissiveIntensity={i} roughness={r} metalness={m} />
const Eye = ({ x, y, z, c = '#111', s = 0.07 }) => (
  <mesh position={[x, y, z]}><sphereGeometry args={[s, 10, 8]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>
)

const models = {
  owl: ({ c, a }) => (
    <group>
      <mesh position={[0, 1.1, 0]} scale={[1, 1.25, 0.9]}><sphereGeometry args={[0.8, 20, 16]} /><M c={c} /></mesh>
      <mesh position={[0, 1.0, -0.45]} scale={[0.75, 0.95, 0.5]}><sphereGeometry args={[0.7, 18, 14]} /><M c="#e8d8b8" /></mesh>
      {[-0.28, 0.28].map((x) => <group key={x}><mesh position={[x, 1.6, -0.62]}><sphereGeometry args={[0.24, 14, 12]} /><M c="#fff6dc" /></mesh><Eye x={x} y={1.6} z={-0.84} s={0.11} c={a} /></group>)}
      <mesh position={[0, 1.38, -0.8]} rotation={[-Math.PI / 2, 0, 0]}><coneGeometry args={[0.09, 0.25, 6]} /><M c="#f0a040" /></mesh>
      {[-0.42, 0.42].map((x) => <mesh key={x} position={[x, 2.15, 0]} rotation={[0, 0, x > 0 ? -0.3 : 0.3]}><coneGeometry args={[0.13, 0.45, 5]} /><M c={c} /></mesh>)}
      <mesh position={[0, 2.25, 0]} rotation={[0.1, 0, 0]}><boxGeometry args={[0.9, 0.06, 0.9]} /><M c="#1a1a1a" /></mesh>
      <mesh position={[0, 2.12, 0]}><cylinderGeometry args={[0.28, 0.3, 0.2, 12]} /><M c="#1a1a1a" /></mesh>
    </group>
  ),
  keeper: ({ c, a }) => (
    <group>
      <mesh position={[0, 0.9, 0]}><coneGeometry args={[0.75, 1.9, 16]} /><M c={c} /></mesh>
      <mesh position={[0, 2.05, 0]}><sphereGeometry args={[0.38, 18, 14]} /><M c="#d9a77a" /></mesh>
      <mesh position={[0, 2.18, 0]} scale={[1, 0.6, 1]}><sphereGeometry args={[0.42, 18, 14, 0, Math.PI * 2, 0, Math.PI / 2]} /><M c="#e8c890" /></mesh>
      <Eye x={-0.13} y={2.08} z={-0.34} /><Eye x={0.13} y={2.08} z={-0.34} />
      <mesh position={[0.62, 1.3, -0.25]}><cylinderGeometry args={[0.04, 0.04, 1.6, 6]} /><M c="#4a3420" /></mesh>
      <mesh position={[0.62, 2.2, -0.25]}><sphereGeometry args={[0.18, 12, 10]} /><meshBasicMaterial color={a} toneMapped={false} /></mesh>
      <pointLight position={[0.62, 2.2, -0.25]} color={a} intensity={6} distance={8} />
    </group>
  ),
  robot: ({ c, a }) => (
    <group>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.45, 0.6, 1, 8]} /><M c={c} m={0.8} r={0.3} /></mesh>
      <mesh position={[0, 1.4, 0]}><boxGeometry args={[1.1, 0.9, 0.8]} /><M c={c} m={0.8} r={0.3} /></mesh>
      <mesh position={[0, 2.2, 0]}><boxGeometry args={[0.8, 0.6, 0.7]} /><M c="#8a6a3a" m={0.8} r={0.3} /></mesh>
      <mesh position={[0, 2.2, -0.36]}><boxGeometry args={[0.62, 0.18, 0.02]} /><meshBasicMaterial color={a} toneMapped={false} /></mesh>
      <mesh position={[0, 2.7, 0]}><cylinderGeometry args={[0.02, 0.02, 0.4, 6]} /><M c="#333" /></mesh>
      <mesh position={[0, 2.92, 0]}><sphereGeometry args={[0.08, 10, 8]} /><meshBasicMaterial color={a} toneMapped={false} /></mesh>
      {[-0.7, 0.7].map((x) => <mesh key={x} position={[x, 1.3, 0]}><capsuleGeometry args={[0.12, 0.6, 4, 8]} /><M c="#6a5030" m={0.8} /></mesh>)}
      <mesh position={[0.3, 1.5, -0.42]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.15, 0.15, 0.05, 14]} /><M c="#e8d8a0" m={0.9} /></mesh>
    </group>
  ),
  golem: ({ c, a }) => (
    <group>
      <mesh position={[0, 1.2, 0]}><dodecahedronGeometry args={[0.95, 0]} /><M c={c} e={a} i={0.25} r={0.9} /></mesh>
      <mesh position={[0, 2.3, 0]}><dodecahedronGeometry args={[0.5, 0]} /><M c={c} e={a} i={0.25} r={0.9} /></mesh>
      <Eye x={-0.17} y={2.35} z={-0.42} c={a} s={0.09} /><Eye x={0.17} y={2.35} z={-0.42} c={a} s={0.09} />
      {[-1.1, 1.1].map((x) => <mesh key={x} position={[x, 1.1, 0]}><dodecahedronGeometry args={[0.38, 0]} /><M c={c} r={0.9} /></mesh>)}
      {[-0.4, 0.4].map((x) => <mesh key={x} position={[x, 0.3, 0]}><boxGeometry args={[0.45, 0.6, 0.5]} /><M c={c} r={0.9} /></mesh>)}
      <mesh position={[1.25, 0.6, -0.2]} rotation={[0, 0, 0.2]}><boxGeometry args={[0.18, 1.2, 0.18]} /><M c="#2a1e18" /></mesh>
      <mesh position={[1.25, 1.25, -0.2]}><boxGeometry args={[0.6, 0.3, 0.35]} /><M c="#4a4040" m={0.8} /></mesh>
      <pointLight position={[0, 1.4, -1]} color={a} intensity={5} distance={7} />
    </group>
  ),
  penguin: ({ c, a }) => (
    <group>
      <mesh position={[0, 0.9, 0]} scale={[1, 1.35, 0.95]}><sphereGeometry args={[0.7, 20, 16]} /><M c={c} /></mesh>
      <mesh position={[0, 0.85, -0.3]} scale={[0.8, 1.15, 0.6]}><sphereGeometry args={[0.65, 20, 16]} /><M c="#f4f6f8" /></mesh>
      <Eye x={-0.2} y={1.55} z={-0.55} /><Eye x={0.2} y={1.55} z={-0.55} />
      <mesh position={[0, 1.4, -0.72]} rotation={[-Math.PI / 2, 0, 0]}><coneGeometry args={[0.08, 0.25, 6]} /><M c="#f0a040" /></mesh>
      <mesh position={[0, 1.95, 0]} rotation={[0.2, 0, 0]}><coneGeometry args={[0.45, 0.6, 16]} /><M c="#2a3a6a" /></mesh>
      <mesh position={[0.15, 2.28, 0.1]}><sphereGeometry args={[0.07, 8, 8]} /><meshBasicMaterial color={a} toneMapped={false} /></mesh>
      <mesh position={[0.75, 1.1, -0.2]} rotation={[0.6, 0, -0.5]}><cylinderGeometry args={[0.12, 0.16, 0.9, 10]} /><M c="#c8a050" m={0.8} r={0.3} /></mesh>
    </group>
  ),
  sprite: ({ c, a }) => (
    <group position={[0, 0.6, 0]}>
      {[[0, 1.2, 0, 0.7], [0.5, 1.0, 0.2, 0.5], [-0.5, 1.05, 0.15, 0.5], [0, 1.6, 0.1, 0.5], [0, 0.55, 0, 0.4]].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}><sphereGeometry args={[r, 18, 14]} /><M c={c} e={a} i={0.15} r={1} /></mesh>
      ))}
      <Eye x={-0.2} y={1.3} z={-0.66} /><Eye x={0.2} y={1.3} z={-0.66} />
      <mesh position={[0, 1.1, -0.64]} rotation={[0, 0, Math.PI]}><torusGeometry args={[0.12, 0.025, 6, 12, Math.PI]} /><meshBasicMaterial color="#5a3a20" /></mesh>
      <pointLight position={[0, 1.2, -1]} color={a} intensity={4} distance={7} />
    </group>
  ),
}

function Badge({ id }) {
  const q = useGame((s) => s.quests[id])
  const total = surfaces[id].relics.length
  const mark = !q?.started ? '!' : q.done ? '✓' : q.found.length === total ? '?' : `${q.found.length}/${total}`
  return <span className={`npc-tag__badge ${!q?.started || (q.found.length === total && !q.done) ? 'is-hot' : ''}`}>{mark}</span>
}

export function Npc({ id, npc, ground }) {
  const ref = useRef()
  const [x, z] = npc.pos
  const y = ground(x, z)
  const Model = models[npc.type]
  useEffect(
    () => registerInteractable(`npc-${id}`, { x, z, range: 4.5, kind: 'npc', label: `Talk to ${npc.name}`, name: npc.name, run: () => talkToNpc(id) }),
    [id, npc, x, z],
  )
  useFrame((s) => {
    const g = ref.current
    const want = Math.atan2(-(walker.pos.x - x), -(walker.pos.z - z))
    g.rotation.y += Math.atan2(Math.sin(want - g.rotation.y), Math.cos(want - g.rotation.y)) * 0.05
    g.position.y = y + (npc.type === 'sprite' ? Math.sin(s.clock.elapsedTime * 1.5) * 0.25 : Math.abs(Math.sin(s.clock.elapsedTime * 1.2)) * 0.05)
  })
  const onClick = (e) => {
    e.stopPropagation()
    walkTo(x, z, 2.6, () => talkToNpc(id))
  }
  return (
    <group ref={ref} position={[x, y, z]} onClick={onClick} onPointerOver={() => (document.body.style.cursor = 'pointer')} onPointerOut={() => (document.body.style.cursor = '')}>
      <Model c={npc.color} a={npc.accent} />
      <Tag position={[0, 3.4, 0]}>
        <div className="npc-tag" data-testid={`npc-label-${id}`}>
          <Badge id={id} />
          <strong>{npc.name}</strong>
        </div>
      </Tag>
    </group>
  )
}
