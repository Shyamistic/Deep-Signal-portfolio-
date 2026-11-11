import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Tag } from './tags.jsx'
import * as THREE from 'three'
import { ship } from './store.js'
import { enemies } from './combatData.js'

const target = new THREE.Vector3()
const toShip = new THREE.Vector3()

export function Enemy({ index }) {
  const group = useRef()
  const ring = useRef()
  const core = useRef()
  const pips = useRef()
  const tag = useRef()

  useFrame((state, dt) => {
    const e = enemies[index]
    const g = group.current
    if (!e.alive) {
      g.visible = false
      if (tag.current) tag.current.style.display = 'none'
      return
    }
    const t = state.clock.elapsedTime + e.phase
    target.copy(e.homeV).add(toShip.set(Math.sin(t * 0.4) * 12, Math.sin(t * 0.7) * 5, Math.cos(t * 0.4) * 12))
    toShip.copy(ship.pos).sub(e.pos)
    const d = toShip.length()
    if (d < 110) target.lerp(ship.pos, 0.35)
    if (tag.current) tag.current.style.display = d < 280 ? '' : 'none'
    e.pos.lerp(target, 1 - Math.exp(-dt * 0.8))
    g.position.copy(e.pos)
    g.lookAt(ship.pos)
    ring.current.rotation.z += dt * 2.2
    e.flash = Math.max(0, e.flash - dt)
    core.current.emissiveIntensity = 1.2 + e.flash * 30 + Math.sin(t * 4) * 0.4
    if (pips.current) pips.current.textContent = '●'.repeat(e.hp) + '○'.repeat(3 - e.hp)
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial ref={core} color="#1c0c0a" emissive="#ff3b1f" emissiveIntensity={1.2} metalness={0.7} roughness={0.35} flatShading />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[2.4, 0.12, 8, 6]} />
        <meshBasicMaterial color="#ff6a3c" toneMapped={false} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]} position={[Math.cos((i * Math.PI) / 2) * 1.9, Math.sin((i * Math.PI) / 2) * 1.9, 0]}>
          <coneGeometry args={[0.25, 1.1, 5]} />
          <meshStandardMaterial color="#2a1410" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      <Tag position={[0, 3.6, 0]}>
        <div ref={tag} className="enemy-tag" data-testid={`enemy-label-${enemies[index].id}`}>
          <span>{enemies[index].name}</span>
          <i ref={pips}>●●●</i>
        </div>
      </Tag>
    </group>
  )
}
