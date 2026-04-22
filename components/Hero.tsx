'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import OwlSVG from './OwlSVG'

interface Props { scrollProgress: number }

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero({ scrollProgress }: Props) {
  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}/>

      {/* Fog blobs */}
      <div className="fog" style={{ width: 600, height: 600, background: 'rgba(192,132,252,0.12)', top: '-10%', right: '10%' }}/>
      <div className="fog" style={{ width: 400, height: 400, background: 'rgba(124,58,237,0.1)', bottom: '0%', left: '-5%' }}/>

      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 48px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
        alignItems: 'center',
        paddingTop: 120,
        paddingBottom: 80,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Left — text */}
        <div>
          {/* Eyebrow */}
          <motion.div {...FADE_UP(0.1)} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <span className="dot-live"/>
            <span className="t-label">Agência de marketing de alta performance</span>
          </motion.div>

          {/* Headline — Cormorant Garamond editorial */}
          <motion.h1 {...FADE_UP(0.25)} style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 300,
            fontSize: 'clamp(52px, 6.5vw, 88px)',
            lineHeight: 0.93,
            letterSpacing: '-0.02em',
            color: '#F5F0FF',
            marginBottom: 28,
          }}>
            Marcas que<br/>
            <em style={{ fontStyle: 'italic', color: '#C084FC' }}>dominam</em><br/>
            o futuro digital
          </motion.h1>

          {/* Subline */}
          <motion.p {...FADE_UP(0.4)} style={{
            fontFamily: 'var(--f-body)',
            fontWeight: 300,
            fontSize: 17,
            lineHeight: 1.7,
            color: 'var(--text-2)',
            maxWidth: 440,
            marginBottom: 44,
          }}>
            Dados, criatividade e tecnologia para transformar presença digital em resultado real. Sem vaidade — só métrica que importa.
          </motion.p>

          {/* CTAs */}
          <motion.div {...FADE_UP(0.55)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#cta" className="btn-primary">
              Iniciar projeto <ArrowRight size={14}/>
            </a>
            <a href="#results" className="btn-ghost">
              Ver cases
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div {...FADE_UP(0.7)} style={{
            marginTop: 56,
            paddingTop: 32,
            borderTop: '1px solid rgba(192,132,252,0.12)',
            display: 'flex',
            gap: 40,
          }}>
            {[
              { num: '120+', label: 'Clientes' },
              { num: '8.4x', label: 'ROI médio' },
              { num: '94%', label: 'Retenção' },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: 'var(--f-num)',
                  fontSize: 32,
                  color: '#F5F0FF',
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                }}>{s.num}</div>
                <div className="t-label" style={{ marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Owl SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <OwlSVG scrollProgress={scrollProgress} size={460} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          zIndex: 2,
        }}
      >
        <span className="t-label">scroll</span>
        <div style={{
          width: 20, height: 34, borderRadius: 10,
          border: '1px solid rgba(192,132,252,0.3)',
          display: 'flex', justifyContent: 'center', paddingTop: 6,
        }}>
          <div className="scroll-dot" style={{
            width: 3, height: 7, borderRadius: 2, background: '#C084FC',
          }}/>
        </div>
      </motion.div>
    </section>
  )
}
