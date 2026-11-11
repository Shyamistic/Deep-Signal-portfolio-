import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { walker } from './walker.js'
import { WALK_RADIUS } from './terrain.js'
import { getState, fx } from '../space/store.js'
import { sound } from '../audio/engine.js'

const suit = { color: '#eceae4', roughness: 0.55 }
const trim = { color: '#c8542e', roughness: 0.5 }
const camTarget = new THREE.Vector3()
const camPos = new THREE.Vector3()
const look = new THREE.Vector3()
const dir = new THREE.Vector3()
let stepTimer = 0
let phase = 0

function Limb({ limbRef, x, y, len, r = 0.12 }) {
  return (
    <group ref={limbRef} position={[x, y, 0]}>
      <mesh position={[0, -len / 2, 0]}>
        <capsuleGeometry args={[r, len - r * 2, 4, 10]} />
        <meshStandardMaterial {...suit} />
      </mesh>
    </group>
  )
}

function Explorer({ armL, armR, legL, legR }) {
  return (
    <group>
      <mesh position={[0, 1.05, 0]}>
        <capsuleGeometry args={[0.32, 0.45, 6, 14]} />
        <meshStandardMaterial {...suit} />
      </mesh>
      <mesh position={[0, 1.05, 0.33]}>
        <boxGeometry args={[0.45, 0.55, 0.22]} />
        <meshStandardMaterial {...trim} />
      </mesh>
      <mesh position={[0, 1.78, 0]}>
        <sphereGeometry args={[0.36, 24, 18]} />
        <meshStandardMaterial color="#f8f6f0" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.8, -0.2]} scale={[1, 0.75, 0.6]}>
        <sphereGeometry args={[0.27, 24, 16]} />
        <meshStandardMaterial color="#0b1a22" metalness={0.9} roughness={0.08} emissive="#1d4b5c" emissiveIntensity={0.5} />
      </mesh>
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, 1.84, -0.36]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#bff3ff" toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, 1.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.07, 8, 18]} />
        <meshStandardMaterial {...trim} />
      </mesh>
      <mesh position={[0.2, 2.2, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#ff8a4c" toneMapped={false} />
      </mesh>
      <Limb limbRef={armL} x={-0.42} y={1.3} len={0.6} r={0.1} />
      <Limb limbRef={armR} x={0.42} y={1.3} len={0.6} r={0.1} />
      <Limb limbRef={legL} x={-0.16} y={0.62} len={0.62} />
      <Limb limbRef={legR} x={0.16} y={0.62} len={0.62} />
    </group>
  )
}

function TargetRing() {
  const ref = useRef()
  useFrame((s) => {
    const t = walker.target
    ref.current.visible = Boolean(t) && !walker.onArrive
    if (!t) return
    ref.current.position.set(t.x, walker.ground(t.x, t.z) + 0.08, t.z)
    ref.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 6) * 0.12)
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.5, 0.7, 32]} />
      <meshBasicMaterial color="#7fe6ff" toneMapped={false} transparent opacity={0.8} />
    </mesh>
  )
}

export function Pilot() {
  const group = useRef()
  const armL = useRef()
  const armR = useRef()
  const legL = useRef()
  const legR = useRef()

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const st = getState()
    const cam = state.camera
    const landed = fx.touch >= 1 && st.mode === 'surface'
    group.current.visible = landed
    if (!landed) {
      const t = fx.touch
      camPos.set(22 - t * 6, 9 + (1 - t) * 6, 24 - t * 4)
      if (st.mode === 'takeoff') camPos.set(16, 6 + fx.lift * 20, 22)
      cam.position.lerp(camPos, 1 - Math.exp(-dt * 2))
      look.set(0, st.mode === 'takeoff' ? 3 + fx.lift * 40 : 2 + (1 - t) * 12, 0)
      cam.lookAt(look)
      return
    }
    let moving = false
    const w = walker
    if (w.target && !st.dialogue) {
      dir.set(w.target.x - w.pos.x, 0, w.target.z - w.pos.z)
      const d = dir.length()
      if (d <= w.stopDist + 0.05) {
        const cb = w.onArrive
        w.target = null
        w.onArrive = null
        cb?.()
      } else {
        dir.normalize()
        w.pos.addScaledVector(dir, Math.min(d, 7 * dt))
        const r = Math.hypot(w.pos.x, w.pos.z)
        if (r > WALK_RADIUS) w.pos.multiplyScalar(WALK_RADIUS / r)
        const want = Math.atan2(-dir.x, -dir.z)
        w.heading += Math.atan2(Math.sin(want - w.heading), Math.cos(want - w.heading)) * Math.min(1, dt * 10)
        moving = true
      }
    }
    w.pos.y = w.ground(w.pos.x, w.pos.z)
    phase += dt * (moving ? 11 : 2)
    const swing = moving ? Math.sin(phase) * 0.7 : Math.sin(phase) * 0.04
    legL.current.rotation.x = swing
    legR.current.rotation.x = -swing
    armL.current.rotation.x = -swing * 0.8
    armR.current.rotation.x = swing * 0.8
    group.current.position.set(w.pos.x, w.pos.y + (moving ? Math.abs(Math.sin(phase)) * 0.08 : 0), w.pos.z)
    group.current.rotation.y = w.heading
    if (moving && (stepTimer -= dt) <= 0) { sound.step(); stepTimer = 0.29 }

    camTarget.set(w.pos.x, w.pos.y + 1.2, w.pos.z)
    camPos.set(w.pos.x + 4, w.pos.y + 8.5, w.pos.z + 12)
    cam.position.lerp(camPos, 1 - Math.exp(-dt * 3))
    look.lerp(camTarget, 1 - Math.exp(-dt * 6))
    cam.lookAt(look)
  })

  return (
    <>
      <group ref={group}>
        <Explorer armL={armL} armR={armR} legL={legL} legR={legR} />
        <pointLight position={[0, 3, 1]} intensity={4} distance={10} color="#ffffff" />
      </group>
      <TargetRing />
    </>
  )
}
