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
  eyebrow: 'A flight log · six worlds · ten failures',
  opening: 'I build things that have to be right after the demo.',
  scrollLine: 'Six worlds are orbiting ahead. Fly the ship, shoot down the failures I actually shipped, land on each world and read the evidence.',
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
      'MCA Sem 1 SGPA 9.60 · Sem 2 SGPA 10.00 · CGPA 9.80',
      'IISc Pravega ML Challenge — National Rank 2',
      'Oracle certified: GenAI Professional · DevOps',
    ],
    bet: 'Stay in the classroom even while shipping — theory compounds.',
    uncomfortable:
      'The curve was not always up. A 7.05 in the BCA is part of this record on purpose: the jump to 9.60 and then 9.80 came from learning how to learn, not from talent appearing overnight.',
    evidence:
      'Class X in 2019 (88%), Class XII science in 2021 (85%), BCA from Gauhati University in 2024 (7.05 CGPA). Now in the MCA at the IIT Patna & IIIT Ranchi joint program (Jul 2025 – Oct 2027): semester 1 at 9.60 SGPA and semester 2 at a perfect 10.00, for a cumulative 9.80 CGPA (the transcripts are in Archivum). Oracle certifications in Generative AI, AI Foundations, and DevOps. National Rank 2 at IISc Pravega Agile ML Challenge; Top 10 of 5,000+ at GitLab i-Hack, IIT Bombay; Microsoft Imagine Cup Regional Finalist.',
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
    award: 'Vipassana Research Institute · Volunteer Software Engineer → Technical Lead · since Oct 2024',
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
    award: 'Wordwatch (UK enterprise compliance SaaS) · Software Engineer (full-time contractor) · 2026 · .NET',
    stack: 'React/TypeScript SPA · C#/.NET services · Prometheus · Grafana · RabbitMQ',
    receipts: [
      '90+ PRs · 150+ commits · 4 repositories',
      'Owned features from API to UI',
      'Risk-flag detection on ingest + access control',
      'Fixed a production 500 with regression tests',
      'Monitoring stack: Prometheus, Grafana, ES',
      'Share Saved Search end to end: API, copy logic, audit trail',
      'Per-type export rules and a reworked CSV export',
      'Front-end fixes: zoom alignment, loading flicker, dialog keyboard accessibility',
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
      'Vayu: found and fixed a silent stale-model failure · 400+ backend and 1,600+ frontend tests',
      'ColdFlow: GCP Cloud Run with a CI release gate (SBOM, digest-pinned image, Playwright)',
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
    id: 'vault',
    planet: 'Archivum',
    kicker: 'World 06 · The proof vault',
    title: 'The receipts planet',
    env: 'cloud',
    position: [-220, 56, -80],
    radius: 23,
    body: '#e3d3ae',
    band: '#f1e6c8',
    label: 'Archivum — transcripts, certificates and the paper',
    status: sourceLabels.verified,
    statusTone: 'evaluation',
    award: 'Every claim on the other five worlds, with a document to check it against',
    stack: 'MCA transcripts · BCA grade sheet · employment certificate · IEEE COMPSAC 2026',
    receipts: [
      'MCA Sem 1 SGPA 9.60 (transcript dated 22 Jan 2026)',
      'MCA Sem 2 SGPA 10.00 · CGPA 9.80 (transcript dated 7 Aug 2026)',
      'BCA Gauhati University consolidated grade sheet: CGPA 7.05',
      'Wordwatch certificate of employment (issued 24 Jul 2026)',
      'IEEE COMPSAC 2026 accepted paper: Nexus Prime',
    ],
    bet: 'Put the receipts next to the claims, so nobody has to take my word for it.',
    uncomfortable:
      'The documents are not all flattering. The BCA grade sheet shows a 7.05 and a few weak semesters, and it sits in the vault next to the 10.00. A record with the dip removed is not a record.',
    evidence:
      'The MCA transcripts (IIT Patna and IIIT Ranchi joint program) show Semester 1 at 9.60 and Semester 2 at 10.00, for a cumulative 9.80. The Gauhati University consolidated grade sheet shows the BCA at 7.05 CGPA. The Wordwatch certificate of employment confirms the role. The accepted IEEE COMPSAC 2026 paper describes Nexus Prime and its safety validator. Open the files below and check every number against the world that quotes it.',
    lesson: 'Say the claim, then show the document.',
    voiceKey: 'vault',
    links: [publicLinks.github, publicLinks.linkedin],
  },
]

export const proofDocs = [
  {
    id: 'transcripts',
    title: 'MCA transcripts',
    org: 'IIT Patna × IIIT Ranchi',
    summary: 'Semester 1 SGPA 9.60 · Semester 2 SGPA 10.00 · CGPA 9.80',
    href: '/proofs/merged-transcripts.pdf',
    world: 'scholaris',
  },
  {
    id: 'documents',
    title: 'Certificates and grade sheets',
    org: 'Gauhati University · Wordwatch',
    summary: 'BCA consolidated grade sheet (CGPA 7.05), MCA Semester 2 transcript, Wordwatch certificate of employment',
    href: '/proofs/merged-documents.pdf',
    world: 'wordwatch',
  },
]

export const footerContent = {
  contactTitle: 'Stay with the public trail',
  contactCopy: 'GitHub, Devpost, and LinkedIn are the public contact methods in this build.',
  attribution:
    'Built from an MIT-licensed starter. The Signal Run uses original CSS and inline SVG composition, not the starter’s personal visual assets or copy.',
}
