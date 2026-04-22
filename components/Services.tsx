'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Palette, BarChart3, FileText, Target, Workflow } from 'lucide-react'

const SERVICES = [
  { icon: Rocket,    title: 'Growth Marketing',    desc: 'Funis, experimentos e aquisição escalável. Construímos máquinas de crescimento previsíveis.', tags: ['Funis', 'A/B Test', 'Aquisição'] },
  { icon: Palette,   title: 'Branding & Identidade', desc: 'Posicionamento, visual e narrativa. Marcas memoráveis que atravessam décadas.', tags: ['Naming', 'Visual ID', 'Voz'] },
  { icon: BarChart3, title: 'Analytics & Dados',   desc: 'Dashboards, atribuição e BI. Decisões baseadas em evidência, não em achismo.', tags: ['GA4', 'Looker', 'Atribuição'] },
  { icon: FileText,  title: 'Conteúdo & SEO',      desc: 'Estratégia editorial e SEO técnico. Tráfego orgânico como ativo de longo prazo.', tags: ['SEO', 'Editorial', 'Links'] },
  { icon: Target,    title: 'Mídia Paga',           desc: 'Google, Meta, TikTok, LinkedIn. Otimizamos por CAC real, LTV e margem.', tags: ['Google Ads', 'Meta', 'TikTok'] },
  { icon: Workflow,  title: 'Automação & CRM',      desc: 'Fluxos, segmentação e HubSpot. Lead nurturing que converte sem esforço manual.', tags: ['HubSpot', 'RD Station', 'Flows'] },
]

function ServiceCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const Icon = s.icon

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10
    setTilt({ x: y, y: x })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: i * 0.07, duration: 0.7 }}
    >
      <div
        ref={ref}
        data-hover
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
        style={{
          background: 'var(--surface)',
          border: `1px solid ${hovered ? 'rgba(192,132,252,0.3)' : 'rgba(192,132,252,0.1)'}`,
          borderRadius: 16,
          padding: '36px 32px',
          height: '100%',
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
          transition: 'transform 0.4s cubic-bezier(.22,1,.36,1), border-color 0.3s, box-shadow 0.3s',
          boxShadow: hovered ? '0 8px 48px rgba(192,132,252,0.1)' : 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: hovered ? 'linear-gradient(90deg, transparent, #C084FC, transparent)' : 'transparent',
          transition: 'background 0.4s',
        }}/>

        {/* Icon */}
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          border: '1px solid rgba(192,132,252,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24,
          background: hovered ? 'rgba(192,132,252,0.08)' : 'transparent',
          transition: 'background 0.3s',
        }}>
          <Icon size={18} color="#C084FC" />
        </div>

        <h3 style={{
          fontFamily: 'var(--f-display)',
          fontWeight: 300,
          fontSize: 22,
          letterSpacing: '-0.01em',
          color: '#F5F0FF',
          marginBottom: 12,
          lineHeight: 1.2,
        }}>{s.title}</h3>

        <p style={{
          fontFamily: 'var(--f-body)',
          fontSize: 14,
          lineHeight: 1.7,
          color: 'var(--text-2)',
          marginBottom: 24,
        }}>{s.desc}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {s.tags.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--f-body)',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: 100,
              border: '1px solid rgba(192,132,252,0.2)',
              color: 'var(--text-3)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" style={{ padding: '120px 48px', position: 'relative' }}>
      <div className="fog" style={{ width: 500, height: 500, background: 'rgba(192,132,252,0.07)', top: 0, left: '-8%' }}/>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 640, marginBottom: 72 }}
        >
          <div className="t-label" style={{ marginBottom: 20 }}>O que entregamos</div>
          <h2 style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 300,
            fontSize: 'clamp(40px, 5vw, 68px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#F5F0FF',
          }}>
            Cada serviço,<br/>
            <em style={{ fontStyle: 'italic', color: '#C084FC' }}>uma vantagem</em><br/>
            competitiva
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {SERVICES.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  )
}
