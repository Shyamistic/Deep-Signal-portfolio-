import { heroContent } from '../content/worlds.js'
import { setState } from '../space/store.js'
import { initAudio } from '../audio/engine.js'

export function Intro() {
  const launch = (map) => {
    initAudio()
    setState({ started: true, mapOpen: map })
  }
  return (
    <section className="intro" data-ui data-testid="intro-overlay">
      <div className="intro__inner">
        <p className="eyebrow" data-testid="intro-eyebrow">{heroContent.eyebrow}</p>
        <h1 className="intro__title">
          Shyam Sharma<span>Deep Signal</span>
        </h1>
        <p className="intro__lede">{heroContent.opening}</p>
        <p className="intro__copy">{heroContent.scrollLine}</p>
        <div className="intro__actions">
          <button className="btn btn--primary" data-testid="intro-launch-btn" onClick={() => launch(false)}>
            Launch the ship
          </button>
          <button className="btn btn--ghost" data-testid="intro-map-btn" onClick={() => launch(true)}>
            Skip to the star map
          </button>
          <button className="btn btn--ghost" data-testid="intro-dossier-btn" onClick={() => setState({ dossierOpen: true })}>
            30-second dossier
          </button>
        </div>
        <ul className="intro__keys" data-testid="intro-controls">
          <li><kbd>W</kbd><kbd>S</kbd> thrust · brake</li>
          <li><kbd>A</kbd><kbd>D</kbd> or mouse — steer</li>
          <li><kbd>Shift</kbd> boost</li>
          <li><kbd>Space</kbd> / click — fire</li>
          <li><kbd>E</kbd> land · <kbd>M</kbd> map</li>
          <li>On planets — click to walk and talk</li>
        </ul>
      </div>
    </section>
  )
}
