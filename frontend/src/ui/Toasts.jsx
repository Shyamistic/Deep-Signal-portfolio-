import { useGame } from '../space/store.js'

export function Toasts() {
  const toasts = useGame((s) => s.toasts)
  return (
    <div className="toasts" aria-live="polite" data-testid="toasts">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.tone}`} data-testid={`toast-${t.tone}`}>
          <strong>{t.title}</strong>
          <p>{t.body}</p>
        </div>
      ))}
    </div>
  )
}
