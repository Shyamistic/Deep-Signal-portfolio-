import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { rng } from '../space/noise.js'

const kinds = {
  trees: { geo: () => new THREE.ConeGeometry(1, 3.2, 7).translate(0, 1.6, 0), mat: { color: '#24452f', roughness: 1 }, s: [0.5, 1.3], count: 260 },
  reeds: { geo: () => new THREE.CylinderGeometry(0.05, 0.09, 2.4, 5).translate(0, 1.2, 0), mat: { color: '#8aa86a', roughness: 1 }, s: [0.7, 1.4], count: 420 },
  pylons: { geo: () => new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), mat: { color: '#3a3128', emissive: '#ffae4a', emissiveIntensity: 0.25, metalness: 0.6, roughness: 0.45 }, s: [0.8, 1.6], tall: [2, 9], count: 140 },
  spikes: { geo: () => new THREE.ConeGeometry(0.8, 4, 5).translate(0, 2, 0), mat: { color: '#1a0f0b', roughness: 0.9 }, s: [0.6, 1.7], count: 220 },
  crystals: { geo: () => new THREE.OctahedronGeometry(1, 0).translate(0, 1, 0), mat: { color: '#dff4ff', emissive: '#6fcfff', emissiveIntensity: 0.4, roughness: 0.05, transparent: true, opacity: 0.85 }, s: [0.5, 1.6], tall: [1.5, 3.5], count: 200 },
  puffs: { geo: () => new THREE.SphereGeometry(1, 12, 9), mat: { color: '#fff8ea', roughness: 1 }, s: [1.2, 3.4], tall: [0.5, 0.8], count: 160 },
}

export function Decor({ kind, ground, spots }) {
  const k = kinds[kind]
  const ref = useRef()
  const geo = useMemo(() => k.geo(), [k])
  useLayoutEffect(() => {
    const rand = rng(77)
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const e = new THREE.Euler()
    const p = new THREE.Vector3()
    const sc = new THREE.Vector3()
    let n = 0
    for (let t = 0; n < k.count && t < k.count * 20; t++) {
      const a = rand() * Math.PI * 2
      const d = 10 + Math.pow(rand(), 0.7) * 56
      const x = Math.cos(a) * d
      const z = Math.sin(a) * d
      if (spots.some((sp) => Math.hypot(x - sp.x, z - sp.z) < sp.r + 2.5)) continue
      p.set(x, ground(x, z) - 0.1, z)
      e.set((rand() - 0.5) * 0.25, rand() * 6, (rand() - 0.5) * 0.25)
      const s = k.s[0] + rand() * (k.s[1] - k.s[0])
      const tall = k.tall ? k.tall[0] + rand() * (k.tall[1] - k.tall[0]) : 1
      sc.set(s, s * tall, s)
      ref.current.setMatrixAt(n++, m.compose(p, q.setFromEuler(e), sc))
    }
    ref.current.count = n
    ref.current.instanceMatrix.needsUpdate = true
  }, [k, ground, spots])
  return (
    <instancedMesh ref={ref} args={[geo, undefined, k.count]} frustumCulled={false}>
      <meshStandardMaterial {...k.mat} flatShading />
    </instancedMesh>
  )
}
