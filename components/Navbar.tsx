'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const LINKS = [
  { label: 'Serviços', href: '#services' },
  { label: 'Cases',   href: '#results'  },
  { label: 'Processo',href: '#process'  },
  { label: 'Contato', href: '#cta'      },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: scrolled ? 0 : -70, opacity: scrolled ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(8,8,16,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(192,132,252,0.1)',
      }}
    >
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 32px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Minimal owl icon */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#C084FC" strokeWidth="1.5"/>
            <circle cx="10" cy="13" r="4" fill="#C084FC" opacity="0.9"/>
            <circle cx="18" cy="13" r="4" fill="#C084FC" opacity="0.9"/>
            <circle cx="10" cy="13" r="1.5" fill="#080810"/>
            <circle cx="18" cy="13" r="1.5" fill="#080810"/>
            <path d="M8 8 L6 4 L11 7" fill="#C084FC" opacity="0.7"/>
            <path d="M20 8 L22 4 L17 7" fill="#C084FC" opacity="0.7"/>
          </svg>
          <span style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 300,
            fontSize: 20,
            color: '#F5F0FF',
            letterSpacing: '0.05em',
          }}>
            Strix<span style={{ color: '#C084FC', fontStyle: 'italic' }}>Lab</span>
          </span>
        </a>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontFamily: 'var(--f-body)',
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F0FF')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
            >
              {label}
            </a>
          ))}
          <a href="#cta" className="btn-primary" style={{ padding: '10px 20px', fontSize: 11 }}>
            Iniciar projeto <ArrowUpRight size={12}/>
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
