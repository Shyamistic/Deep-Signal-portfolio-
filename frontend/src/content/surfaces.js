export const surfaces = {
  scholaris: {
    story: 'The Honest Curve',
    sky: { top: '#0b1f24', bottom: '#5f8a72', fog: '#36584c', density: 0.018, sun: '#ffe7bf', sunI: 2.2 },
    ground: [[0, '#1d3327'], [0.4, '#2f5236'], [0.6, '#557a45'], [0.8, '#8c9a5c'], [1, '#c9c08a']],
    liquid: { y: -1.2, color: '#1b3d44', emissive: '#0a1e22', intensity: 0.4 },
    decor: 'trees',
    landing: { style: 'spiral', fx: 'dust', color: '#c9c08a' },
    npc: {
      name: 'Professor Quill', type: 'owl', color: '#8a6a4a', accent: '#f0c060', pos: [-6, -8],
      intro: [
        'Hoo! A pilot, at last. I am Quill, keeper of the Scholaris archive.',
        'A storm scattered Shyam’s records across the meadow. Four stones, each one a chapter.',
        'Find them and bring the story back to me. Mind the paper-moths — they gossip.',
      ],
      hint: 'Still {left} stone(s) out there. The glowing pedestals, pilot — follow the light.',
      finale: [
        'All four! Now read them in order: 88, 85, 7.05… then 9.60, 9.80.',
        'Most archives hide the dip. This one keeps it, because the climb only means something with it.',
        'He learned how to learn. That is the whole thesis of this planet. Go — the other worlds are waiting.',
      ],
    },
    relics: [
      { id: 'x', name: 'Stone of 2019', pos: [16, -10], lines: ['Class X · 2019 · 88%.', 'The first stone. Where the habit of finishing things started.'] },
      { id: 'xii', name: 'Stone of 2021', pos: [20, 12], lines: ['Class XII · Science · 2021 · 85%.', 'Science stream, finished in the pandemic years of 2021.'] },
      { id: 'bca', name: 'Scroll of Gauhati', pos: [-18, 14], lines: ['BCA · Gauhati University · 2024 · 7.05 CGPA.', 'The honest dip. Most of the learning here happened outside the syllabus — hackathons and broken side-projects.'] },
      { id: 'mca', name: 'Tablets of Patna', pos: [-4, 24], lines: ['MCA · IIT Patna × IIIT Ranchi · 2025–2027.', 'Semester 1: 9.60. Semester 2: 9.80.', 'Plus Oracle certifications in Generative AI, AI Foundations and DevOps.'] },
    ],
    fauna: [
      { name: 'Paper-moth', type: 'flyer', color: '#f3e6c8', count: 7, lines: ['*flutters* We are made of old exam sheets. We remember every red mark.', '*whispers* He re-did the hard problems until they were boring. That’s the secret.'] },
      { name: 'Notebunny', type: 'hopper', color: '#c9b79a', count: 5, lines: ['*thump thump* Rank 2 at IISc Pravega! I was there. Well, I heard about it.', '*nibbles a margin note* Top 10 of 5,000 at GitLab i-Hack, IIT Bombay.'] },
    ],
    talkers: [
      { name: 'Lantern Oak', color: '#f0c060', pos: [8, 18], line: 'I grow one ring for every semester. The newest ring is the brightest.' },
      { name: 'Ink Fern', color: '#7fd8a0', pos: [-20, -6], line: 'Shhh. I’m reading his Imagine Cup notes. Regional finalist, you know.' },
    ],
  },
  stillwater: {
    story: 'A Hundred Lanterns',
    sky: { top: '#071a22', bottom: '#2f6f78', fog: '#1d4a52', density: 0.02, sun: '#ffd9a8', sunI: 1.8 },
    ground: [[0, '#13323a'], [0.42, '#c9b98c'], [0.55, '#8f9f72'], [0.75, '#5a7f5f'], [1, '#93ab86']],
    liquid: { y: -0.2, color: '#1f6070', emissive: '#08303a', intensity: 0.6 },
    decor: 'reeds',
    landing: { style: 'glide', fx: 'splash', color: '#9fe0ea' },
    npc: {
      name: 'Keeper Anicca', type: 'keeper', color: '#c58a4a', accent: '#ffcf7a', pos: [-7, -6],
      intro: [
        'Be welcome, traveller. I keep the lanterns of Stillwater.',
        'Each lantern is a meditation centre — more than one hundred of them, all over the world.',
        'Five of the shrines that keep them lit have gone dark. Would you visit them and rekindle each one?',
      ],
      hint: '{left} shrine(s) still dark. Walk slowly. Nothing here is in a hurry.',
      finale: [
        'All five shrines are lit again. Can you feel the difference?',
        'Shyam gave a year and a half to this work, unpaid, and became its technical lead.',
        'Useful technology has to keep working after the demo ends. Here, it has to keep working for decades.',
      ],
    },
    relics: [
      { id: 'inventory', name: 'Shrine of Books', pos: [15, -12], lines: ['The VRI book inventory system: TypeScript, React, Supabase.', 'It keeps materials moving for 100+ meditation centres worldwide. Shyam leads it.'] },
      { id: 'search', name: 'Shrine of Three Wells', pos: [21, 8], lines: ['A three-tier semantic search: stored answers, then content, then metadata.', 'Each tier has its own confidence threshold — so the system can honestly say “not sure”.'] },
      { id: 'ocr', name: 'Shrine of Six Eyes', pos: [-19, 12], lines: ['A six-engine OCR platform for English and Hindi texts.', 'Old scripts, old paper. Six engines because one is never enough.'] },
      { id: 'pala', name: 'Shrine of Pala', pos: [2, 24], lines: ['Pala: a semantic-search RAG platform with MCP-based storage and role-based access.'] },
      { id: 'audio', name: 'Shrine of Echoes', pos: [-22, -14], lines: ['Audio fingerprinting with CLAP embeddings and Milvus.', 'So a single chant can be found among thousands of hours of recordings.'] },
    ],
    fauna: [
      { name: 'Glowfin', type: 'swimmer', color: '#7fe6ff', count: 6, lines: ['*bloop* We swim between the islands carrying book requests. Very fast. Very calm.'] },
      { name: 'Lotus Heron', type: 'hopper', color: '#e8e2d4', count: 4, lines: ['*stands on one leg* Patience is a feature. So are confidence thresholds.', '*tilts head* He wrote the search so it would rather say “not sure” than lie.'] },
    ],
    talkers: [
      { name: 'Silent Lotus', color: '#ffb0c8', pos: [10, 16], line: '…  (the lotus says nothing, beautifully. It is in a ten-day course.)' },
      { name: 'Reed Choir', color: '#c9e0a0', pos: [-12, 20], line: 'We hum in Hindi and English. The OCR engines learned from our songs.' },
    ],
  },
  wordwatch: {
    story: 'The Audit Trail',
    sky: { top: '#140f0a', bottom: '#7a5530', fog: '#4a3420', density: 0.02, sun: '#ffc070', sunI: 2 },
    ground: [[0, '#2a2420'], [0.4, '#4a4036'], [0.6, '#6e5a42'], [0.8, '#9a7e56'], [1, '#c8aa78']],
    decor: 'pylons',
    landing: { style: 'beam', fx: 'sparks', color: '#ffb347' },
    npc: {
      name: 'Auditor Brass', type: 'robot', color: '#b08a4a', accent: '#ffb347', pos: [-6, -7],
      intro: [
        'BEEP. Identity confirmed. Welcome to Crownfall, where every change leaves a receipt.',
        'I am Auditor Brass. My ledger shows four unverified systems from Shyam’s six months here.',
        'Inspect each terminal. I will log your findings. Compliance is mandatory. Snacks are optional.',
      ],
      hint: '{left} terminal(s) unverified. Please proceed. Your movements are being lovingly audited.',
      finale: [
        'Audit complete. Ninety-plus pull requests. One hundred fifty-plus commits. Four repositories. Zero shortcuts.',
        'Senior Software Engineer, six months, C# and .NET services behind a React and TypeScript front end.',
        'Conclusion: in regulated systems, the audit trail IS the product. BEEP. You may go.',
      ],
    },
    relics: [
      { id: 'prs', name: 'Merge Terminal', pos: [16, -9], lines: ['90+ PRs and 150+ commits across 4 repositories in a Jira-tracked agile team.', 'Features owned end to end, API to UI.'] },
      { id: 'risk', name: 'RiskFlag Console', pos: [20, 13], lines: ['Automatic risk-flag detection on transcription, IM and SMS ingest.', 'Plus enterprise access control: RiskFlag and RiskFlagEdit permissions.'] },
      { id: 'share', name: 'Share Kiosk', pos: [-18, 12], lines: ['Share Saved Search, delivered end to end.', 'Then a production 500 appeared in the share flow. Fixed — and covered with regression tests so it stays fixed.'] },
      { id: 'monitor', name: 'Watchtower', pos: [-16, -16], lines: ['The monitoring stack: Prometheus, Grafana, Alertmanager, Elasticsearch, RabbitMQ.', 'If it breaks at 3 a.m., something should notice before a customer does.'] },
    ],
    fauna: [
      { name: 'Ledger Beetle', type: 'hopper', color: '#d0a050', count: 6, lines: ['*click click* I log every step you take. Nothing personal. It’s compliance.'] },
      { name: 'Sparrowbot', type: 'flyer', color: '#c8c0b0', count: 6, lines: ['*chirp.exe* Did you know a .NET service can be lovely? It can! With tests!', '*whirr* Alertmanager woke me up at 3 a.m. once. It was right.'] },
    ],
    talkers: [
      { name: 'Copper Fern', color: '#e0a060', pos: [8, 20], line: 'I photosynthesize audit logs. Grows best under fluorescent review.' },
      { name: 'Cable Vine', color: '#ff8a40', pos: [-24, 0], line: 'I connect the SPA to the services. Please don’t trip on me.' },
    ],
  },
  foundry: {
    story: 'The Forge Trials',
    sky: { top: '#120604', bottom: '#6a2410', fog: '#3a140a', density: 0.022, sun: '#ff9a50', sunI: 1.6 },
    ground: [[0, '#140c0a'], [0.4, '#2a1814'], [0.6, '#3c2620'], [0.8, '#5a3a30'], [1, '#7a5a48']],
    liquid: { y: -0.9, color: '#ff5a1f', emissive: '#ff4a10', intensity: 2.4, glow: true },
    decor: 'spikes',
    landing: { style: 'dive', fx: 'embers', color: '#ff7a3c', shake: true },
    npc: {
      name: 'Smith Ember', type: 'golem', color: '#3a2a24', accent: '#ff6a2a', pos: [-7, -6],
      intro: [
        'RRRMMM. A visitor. I am Ember. I forge, I break, I forge again.',
        'Shyam left four great machines in my anvils. Each was impressive first… and wrong second.',
        'Test them all. Find where each one was wrong. That is how a forge says thank you.',
      ],
      hint: '{left} machine(s) still untested. Heat reveals the crack.',
      finale: [
        'You tested them all. Nexus, AURA, A.S.T.R.A., Vayu.',
        'And the rack by the door? Finsa AI, Fablecraft, Nova Architect, S.A.R.T.H.I., Pitwall-AI, CineGraph, Sewa, Maatri-Guard, Insur-AI, Aegis-Auth, KARMA… he does not stop.',
        'The first version is always impressive. It is also always wrong somewhere. Find where — that is the craft.',
      ],
    },
    relics: [
      { id: 'nexus', name: 'Anvil of Nexus', pos: [16, -10], lines: ['Nexus Prime — agentic incident response.', '150 incidents: 90% top-1 accuracy. Hallucinations 8.0% → 1.2% with a safety validator.', 'Median diagnosis 48.3 minutes → 6.1 seconds. Accepted at IEEE COMPSAC 2026.'] },
      { id: 'aura', name: 'Furnace of AURA', pos: [20, 12], lines: ['A.U.R.A. — sandbox-first remediation.', 'Winner, AWS Global Vibe Hackathon 2025. $10,000 Arcanum.AI support to take it to production.'] },
      { id: 'astra', name: 'Vault of A.S.T.R.A.', pos: [-18, 13], lines: ['A.S.T.R.A. — Automated Sandboxed Threat Reproduction & Analysis.', 'Offline repair for air-gapped networks. Verified on cJSON and zlib CVEs; benchmarked on 104 fix pairs.', 'Because no model should approve its own patch.'] },
      { id: 'vayu', name: 'Weather Forge', pos: [-14, -18], lines: ['Vayu — ISRO Bharatiya Antariksh Hackathon, National Top 9.', 'A 6.56M-parameter forecaster on 45 years of climate data. Beat the tuned baseline in 3 of 4 regions.', 'Its failure: a plausible forecast from a stale model. Now freshness is checked first. 400+ backend, 1,600+ frontend tests.'] },
    ],
    fauna: [
      { name: 'Ember Salamander', type: 'hopper', color: '#ff6a2a', count: 6, lines: ['*hiss* I sleep in the AURA furnace. It runs in a sandbox, so I’m safe.', '*crackle* Hot take: test the failure path first.'] },
      { name: 'Ash Crow', type: 'flyer', color: '#2a2220', count: 5, lines: ['*caw* Army Terrier Cyber Quest! I saw the whole thing from above.', '*caw caw* Finsa AI had 17 property-based tests. I counted.'] },
    ],
    talkers: [
      { name: 'Fireblossom', color: '#ffb040', pos: [6, 20], line: 'I bloom only after something breaks. I bloom a lot here.' },
      { name: 'Obsidian Thorn', color: '#ff4a20', pos: [-24, -2], line: 'Sharp, black, honest. Like a good post-mortem.' },
    ],
  },
  meridian: {
    story: 'Say the Baseline',
    sky: { top: '#06101c', bottom: '#5a7a96', fog: '#8aa4b8', density: 0.02, sun: '#e8f4ff', sunI: 2.2 },
    ground: [[0, '#4a6a82'], [0.4, '#8aa8bc'], [0.6, '#c4d6e2'], [0.8, '#e6eef4'], [1, '#ffffff']],
    liquid: { y: -1.1, color: '#2b5c7a', emissive: '#0d2c40', intensity: 0.5 },
    decor: 'crystals',
    landing: { style: 'retro', fx: 'snow', color: '#ffffff' },
    npc: {
      name: 'Astronomer Vela', type: 'penguin', color: '#1c2430', accent: '#7fd8ff', pos: [-6, -7],
      intro: [
        'Oh! A visitor in the cold. I am Vela. I measure things. Mostly stars. Sometimes claims.',
        'Four instruments in this observatory hold Shyam’s research and rankings.',
        'Read each one — but remember the rule of Meridian: say the baseline out loud before you say the accuracy.',
      ],
      hint: '{left} instrument(s) unread. The cold keeps the numbers honest.',
      finale: [
        'Paper accepted. Ranks measured against eighteen thousand teams. Benchmarks published.',
        'None of it means anything without the comparison beside it. He knows that. That’s why I like him.',
        'Measure it, or it didn’t happen. Safe flying, pilot.',
      ],
    },
    relics: [
      { id: 'paper', name: 'Great Telescope', pos: [16, -10], lines: ['IEEE COMPSAC 2026 — accepted paper, written as an independent researcher in applied AI.', 'Agentic incident response with a safety validator in the loop.'] },
      { id: 'imc', name: 'Star Chart of Prosperity', pos: [20, 12], lines: ['IMC Prosperity 4 — 18,800+ teams worldwide.', 'World #18 in round 4. World #32 in round 5. World #332 in the final standings.', 'Algorithmic trading under real market microstructure — plus other trading and government projects.'] },
      { id: 'kaggle', name: 'Kaggle Archive', pos: [-18, 12], lines: ['Kaggle: shyam31415.', '7 datasets, 14 notebooks, 11 benchmarks, 1 writeup.'] },
      { id: 'hackathons', name: 'Constellation of Nine', pos: [-14, -18], lines: ['9+ hackathon wins and podiums.', 'AWS Global Vibe (winner) · IISc Pravega ML (National Rank 2) · IIT Bombay GitLab i-Hack (Top 10 of 5,000+) · ISRO BAH (Top 9) · a pitch round in Mumbai · Imagine Cup regional finalist · global AI finalist from India.'] },
    ],
    fauna: [
      { name: 'Frost Fox', type: 'hopper', color: '#f4f8ff', count: 5, lines: ['*yip* I ran a Kaggle notebook once. Baseline first, then the fancy model.', '*sniff* Rank 18 in round 4? Respectable. Very respectable.'] },
      { name: 'Aurora Ray', type: 'floater', color: '#7fffd0', count: 3, lines: ['*hums in green light* We drift where the uncertainty is lowest.'] },
    ],
    talkers: [
      { name: 'Frost Crystal', color: '#bfefff', pos: [6, 20], line: 'I grow along the error bars. Lovely, narrow error bars.' },
      { name: 'Aurora Grass', color: '#80ffc0', pos: [-24, 0], line: 'We sway in MC-dropout patterns. It’s how we stay humble.' },
    ],
  },
  breath: {
    story: 'One Breath, One Message',
    sky: { top: '#2a2014', bottom: '#f0c890', fog: '#e8c898', density: 0.016, sun: '#fff2d8', sunI: 2.4 },
    ground: [[0, '#c8b090'], [0.4, '#e6d4b4'], [0.6, '#f4e8d0'], [0.8, '#fff6e6'], [1, '#ffffff']],
    decor: 'puffs',
    landing: { style: 'drop', fx: 'clouds', color: '#fff4dd' },
    npc: {
      name: 'Breath', type: 'sprite', color: '#fff6e0', accent: '#f0a04b', pos: [-6, -6],
      intro: [
        'Hello, hello! I’m Breath. I live in the space between thinking and saying.',
        'This world isn’t finished — it’s a question. If Shyam joined Wispr Flow, this is the first test he’d run.',
        'Four things hold the test together. Find them, and tell me if it’s honest enough to run.',
      ],
      hint: '{left} piece(s) of the test still floating around. Follow the wind chimes.',
      finale: [
        'Fourteen days. Bangalore. People who choose to opt in.',
        'If a first voice workflow fits in one breath and does a real job, they’ll come back without being asked. If fewer than 20% do by day ten, stop.',
        'Speaking is the fastest way to think. The question is whether it becomes a habit. That’s the test.',
      ],
    },
    relics: [
      { id: 'hypothesis', name: 'Bell of the Hypothesis', pos: [16, -10], lines: ['If a first voice workflow can be completed in one breath and connects to a real job to be done, participants may return without prompting.'] },
      { id: 'northstar', name: 'North-Star Kite', pos: [20, 12], lines: ['North star: repeat activation — a second one-breath workflow within seven days, unprompted.'] },
      { id: 'kill', name: 'Kill-Condition Stone', pos: [-18, 12], lines: ['Kill condition: below 20% repeat activation by day 10, or no consistent job to be done → stop or redesign.', 'A test you can’t fail isn’t a test.'] },
      { id: 'kit', name: 'Field-Kit Chest', pos: [-14, -18], lines: ['The $3,000 One-Breath Field Kit:', 'Participant honoraria $1,200 · Travel & accessibility $450 · Consent, transcription & translation $500 · Prototype & testing $450 · Contingency $250 · Public summary $150.'] },
    ],
    fauna: [
      { name: 'Sky Whale', type: 'floater', color: '#f4e6cc', count: 3, lines: ['*a long, low song* Say it once. Say it well. Then let it go.'] },
      { name: 'Kite Finch', type: 'flyer', color: '#f0a04b', count: 7, lines: ['*tweet* Speaking is faster than typing. That’s the whole bet!', '*tweet tweet* Consent first. Always consent first.'] },
    ],
    talkers: [
      { name: 'Wind Chime', color: '#ffd9a0', pos: [6, 20], line: '*ting* One breath, one message. *ting*' },
      { name: 'Cloud Puff', color: '#ffffff', pos: [-24, 0], line: 'I used to be a long paragraph. Then someone dictated me in one breath.' },
    ],
  },
}
