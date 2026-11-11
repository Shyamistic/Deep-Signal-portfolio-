import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { worlds } from '../content/worlds.js'
import { ship, input, getState, setState, flightLocked, startLanding } from './store.js'
import { stepLanding } from './landing.js'
import { setEngine } from '../audio/engine.js'
import { ShipModel } from './ShipModel.jsx'

const centers = worlds.map((w) => new THREE.Vector3(...w.position))
const tmp = new THREE.Vector3()
const camOffset = new THREE.Vector3()
const lookAt = new THREE.Vector3()
const euler = new THREE.Euler(0, 0, 0, 'YXZ')
const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt))
const dz = (v) => (Math.abs(v) < 0.14 ? 0 : (v - Math.sign(v) * 0.14) / 0.86)
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a))
let pitchRate = 0

function steerAutopilot(id, dt) {
  const i = worlds.findIndex((w) => w.id === id)
  const r = worlds[i].radius
  tmp.copy(ship.pos).sub(centers[i]).normalize().multiplyScalar(r + 24).add(centers[i]).sub(ship.pos)
  const dist = tmp.length()
  if (dist < 5) {
    tmp.copy(centers[i]).sub(ship.pos).normalize()
    ship.yaw = Math.atan2(-tmp.x, -tmp.z)
    ship.pitch = Math.asin(tmp.y) * 0.6
    startLanding(id)
    return
  }
  const wantYaw = Math.atan2(-tmp.x, -tmp.z)
  const wantPitch = Math.asin(THREE.MathUtils.clamp(tmp.y / dist, -1, 1))
  const dy = wrap(wantYaw - ship.yaw)
  ship.yawRate = damp(ship.yawRate, dy * 2, 4, dt)
  ship.yaw += dy * Math.min(1, dt * 2.6)
  ship.pitch += (wantPitch - ship.pitch) * Math.min(1, dt * 2.6)
  const aligned = Math.abs(dy) < 0.5
  ship.speed = damp(ship.speed, aligned ? Math.min(170, dist * 1.5 + 8) : 12, 2, dt)
}

function steerManual(dt) {
  const k = input.keys
  let yawIn = (k.a || k.arrowleft ? 1 : 0) - (k.d || k.arrowright ? 1 : 0) - dz(input.mx) * 1.1
  let pitchIn = (k.arrowup ? 1 : 0) - (k.arrowdown ? 1 : 0) - dz(input.my) * 0.9
  const thrust = k.w || input.touchThrust ? 1 : k.s ? -1 : 0
  const target = thrust > 0 ? (k.shift ? 95 : 48) : thrust < 0 ? 0 : ship.speed * 0.985
  ship.speed = damp(ship.speed, target, thrust < 0 ? 3 : 1.3, dt)
  ship.yawRate = damp(ship.yawRate, yawIn * 1.35, 4, dt)
  pitchRate = damp(pitchRate, pitchIn * 1.0, 4, dt)
  ship.yaw += ship.yawRate * dt
  ship.pitch = THREE.MathUtils.clamp(ship.pitch + pitchRate * dt, -1.15, 1.15)
  if (!pitchIn) ship.pitch = damp(ship.pitch, 0, 0.35, dt)
}

export function Ship() {
  const group = useRef()
  const model = useRef()
  const glow = useRef()

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const st = getState()
    if (st.mode === 'landing') {
      setEngine(0.8)
      stepLanding(Math.min(rawDt, 0.25), state.camera, group.current, glow.current)
      return
    }
    glow.current.material.opacity = 0
    setEngine(st.started ? 0.15 + ship.speed / 110 : 0)
    if (st.autopilot) steerAutopilot(st.autopilot, dt)
    else if (!flightLocked()) steerManual(dt)
    else {
      ship.speed = damp(ship.speed, 0, 3, dt)
      ship.yawRate = damp(ship.yawRate, 0, 3, dt)
    }

    euler.set(ship.pitch, ship.yaw, 0)
    ship.forward.set(0, 0, -1).applyEuler(euler)
    ship.pos.addScaledVector(ship.forward, ship.speed * dt)

    let near = null
    centers.forEach((c, i) => {
      const r = worlds[i].radius
      const d = ship.pos.distanceTo(c)
      const minD = r * 1.12 + 4
      if (d < minD) {
        tmp.copy(ship.pos).sub(c).normalize()
        ship.pos.copy(c).addScaledVector(tmp, minD)
        ship.speed *= 0.92
      }
      if (d < r + 46) near = worlds[i].id
    })
    if (near !== st.near) setState({ near })

    group.current.position.copy(ship.pos)
    group.current.rotation.set(ship.pitch, ship.yaw, 0, 'YXZ')
    model.current.rotation.z = damp(model.current.rotation.z, -ship.yawRate * 0.5, 5, dt)
    model.current.position.y = Math.sin(state.clock.elapsedTime * 1.6) * 0.06

    const cam = state.camera
    euler.set(ship.pitch * 0.75, ship.yaw, 0)
    camOffset.set(0, 2.5, 9.5 + ship.speed * 0.03).applyEuler(euler).add(ship.pos)
    cam.position.lerp(camOffset, 1 - Math.exp(-dt * 5))
    lookAt.copy(ship.pos).addScaledVector(ship.forward, 12)
    cam.lookAt(lookAt)
    cam.fov = damp(cam.fov, 60 + ship.speed * 0.13, 3, dt)
    cam.updateProjectionMatrix()
  })

  return (
    <group ref={group}>
      <group ref={model}>
        <ShipModel />
      </group>
      <mesh ref={glow} scale={[1.8, 1.2, 3.2]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshBasicMaterial color="#ff9a50" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
    </group>
  )
}
