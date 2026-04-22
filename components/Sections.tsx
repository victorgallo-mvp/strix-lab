'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

/* ── animated progress bar ── */
function Bar({ label, pct, display }: { label: string; pct: number; display: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--f-body)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--f-num)', fontSize: 20, color: '#C084FC', letterSpacing: '0.04em' }}>{display}</span>
      </div>
      <div style={{ height: 1, background: 'rgba(192,132,252,0.1)', borderRadius: 1, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #C084FC, #F0ABFC)', borderRadius: 1 }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

const BARS = [
  { label: 'Tráfego orgânico', pct: 85, display: '+340%' },
  { label: 'Redução de CAC',   pct: 62, display: '-62%'  },
  { label: 'Conversão',        pct: 72, display: '+128%' },
  { label: 'Retenção',         pct: 94, display: '94%'   },
  { label: 'ROI médio',        pct: 84, display: '8.4x'  },
]

const CASES = [
  { big: '+340%', label: 'E-commerce fashion', sub: 'tráfego em 8 meses', detail: 'Escalamos de R$800k para R$3.5M/mês com mídia paga performance, CRO sistêmico e redesign de funil. ROAS 6.2x.', color: '#F0ABFC' },
  { big: '-62%',  label: 'SaaS B2B',           sub: 'redução de CAC',    detail: 'Atribuição multi-touch revelou 60% do budget indo para canais não-conversores. Realocação + novo funil inbound.', color: '#67E8F9' },
  { big: '8.4x',  label: 'Saúde & Clínicas',   sub: 'ROI em 12 meses',  detail: 'Clínica multispecialty triplicou consultas com SEO local + ads geo-segmentados + automação de reativação.', color: '#FCD34D' },
]

export function Results() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="results" style={{ padding: '120px 48px', background: 'var(--bg2)', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: 72 }}>
          <div className="t-label" style={{ marginBottom: 20 }}>Resultados reais</div>
          <h2 style={{ fontFamily: 'var(--f-display)', fontWeight: 300, fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 0.95, letterSpacing: '-0.02em', color: '#F5F0FF' }}>
            Números que<br/><em style={{ fontStyle: 'italic', color: '#C084FC' }}>falam por si</em>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          {/* Bars */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="t-label" style={{ marginBottom: 36 }}>Média consolidada</div>
            {BARS.map(b => <Bar key={b.label} {...b} />)}
          </motion.div>

          {/* Cases */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CASES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                data-hover
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${expanded === i ? 'rgba(192,132,252,0.25)' : 'rgba(192,132,252,0.1)'}`,
                  borderRadius: 16, padding: '28px 32px',
                  cursor: 'none',
                  transition: 'border-color 0.3s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--f-num)', fontSize: 'clamp(40px,5vw,56px)', color: c.color, lineHeight: 1 }}>{c.big}</div>
                    <div style={{ fontFamily: 'var(--f-body)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginTop: 4 }}>{c.label} · {c.sub}</div>
                  </div>
                  <motion.div animate={{ rotate: expanded === i ? 45 : 0 }} transition={{ duration: 0.25 }}>
                    <Plus size={20} color="var(--text-3)" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {expanded === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{ fontFamily: 'var(--f-body)', fontSize: 14, lineHeight: 1.7, color: 'var(--text-2)', marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(192,132,252,0.1)', overflow: 'hidden' }}
                    >{c.detail}</motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════
   PROCESS
════════════════════════════════════════════════════════ */
const STEPS = [
  { n: '01', title: 'Diagnóstico', desc: 'Auditoria 360 de marca, funis, canais e concorrência. Mapeamos onde o dinheiro vaza e onde está a maior alavanca.', pills: ['Auditoria', 'Benchmark', 'Persona'] },
  { n: '02', title: 'Estratégia',  desc: 'Blueprint de 90 dias com OKRs, canais priorizados e orçamento alocado por impacto real.', pills: ['OKR', 'Roadmap', 'Budget'] },
  { n: '03', title: 'Execução',    desc: 'Squad dedicado em sprints semanais. Criativos, campanhas e automações com ritmo definido.', pills: ['Sprint', 'Squad', 'Deploy'] },
  { n: '04', title: 'Otimização',  desc: 'Testes A/B contínuos e realocação de verba baseada em dados reais de performance.', pills: ['A/B Test', 'CRO', 'Criativos'] },
  { n: '05', title: 'Escala',      desc: 'Verba progressiva em canais validados. Expansão geográfica com playbook documentado.', pills: ['Scale', 'Geo', 'Playbook'] },
]

export function Process() {
  const [active, setActive] = useState(0)

  return (
    <section id="process" style={{ padding: '120px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: 72 }}>
          <div className="t-label" style={{ marginBottom: 20 }}>Como trabalhamos</div>
          <h2 style={{ fontFamily: 'var(--f-display)', fontWeight: 300, fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 0.95, letterSpacing: '-0.02em', color: '#F5F0FF' }}>
            Processo que<br/><em style={{ fontStyle: 'italic', color: '#C084FC' }}>funciona</em>
          </h2>
        </motion.div>

        {/* Steps nav */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 48, borderBottom: '1px solid rgba(192,132,252,0.1)' }}>
          {STEPS.map((s, i) => (
            <button
              key={s.n}
              data-hover
              onClick={() => setActive(i)}
              style={{
                flex: 1, padding: '20px 16px', background: 'none', border: 'none',
                cursor: 'none', textAlign: 'left',
                borderBottom: `2px solid ${active === i ? '#C084FC' : 'transparent'}`,
                transition: 'border-color 0.3s',
              }}
            >
              <div style={{ fontFamily: 'var(--f-num)', fontSize: 13, color: active === i ? '#C084FC' : 'var(--text-3)', letterSpacing: '0.1em', marginBottom: 4 }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 300, color: active === i ? '#F5F0FF' : 'var(--text-3)', transition: 'color 0.3s' }}>{s.title}</div>
            </button>
          ))}
        </div>

        {/* Active content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 64, alignItems: 'center' }}
          >
            <div style={{ fontFamily: 'var(--f-num)', fontSize: 'clamp(100px, 14vw, 160px)', color: 'rgba(192,132,252,0.12)', lineHeight: 1, userSelect: 'none' }}>
              {STEPS[active].n}
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--f-display)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em', color: '#F5F0FF', marginBottom: 20 }}>
                {STEPS[active].title}
              </h3>
              <p style={{ fontFamily: 'var(--f-body)', fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', maxWidth: 560, marginBottom: 28 }}>
                {STEPS[active].desc}
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {STEPS[active].pills.map(p => (
                  <span key={p} style={{ fontFamily: 'var(--f-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(192,132,252,0.2)', color: 'var(--text-3)' }}>{p}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev/Next */}
        <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
          <button data-hover onClick={() => setActive(a => Math.max(0, a - 1))} disabled={active === 0} className="btn-ghost" style={{ padding: '10px 20px', fontSize: 12, opacity: active === 0 ? 0.3 : 1 }}>← Anterior</button>
          <button data-hover onClick={() => setActive(a => Math.min(STEPS.length - 1, a + 1))} disabled={active === STEPS.length - 1} className="btn-ghost" style={{ padding: '10px 20px', fontSize: 12, opacity: active === STEPS.length - 1 ? 0.3 : 1 }}>Próximo →</button>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════
   TESTIMONIALS
════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { name: 'Camila Rezende', role: 'CEO · Lumina Cosméticos', text: 'Em 6 meses dobramos o faturamento. A Strix não entregou campanha — entregou método. Hoje é parte do nosso time estratégico.', initials: 'CR' },
  { name: 'Rafael Moraes',  role: 'CMO · Vortex Tech',       text: 'Reduzimos CAC em 58% enquanto escalávamos volume. O nível de análise de dados é cirúrgico. Raro no mercado.', initials: 'RM' },
  { name: 'Juliana Pires',  role: 'Founder · Doma Saúde',    text: 'Chegamos ao terceiro trimestre com fila de espera. Marketing digital com essa previsibilidade é algo raro para uma clínica.', initials: 'JP' },
  { name: 'André Koch',     role: 'VP Growth · NeuroFlex',   text: 'Time sênior, comunicação direta e zero maquiagem nos relatórios. Absolutamente raro no mercado brasileiro de agências.', initials: 'AK' },
]

export function Testimonials() {
  const [idx, setIdx] = useState(0)
  const t = TESTIMONIALS[idx]

  return (
    <section style={{ padding: '120px 48px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="t-label" style={{ marginBottom: 20 }}>Clientes</div>
          <h2 style={{ fontFamily: 'var(--f-display)', fontWeight: 300, fontSize: 'clamp(40px,5vw,64px)', lineHeight: 0.95, letterSpacing: '-0.02em', color: '#F5F0FF' }}>
            O que dizem<br/><em style={{ fontStyle: 'italic', color: '#C084FC' }}>sobre a gente</em>
          </h2>
        </motion.div>

        <div style={{ position: 'relative', minHeight: 240 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              style={{ background: 'var(--surface)', border: '1px solid rgba(192,132,252,0.12)', borderRadius: 20, padding: '52px 60px', position: 'absolute', inset: 0 }}
            >
              {/* Big quote mark */}
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 120, color: 'rgba(192,132,252,0.12)', lineHeight: 0.6, marginBottom: 24, userSelect: 'none' }}>"</div>
              <p style={{ fontFamily: 'var(--f-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(20px,2.5vw,28px)', lineHeight: 1.4, color: '#F5F0FF', marginBottom: 36 }}>{t.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(192,132,252,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-body)', fontSize: 13, color: '#C084FC' }}>{t.initials}</div>
                <div>
                  <div style={{ fontFamily: 'var(--f-body)', fontSize: 14, fontWeight: 500, color: '#F5F0FF' }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--f-body)', fontSize: 12, color: 'var(--text-3)', letterSpacing: '0.06em' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 280 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} data-hover onClick={() => setIdx(i)} style={{
              height: 4, width: i === idx ? 28 : 8, borderRadius: 2, border: 'none',
              background: i === idx ? '#C084FC' : 'rgba(192,132,252,0.2)',
              cursor: 'none', transition: 'all 0.3s',
            }}/>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════
   FAQ
════════════════════════════════════════════════════════ */
const FAQ_ITEMS = [
  { q: 'Quanto tempo até ver resultados?',     a: 'Primeiros sinais entre 30 e 60 dias. Resultados consolidados a partir do 3º mês, com tração escalável a partir do 6º.' },
  { q: 'Qual o investimento mínimo?',           a: 'Fee a partir de R$12k/mês para projetos focados e R$25k/mês para operações full-funnel. Mídia é separada.' },
  { q: 'Trabalham com que portes de empresa?',  a: 'De startups com R$500k ARR+ até empresas com R$500M+ de receita. O denominador é ambição e abertura a dados.' },
  { q: 'Como é o processo de onboarding?',      a: 'Duas semanas de imersão: auditoria, entrevistas, acessos e blueprint de 90 dias no Notion compartilhado.' },
  { q: 'Posso cancelar quando quiser?',         a: 'Contratos de 6 meses com aviso de 30 dias. Acreditamos em resultado, não em amarras contratuais.' },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section style={{ padding: '120px 48px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: 64 }}>
          <div className="t-label" style={{ marginBottom: 20 }}>Perguntas frequentes</div>
          <h2 style={{ fontFamily: 'var(--f-display)', fontWeight: 300, fontSize: 'clamp(40px,5vw,64px)', lineHeight: 0.95, letterSpacing: '-0.02em', color: '#F5F0FF' }}>
            Dúvidas?<br/><em style={{ fontStyle: 'italic', color: '#C084FC' }}>Temos respostas</em>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {FAQ_ITEMS.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}>
              <div
                data-hover
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  borderTop: '1px solid rgba(192,132,252,0.1)',
                  padding: '24px 0',
                  cursor: 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                  <span style={{ fontFamily: 'var(--f-display)', fontWeight: 300, fontSize: 20, color: open === i ? '#F5F0FF' : 'var(--text-2)', transition: 'color 0.3s', lineHeight: 1.3 }}>{item.q}</span>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
                    <Plus size={18} color={open === i ? '#C084FC' : 'var(--text-3)'} />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {open === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{ fontFamily: 'var(--f-body)', fontSize: 15, lineHeight: 1.75, color: 'var(--text-2)', overflow: 'hidden' }}
                    >{item.a}</motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid rgba(192,132,252,0.1)' }}/>
        </div>
      </div>
    </section>
  )
}
