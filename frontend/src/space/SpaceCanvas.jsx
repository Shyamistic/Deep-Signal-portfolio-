import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { worlds } from '../content/worlds.js'
import { useGame } from './store.js'
import { Backdrop } from './Backdrop.jsx'
import { Planet } from './Planet.jsx'
import { Ship } from './Ship.jsx'
import { Combat } from './Combat.jsx'
import { SurfaceScene } from '../surface/SurfaceScene.jsx'
import { TagProjector } from './tags.jsx'

function SpaceScene() {
  return (
    <>
      <color attach="background" args={['#03050a']} />
      <fogExp2 attach="fog" args={['#04070c', 0.0011]} />
      <Backdrop />
      {worlds.map((w, i) => <Planet key={w.id} world={w} index={i} />)}
      <Ship />
      <Combat />
    </>
  )
}

export function SpaceCanvas() {
  const mode = useGame((s) => s.mode)
  const surfaceId = useGame((s) => s.surfaceId)
  const onSurface = mode === 'surface' || mode === 'takeoff'
  return (
    <Canvas camera={{ fov: 60, near: 0.1, far: 5000, position: [0, 4, 44] }} dpr={[1, 1.75]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      {onSurface ? <SurfaceScene key={surfaceId} id={surfaceId} /> : <SpaceScene />}
      <TagProjector />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.85} luminanceThreshold={0.62} luminanceSmoothing={0.2} mipmapBlur />
        <Noise opacity={0.045} />
        <Vignette darkness={0.72} offset={0.28} />
      </EffectComposer>
    </Canvas>
  )
}
