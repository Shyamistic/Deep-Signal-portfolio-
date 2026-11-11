import { voiceNotes } from '../content/media-manifest.js'
import { duck } from '../audio/engine.js'

export function VoiceNote({ voiceKey }) {
  const note = voiceNotes[voiceKey]
  if (!note) return null
  return (
    <div className="voice-note" data-testid="world-voice-note">
      <p className="eyebrow">Narration · {note.title}</p>
      <p className="voice-note__label" data-testid="world-voice-label">{note.label}</p>
      <audio controls preload="none" src={note.audioSrc} data-testid="world-voice-audio" onPlay={() => duck(true)} onPause={() => duck(false)} onEnded={() => duck(false)} />
      <details className="voice-note__transcript">
        <summary data-testid="world-voice-transcript-toggle">Transcript</summary>
        <p>{note.transcript}</p>
      </details>
    </div>
  )
}
