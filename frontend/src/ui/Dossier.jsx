import { publicContactLinks } from '../content/worlds.js'
import { useGame, setState, openWorld } from '../space/store.js'

const rows = [
  ['Now', 'MCA, IIT Patna × IIIT Ranchi — semester 1 SGPA 9.60, semester 2 SGPA 10.00, CGPA 9.80', 'scholaris'],
  ['Work', 'Software Engineer, Wordwatch (UK compliance SaaS) — 2026, C#/.NET + React/TS, 90+ PRs in under 5 months', 'wordwatch'],
  ['Lead', 'Volunteer SWE → Technical Lead, VRI inventory system — since Oct 2024, 100+ centres worldwide', 'stillwater'],
  ['Builds', 'Nexus Prime (hallucinations 8.0% → 1.2%) · A.U.R.A. (AWS Global Vibe winner) · A.S.T.R.A. · Vayu (ISRO BAH Top 9)', 'foundry'],
  ['Research', 'IEEE COMPSAC 2026 accepted paper (independent researcher, applied AI) · Kaggle shyam31415', 'meridian'],
  ['Ranks', 'IMC Prosperity 4: World #18 (R4), #32 (R5), #332 final of 18,800+ · 9+ hackathon wins & podiums · IISc Pravega National Rank 2', 'meridian'],
  ['Proof', 'MCA transcripts, BCA grade sheet and employment certificate, open to inspect in the proof vault', 'vault'],
]

export function Dossier() {
  const open = useGame((s) => s.dossierOpen)
  if (!open) return null
  const go = (id) => { setState({ dossierOpen: false }); openWorld(id) }
  return (
    <div className="overlay" data-ui data-testid="dossier">
      <div className="map dossier">
        <div className="map__head">
          <div className="dossier__id">
            <img className="portrait" src="/shyam.jpg" alt="Portrait of Shyam Sharma" width="96" height="96" data-testid="dossier-portrait" />
            <div>
              <p className="eyebrow">The 30-second version</p>
              <h2>Shyam Sharma</h2>
              <p className="dossier__sub">Applied AI engineer who ships to production, measures against baselines, and writes down where it broke.</p>
            </div>
          </div>
          <button className="btn btn--ghost btn--tiny" data-testid="dossier-close-btn" onClick={() => setState({ dossierOpen: false })}>Close <kbd>Esc</kbd></button>
        </div>
        <dl className="dossier__rows">
          {rows.map(([k, v, id]) => (
            <div key={k} className="dossier__row">
              <dt>{k}</dt>
              <dd>{v}</dd>
              <button className="btn btn--tiny btn--ghost" data-testid={`dossier-open-${k.toLowerCase().replace(/\s/g, '-')}`} onClick={() => go(id)}>Evidence →</button>
            </div>
          ))}
        </dl>
        <div className="dossier__links">
          {publicContactLinks.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" data-testid={`dossier-link-${l.label.split(' ').pop().toLowerCase()}`}>{l.label} ↗</a>)}
          <a href="https://www.kaggle.com/shyam31415" target="_blank" rel="noreferrer" data-testid="dossier-link-kaggle">Kaggle ↗</a>
        </div>
      </div>
    </div>
  )
}
