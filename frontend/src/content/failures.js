export const failures = [
  {
    id: 'stale-model',
    name: 'The Stale Model',
    near: null,
    home: [0, 6, -80],
    lesson: 'Vayu once returned a plausible forecast from a stale model. Now freshness is validated before any output is trusted.',
  },
  {
    id: 'hallucination',
    name: 'The Hallucination',
    near: 'foundry',
    lesson: 'Nexus Prime hallucinated 8.0% of diagnoses. A safety validator brought it down to 1.2% across 150 incidents.',
  },
  {
    id: 'self-approving-patch',
    name: 'The Self-Approving Patch',
    near: 'scholaris',
    lesson: 'No model should approve its own fix. A.S.T.R.A. puts an independent gate before any patch ships.',
  },
  {
    id: 'prod-500',
    name: 'The 500 in Prod',
    near: 'wordwatch',
    lesson: 'A production 500 in Wordwatch’s share flow. I fixed it and wrote the regression tests that keep it fixed.',
  },
  {
    id: 'uncertain-retrieval',
    name: 'The Confident Guess',
    near: 'stillwater',
    lesson: 'Search that guesses confidently is worse than search that says “not sure”. VRI’s pipeline uses confidence thresholds.',
  },
  {
    id: 'missing-baseline',
    name: 'The Missing Baseline',
    near: 'meridian',
    lesson: 'A “90% accurate” claim means nothing alone. Say the baseline out loud before you say the accuracy.',
  },
  {
    id: 'polished-idea',
    name: 'The Polished Idea',
    near: 'breath',
    lesson: 'A polished workflow is not a habit until someone comes back unprompted. That is why the growth test has a kill condition.',
  },
]
