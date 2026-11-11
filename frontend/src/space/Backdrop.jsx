import { useMemo } from 'react'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

const vert = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const frag = /* glsl */ `
varying vec3 vDir;
float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float noise(vec3 p) {
  vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 6; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; } return v; }
void main() {
  vec3 d = normalize(vDir);
  float n = fbm(d * 2.4 + vec3(3.1));
  float m = fbm(d * 4.0 - vec3(1.7) + n);
  float band = smoothstep(0.55, 0.0, abs(d.y + 0.25 * sin(d.x * 3.0) - 0.08));
  vec3 base = vec3(0.012, 0.016, 0.026);
  vec3 teal = vec3(0.04, 0.17, 0.2) * pow(m, 2.6) * 1.35;
  vec3 rust = vec3(0.32, 0.12, 0.05) * pow(smoothstep(0.45, 0.85, n * m * 1.6), 1.5) * band;
  vec3 col = base + teal * (0.25 + band * 0.8) + rust;
  gl_FragColor = vec4(col, 1.0);
}`

export const SUN_DIR = new THREE.Vector3(0.6, 0.35, -0.7).normalize()

export function Backdrop() {
  const sunPos = useMemo(() => SUN_DIR.clone().multiplyScalar(1400).toArray(), [])
  return (
    <>
      <mesh scale={1800} renderOrder={-1}>
        <sphereGeometry args={[1, 64, 32]} />
        <shaderMaterial vertexShader={vert} fragmentShader={frag} side={THREE.BackSide} depthWrite={false} fog={false} />
      </mesh>
      <Stars radius={900} depth={500} count={7000} factor={7} saturation={0.15} fade speed={0.4} />
      <mesh position={sunPos}>
        <sphereGeometry args={[60, 32, 16]} />
        <meshBasicMaterial color="#ffe2b0" toneMapped={false} fog={false} />
      </mesh>
      <directionalLight position={sunPos} intensity={2.6} color="#ffe6c4" />
      <hemisphereLight args={['#4a7c8a', '#140c08', 0.35]} />
      <ambientLight intensity={0.06} />
    </>
  )
}
