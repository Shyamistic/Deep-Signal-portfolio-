import { useLayoutEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { surfaces } from '../content/surfaces.js'
import { ShipModel } from '../space/ShipModel.jsx'
import { fx, getState, finishTakeoff, startTakeoff } from '../space/store.js'
import { sound } from '../audio/engine.js'

const N = 260
const fxStyles = {
  dust: { up: 3, out: 12, g: -3, size: 0.28, life: 1.8 },
  splash: { up: 12, out: 5, g: -14, size: 0.3, life: 1.6 },
  sparks: { up: 8, out: 10, g: -12, size: 0.15, life: 1.2, glow: true },
  embers: { up: 14, out: 7, g: -4, size: 0.22, life: 2.6, glow: true },
  snow: { up: 3, out: 11, g: -1.5, size: 0.4, life: 2.6 },
  clouds: { up: 1.5, out: 7, g: 0, size: 1.4, life: 3 },
}
const ease = (t) => 1 - Math.pow(1 - t, 3)
const m = new THREE.Matrix4()
const q = new THREE.Quaternion()
const sc = new THREE.Vector3()

function shipPose(style, k, base, out) {
  const e = ease(k)
  if (style === 'spiral') return out.set(Math.cos(k * 9) * 16 * (1 - e), base + (1 - e) * 40, Math.sin(k * 9) * 16 * (1 - e))
  if (style === 'glide') return out.set(-70 * (1 - e), base + (1 - e) * 10, -20 * (1 - e))
  if (style === 'dive') return out.set(0, base + Math.pow(1 - k, 2.2) * 70, -30 * Math.pow(1 - k, 2))
  if (style === 'beam') return out.set(0, base + (1 - e) * 26, 0)
  if (style === 'retro') return out.set(0, base + Math.pow(1 - k, 1.6) * 45, 0)
  return out.set(0, base + Math.pow(1 - k, 2.5) * 80, 0)
}

export function LandedShip({ id, ground }) {
  const s = surfaces[id]
  const { style, fx: fxName, color } = s.landing
  const ship = useRef()
  const beam = useRef()
  const flame = useRef()
  const parts = useRef()
  const sim = useRef({ p: [], fired: false, roared: false })
  const base = ground(0, 0) + 1.1

  useLayoutEffect(() => {
    sim.current.p = Array.from({ length: N }, () => ({ pos: new THREE.Vector3(), vel: new THREE.Vector3(), life: 0 }))
    for (let i = 0; i < N; i++) parts.current.setMatrixAt(i, m.makeScale(0, 0, 0))
  }, [])

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const st = getState()
    const S = sim.current
    const cfg = fxStyles[fxName]
    if (st.mode === 'surface' && fx.touch < 1) {
      if (!S.roared) { sound.whoosh(2.8); S.roared = true }
      fx.touch = Math.min(1, fx.touch + Math.min(rawDt, 0.25) / 3)
      fx.fade = Math.max(0, fx.fade - dt * 1.4)
      if (fx.touch > 0.93 && !S.fired) {
        S.fired = true
        sound.thud()
        S.p.forEach((p) => {
          const a = Math.random() * Math.PI * 2
          p.pos.set(Math.cos(a) * 1.5, base - 0.8, Math.sin(a) * 1.5)
          p.vel.set(Math.cos(a) * cfg.out * (0.4 + Math.random()), cfg.up * (0.3 + Math.random()), Math.sin(a) * cfg.out * (0.4 + Math.random()))
          p.life = cfg.life * (0.5 + Math.random() * 0.5)
        })
        if (s.landing.shake) fx.shake = 0.8
      }
    }
    const g = ship.current
    if (st.mode === 'takeoff') {
      fx.lift = Math.min(1, fx.lift + Math.min(rawDt, 0.25) / 2.6)
      if (fx.lift < 0.02 && !S.lifted) { sound.whoosh(2.6); S.lifted = true }
      g.position.set(0, base + Math.pow(fx.lift, 2.2) * 70, 0)
      g.rotation.set(-fx.lift * 0.9, 0, 0)
      fx.fade = THREE.MathUtils.smoothstep(fx.lift, 0.7, 1)
      if (fx.lift >= 1) finishTakeoff()
    } else {
      shipPose(style, fx.touch, base, g.position)
      g.rotation.set(0, style === 'spiral' ? fx.touch * 9 : style === 'glide' ? -Math.PI / 2 + ease(fx.touch) * 0.6 : 0, fx.touch < 1 && style === 'glide' ? 0.2 : 0)
    }
    const descending = fx.touch < 0.95 || st.mode === 'takeoff'
    beam.current.visible = style === 'beam' && fx.touch < 0.97
    beam.current.scale.set(1, Math.max(0.01, g.position.y - base + 1.2), 1)
    beam.current.position.y = -Math.max(0.01, g.position.y - base + 1.2) / 2
    flame.current.visible = descending
    flame.current.scale.setScalar(style === 'retro' || st.mode === 'takeoff' ? 2.2 : 1.2)
    if (fx.shake > 0) {
      state.camera.position.x += (Math.random() - 0.5) * fx.shake
      state.camera.position.y += (Math.random() - 0.5) * fx.shake
      fx.shake = Math.max(0, fx.shake - dt * 0.8)
    }
    S.p.forEach((p, i) => {
      if (p.life <= 0) return
      p.life -= dt
      p.vel.y += cfg.g * dt
      p.vel.multiplyScalar(1 - dt * 0.8)
      p.pos.addScaledVector(p.vel, dt)
      const k = Math.max(0, p.life / cfg.life) * cfg.size
      parts.current.setMatrixAt(i, m.compose(p.pos, q, sc.setScalar(k)))
    })
    parts.current.instanceMatrix.needsUpdate = true
  })

  const onClick = (e) => {
    e.stopPropagation()
    if (fx.touch >= 1) startTakeoff()
  }

  return (
    <>
      <group ref={ship} onClick={onClick} onPointerOver={() => (document.body.style.cursor = 'pointer')} onPointerOut={() => (document.body.style.cursor = '')}>
        <group scale={1.5}>
          <ShipModel />
          {[-0.9, 0.9].map((x) => (
            <mesh key={x} position={[x, -0.7, 0.3]}>
              <cylinderGeometry args={[0.05, 0.08, 0.8, 6]} />
              <meshStandardMaterial color="#2a2e32" metalness={0.6} />
            </mesh>
          ))}
          <group ref={flame} position={[0, -0.6, 0.2]} rotation={[Math.PI, 0, 0]}>
            <mesh position={[0, 0.6, 0]}>
              <coneGeometry args={[0.35, 1.2, 14, 1, true]} />
              <meshBasicMaterial color="#9ff0ff" toneMapped={false} transparent opacity={0.7} />
            </mesh>
          </group>
        </group>
        <mesh ref={beam} position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 3, 1, 24, 1, true]} />
          <meshBasicMaterial color={color} transparent opacity={0.22} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
        </mesh>
      </group>
      <mesh position={[0, base - 1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.6, 40]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <instancedMesh ref={parts} args={[undefined, undefined, N]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={color} toneMapped={!fxStyles[fxName].glow} transparent opacity={fxName === 'clouds' ? 0.6 : 0.9} />
      </instancedMesh>
    </>
  )
}
