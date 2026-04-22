'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
import OwlSVG from './OwlSVG'

/* ════════════════════════════════════════════════════════
   CTA
════════════════════════════════════════════════════════ */
interface CTAProps { scrollProgress: number }

export function CTA({ scrollProgress }: CTAProps) {
  const [form, setForm] = useState({ name: '', email: '', company: '' })
  const [sent, setSent] = useState(false)

  return (
    <section id="cta" style={{ padding: '120px 48px', position: 'relative', overflow: 'hidden', background: 'var(--bg2)' }}>
      <div className="fog" style={{ width: 700, height: 700, background: 'rgba(192,132,252,0.1)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}/>

      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div className="t-label" style={{ marginBottom: 24 }}>Vamos conversar</div>
          <h2 style={{ fontFamily: 'var(--f-display)', fontWeight: 300, fontSize: 'clamp(48px,6vw,80px)', lineHeight: 0.93, letterSpacing: '-0.02em', color: '#F5F0FF', marginBottom: 24 }}>
            Pronto para<br/><em style={{ fontStyle: 'italic', color: '#C084FC' }}>voar mais alto?</em>
          </h2>
          <p style={{ fontFamily: 'var(--f-body)', fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', marginBottom: 48, maxWidth: 440 }}>
            Resposta em 24h, sem filtros de SDR, sem demo automática. Time sênior do primeiro contato.
          </p>

          {/* Trust pills */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Sem compromisso', 'Resposta em 24h', 'Time sênior'].map(t => (
              <span key={t} style={{ fontFamily: 'var(--f-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(192,132,252,0.2)', color: 'var(--text-3)' }}>{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.9 }}>
          {sent ? (
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(192,132,252,0.2)', borderRadius: 20, padding: 48, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 52, color: '#C084FC', marginBottom: 16 }}>Recebido.</div>
              <p style={{ fontFamily: 'var(--f-body)', fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7 }}>Nossa equipe entra em contato em até 24 horas. Fique de olho no seu email.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { key: 'name',    placeholder: 'Seu nome',          type: 'text'  },
                { key: 'email',   placeholder: 'Email corporativo', type: 'email' },
                { key: 'company', placeholder: 'Empresa',           type: 'text'  },
              ].map(f => (
                <input
                  key={f.key}
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  value={(form as any)[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{
                    fontFamily: 'var(--f-body)',
                    fontSize: 14,
                    padding: '16px 20px',
                    background: 'var(--surface)',
                    border: '1px solid rgba(192,132,252,0.15)',
                    borderRadius: 12,
                    color: '#F5F0FF',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(192,132,252,0.45)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(192,132,252,0.15)')}
                />
              ))}
              <button type="submit" data-hover className="btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>
                Começar agora <ArrowRight size={15}/>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════ */
const COLS = [
  { title: 'Serviços', links: ['Growth Marketing','Branding','Analytics','Conteúdo & SEO','Mídia Paga','Automação'] },
  { title: 'Empresa',  links: ['Sobre','Cases','Manifesto','Carreiras','Imprensa'] },
  { title: 'Recursos', links: ['Blog','Playbooks','Newsletter','Podcast','Ferramentas'] },
]

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(192,132,252,0.1)', padding: '80px 48px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', gap: 48, marginBottom: 64 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="#C084FC" strokeWidth="1.5"/>
                <circle cx="10" cy="13" r="4" fill="#C084FC" opacity="0.9"/>
                <circle cx="18" cy="13" r="4" fill="#C084FC" opacity="0.9"/>
                <circle cx="10" cy="13" r="1.5" fill="#080810"/>
                <circle cx="18" cy="13" r="1.5" fill="#080810"/>
                <path d="M8 8 L6 4 L11 7" fill="#C084FC" opacity="0.7"/>
                <path d="M20 8 L22 4 L17 7" fill="#C084FC" opacity="0.7"/>
              </svg>
              <span style={{ fontFamily: 'var(--f-display)', fontWeight: 300, fontSize: 18, color: '#F5F0FF', letterSpacing: '0.05em' }}>
                Strix<em style={{ color: '#C084FC' }}>Lab</em>
              </span>
            </div>
            <p style={{ fontFamily: 'var(--f-body)', fontSize: 13, lineHeight: 1.75, color: 'var(--text-3)', maxWidth: 240, marginBottom: 28 }}>
              Agência independente de marketing digital. Dados, criatividade e tecnologia para marcas que dominam o futuro.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" data-hover style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(192,132,252,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, background 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C084FC'; (e.currentTarget as HTMLElement).style.background = 'rgba(192,132,252,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(192,132,252,0.2)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  <Icon size={13} color="var(--text-3)"/>
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {COLS.map(col => (
            <div key={col.title}>
              <div className="t-label" style={{ marginBottom: 20 }}>{col.title}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" style={{ fontFamily: 'var(--f-body)', fontSize: 13, color: 'var(--text-3)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#F5F0FF')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <div className="t-label" style={{ marginBottom: 20 }}>Contato</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="mailto:hello@strixlab.com" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--f-body)', fontSize: 13, color: 'var(--text-3)', textDecoration: 'none' }}>
                <Mail size={13} color="#C084FC"/> hello@strixlab.com
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontFamily: 'var(--f-body)', fontSize: 13, color: 'var(--text-3)' }}>
                <MapPin size={13} color="#C084FC" style={{ marginTop: 2 }}/> São Paulo · Remote-first
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(192,132,252,0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--f-body)', fontSize: 12, color: 'var(--text-3)' }}>© 2026 Strix Lab. Todos os direitos reservados.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacidade','Termos','Cookies'].map(l => (
              <a key={l} href="#" style={{ fontFamily: 'var(--f-body)', fontSize: 12, color: 'var(--text-3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F5F0FF')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
