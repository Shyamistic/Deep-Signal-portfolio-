import { worlds, publicContactLinks } from '../content/worlds.js'
import { failures } from '../content/failures.js'
import { useGame, setState } from '../space/store.js'

export function Ending() {
  const show = useGame((s) => s.ending)
  const defeated = useGame((s) => s.defeated)
  const score = useGame((s) => s.score)
  const met = useGame((s) => s.met)
  if (!show) return null
  return (
    <div className="overlay" data-ui data-testid="ending">
      <div className="consent__card ending">
        <p className="eyebrow">Signal complete</p>
        <h2>All six stories, finished.</h2>
        <p>You’ve seen the honest curve, the lanterns, the audit trail, the forge, the baseline and the test I’d run first. Thank you for flying this far.</p>
        <ul className="ending__stats">
          <li><b>{worlds.length}/{worlds.length}</b> stories</li>
          <li><b>{defeated.length}/{failures.length}</b> failures cleared</li>
          <li><b>{met.length}</b> locals met</li>
          <li><b>{score}</b> score</li>
        </ul>
        <p>If this is the kind of person you want building Wispr Flow’s next growth loop, let’s talk.</p>
        <div className="consent__actions">
          {publicContactLinks.map((l) => <a key={l.href} className="btn btn--primary" href={l.href} target="_blank" rel="noreferrer">{l.label.split(' ').pop()}</a>)}
          <button className="btn btn--ghost" data-testid="ending-close-btn" onClick={() => setState({ ending: false })}>Keep flying</button>
        </div>
      </div>
    </div>
  )
}
