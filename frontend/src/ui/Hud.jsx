import { useEffect, useRef } from 'react'
import { worlds, publicContactLinks } from '../content/worlds.js'
import { failures } from '../content/failures.js'
import { useGame, setState, ship, getState } from '../space/store.js'
import { landIfNear } from '../space/useFlightInput.js'
import { VoiceControl } from './VoiceControl.jsx'
import { SoundToggle } from './SoundToggle.jsx'

function Speed() {
  const ref = useRef()
  useEffect(() => {
    let id
    const tick = () => {
      if (ref.current) ref.current.textContent = String(Math.round(ship.speed * 10)).padStart(4, '0')
      id = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(id)
  }, [])
  return (
    <div className="hud-speed" data-testid="hud-speed">
      <span className="hud-label">Velocity</span>
      <strong ref={ref}>0000</strong>
      <span className="hud-unit">m/s</span>
    </div>
  )
}

function NearPrompt() {
  const near = useGame((s) => s.near)
  const open = useGame((s) => s.openWorld)
  const auto = useGame((s) => s.autopilot)
  if (auto) {
    const w = worlds.find((x) => x.id === auto)
    return (
      <div className="hud-prompt" data-ui data-testid="hud-autopilot">
        <span className="pulse" /> Autopilot to <strong>{w.planet}</strong>
        <button className="btn btn--tiny" data-testid="hud-autopilot-cancel" onClick={() => setState({ autopilot: null })}>Take the stick</button>
      </div>
    )
  }
  if (!near || open || getState().mode !== 'space') return null
  const w = worlds.find((x) => x.id === near)
  return (
    <div className="hud-prompt" data-ui data-testid="hud-land-prompt">
      In orbit of <strong>{w.planet}</strong> · {w.kicker}
      <button className="btn btn--primary btn--tiny" data-testid="hud-land-btn" onClick={landIfNear}>Land <kbd>E</kbd></button>
    </div>
  )
}

export function Hud() {
  const score = useGame((s) => s.score)
  const defeated = useGame((s) => s.defeated)
  const visited = useGame((s) => s.visited)
  const heard = useGame((s) => s.heard)
  const quests = useGame((s) => s.quests)
  const mode = useGame((s) => s.mode)
  if (mode !== 'space' && mode !== 'landing') return heard ? <div className="hud-heard" data-testid="hud-heard">Heard: “{heard}”</div> : null
  const stories = Object.values(quests).filter((q) => q.done).length
  return (
    <>
      <header className="hud-top" data-ui>
        <div className="hud-brand">
          <span className="hud-label">Deep Signal · Shyam Sharma</span>
          <div className="hud-stats">
            <span data-testid="hud-score">Score <b>{score}</b></span>
            <span data-testid="hud-failures">Failures cleared <b>{defeated.length}/{failures.length}</b></span>
            <span data-testid="hud-visited">Worlds landed <b>{visited.length}/{worlds.length}</b></span>
            <span data-testid="hud-stories">Stories <b>{stories}/{worlds.length}</b></span>
          </div>
        </div>
        <nav className="hud-actions">
          <button className="btn btn--ghost btn--tiny" data-testid="hud-map-btn" onClick={() => setState({ mapOpen: true, openWorld: null })}>
            Star map <kbd>M</kbd>
          </button>
          <button className="btn btn--ghost btn--tiny" data-testid="hud-dossier-btn" onClick={() => setState({ dossierOpen: true })}>Dossier</button>
          <SoundToggle />
          <VoiceControl />
          {publicContactLinks.map((l) => (
            <a key={l.href} className="hud-link" href={l.href} target="_blank" rel="noreferrer" data-testid={`hud-link-${l.label.split(' ')[0].toLowerCase()}`}>
              {l.label.split(' ').pop()}
            </a>
          ))}
        </nav>
      </header>
      {heard && <div className="hud-heard" data-testid="hud-heard">Heard: “{heard}”</div>}
      <Speed />
      <NearPrompt />
      <div className="reticle" aria-hidden="true"><i /><i /><i /><i /></div>
    </>
  )
}
