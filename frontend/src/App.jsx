import { useEffect, useRef, useState } from 'react'
import { SpaceCanvas } from './space/SpaceCanvas.jsx'
import { useFlightInput } from './space/useFlightInput.js'
import { useGame, getState, setState, startLanding, startTakeoff, fx } from './space/store.js'
import { setScene, initAudio } from './audio/engine.js'
import { Intro } from './ui/Intro.jsx'
import { Hud } from './ui/Hud.jsx'
import { SurfaceHud } from './ui/SurfaceHud.jsx'
import { Dialogue } from './ui/Dialogue.jsx'
import { Fade } from './ui/Fade.jsx'
import { StarMap } from './ui/StarMap.jsx'
import { WorldPanel } from './ui/WorldPanel.jsx'
import { Toasts } from './ui/Toasts.jsx'
import { TouchControls } from './ui/TouchControls.jsx'
import { StaticFallback } from './ui/StaticFallback.jsx'
import { Dossier } from './ui/Dossier.jsx'
import { TagLayer } from './space/tags.jsx'
import { Ending } from './ui/Ending.jsx'
import './styles/space.css'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

const coarse = typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches
window.__deepSignal = { getState, setState, startLanding, startTakeoff, fx }

function useSceneAudio() {
  const mode = useGame((s) => s.mode)
  const surfaceId = useGame((s) => s.surfaceId)
  const started = useGame((s) => s.started)
  useEffect(() => {
    if (!started) return
    setScene(mode === 'surface' || mode === 'takeoff' ? surfaceId : 'space')
  }, [mode, surfaceId, started])
  useEffect(() => {
    const wake = () => getStarted() && initAudio()
    addEventListener('pointerdown', wake)
    return () => removeEventListener('pointerdown', wake)
  }, [])
}

let startedFlag = false
const getStarted = () => startedFlag

function Game() {
  const ref = useRef()
  useFlightInput(ref)
  useSceneAudio()
  const started = useGame((s) => s.started)
  const mode = useGame((s) => s.mode)
  useEffect(() => { startedFlag = started }, [started])
  return (
    <div className={`space-app mode-${mode}`} data-testid="space-app">
      <div className="space-canvas" ref={ref} data-testid="space-canvas">
        <SpaceCanvas />
      </div>
      <TagLayer />
      {started ? <Hud /> : <Intro />}
      <SurfaceHud />
      {started && coarse && mode === 'space' && <TouchControls />}
      <Dialogue />
      <StarMap />
      <WorldPanel />
      <Dossier />
      <Ending />
      <Toasts />
      <Fade />
    </div>
  )
}

export default function App() {
  const [webgl] = useState(hasWebGL)
  return webgl ? <Game /> : <StaticFallback />
}
