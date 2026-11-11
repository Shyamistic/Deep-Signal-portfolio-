const hash = (x, y, z) => {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453
  return s - Math.floor(s)
}
const smooth = (t) => t * t * (3 - 2 * t)
const lerp = (a, b, t) => a + (b - a) * t

export function noise3(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const xf = smooth(x - xi), yf = smooth(y - yi), zf = smooth(z - zi)
  const c = (dx, dy, dz) => hash(xi + dx, yi + dy, zi + dz)
  const x00 = lerp(c(0, 0, 0), c(1, 0, 0), xf)
  const x10 = lerp(c(0, 1, 0), c(1, 1, 0), xf)
  const x01 = lerp(c(0, 0, 1), c(1, 0, 1), xf)
  const x11 = lerp(c(0, 1, 1), c(1, 1, 1), xf)
  return lerp(lerp(x00, x10, yf), lerp(x01, x11, yf), zf)
}

export function fbm(x, y, z, octaves = 4) {
  let v = 0, a = 0.5, f = 1
  for (let i = 0; i < octaves; i++) {
    v += a * noise3(x * f, y * f, z * f)
    f *= 2.03
    a *= 0.5
  }
  return v / (1 - Math.pow(0.5, octaves))
}

export function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}
