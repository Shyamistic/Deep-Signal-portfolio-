export const envs = {
  meadow: {
    amp: 0.09, freq: 1.6, sea: 0.42,
    stops: [[0, '#1b2b2a'], [0.42, '#2b4436'], [0.55, '#4f6b43'], [0.7, '#7d8b56'], [1, '#c8c7a0']],
    core: { color: '#16343d', emissive: '#0a1c22', intensity: 0.4, metal: true },
    atmo: '#9fd4b0', props: 'trees', spin: 0.02,
  },
  islands: {
    amp: 0.1, freq: 2.1, sea: 0.56,
    stops: [[0, '#0e2730'], [0.56, '#1c4a52'], [0.6, '#c8b88a'], [0.7, '#5d7f63'], [1, '#93ab86']],
    core: { color: '#1d5866', emissive: '#082730', intensity: 0.5, metal: true },
    atmo: '#7fd0dc', props: 'lanterns', spin: 0.025,
  },
  industrial: {
    amp: 0.05, freq: 3.2, sea: 0,
    stops: [[0, '#2a2622'], [0.45, '#4b4238'], [0.6, '#7a6448'], [0.8, '#a88a5c'], [1, '#d5bb84']],
    atmo: '#f0b860', props: 'towers', spin: 0.018, ring: { inner: 1.45, outer: 2.05, color: '#c9a46a' },
  },
  volcanic: {
    amp: 0.12, freq: 1.9, sea: 0.45,
    stops: [[0, '#120c0a'], [0.45, '#2a1712'], [0.55, '#3a2320'], [0.75, '#5a3a30'], [1, '#8a6a58']],
    core: { color: '#ff5a1f', emissive: '#ff4a10', intensity: 2.6 },
    atmo: '#ff7a3c', props: 'spikes', spin: 0.015,
  },
  glacial: {
    amp: 0.08, freq: 2.4, sea: 0.4,
    stops: [[0, '#3c5a70'], [0.4, '#6f8ea4'], [0.55, '#b4c9d6'], [0.75, '#e2ecf2'], [1, '#ffffff']],
    core: { color: '#2b5c7a', emissive: '#0d2c40', intensity: 0.6, metal: true },
    atmo: '#bfe6ff', props: 'crystals', spin: 0.02,
  },
  cloud: {
    amp: 0.006, freq: 1.2, sea: 0, bands: true,
    stops: [[0, '#6b4e33'], [0.3, '#a57d52'], [0.5, '#d9bd8c'], [0.7, '#efe0bd'], [1, '#fff6e0']],
    atmo: '#ffd9a0', props: 'clouds', spin: 0.03, ring: { inner: 1.35, outer: 1.75, color: '#e9d3a4' },
  },
}
