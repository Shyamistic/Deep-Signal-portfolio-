import { worlds, sectionLabels } from '../content/worlds.js'
import { useGame, setState } from '../space/store.js'
import { envs } from '../space/envs.js'
import { VoiceNote } from './VoiceNote.jsx'
import { GrowthSection } from './GrowthSection.jsx'

const layers = ['bet', 'uncomfortable', 'evidence', 'lesson']

export function WorldPanel() {
  const id = useGame((s) => s.openWorld)
  if (!id) return null
  const i = worlds.findIndex((w) => w.id === id)
  const w = worlds[i]
  const next = worlds[(i + 1) % worlds.length]
  const prev = worlds[(i + worlds.length - 1) % worlds.length]
  const go = (t) => setState({ openWorld: null, autopilot: t.id })
  return (
    <aside className="panel" data-ui style={{ '--glow': envs[w.env].atmo }} data-testid={`world-panel-${w.id}`} aria-label={`${w.planet} landing log`}>
      <div className="panel__head">
        <p className="eyebrow">{w.kicker}</p>
        <button className="btn btn--ghost btn--tiny" data-testid="world-panel-close-btn" onClick={() => setState({ openWorld: null })}>Close <kbd>Esc</kbd></button>
      </div>
      <h2 className="panel__planet" data-testid="world-panel-title">{w.planet}</h2>
      <p className="panel__title">{w.title}</p>
      <p className="panel__award">{w.award}</p>
      <p className="panel__stack">{w.stack}</p>
      <ul className="panel__receipts" data-testid="world-panel-receipts">
        {w.receipts.map((r) => <li key={r}>{r}</li>)}
      </ul>
      {layers.map((k) => (
        <section key={k} className={`layer layer--${k}`} data-testid={`world-layer-${k}`}>
          <h3>{sectionLabels[k]}</h3>
          <p>{w[k]}</p>
        </section>
      ))}
      <p className="panel__status">Source · {w.status}</p>
      {w.voiceKey && <VoiceNote voiceKey={w.voiceKey} />}
      {w.id === 'breath' && <GrowthSection />}
      {w.links.length > 0 && (
        <div className="panel__links">
          {w.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" data-testid={`world-link-${l.label.replace(/\W+/g, '-').toLowerCase()}`}>{l.label} ↗</a>
          ))}
        </div>
      )}
      <div className="panel__nav">
        <button className="btn btn--ghost btn--tiny" data-testid="world-panel-prev-btn" onClick={() => go(prev)}>← {prev.planet}</button>
        <button className="btn btn--primary btn--tiny" data-testid="world-panel-next-btn" onClick={() => go(next)}>Fly to {next.planet} →</button>
      </div>
    </aside>
  )
}
