import { useEffect, useState } from 'react'
import { useGame } from '../space/store.js'
import { advanceDialogue } from '../surface/quests.js'

function Typed({ text }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 2)), 16)
    return () => clearInterval(id)
  }, [text])
  return <p className="dialogue__text" data-testid="dialogue-text">{text.slice(0, n)}</p>
}

export function Dialogue() {
  const d = useGame((s) => s.dialogue)
  useEffect(() => {
    if (!d) return
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key.toLowerCase() === 'e') {
        e.preventDefault()
        advanceDialogue()
      }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [d])
  if (!d) return null
  const last = d.i === d.lines.length - 1
  return (
    <div className={`dialogue dialogue--${d.tone}`} data-ui data-testid="dialogue-box">
      <p className="dialogue__speaker" data-testid="dialogue-speaker">{d.speaker}</p>
      <Typed key={`${d.speaker}-${d.i}`} text={d.lines[d.i]} />
      <div className="dialogue__actions">
        {last && d.actions ? (
          d.actions.map((a) => (
            <button key={a.label} className="btn btn--tiny btn--ghost" data-testid={a.testid} onClick={a.run}>{a.label}</button>
          ))
        ) : (
          <button className="btn btn--tiny btn--primary" data-testid="dialogue-next-btn" onClick={advanceDialogue}>
            {last ? 'Done' : 'Next'} <kbd>Space</kbd>
          </button>
        )}
        <span className="dialogue__count">{d.i + 1}/{d.lines.length}</span>
      </div>
    </div>
  )
}
