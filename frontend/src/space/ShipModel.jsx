import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ship } from './store.js'

const hull = { color: '#d4d8da', metalness: 0.65, roughness: 0.32 }
const dark = { color: '#24282c', metalness: 0.5, roughness: 0.5 }

function Pilot() {
  return (
    <group position={[0, 0.48, -0.2]}>
      <mesh>
        <sphereGeometry args={[0.32, 24, 16]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, -0.16]} scale={[1, 0.72, 0.6]}>
        <sphereGeometry args={[0.24, 24, 16]} />
        <meshStandardMaterial color="#0b1a22" metalness={0.9} roughness={0.08} emissive="#1d4b5c" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.09, 0.05, -0.3]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#bff3ff" toneMapped={false} />
      </mesh>
      <mesh position={[0.09, 0.05, -0.3]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#bff3ff" toneMapped={false} />
      </mesh>
      <mesh position={[0.18, 0.36, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.012, 0.012, 0.3, 6]} />
        <meshStandardMaterial {...dark} />
      </mesh>
      <mesh position={[0.23, 0.52, 0]}>
        <sphereGeometry args={[0.05, 10, 8]} />
        <meshBasicMaterial color="#ff8a4c" toneMapped={false} />
      </mesh>
    </group>
  )
}

function Engine({ x }) {
  const flame = useRef()
  useFrame((s) => {
    const k = 0.4 + ship.speed / 60 + Math.sin(s.clock.elapsedTime * 40 + x) * 0.06
    flame.current.scale.set(1, k, 1)
  })
  return (
    <group position={[x, -0.05, 1.25]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.26, 0.7, 14]} />
        <meshStandardMaterial {...dark} />
      </mesh>
      <group ref={flame} position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <coneGeometry args={[0.17, 1, 14, 1, true]} />
          <meshBasicMaterial color="#7fe6ff" toneMapped={false} transparent opacity={0.85} />
        </mesh>
      </group>
    </group>
  )
}

export function ShipModel() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.5, 1.9, 8, 20]} />
        <meshStandardMaterial {...hull} />
      </mesh>
      <mesh position={[0, 0, -1.3]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.06, 8, 24]} />
        <meshStandardMaterial color="#c8542e" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.3, -0.2]} scale={[1, 0.85, 1.25]}>
        <sphereGeometry args={[0.55, 28, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#bfe9ff" transparent opacity={0.22} roughness={0} metalness={0.1} clearcoat={1} depthWrite={false} />
      </mesh>
      <Pilot />
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 1.35, -0.12, 0.45]} rotation={[0, s * 0.35, s * -0.08]}>
            <boxGeometry args={[2.1, 0.08, 0.85]} />
            <meshStandardMaterial {...hull} />
          </mesh>
          <mesh position={[s * 2.35, -0.05, 0.7]}>
            <boxGeometry args={[0.12, 0.42, 0.6]} />
            <meshStandardMaterial color="#c8542e" roughness={0.4} />
          </mesh>
          <mesh position={[s * 2.35, 0.22, 0.5]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshBasicMaterial color={s < 0 ? '#ff4d4d' : '#55ff9a'} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <Engine x={-0.42} />
      <Engine x={0.42} />
      <pointLight position={[0, 0.2, 2]} color="#7fe6ff" intensity={6} distance={9} />
      <pointLight position={[0, 2, -2]} color="#ffffff" intensity={2} distance={8} />
    </group>
  )
}
