'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useSpring } from 'framer-motion'

function Counter({ to, prefix = '', suffix = '', decimals = 0 }: {
  to: number; prefix?: string; suffix?: string; decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const spring = useSpring(0, { stiffness: 50, damping: 18 })
  const [val, setVal] = useState('0')

  useEffect(() => {
    if (inView) spring.set(to)
    return spring.on('change', v => setVal(v.toFixed(decimals)))
  }, [inView, spring, to, decimals])

  return (
    <span ref={ref} style={{
      fontFamily: 'var(--f-num)',
      fontSize: 'clamp(44px, 5vw, 64px)',
      color: '#F5F0FF',
      letterSpacing: '0.02em',
      lineHeight: 1,
    }}>
      {prefix}{val}{suffix}
    </span>
  )
}

const METRICS = [
  { label: 'Clientes ativos',   to: 120, suffix: '+' },
  { label: 'Taxa de retenção',  to: 94,  suffix: '%' },
  { label: 'Receita gerada',    to: 180, prefix: 'R$', suffix: 'M+' },
  { label: 'ROI médio',         to: 8.4, suffix: 'x', decimals: 1 },
]

export default function MetricsBar() {
  return (
    <section style={{
      borderTop: '1px solid rgba(192,132,252,0.1)',
      borderBottom: '1px solid rgba(192,132,252,0.1)',
      background: 'var(--bg2)',
      padding: '56px 48px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }}>
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              style={{
                textAlign: 'center',
                padding: '0 32px',
                borderRight: i < METRICS.length - 1 ? '1px solid rgba(192,132,252,0.1)' : 'none',
              }}
            >
              <Counter {...m} />
              <div className="t-label" style={{ marginTop: 10 }}>{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
