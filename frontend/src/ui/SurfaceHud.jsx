import { surfaces } from '../content/surfaces.js'
import { worlds } from '../content/worlds.js'
import { useGame, openWorld, startTakeoff, setState } from '../space/store.js'
import { stopNarration } from '../audio/engine.js'
import { SoundToggle } from './SoundToggle.jsx'
import { VoiceControl } from './VoiceControl.jsx'

export function SurfaceHud() {
  const id = useGame((s) => s.surfaceId)
  const mode = useGame((s) => s.mode)
  const q = useGame((s) => s.quests[id])
  const narrating = useGame((s) => s.narrating)
  if (!id || mode !== 'surface') return null
  const s = surfaces[id]
  const w = worlds.find((x) => x.id === id)
  const found = q?.found || []
  return (
    <>
      <header className="hud-top" data-ui>
        <div className="quest" data-testid="quest-tracker">
          <span className="hud-label">{w.kicker} · on the surface of {w.planet}</span>
          <h2 className="quest__title">{s.story}</h2>
          <ul>
            <li className={q?.started ? 'is-done' : ''} data-testid="quest-step-talk">Talk to {s.npc.name}</li>
            {s.relics.map((r) => (
              <li key={r.id} className={found.includes(r.id) ? 'is-done' : ''} data-testid={`quest-step-${r.id}`}>{r.name}</li>
            ))}
            <li className={q?.done ? 'is-done' : ''} data-testid="quest-step-finish">Return to {s.npc.name}</li>
          </ul>
        </div>
        <nav className="hud-actions">
          <button className="btn btn--ghost btn--tiny" data-testid="surface-log-btn" onClick={() => openWorld(id)}>Field log</button>
          <button className="btn btn--ghost btn--tiny" data-testid="surface-dossier-btn" onClick={() => setState({ dossierOpen: true })}>Dossier</button>
          <SoundToggle />
          <VoiceControl />
          <button className="btn btn--primary btn--tiny" data-testid="surface-takeoff-btn" onClick={startTakeoff}>Take off</button>
        </nav>
      </header>
      {narrating && (
        <div className="narrating" data-ui data-testid="narration-player">
          <span className="pulse" /> AI narrator
          <button className="btn btn--tiny btn--ghost" data-testid="narration-stop-btn" onClick={stopNarration}>Stop</button>
        </div>
      )}
      <p className="surface-hint" data-testid="surface-hint">Click the ground to walk · click characters, creatures and glowing plants to talk · click your ship to leave</p>
    </>
  )
}
