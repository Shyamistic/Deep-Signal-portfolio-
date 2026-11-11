import { useGame } from '../space/store.js'
import { setMuted, initAudio } from '../audio/engine.js'

export function SoundToggle() {
  const muted = useGame((s) => s.muted)
  return (
    <button
      className="btn btn--ghost btn--tiny"
      data-testid="sound-toggle-btn"
      aria-pressed={!muted}
      onClick={() => { initAudio(); setMuted(!muted) }}
    >
      {muted ? 'Sound off' : 'Sound on'}
    </button>
  )
}
