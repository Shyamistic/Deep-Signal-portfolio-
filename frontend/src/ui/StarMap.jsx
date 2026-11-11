import { worlds } from '../content/worlds.js'
import { failures } from '../content/failures.js'
import { useGame, setState, openWorld, resetProgress } from '../space/store.js'
import { envs } from '../space/envs.js'

export function StarMap() {
  const open = useGame((s) => s.mapOpen)
  const visited = useGame((s) => s.visited)
  const defeated = useGame((s) => s.defeated)
  if (!open) return null
  const fly = (id) => setState({ autopilot: id, mapOpen: false, openWorld: null })
  return (
    <div className="overlay" data-ui data-testid="star-map">
      <div className="map">
        <div className="map__head">
          <div>
            <p className="eyebrow">Star map · six worlds</p>
            <h2>Where to, pilot?</h2>
          </div>
          <button className="btn btn--ghost btn--tiny" data-testid="star-map-reset-btn" onClick={resetProgress}>Reset progress</button>
          <button className="btn btn--ghost btn--tiny" data-testid="star-map-close-btn" onClick={() => setState({ mapOpen: false })}>Close <kbd>Esc</kbd></button>
        </div>
        <ol className="map__grid">
          {worlds.map((w) => (
            <li key={w.id} className="map-card" style={{ '--glow': envs[w.env].atmo }} data-testid={`map-card-${w.id}`}>
              <span className="map-card__orb" />
              <span className="map-card__kicker">{w.kicker}</span>
              <strong>{w.planet}</strong>
              <span className="map-card__label">{w.label}</span>
              {visited.includes(w.id) && <span className="map-card__seen">Landed</span>}
              <div className="map-card__actions">
                <button className="btn btn--primary btn--tiny" data-testid={`map-fly-${w.id}`} onClick={() => fly(w.id)}>Autopilot</button>
                <button className="btn btn--ghost btn--tiny" data-testid={`map-open-${w.id}`} onClick={() => openWorld(w.id)}>Read now</button>
              </div>
            </li>
          ))}
        </ol>
        <div className="map__failures" data-testid="map-failures">
          <p className="eyebrow">Failures in the field · shoot them down to read the lesson</p>
          <ul>
            {failures.map((f) => (
              <li key={f.id} className={defeated.includes(f.id) ? 'is-down' : ''} data-testid={`map-failure-${f.id}`}>
                <b>{f.name}</b>
                <span>{defeated.includes(f.id) ? f.lesson : 'Still out there.'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
