'use client'

import { useEffect, useState } from 'react'

export default function Cursor() {
  const [pos, setPos]       = useState({ x: -200, y: -200 })
  const [trail, setTrail]   = useState<{ x: number; y: number; id: number }[]>([])
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  let uid = 0

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setVisible(true)
      setPos({ x: e.clientX, y: e.clientY })
      setTrail(t => [...t.slice(-7), { x: e.clientX, y: e.clientY, id: uid++ }])
      const el = e.target as HTMLElement
      setHovered(!!el.closest('a, button, [data-hover]'))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', () => setVisible(false))
    document.addEventListener('mouseenter', () => setVisible(true))
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (!visible) return null

  return (
    <>
      {trail.map((t, i) => (
        <div key={t.id} style={{
          position: 'fixed', left: t.x, top: t.y, pointerEvents: 'none', zIndex: 9997,
          width: 4, height: 4, borderRadius: '50%',
          background: '#C084FC',
          transform: 'translate(-50%,-50%)',
          opacity: (i / trail.length) * 0.5,
        }}/>
      ))}
      <div style={{
        position: 'fixed', left: pos.x, top: pos.y, pointerEvents: 'none', zIndex: 9999,
        width: hovered ? 40 : 16, height: hovered ? 40 : 16,
        borderRadius: '50%',
        border: '1.5px solid #C084FC',
        background: hovered ? 'rgba(192,132,252,0.1)' : 'transparent',
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.2s cubic-bezier(.22,1,.36,1), height 0.2s cubic-bezier(.22,1,.36,1)',
        mixBlendMode: 'screen',
      }}/>
    </>
  )
}
