import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Tag } from '../space/tags.jsx'
import { walkTo } from './walker.js'
import { readRelic, meet } from './quests.js'
import { useGame } from '../space/store.js'

const hover = {
  onPointerOver: () => (document.body.style.cursor = 'pointer'),
  onPointerOut: () => (document.body.style.cursor = ''),
}

function Relic({ id, relic, ground, accent }) {
  const gem = useRef()
  const found = useGame((s) => Boolean(s.quests[id]?.found.includes(relic.id)))
  const [x, z] = relic.pos
  const y = ground(x, z)
  useFrame((s) => {
    gem.current.rotation.y += 0.02
    gem.current.position.y = 2.1 + Math.sin(s.clock.elapsedTime * 2 + x) * 0.15
  })
  const onClick = (e) => {
    e.stopPropagation()
    walkTo(x, z, 2.2, () => readRelic(id, relic))
  }
  return (
    <group position={[x, y, z]} onClick={onClick} {...hover}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.7, 0.95, 1, 8]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, 1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.45, 0.62, 24]} />
        <meshBasicMaterial color={found ? '#556' : accent} toneMapped={false} />
      </mesh>
      <mesh ref={gem}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={found ? '#667' : accent} emissive={found ? '#000' : accent} emissiveIntensity={found ? 0 : 2.2} toneMapped={false} flatShading />
      </mesh>
      {!found && <pointLight position={[0, 2.2, 0]} color={accent} intensity={8} distance={9} />}
      <Tag position={[0, 3.3, 0]}>
        <div className={`relic-tag ${found ? 'is-found' : ''}`} data-testid={`relic-label-${relic.id}`}>{found ? '✓ ' : ''}{relic.name}</div>
      </Tag>
    </group>
  )
}

export function Relics({ id, relics, ground, accent }) {
  return relics.map((r) => <Relic key={r.id} id={id} relic={r} ground={ground} accent={accent} />)
}

function Talker({ t, ground }) {
  const ref = useRef()
  const [x, z] = t.pos
  const y = ground(x, z)
  useFrame((s) => {
    ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 1.3 + x) * 0.08
  })
  const onClick = (e) => {
    e.stopPropagation()
    walkTo(x, z, 2, () => meet(t.name, [t.line]))
  }
  return (
    <group position={[x, y, z]} onClick={onClick} {...hover}>
      <group ref={ref}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.14, 2.4, 6]} />
          <meshStandardMaterial color="#3a5a3a" />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[Math.cos(i * 1.6) * 0.45, 0.6 + i * 0.35, Math.sin(i * 1.6) * 0.45]} rotation={[Math.sin(i) * 0.8, i * 1.6, 0.9]}>
            <coneGeometry args={[0.22, 0.8, 4]} />
            <meshStandardMaterial color="#4f7a45" flatShading />
          </mesh>
        ))}
        <mesh position={[0, 2.6, 0]}>
          <sphereGeometry args={[0.42, 16, 12]} />
          <meshStandardMaterial color={t.color} emissive={t.color} emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 2.6, 0]} color={t.color} intensity={4} distance={7} />
      </group>
      <Tag position={[0, 3.6, 0]}>
        <div className="flora-tag">{t.name}</div>
      </Tag>
    </group>
  )
}

export function Talkers({ talkers, ground }) {
  return talkers.map((t) => <Talker key={t.name} t={t} ground={ground} />)
}
