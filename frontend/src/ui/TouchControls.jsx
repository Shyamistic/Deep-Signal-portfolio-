import { input } from '../space/store.js'

const hold = (key) => ({
  onPointerDown: (e) => { e.currentTarget.setPointerCapture(e.pointerId); input[key] = true },
  onPointerUp: () => { input[key] = false },
  onPointerCancel: () => { input[key] = false },
})

export function TouchControls() {
  return (
    <div className="touch" data-ui data-testid="touch-controls">
      <p className="touch__hint">Drag anywhere to steer</p>
      <button className="touch__btn" data-testid="touch-thrust-btn" {...hold('touchThrust')}>Thrust</button>
      <button className="touch__btn touch__btn--fire" data-testid="touch-fire-btn" {...hold('firing')}>Fire</button>
    </div>
  )
}
