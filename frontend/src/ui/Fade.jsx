import { useEffect, useRef } from 'react'
import { fx, getState } from '../space/store.js'

export function Fade() {
  const ref = useRef()
  useEffect(() => {
    let id
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const { mode } = getState()
      if (mode === 'space') fx.fade = Math.max(0, fx.fade - dt * 0.9)
      if (ref.current) {
        ref.current.style.opacity = fx.fade
        ref.current.style.background = fx.fadeColor
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])
  return <div ref={ref} className="fade" aria-hidden="true" data-testid="scene-fade" />
}
