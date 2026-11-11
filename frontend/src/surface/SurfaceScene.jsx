import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { surfaces } from '../content/surfaces.js'
import { worlds } from '../content/worlds.js'
import { envs } from '../space/envs.js'
import { makeGround, spotsOf } from './terrain.js'
import { resetWalker, walkTo } from './walker.js'
import { rng } from '../space/noise.js'
import { Pilot } from './Pilot.jsx'
import { Npc } from './Npc.jsx'
import { Fauna } from './Fauna.jsx'
import { Relics, Talkers } from './Relics.jsx'
import { LandedShip } from './LandedShip.jsx'
import { Decor } from './Decor.jsx'

const skyVert = /* glsl */ `varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`
const skyFrag = /* glsl */ `
uniform vec3 uTop; uniform vec3 uBottom; uniform vec3 uSun; varying vec3 vP;
void main(){
  float h = clamp(vP.y * 1.4 + 0.15, 0.0, 1.0);
  vec3 col = mix(uBottom, uTop, pow(h, 0.8));
  float s = max(dot(normalize(vP), normalize(vec3(0.5, 0.35, -0.8))), 0.0);
  col += uSun * (pow(s, 64.0) * 1.4 + pow(s, 6.0) * 0.18);
  gl_FragColor = vec4(col, 1.0);
}`

function Sky({ s }) {
  const uniforms = useMemo(() => ({ uTop: { value: new THREE.Color(s.sky.top) }, uBottom: { value: new THREE.Color(s.sky.bottom) }, uSun: { value: new THREE.Color(s.sky.sun) } }), [s])
  return (
    <mesh scale={400}>
      <sphereGeometry args={[1, 32, 16]} />
      <shaderMaterial vertexShader={skyVert} fragmentShader={skyFrag} uniforms={uniforms} side={THREE.BackSide} depthWrite={false} fog={false} />
    </mesh>
  )
}

const tmpC = new THREE.Color()
const tmpD = new THREE.Color()
function colorAt(stops, h) {
  for (let i = 1; i < stops.length; i++) {
    if (h <= stops[i][0]) return tmpC.set(stops[i - 1][1]).lerp(tmpD.set(stops[i][1]), (h - stops[i - 1][0]) / (stops[i][0] - stops[i - 1][0]))
  }
  return tmpC.set(stops[stops.length - 1][1])
}

function Ground({ s, ground }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(150, 150, 170, 170).rotateX(-Math.PI / 2)
    const p = g.attributes.position
    const colors = new Float32Array(p.count * 3)
    const jitter = rng(11)
    for (let i = 0; i < p.count; i++) {
      const y = ground(p.getX(i), p.getZ(i))
      p.setY(i, y)
      const c = colorAt(s.ground, THREE.MathUtils.clamp((y + 4) / 12 + (jitter() - 0.5) * 0.05, 0, 1))
      colors.set([c.r, c.g, c.b], i * 3)
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    g.computeVertexNormals()
    return g
  }, [s, ground])
  const onClick = (e) => {
    if (e.delta > 8) return
    e.stopPropagation()
    walkTo(e.point.x, e.point.z)
  }
  return (
    <mesh geometry={geo} onClick={onClick} receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.95} flatShading />
    </mesh>
  )
}

function Liquid({ l }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, l.y, 0]}>
      <circleGeometry args={[90, 64]} />
      <meshStandardMaterial color={l.color} emissive={l.emissive} emissiveIntensity={l.intensity} roughness={l.glow ? 0.7 : 0.15} metalness={l.glow ? 0 : 0.4} transparent opacity={l.glow ? 1 : 0.88} toneMapped={!l.glow} />
    </mesh>
  )
}

export function SurfaceScene({ id }) {
  const s = surfaces[id]
  const index = worlds.findIndex((w) => w.id === id)
  const accent = envs[worlds[index].env].atmo
  const ground = useMemo(() => makeGround(s, index * 3.1 + 2), [s, index])
  const spots = useMemo(() => spotsOf(s), [s])
  useEffect(() => resetWalker(ground), [ground])

  return (
    <>
      <color attach="background" args={[s.sky.bottom]} />
      <fogExp2 attach="fog" args={[s.sky.fog, s.sky.density]} />
      <Sky s={s} />
      <hemisphereLight args={[s.sky.top, s.ground[1][1], 0.7]} />
      <directionalLight position={[40, 50, -60]} intensity={s.sky.sunI} color={s.sky.sun} />
      <ambientLight intensity={0.15} />
      <Ground s={s} ground={ground} />
      {s.liquid && <Liquid l={s.liquid} />}
      <Decor kind={s.decor} ground={ground} spots={spots} accent={accent} />
      <LandedShip id={id} ground={ground} />
      <Npc id={id} npc={s.npc} ground={ground} accent={accent} />
      <Relics id={id} relics={s.relics} ground={ground} accent={accent} />
      <Talkers talkers={s.talkers} ground={ground} />
      <Fauna s={s} ground={ground} />
      <Pilot />
    </>
  )
}
