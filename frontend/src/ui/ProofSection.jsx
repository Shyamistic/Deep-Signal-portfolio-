import { proofDocs } from '../content/worlds.js'
import { setState, openWorld } from '../space/store.js'

export function ProofSection() {
  const go = (id) => { setState({ openWorld: null }); openWorld(id) }
  return (
    <section className="proofs" data-testid="proof-section">
      <p className="eyebrow">Open the documents</p>
      <ul className="proofs__list">
        {proofDocs.map((d) => (
          <li key={d.id} className="proofs__item" data-testid={`proof-${d.id}`}>
            <div>
              <h3>{d.title}</h3>
              <p className="proofs__org">{d.org}</p>
              <p>{d.summary}</p>
            </div>
            <div className="proofs__actions">
              <a className="btn btn--primary btn--tiny" href={d.href} target="_blank" rel="noreferrer" data-testid={`proof-open-${d.id}`}>Open PDF ↗</a>
              <button className="btn btn--ghost btn--tiny" onClick={() => go(d.world)}>Related log →</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
