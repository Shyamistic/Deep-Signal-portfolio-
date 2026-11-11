import { growthExperiment as g, fieldKit } from '../content/worlds.js'

export function GrowthSection() {
  return (
    <section className="growth" data-testid="growth-section">
      <p className="eyebrow">{g.status}</p>
      <h3>{g.headline}</h3>
      <p>{g.introduction}</p>
      <dl className="growth__facts">
        <dt>Audience</dt><dd>{g.audience}</dd>
        <dt>Hypothesis</dt><dd>{g.hypothesis}</dd>
        <dt>North star</dt><dd>{g.northStar}</dd>
        <dt>Kill condition</dt><dd data-testid="growth-kill-condition">{g.killCondition}</dd>
      </dl>
      <ol className="growth__steps">
        {g.steps.map((s) => <li key={s.phase}><b>{s.phase}</b>{s.copy}</li>)}
      </ol>
      <div className="kit" data-testid="field-kit">
        <h3>{fieldKit.title}</h3>
        <p>{fieldKit.answer}</p>
        <ul>
          {fieldKit.budget.map((b) => <li key={b.item}><span>{b.item}</span><b>{b.amount}</b></li>)}
          <li className="kit__total"><span>Total</span><b>{fieldKit.total}</b></li>
        </ul>
      </div>
    </section>
  )
}
