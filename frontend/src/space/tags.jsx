import { useEffect, useId, useRef, useSyncExternalStore } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const items = new Map()
const subs = new Set()
const els = new Map()
let version = 0
const emit = () => { version++; subs.forEach((s) => s()) }
const subscribe = (s) => { subs.add(s); return () => subs.delete(s) }

export function Tag({ position = [0, 0, 0], className = '', children }) {
  const obj = useRef()
  const key = useId()
  useEffect(() => {
    items.set(key, { obj: obj.current, className, children })
    emit()
  }, [key, className, children])
  useEffect(() => () => { items.delete(key); els.delete(key); emit() }, [key])
  return <object3D ref={obj} position={position} />
}

const v = new THREE.Vector3()
const shown = (o) => { for (let p = o; p; p = p.parent) if (!p.visible) return false; return true }

export function TagProjector() {
  useFrame(({ camera, size }) => {
    items.forEach((it, key) => {
      const el = els.get(key)
      if (!el) return
      it.obj.getWorldPosition(v)
      const dist = v.distanceTo(camera.position)
      v.project(camera)
      const on = v.z < 1 && Math.abs(v.x) < 1.15 && Math.abs(v.y) < 1.15 && shown(it.obj) && dist < 900
      el.style.display = on ? '' : 'none'
      if (on) el.style.transform = `translate3d(${((v.x + 1) / 2) * size.width}px, ${((1 - v.y) / 2) * size.height}px, 0) translate(-50%, -50%)`
    })
  })
  return null
}

export function TagLayer() {
  useSyncExternalStore(subscribe, () => version)
  return (
    <div className="tag-layer" aria-hidden="true">
      {[...items.entries()].map(([key, it]) => (
        <div key={key} className="tag-wrap" style={{ display: 'none' }} ref={(el) => (el ? els.set(key, el) : els.delete(key))}>
          <div className={it.className}>{it.children}</div>
        </div>
      ))}
    </div>
  )
}
