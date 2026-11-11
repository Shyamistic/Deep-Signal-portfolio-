import { useState } from 'react'
import { speechSupported, createRecognizer } from '../space/voice.js'
import { useGame, setState } from '../space/store.js'

let rec = null
const setStatus = (voice) => setState({ voice })

export function VoiceControl() {
  const status = useGame((s) => s.voice) || 'off'
  const [asking, setAsking] = useState(false)

  const enable = () => {
    setAsking(false)
    if (!speechSupported()) return setStatus('unsupported')
    rec = rec || createRecognizer({ onState: setStatus })
    try { rec.start() } catch { setStatus('listening') }
  }
  const toggle = () => {
    if (status === 'listening') { rec?.stop(); setStatus('off'); return }
    setAsking(true)
  }

  const label = { off: 'Voice', listening: 'Listening', denied: 'Mic blocked', unsupported: 'Voice n/a' }[status]

  return (
    <>
      <button className={`btn btn--tiny btn--voice is-${status}`} data-testid="voice-toggle-btn" onClick={toggle} aria-pressed={status === 'listening'}>
        <span className="mic-dot" /> {label}
      </button>
      {asking && (
        <div className="consent" data-ui role="dialog" aria-modal="true" data-testid="voice-consent-dialog">
          <div className="consent__card">
            <p className="eyebrow">Voice navigation · optional</p>
            <h2>Fly with your voice?</h2>
            <p>Your browser listens for commands like <em>“go to Research”</em>, <em>“open the map”</em>, <em>“land”</em> or <em>“take off”</em>. On a planet, say <em>“talk”</em> to greet the local and <em>“next”</em> to continue a conversation. Speech is handled by your browser — this site records nothing and stores nothing. Turn it off any time.</p>
            {!speechSupported() && <p className="consent__warn" data-testid="voice-unsupported-note">This browser has no speech recognition. Chrome or Edge works; the star map works everywhere.</p>}
            <div className="consent__actions">
              <button className="btn btn--primary" data-testid="voice-consent-allow-btn" onClick={enable} disabled={!speechSupported()}>Allow microphone</button>
              <button className="btn btn--ghost" data-testid="voice-consent-cancel-btn" onClick={() => setAsking(false)}>Not now</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
