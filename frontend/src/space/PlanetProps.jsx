import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const kinds = {
  trees: { count: 240, geo: () => new THREE.ConeGeometry(0.5, 2, 6), mat: { color: '#22402c', roughness: 1 }, s: [0.6, 1.4] },
  lanterns: { count: 110, geo: () => new THREE.SphereGeometry(0.28, 8, 6), mat: { color: '#ffd08a', emissive: '#ffb25a', emissiveIntensity: 4, toneMapped: false }, s: [0.8, 1.3], lift: 0.4 },
  towers: { count: 150, geo: () => new THREE.BoxGeometry(0.9, 1, 0.9).translate(0, 0.5, 0), mat: { color: '#2e2924', emissive: '#ffae4a', emissiveIntensity: 0.28, metalness: 0.6, roughness: 0.5 }, s: [1, 1], tall: [1.2, 5] },
  spikes: { count: 140, geo: () => new THREE.ConeGeometry(0.7, 3, 5), mat: { color: '#160d0a', roughness: 1 }, s: [0.6, 1.6], minH: 0.5 },
  crystals: { count: 110, geo: () => new THREE.OctahedronGeometry(0.9, 0), mat: { color: '#d8f2ff', emissive: '#6fcfff', emissiveIntensity: 0.7, roughness: 0.1, transparent: true, opacity: 0.85 }, s: [0.5, 1.8], tall: [1.5, 3] },
  clouds: { count: 70, geo: () => new THREE.SphereGeometry(1, 12, 8), mat: { color: '#fff4dd', transparent: true, opacity: 0.45, roughness: 1, depthWrite: false }, s: [2, 5], shell: 1.07 },
}

const up = new THREE.Vector3(0, 1, 0)

export function PlanetProps({ kind, radius, env, height, seed, rng }) {
  const k = kinds[kind]
  const ref = useRef()
  const geo = useMemo(() => k.geo(), [k])

  useLayoutEffect(() => {
    const rand = rng(seed * 9973)
    const dir = new THREE.Vector3()
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const sc = new THREE.Vector3()
    const p = new THREE.Vector3()
    const minH = Math.max(env.sea + 0.02, k.minH || 0)
    let placed = 0
    for (let tries = 0; placed < k.count && tries < k.count * 30; tries++) {
      dir.set(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1)
      if (dir.lengthSq() > 1 || dir.lengthSq() < 0.01) continue
      dir.normalize()
      const h = height(dir.x, dir.y, dir.z)
      if (!k.shell && h < minH) continue
      const r = k.shell ? radius * (k.shell + rand() * 0.04) : radius * (1 + (h - 0.5) * env.amp) + (k.lift || 0) - 0.15
      p.copy(dir).multiplyScalar(r)
      q.setFromUnitVectors(up, dir)
      const s = k.s[0] + rand() * (k.s[1] - k.s[0])
      const tall = k.tall ? k.tall[0] + rand() * (k.tall[1] - k.tall[0]) : 1
      sc.set(s, s * tall * (k.shell ? 0.4 : 1), s)
      m.compose(p, q, sc)
      ref.current.setMatrixAt(placed++, m)
    }
    ref.current.count = placed
    ref.current.instanceMatrix.needsUpdate = true
  }, [k, radius, env, height, seed, rng])

  return (
    <>
      <instancedMesh ref={ref} args={[geo, undefined, k.count]}>
        <meshStandardMaterial {...k.mat} />
      </instancedMesh>
      <mesh position={[0, radius * 1.02, 0]}>
        <cylinderGeometry args={[0.18, 0.18, radius * 0.5, 8]} />
        <meshBasicMaterial color={env.atmo} toneMapped={false} />
      </mesh>
      <mesh position={[0, radius * 1.27, 0]}>
        <sphereGeometry args={[0.7, 16, 12]} />
        <meshBasicMaterial color={env.atmo} toneMapped={false} />
      </mesh>
    </>
  )
}
