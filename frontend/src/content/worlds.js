export const sourceLabels = {
  verified: 'Verified public source',
  resume: 'Résumé-backed / public-safe summary',
  record: 'Public record + provided résumé',
  proposal: 'Proposed, not run',
}

export const publicLinks = {
  github: { href: 'https://github.com/Shyamistic', label: 'Shyamistic on GitHub' },
  devpost: { href: 'https://devpost.com/Shyamistic', label: 'Shyamistic on Devpost' },
  linkedin: { href: 'https://www.linkedin.com/in/shyam-sharma-5bb919343', label: 'Shyam on LinkedIn' },
  nexusCode: { href: 'https://github.com/Shyamistic/Nexus-prime', label: 'Nexus Prime code on GitHub' },
  nexusLive: {
    href: 'https://white-river-06eae7700.2.azurestaticapps.net/',
    label: 'Nexus Prime live',
    note: 'Verify availability immediately before publishing.',
  },
  astraCode: { href: 'https://github.com/Shyamistic/A.S.T.R.A', label: 'A.S.T.R.A. code on GitHub' },
  vayuCode: { href: 'https://github.com/Shyamistic/vayu', label: 'Vayu code on GitHub' },
  auraCode: { href: 'https://github.com/Shyamistic/A.U.R.A', label: 'A.U.R.A. code on GitHub' },
  sarthiCode: { href: 'https://github.com/Shyamistic/S.A.R.T.H.I', label: 'S.A.R.T.H.I. · securities regulatory tracking' },
  kaggle: { href: 'https://www.kaggle.com/shyam31415', label: 'Kaggle · shyam31415' },
  imcCode: { href: 'https://github.com/Shyamistic/imc-prosperity-4', label: 'IMC Prosperity 4 notes on GitHub' },
  moreBuilds: [
    { href: 'https://github.com/Shyamistic/Finsa-ai', label: 'Finsa AI · SBI Hackathon 2026' },
    { href: 'https://fablecraft-pi.vercel.app', label: 'Fablecraft · live demo' },
    { href: 'https://github.com/Shyamistic/Nova-Architect-cli', label: 'Nova Architect · on PyPI' },
  ],
  upstreamStarter: { href: 'https://github.com/ITomPoland/portfolio-itom', label: 'MIT-licensed ITomPoland starter' },
}

export const publicContactLinks = [publicLinks.github, publicLinks.devpost, publicLinks.linkedin]

export const heroContent = {
  eyebrow: 'A flight log · six worlds · seven failures',
  opening: 'I build things that have to be right after the demo.',
  scrollLine: 'Six worlds are orbiting ahead. Fly the ship, shoot down the failures I actually shipped, land on each world and read the evidence.',
  voiceLine: 'Hear the unedited version',
  voiceNote:
    'Voice notes in Shyam’s own voice are being added per world — never generated, never a clone. Nothing auto-plays.',
  introHint: 'W / ↑ thrust · A / D turn · mouse steers · Space or click fires · E docks at a planet',
}

export const sectionLabels = {
  bet: 'The bet',
  uncomfortable: 'The uncomfortable part',
  evidence: 'The evidence',
  lesson: 'The lesson',
}

/*
  Six worlds, each a planet:
  palette drives the planet body; env drives its surface set-dressing.
  position is in world units from the origin; radius ~22-28.
*/
export const worlds = [
  {
    id: 'scholaris',
    planet: 'Scholaris',
    kicker: 'World 01 · Education',
    title: 'The studying planet',
    env: 'meadow',
    position: [180, 24, -40],
    radius: 26,
    body: '#8fae72',
    band: '#c9d8b0',
    label: 'Scholaris — IIT Patna · MCA · CGPA 9.80',
    status: sourceLabels.record,
    statusTone: 'resume',
    award: 'MCA, IIT Patna & IIIT Ranchi joint program · Jul 2025 – Oct 2027',
    stack: 'Class X 2019 · Class XII 2021 · BCA 2024 · MCA 2025–27 · Oracle GenAI + DevOps certified',
    receipts: [
      'Class X (2019) — 88%',
      'Class XII Science (2021) — 85%',
      'BCA, Gauhati University (2024) — 7.05 CGPA',
      'MCA Sem 1 — 9.60 · Sem 2 — 9.80',
      'IISc Pravega ML Challenge — National Rank 2',
      'Oracle certified: GenAI Professional · DevOps',
    ],
    bet: 'Stay in the classroom even while shipping — theory compounds.',
    uncomfortable:
      'The curve was not always up. A 7.05 in the BCA is part of this record on purpose: the jump to 9.60 and then 9.80 came from learning how to learn, not from talent appearing overnight.',
    evidence:
      'Class X in 2019 (88%), Class XII science in 2021 (85%), BCA from Gauhati University in 2024 (7.05 CGPA). Now in the MCA at the IIT Patna & IIIT Ranchi joint program (Jul 2025 – Oct 2027): semester 1 at 9.60 CGPA, semester 2 at 9.80. Oracle certifications in Generative AI, AI Foundations, and DevOps. National Rank 2 at IISc Pravega Agile ML Challenge; Top 10 of 5,000+ at GitLab i-Hack, IIT Bombay; Microsoft Imagine Cup Regional Finalist.',
    lesson: 'Learn in public, fail in notebooks, ship the corrections.',
    voiceKey: 'scholaris',
    links: [publicLinks.github],
  },
  {
    id: 'stillwater',
    planet: 'Stillwater',
    kicker: 'World 02 · Volunteer engineering',
    title: 'The service planet',
    env: 'islands',
    position: [-170, -12, 60],
    radius: 24,
    body: '#6fa3a8',
    band: '#b8d6d4',
    label: 'Stillwater — VRI · 100+ meditation centres',
    status: sourceLabels.resume,
    statusTone: 'resume',
    award: 'Vipassana Research Institute · Volunteer Software Engineer → Technical Lead · 1.5 years',
    stack: 'TypeScript · React · Supabase · Flask · MongoDB · Milvus',
    receipts: [
      '100+ meditation centres worldwide',
      'Three-tier semantic search · confidence thresholds',
      'OCR platform: 6 engines, English + Hindi',
      'Pala RAG platform · MCP storage · RBAC',
      'Audio fingerprinting: CLAP embeddings + Milvus',
    ],
    bet: 'Build for a global non-profit the same way you would build for a paying client.',
    uncomfortable:
      'A demo is easy; durability is not. Uncertain retrieval and the quiet weeks after launch are where trust is actually decided.',
    evidence:
      'Leads the VRI book inventory system (TypeScript, React, Supabase) used by 100+ meditation centres worldwide, with a three-tier semantic-search pipeline (stored QA, content, metadata) and confidence thresholds. Contributed to the six-engine OCR platform (English and Hindi), the Pala semantic-search RAG platform with MCP-based storage and RBAC, and audio fingerprinting with CLAP embeddings and Milvus. Résumé-backed, public-safe summary — internal material deliberately omitted.',
    lesson: 'Useful technology has to keep working after the demo ends.',
    voiceKey: 'stillwater',
    links: [publicLinks.github],
  },
  {
    id: 'wordwatch',
    planet: 'Crownfall',
    kicker: 'World 03 · Production SaaS',
    title: 'The compliance planet',
    env: 'industrial',
    position: [40, 64, 200],
    radius: 25,
    body: '#d9a04a',
    band: '#ecd9ac',
    label: 'Crownfall — Wordwatch · 90+ PRs in 5 months',
    status: sourceLabels.resume,
    statusTone: 'resume',
    award: 'Wordwatch (UK enterprise compliance SaaS) · Senior Software Engineer · 6 months · .NET',
    stack: 'React/TypeScript SPA · C#/.NET services · Prometheus · Grafana · RabbitMQ',
    receipts: [
      '90+ PRs · 150+ commits · 4 repositories',
      'Owned features from API to UI',
      'Risk-flag detection on ingest + access control',
      'Fixed a production 500 with regression tests',
      'Monitoring stack: Prometheus, Grafana, ES',
    ],
    bet: 'Ship in a regulated codebase where every change is auditable.',
    uncomfortable:
      'Compliance software punishes cleverness. The hard part was not speed — it was leaving evidence that the speed was safe.',
    evidence:
      'Shipped 90+ pull requests and 150+ commits across 4 repositories (React/TypeScript SPA, C#/.NET services) in a Jira-tracked agile team; owned features from API to UI. Built automatic risk-flag detection on transcription, IM and SMS ingest, and enterprise access control (RiskFlag/RiskFlagEdit). Delivered Share Saved Search end to end, fixed a production 500 in the share flow with regression tests, and contributed to the Prometheus/Grafana/Alertmanager/Elasticsearch/RabbitMQ monitoring stack. Résumé-backed, public-safe summary.',
    lesson: 'In regulated systems, the audit trail is the product.',
    voiceKey: 'wordwatch',
    links: [publicLinks.github],
  },
  {
    id: 'foundry',
    planet: 'Foundry',
    kicker: 'World 04 · The projects',
    title: 'The forge planet',
    env: 'volcanic',
    position: [-60, -52, -190],
    radius: 28,
    body: '#cf6b45',
    band: '#e8a982',
    label: 'Foundry — Nexus · AURA · Vayu · A.S.T.R.A. · more',
    status: sourceLabels.verified,
    statusTone: 'evaluation',
    award: 'IEEE COMPSAC 2026 · AWS Global Vibe 2025 Winner · ISRO BAH Top 9 · Army Terrier Cyber Quest',
    stack: 'Azure OpenAI · AWS Bedrock · PyTorch · FastAPI · React · offline agents',
    receipts: [
      'Hallucinations 8.0% → 1.2% · 150 incidents',
      'Median diagnosis 48.3 min → 6.1 s',
      '104 CVE fix pairs benchmarked · hash-chained ledger',
      '45 years of climate data · ISRO Top 9',
      '$10,000 Arcanum.AI productionization support',
    ],
    bet: 'Build ambitious agentic systems, then make them earn trust.',
    uncomfortable:
      'Every one of these systems was impressive first and wrong second. Nexus hallucinated 8.0% of the time; Vayu returned plausible output from a stale model; A.S.T.R.A. exists because no model should approve its own patch.',
    evidence:
      'Nexus Prime: 150-incident diagnostic evaluation — 90% top-1 accuracy, hallucinations 8.0% → 1.2% with a safety validator, median diagnosis 48.3 min → 6.1 s (IEEE COMPSAC 2026 accepted). AURA: AWS Global Vibe 2025 winner, sandbox-first remediation with $10,000 Arcanum.AI support. A.S.T.R.A.: offline repair for air-gapped networks, verified on cJSON and zlib CVEs, benchmarked on 104 fix pairs. Vayu: ISRO BAH National Top 9, 6.56M-param forecaster on 45 years of data, beat the tuned baseline in 3 of 4 regions, 400+ backend and 1,600+ frontend tests. Plus Finsa AI (SBI Hackathon), Fablecraft (live), and Nova Architect (PyPI).',
    lesson: 'The first version is always impressive. It is also always wrong somewhere.',
    voiceKey: 'foundry',
    links: [publicLinks.nexusCode, publicLinks.auraCode, publicLinks.astraCode, publicLinks.vayuCode, publicLinks.sarthiCode, publicLinks.nexusLive, ...publicLinks.moreBuilds],
  },
  {
    id: 'meridian',
    planet: 'Meridian',
    kicker: 'World 05 · Research & what is next',
    title: 'The observatory planet',
    env: 'glacial',
    position: [240, 84, 120],
    radius: 22,
    body: '#a8c3d1',
    band: '#d8e6ec',
    label: 'Meridian — research focus · IEEE COMPSAC 2026',
    status: sourceLabels.record,
    statusTone: 'evaluation',
    award: 'Current focus · 2026–2027',
    stack: 'Independent researcher · applied AI · quant trading · Kaggle: shyam31415',
    receipts: [
      'IEEE COMPSAC 2026 — accepted paper (independent researcher)',
      'IMC Prosperity 4 — World #332 final of 18,800+ teams',
      'IMC Prosperity 4 — World #18 in round 4 · #32 in round 5',
      '9+ hackathon wins & podiums',
      'Kaggle — 7 datasets · 14 notebooks · 11 benchmarks',
      'Global AI competition finalist from India',
    ],
    bet: 'Turn every agentic claim into a measured one.',
    uncomfortable:
      'The field ships demos faster than it ships evaluations. My own projects included. The honest baseline is that most "90% accurate" claims skip the baseline.',
    evidence:
      'Authored, as an independent researcher, the accepted IEEE COMPSAC 2026 paper on applied agentic AI for incident response with a safety validator. Quant side: IMC Prosperity 4 world rank #332 in the final standings out of 18,800+ teams, with world #18 in round 4 and #32 in round 5, plus trading and government-facing builds such as S.A.R.T.H.I. (securities regulatory tracking). 9+ hackathon wins and podiums across AWS Global Vibe, IISc Bengaluru (Pravega), IIT Bombay (GitLab i-Hack) and a pitch round in Mumbai. Kaggle (shyam31415): 7 datasets, 14 notebooks, 11 benchmarks. Currently focusing on evaluation-first agent design: reported-beside-baseline metrics (Vayu), uncertainty estimation via MC-dropout, property-based testing (17 tests in Finsa AI), and human-in-the-loop gates (AURA, A.S.T.R.A.). Next up: productionizing AURA through the Arcanum.AI mentorship ($10,000 support) while the MCA at IIT Patna runs through October 2027.',
    lesson: 'Say the baseline out loud before you say the accuracy.',
    voiceKey: 'meridian',
    links: [publicLinks.kaggle, publicLinks.imcCode, publicLinks.github, publicLinks.devpost],
  },
  {
    id: 'breath',
    planet: 'One Breath',
    kicker: 'World 06 · The Wispr Flow test',
    title: 'The launch pad planet',
    env: 'cloud',
    position: [-220, 56, -80],
    radius: 23,
    body: '#e3d3ae',
    band: '#f1e6c8',
    label: 'One Breath — the 14-day Bangalore growth test',
    status: sourceLabels.proposal,
    statusTone: 'proposal',
    award: 'Proposed first · not a pitch',
    stack: 'Consent-first field research · Bangalore',
    receipts: [
      '14 days · one narrow repeat habit',
      'North star: second use within 7 days',
      'Kill condition: <20% repeat by day 10',
      '$3,000 One-Breath Field Kit',
    ],
    bet: 'Propose a growth test small enough to run and honest enough to stop.',
    uncomfortable:
      'A polished voice workflow is only an idea until someone chooses to come back without being prompted. No interviews, analytics, or results exist yet — this is a proposal, not a campaign.',
    evidence:
      'One Breath, One Message: a consent-first, 14-day Bangalore test design with a north-star metric (repeat activation within seven days) and a kill condition (below 20% repeat activation by day 10). Plus the $3,000 One-Breath Field Kit.',
    lesson: 'This is the question I would test first, not merely pitch.',
    voiceKey: 'breath',
    links: [],
  },
]

export const growthExperiment = {
  status: sourceLabels.proposal,
  title: 'A 14-day Bangalore test',
  headline: 'If I joined Wispr Flow, this is the first 14-day experiment I would run.',
  introduction:
    'One Breath, One Message is a proposed, consent-first test. It has not been run and has no results to report.',
  audience: 'Bangalore students, early-career operators, and developers.',
  hypothesis:
    'If a first voice workflow can be completed in one breath and connect to a real job to be done, participants may return to use it again without prompting.',
  methodology:
    'Recruit only people who affirmatively opt in. Use segmented examples, moderated observation, and redacted synthesis. Do not publish a participant voice, image, quote, or identifiable detail without affirmative consent.',
  northStar:
    'Repeat activation: a participant completes a first one-breath workflow and independently returns for a second within seven days.',
  killCondition:
    'Stop or redesign if repeat activation is below 20% by day 10, or if no consistent job to be done emerges.',
  steps: [
    {
      phase: 'Days 1–2 · consent-first recruitment',
      copy: 'Invite only opt-in Bangalore students, early-career operators, and developers. Explain the purpose, withdrawal path, and that participation is not a public endorsement.',
    },
    {
      phase: 'Days 3–5 · segmented examples',
      copy: 'Prepare small, consent-cleared one-breath workflow examples for each audience segment instead of assuming one use case fits everyone.',
    },
    {
      phase: 'Days 6–9 · moderated observation',
      copy: 'Observe first-use friction with permission, ask what job the workflow actually served, and keep any notes non-identifying.',
    },
    {
      phase: 'Day 10 · repeat-activation check',
      copy: 'Check the proposed north star and kill condition before extending the test. Do not turn a partial signal into a success claim.',
    },
    {
      phase: 'Days 11–14 · redacted synthesis',
      copy: 'Synthesize recurring jobs to be done and next decisions without publishing voice, screenshots, quotes, or identifiable material.',
    },
  ],
}

export const fieldKit = {
  title: 'My $3,000 One-Breath Field Kit',
  answer:
    'If I received the $3,000 grant, I would use it to learn at human scale before mistaking a polished idea for a habit. I would compensate participants fairly, remove access barriers, and keep consent and redaction ahead of any public learning.',
  total: '$3,000',
  budget: [
    { item: 'Participant honoraria', amount: '$1,200' },
    { item: 'Local travel and accessibility', amount: '$450' },
    { item: 'Consent, transcription, and translation', amount: '$500' },
    { item: 'Prototype materials and testing', amount: '$450' },
    { item: 'Accessibility and contingency', amount: '$250' },
    { item: 'Public learning summary', amount: '$150' },
  ],
}

export const publicationChecklist = [
  'Collect affirmative consent before recording, observing, or publishing any participant voice, image, quote, screen, or identifiable detail.',
  'Keep transcripts, redaction, and accessibility review ahead of any public learning summary.',
  'Keep public contact to the channels Shyam chooses — GitHub, Devpost, and LinkedIn are listed; no phone number or email is published here.',
  'Treat the experiment and field kit as proposed until they are actually run and reviewed. Do not infer analytics or growth results from this plan.',
]

export const publishingChecklist = [
  'Write and approve the reflections in Shyam’s own words. The interface cannot supply personal testimony.',
  'Confirm that every photo, screenshot, voice, quote, and identifiable detail is consent-cleared or redacted for public release.',
  'Add only authentic Shyam recordings, then verify captions and transcripts against the final media.',
  'Choose public contact methods explicitly. GitHub, Devpost, and LinkedIn are listed; no phone number is published by default.',
  'Review every source, link, claim status, and availability note immediately before release.',
  'Manually publish through Emergent, create the explanatory video, and complete the challenge submission using Shyam’s own account and judgment.',
]

export const footerContent = {
  contactTitle: 'Stay with the public trail',
  contactCopy: 'GitHub, Devpost, and LinkedIn are the public contact methods in this build.',
  attribution:
    'Built from an MIT-licensed starter. The Signal Run uses original CSS and inline SVG composition, not the starter’s personal visual assets or copy.',
}
