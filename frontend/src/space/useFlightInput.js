import { useEffect } from 'react'
import { input, ship, getState, setState, startLanding, startTakeoff, openWorld } from './store.js'
import { interact, jump, wave } from '../surface/walker.js'

const typing = (t) => t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')
const isUi = (t) => t && t.closest && t.closest('[data-ui]')

export function landIfNear() {
  const { near, openWorld: open, mode } = getState()
  if (near && !open && mode === 'space') startLanding(near)
}

export function closeOverlays() {
  setState({ openWorld: null, mapOpen: false, dossierOpen: false, ending: false })
}

// Keys that only matter while walking on a planet. Ignored when any overlay or dialogue is open.
function surfaceKey(k, repeat) {
  const s = getState()
  if (s.mode !== 'surface' || s.dialogue || s.openWorld || s.dossierOpen || s.ending) return
  if (repeat) return
  if (k === 'e') interact()
  else if (k === ' ') jump()
  else if (k === 'f') wave()
  else if (k === 't') startTakeoff()
  else if (k === 'l' && s.surfaceId) openWorld(s.surfaceId)
}

export function useFlightInput(canvasRef) {
  useEffect(() => {
    const down = (e) => {
      if (typing(e.target)) return
      const k = e.key.toLowerCase()
      if (k === ' ' || k.startsWith('arrow')) e.preventDefault()
      input.keys[k] = true
      if ('wasd'.includes(k) && getState().autopilot) setState({ autopilot: null })
      if (k === 'e' && !e.repeat) landIfNear()
      if (k === 'm' && !e.repeat && getState().started && getState().mode === 'space') setState((s) => ({ mapOpen: !s.mapOpen, openWorld: null }))
      if (k === 'i' && !e.repeat && getState().started && (getState().mode === 'space' || getState().mode === 'surface')) setState((s) => ({ dossierOpen: !s.dossierOpen }))
      surfaceKey(k, e.repeat)
      if (k === 'escape') closeOverlays()
    }
    const up = (e) => { input.keys[e.key.toLowerCase()] = false }
    const move = (e) => {
      if (e.pointerType !== 'mouse') return
      if (isUi(e.target)) { input.mx = 0; input.my = 0; return }
      input.mx = (e.clientX / innerWidth) * 2 - 1
      input.my = (e.clientY / innerHeight) * 2 - 1
    }
    const blur = () => { input.keys = {}; input.firing = false; input.mx = 0; input.my = 0 }
    addEventListener('keydown', down)
    addEventListener('keyup', up)
    addEventListener('pointermove', move)
    addEventListener('blur', blur)
    const el = canvasRef.current
    const pDown = (e) => {
      if (e.pointerType === 'mouse' && e.button === 0) input.firing = true
      if (e.pointerType !== 'mouse') el.setPointerCapture(e.pointerId)
    }
    const pMove = (e) => {
      if (e.pointerType === 'mouse' || !e.buttons) return
      input.mx = ((e.clientX / innerWidth) * 2 - 1) * 1.4
      input.my = ((e.clientY / innerHeight) * 2 - 1) * 1.4
    }
    const pUp = (e) => {
      input.firing = false
      if (e.pointerType !== 'mouse') { input.mx = 0; input.my = 0 }
    }
    el.addEventListener('pointerdown', pDown)
    el.addEventListener('pointermove', pMove)
    addEventListener('pointerup', pUp)
    return () => {
      removeEventListener('keydown', down)
      removeEventListener('keyup', up)
      removeEventListener('pointermove', move)
      removeEventListener('blur', blur)
      removeEventListener('pointerup', pUp)
      el.removeEventListener('pointerdown', pDown)
      el.removeEventListener('pointermove', pMove)
    }
  }, [canvasRef])
}

export const shipSpeed = () => Math.round(ship.speed * 10)
