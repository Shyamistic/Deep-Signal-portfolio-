import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Tag } from './tags.jsx'
import * as THREE from 'three'
import { envs } from './envs.js'
import { fbm, rng } from './noise.js'
import { ship } from './store.js'
import { Atmosphere } from './Atmosphere.jsx'
import { PlanetProps } from './PlanetProps.jsx'

const tmp = new THREE.Color()
const tmp2 = new THREE.Color()

function sampleStops(stops, h) {
  for (let i = 1; i < stops.length; i++) {
    if (h <= stops[i][0]) {
      const [a, ca] = stops[i - 1]
      const [b, cb] = stops[i]
      return tmp.set(ca).lerp(tmp2.set(cb), (h - a) / (b - a || 1))
    }
  }
  return tmp.set(stops[stops.length - 1][1])
}

function makeHeight(env, seed) {
  return (x, y, z) => {
    if (env.bands) return 0.5 + 0.5 * Math.sin(y * 9 + fbm(x * 2 + seed, y * 2, z * 2, 3) * 5)
    return fbm(x * env.freq + seed, y * env.freq, z * env.freq + seed * 0.5, 5)
  }
}

function buildGeometry(radius, env, height) {
  const geo = new THREE.SphereGeometry(radius, 128, 96)
  const pos = geo.attributes.position
  const colors = new Float32Array(pos.count * 3)
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize()
    const h = height(v.x, v.y, v.z)
    const r = radius * (1 + (h - 0.5) * env.amp)
    pos.setXYZ(i, v.x * r, v.y * r, v.z * r)
    const c = sampleStops(env.stops, h)
    colors.set([c.r, c.g, c.b], i * 3)
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.computeVertexNormals()
  return geo
}

function Ring({ radius, ring }) {
  const ref = useRef()
  useLayoutEffect(() => {
    ref.current.rotation.set(Math.PI / 2.3, 0, 0.3)
  }, [])
  return (
    <mesh ref={ref}>
      <ringGeometry args={[radius * ring.inner, radius * ring.outer, 160]} />
      <meshStandardMaterial color={ring.color} transparent opacity={0.38} side={THREE.DoubleSide} depthWrite={false} roughness={1} />
    </mesh>
  )
}

export function Planet({ world, index }) {
  const env = envs[world.env]
  const spin = useRef()
  const distRef = useRef()
  const height = useMemo(() => makeHeight(env, index * 7.3 + 1), [env, index])
  const geo = useMemo(() => buildGeometry(world.radius, env, height), [world.radius, env, height])
  const seaR = world.radius * (1 + (env.sea - 0.5) * env.amp) * 1.002
  const center = useMemo(() => new THREE.Vector3(...world.position), [world.position])

  useFrame((_, dt) => {
    spin.current.rotation.y += dt * env.spin
    if (distRef.current) {
      const d = Math.max(0, ship.pos.distanceTo(center) - world.radius)
      distRef.current.textContent = `${Math.round(d * 10)} km`
    }
  })

  return (
    <group position={world.position}>
      <group ref={spin} rotation={[0.2, index, 0.1]}>
        <mesh geometry={geo}>
          <meshStandardMaterial vertexColors roughness={0.92} metalness={0.05} />
        </mesh>
        {env.core && (
          <mesh>
            <sphereGeometry args={[seaR, 96, 64]} />
            <meshStandardMaterial
              color={env.core.color}
              emissive={env.core.emissive}
              emissiveIntensity={env.core.intensity}
              roughness={env.core.metal ? 0.25 : 0.6}
              metalness={env.core.metal ? 0.3 : 0}
              toneMapped={!(env.core.intensity > 1)}
            />
          </mesh>
        )}
        <PlanetProps kind={env.props} radius={world.radius} env={env} height={height} seed={index + 3} rng={rng} />
      </group>
      {env.ring && <Ring radius={world.radius} ring={env.ring} />}
      <Atmosphere radius={world.radius} color={env.atmo} />
      <Tag position={[0, world.radius * 1.45, 0]}>
        <div className="planet-tag" data-testid={`planet-label-${world.id}`}>
          <span className="planet-tag__kicker">{world.kicker}</span>
          <strong>{world.planet}</strong>
          <span className="planet-tag__dist" ref={distRef}>—</span>
        </div>
      </Tag>
    </group>
  )
}
