import { worlds, heroContent, publicContactLinks } from '../content/worlds.js'

export function StaticFallback() {
  return (
    <main className="fallback" data-testid="static-fallback">
      <p className="eyebrow">{heroContent.eyebrow}</p>
      <h1>Shyam Sharma</h1>
      <p>{heroContent.opening} This browser can’t run the 3D flight, so here is the log as text.</p>
      {worlds.map((w) => (
        <section key={w.id} data-testid={`fallback-world-${w.id}`}>
          <p className="eyebrow">{w.kicker}</p>
          <h2>{w.planet}</h2>
          <p>{w.evidence}</p>
          <p><b>Lesson:</b> {w.lesson}</p>
        </section>
      ))}
      <nav>{publicContactLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</nav>
    </main>
  )
}
