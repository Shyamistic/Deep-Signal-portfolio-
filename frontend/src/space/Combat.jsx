import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { asteroids, ASTEROIDS, respawnAsteroid, enemies, bullets, BULLETS, parts, PARTS, burst } from './combatData.js'
import { ship, input, flightLocked, setState, pushToast } from './store.js'
import { fbm } from './noise.js'
import { Enemy } from './Enemy.jsx'
import { sound } from '../audio/engine.js'

const m = new THREE.Matrix4()
const q = new THREE.Quaternion()
const s = new THREE.Vector3()
const zAxis = new THREE.Vector3(0, 0, 1)
const right = new THREE.Vector3()
const dir = new THREE.Vector3()
const toE = new THREE.Vector3()
const hidden = new THREE.Matrix4().makeScale(0, 0, 0)
let cooldown = 0
let bCursor = 0

function rockGeometry() {
  const g = new THREE.IcosahedronGeometry(1, 2)
  const p = g.attributes.position
  const v = new THREE.Vector3()
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i)
    v.multiplyScalar(0.7 + fbm(v.x * 1.8 + 5, v.y * 1.8, v.z * 1.8, 3) * 0.6)
    p.setXYZ(i, v.x, v.y, v.z)
  }
  g.computeVertexNormals()
  return g
}

function fire() {
  right.set(Math.cos(ship.yaw), 0, -Math.sin(ship.yaw))
  dir.copy(ship.forward)
  let best = null
  enemies.forEach((e) => {
    if (!e.alive) return
    toE.copy(e.pos).sub(ship.pos)
    const d = toE.length()
    if (d < 220 && toE.normalize().dot(ship.forward) > 0.975 && (!best || d < best.d)) best = { e, d }
  })
  if (best) dir.copy(best.e.pos).sub(ship.pos).normalize()
  for (const side of [-1, 1]) {
    const b = bullets[bCursor]
    bCursor = (bCursor + 1) % BULLETS
    b.pos.copy(ship.pos).addScaledVector(right, side * 1.2).addScaledVector(ship.forward, 1.5)
    b.vel.copy(dir).multiplyScalar(230 + ship.speed)
    b.life = 1.4
  }
  sound.laser()
}

function defeat(e) {
  e.alive = false
  sound.boom()
  burst(e.pos, '#ff5a3c', 90, 30, 0.6)
  burst(e.pos, '#ffd29a', 40, 14, 0.4)
  setState((st) => ({ defeated: [...st.defeated, e.id], score: st.score + 250 }))
  pushToast({ tone: 'lesson', title: `${e.name} — down`, body: e.lesson }, 9000)
}

function hitBullet(b) {
  for (const a of asteroids) {
    if (a.alive && b.pos.distanceToSquared(a.pos) < (a.size + 0.8) ** 2) {
      a.alive = false
      a.respawnAt = performance.now() + 25000
      burst(a.pos, '#9b8a78', 22, 14, a.size * 0.18)
      sound.hit()
      setState((st) => ({ score: st.score + 10 }))
      return true
    }
  }
  for (const e of enemies) {
    if (e.alive && b.pos.distanceToSquared(e.pos) < 14) {
      e.hp -= 1
      e.flash = 0.18
      sound.hit()
      burst(b.pos, '#ff8a5c', 8, 10, 0.25)
      if (e.hp <= 0) defeat(e)
      return true
    }
  }
  return false
}

export function Combat() {
  const rocks = useRef()
  const shots = useRef()
  const sparks = useRef()
  const rockGeo = useMemo(() => rockGeometry(), [])

  useLayoutEffect(() => {
    for (let i = 0; i < PARTS; i++) {
      sparks.current.setMatrixAt(i, hidden)
      sparks.current.setColorAt(i, parts[i].color.set('#ffffff'))
    }
  }, [])

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const now = performance.now()
    cooldown -= dt
    if ((input.firing || input.keys[' ']) && !flightLocked() && cooldown <= 0) {
      fire()
      cooldown = 0.16
    }

    for (let i = 0; i < ASTEROIDS; i++) {
      const a = asteroids[i]
      if (!a.alive && now > a.respawnAt) respawnAsteroid(a, ship.pos)
      if (!a.alive) { rocks.current.setMatrixAt(i, hidden); continue }
      a.rot.x += a.spin.x * dt
      a.rot.y += a.spin.y * dt
      a.pos.addScaledVector(a.drift, dt)
      if (ship.pos.distanceToSquared(a.pos) < (a.size + 1.6) ** 2) {
        a.alive = false
        a.respawnAt = now + 25000
        burst(a.pos, '#9b8a78', 30, 16, a.size * 0.2)
        ship.speed *= 0.6
      }
      m.compose(a.pos, q.setFromEuler(a.rot), s.setScalar(a.size))
      rocks.current.setMatrixAt(i, m)
    }
    rocks.current.instanceMatrix.needsUpdate = true

    for (let i = 0; i < BULLETS; i++) {
      const b = bullets[i]
      if (b.life > 0) {
        b.life -= dt
        b.pos.addScaledVector(b.vel, dt)
        if (hitBullet(b)) b.life = 0
      }
      if (b.life <= 0) { shots.current.setMatrixAt(i, hidden); continue }
      m.compose(b.pos, q.setFromUnitVectors(zAxis, dir.copy(b.vel).normalize()), s.set(0.12, 0.12, 2.6))
      shots.current.setMatrixAt(i, m)
    }
    shots.current.instanceMatrix.needsUpdate = true

    for (let i = 0; i < PARTS; i++) {
      const p = parts[i]
      if (p.life <= 0) continue
      p.life -= dt
      p.pos.addScaledVector(p.vel, dt)
      p.vel.multiplyScalar(1 - dt * 1.5)
      const k = Math.max(0, p.life / p.max) * p.size
      sparks.current.setMatrixAt(i, k > 0 ? m.compose(p.pos, q.identity(), s.setScalar(k)) : hidden)
      sparks.current.setColorAt(i, p.color)
    }
    sparks.current.instanceMatrix.needsUpdate = true
    if (sparks.current.instanceColor) sparks.current.instanceColor.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={rocks} args={[rockGeo, undefined, ASTEROIDS]} frustumCulled={false}>
        <meshStandardMaterial color="#6b625a" roughness={0.95} metalness={0.1} flatShading />
      </instancedMesh>
      <instancedMesh ref={shots} args={[undefined, undefined, BULLETS]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#9ff0ff" toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={sparks} args={[undefined, undefined, PARTS]} frustumCulled={false}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      {enemies.map((e, i) => <Enemy key={e.id} index={i} />)}
    </>
  )
}
