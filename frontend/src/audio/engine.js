import { getState, setState } from '../space/store.js'

let ctx, master, music, sfx, verb, scene, engine
const scenes = {
  space: { root: 55, scale: [0, 3, 7, 10, 12, 15], pad: 'sawtooth', cutoff: 520, arp: 'sine', every: 2.6, oct: 3, decay: 3.5 },
  scholaris: { root: 65.4, scale: [0, 2, 4, 7, 9, 12], pad: 'triangle', cutoff: 1100, arp: 'triangle', every: 0.9, oct: 3, decay: 1.4, noise: 'wind', ng: 0.05 },
  stillwater: { root: 73.4, scale: [0, 2, 5, 7, 9, 12], pad: 'sine', cutoff: 900, arp: 'sine', every: 1.8, oct: 3, decay: 4, noise: 'water', ng: 0.08 },
  wordwatch: { root: 49, scale: [0, 3, 5, 7, 10, 12], pad: 'square', cutoff: 420, arp: 'square', every: 0.5, oct: 3, decay: 0.25, pulse: true },
  foundry: { root: 41.2, scale: [0, 1, 5, 7, 8, 12], pad: 'sawtooth', cutoff: 300, arp: 'sawtooth', every: 3, oct: 2, decay: 3, noise: 'rumble', ng: 0.25 },
  meridian: { root: 82.4, scale: [0, 2, 4, 7, 11, 14], pad: 'sine', cutoff: 2000, arp: 'sine', every: 1.2, oct: 4, decay: 3, noise: 'wind', ng: 0.07 },
  vault: { root: 87.3, scale: [0, 2, 4, 7, 9, 11], pad: 'triangle', cutoff: 1400, arp: 'triangle', every: 1.4, oct: 3, decay: 2.2, noise: 'wind', ng: 0.04 },
}

function noiseBuffer(sec = 2) {
  const b = ctx.createBuffer(1, ctx.sampleRate * sec, ctx.sampleRate)
  const d = b.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  return b
}

function impulse() {
  const len = ctx.sampleRate * 3.2
  const b = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let c = 0; c < 2; c++) {
    const d = b.getChannelData(c)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6)
  }
  return b
}

export function initAudio() {
  if (ctx) { ctx.resume(); return }
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return
  ctx = new AC()
  master = ctx.createGain()
  master.gain.value = getState().muted ? 0 : 0.8
  master.connect(ctx.destination)
  verb = ctx.createConvolver()
  verb.buffer = impulse()
  const verbGain = ctx.createGain()
  verbGain.gain.value = 0.5
  verb.connect(verbGain).connect(master)
  music = ctx.createGain()
  music.gain.value = 0.45
  music.connect(master)
  music.connect(verb)
  sfx = ctx.createGain()
  sfx.gain.value = 0.6
  sfx.connect(master)
  startEngine()
  setScene('space')
}

export function setMuted(m) {
  setState({ muted: m })
  if (master) master.gain.setTargetAtTime(m ? 0 : 0.8, ctx.currentTime, 0.1)
}

export function duck(on) {
  if (music) music.gain.setTargetAtTime(on ? 0.1 : 0.45, ctx.currentTime, 0.4)
}

function makeNoise(kind, gain) {
  const src = ctx.createBufferSource()
  src.buffer = noiseBuffer(3)
  src.loop = true
  const f = ctx.createBiquadFilter()
  const g = ctx.createGain()
  g.gain.value = gain
  if (kind === 'rumble') { f.type = 'lowpass'; f.frequency.value = 120 }
  else if (kind === 'water') { f.type = 'bandpass'; f.frequency.value = 700; f.Q.value = 0.6 }
  else { f.type = 'bandpass'; f.frequency.value = 500; f.Q.value = 1.2 }
  const lfo = ctx.createOscillator()
  const lg = ctx.createGain()
  lfo.frequency.value = kind === 'water' ? 0.2 : 0.08
  lg.gain.value = kind === 'rumble' ? 40 : 300
  lfo.connect(lg).connect(f.frequency)
  src.connect(f).connect(g)
  lfo.start()
  src.start()
  return { out: g, stop: () => { src.stop(); lfo.stop() } }
}

function playScene(cfg) {
  const out = ctx.createGain()
  out.gain.value = 0
  out.connect(music)
  out.gain.setTargetAtTime(1, ctx.currentTime, 1.2)
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = cfg.cutoff
  const padGain = ctx.createGain()
  padGain.gain.value = 0.12
  filter.connect(padGain).connect(out)
  const oscs = [1, 1.5, 2, 1.003].map((m, i) => {
    const o = ctx.createOscillator()
    o.type = cfg.pad
    o.frequency.value = cfg.root * m
    o.detune.value = i * 4 - 6
    o.connect(filter)
    o.start()
    return o
  })
  const lfo = ctx.createOscillator()
  const lg = ctx.createGain()
  lfo.frequency.value = 0.05
  lg.gain.value = cfg.cutoff * 0.5
  lfo.connect(lg).connect(filter.frequency)
  lfo.start()
  oscs.push(lfo)
  const noise = cfg.noise ? makeNoise(cfg.noise, cfg.ng) : null
  if (noise) noise.out.connect(out)
  let step = 0
  const timer = setInterval(() => {
    step++
    if (cfg.every > 0.6 && Math.random() < 0.25) return
    const deg = cfg.scale[Math.floor(Math.random() * cfg.scale.length)]
    note(cfg.root * Math.pow(2, cfg.oct + deg / 12), cfg.arp, cfg.decay, out, cfg.pulse ? 0.05 : 0.07)
    if (cfg.pulse && step % 2 === 0) clank(out)
  }, cfg.every * 1000)
  return () => {
    clearInterval(timer)
    out.gain.setTargetAtTime(0, ctx.currentTime, 0.8)
    setTimeout(() => { oscs.forEach((o) => o.stop()); if (noise) noise.stop() }, 4000)
  }
}

function note(freq, type, decay, dest, level = 0.07) {
  const t = ctx.currentTime
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(level, t + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t + decay)
  o.connect(g).connect(dest)
  o.start(t)
  o.stop(t + decay + 0.1)
}

function clank(dest) {
  note(180, 'square', 0.12, dest, 0.03)
  note(271, 'square', 0.09, dest, 0.02)
}

export function setScene(name) {
  if (!ctx || scene?.name === name) return
  scene?.stop()
  scene = { name, stop: playScene(scenes[name] || scenes.space) }
}

function startEngine() {
  const src = ctx.createBufferSource()
  src.buffer = noiseBuffer(2)
  src.loop = true
  const f = ctx.createBiquadFilter()
  f.type = 'lowpass'
  f.frequency.value = 200
  const g = ctx.createGain()
  g.gain.value = 0
  src.connect(f).connect(g).connect(sfx)
  src.start()
  engine = { f, g }
}

export function setEngine(level) {
  if (!engine) return
  engine.g.gain.setTargetAtTime(level * 0.35, ctx.currentTime, 0.2)
  engine.f.frequency.setTargetAtTime(150 + level * 700, ctx.currentTime, 0.2)
}

function sweep(type, f0, f1, dur, level) {
  if (!ctx) return
  const t = ctx.currentTime
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = type
  o.frequency.setValueAtTime(f0, t)
  o.frequency.exponentialRampToValueAtTime(f1, t + dur)
  g.gain.setValueAtTime(level, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(sfx)
  o.start(t)
  o.stop(t + dur + 0.05)
}

function noiseHit(dur, cutoff, level, rise = false) {
  if (!ctx) return
  const t = ctx.currentTime
  const src = ctx.createBufferSource()
  src.buffer = noiseBuffer(Math.max(1, dur + 0.2))
  const f = ctx.createBiquadFilter()
  f.type = 'lowpass'
  const g = ctx.createGain()
  if (rise) {
    f.frequency.setValueAtTime(200, t)
    f.frequency.exponentialRampToValueAtTime(cutoff, t + dur * 0.8)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(level, t + dur * 0.7)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  } else {
    f.frequency.setValueAtTime(cutoff, t)
    f.frequency.exponentialRampToValueAtTime(80, t + dur)
    g.gain.setValueAtTime(level, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  }
  src.connect(f).connect(g)
  g.connect(sfx)
  g.connect(verb)
  src.start(t)
  src.stop(t + dur + 0.1)
}

export const sound = {
  laser: () => sweep('square', 1400, 180, 0.14, 0.05),
  hit: () => noiseHit(0.25, 1800, 0.25),
  boom: () => { noiseHit(1.4, 900, 0.7); sweep('sine', 120, 30, 1, 0.4) },
  whoosh: (d = 3) => noiseHit(d, 3000, 0.4, true),
  thud: () => { sweep('sine', 90, 35, 0.6, 0.5); noiseHit(0.6, 600, 0.3) },
  step: () => noiseHit(0.07, 900, 0.05),
  blip: () => sweep('triangle', 660, 520, 0.06, 0.04),
  pickup: () => { if (!ctx) return; [0, 4, 7, 12].forEach((d, i) => setTimeout(() => note(523 * Math.pow(2, d / 12), 'triangle', 0.8, sfx, 0.08), i * 70)) },
  chime: () => { if (!ctx) return; [0, 4, 7, 11, 14, 19].forEach((d, i) => setTimeout(() => note(392 * Math.pow(2, d / 12), 'sine', 2.2, sfx, 0.09), i * 120)) },
  talk: () => { if (!ctx) return; note(300 + Math.random() * 300, 'sine', 0.5, sfx, 0.05) },
}

let narration
export function playNarration(id) {
  narration?.pause()
  narration = new Audio(`/media/narration-${id}.mp3`)
  narration.onended = () => { duck(false); setState({ narrating: null }) }
  narration.play().then(() => { duck(true); setState({ narrating: id }) }).catch(() => setState({ narrating: null }))
}

export function stopNarration() {
  narration?.pause()
  duck(false)
  setState({ narrating: null })
}
