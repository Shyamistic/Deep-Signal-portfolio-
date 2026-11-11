import { useMemo } from 'react'
import * as THREE from 'three'

const vert = /* glsl */ `
varying vec3 vN;
varying vec3 vV;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`

const rimFrag = /* glsl */ `
uniform vec3 uColor;
varying vec3 vN;
varying vec3 vV;
void main() {
  float f = pow(1.0 - clamp(dot(vN, vV), 0.0, 1.0), 3.0);
  gl_FragColor = vec4(uColor, f * 0.9);
}`

const haloFrag = /* glsl */ `
uniform vec3 uColor;
varying vec3 vN;
varying vec3 vV;
void main() {
  float f = pow(clamp(-dot(vN, vV), 0.0, 1.0), 4.0);
  gl_FragColor = vec4(uColor, f * 0.55);
}`

export function Atmosphere({ radius, color }) {
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color(color) } }), [color])
  return (
    <>
      <mesh scale={radius * 1.06}>
        <sphereGeometry args={[1, 64, 48]} />
        <shaderMaterial vertexShader={vert} fragmentShader={rimFrag} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh scale={radius * 1.3}>
        <sphereGeometry args={[1, 64, 48]} />
        <shaderMaterial vertexShader={vert} fragmentShader={haloFrag} uniforms={uniforms} transparent depthWrite={false} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>
    </>
  )
}
