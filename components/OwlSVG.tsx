'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'

interface Props {
  scrollProgress: number
  size?: number
}

export default function OwlSVG({ scrollProgress, size = 420 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)
  const [wingOpen, setWingOpen] = useState(true)
  const [headTilt, setHeadTilt] = useState(0)
  const rafRef = useRef<number>()

  /* ── Mouse tracking ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (window.innerWidth / 2)
      const dy = (e.clientY - cy) / (window.innerHeight / 2)
      const maxPupil = 5
      const maxTilt = 8
      setPupilOffset({
        x: Math.max(-maxPupil, Math.min(maxPupil, dx * maxPupil)),
        y: Math.max(-maxPupil, Math.min(maxPupil, dy * maxPupil)),
      })
      setHeadTilt(Math.max(-maxTilt, Math.min(maxTilt, dx * maxTilt)))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* ── Blink scheduler ── */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const schedule = () => {
      t = setTimeout(() => {
        setBlink(true)
        setTimeout(() => { setBlink(false); schedule() }, 140)
      }, 3500 + Math.random() * 4500)
    }
    schedule()
    return () => clearTimeout(t)
  }, [])

  /* ── Wings react to scroll ── */
  useEffect(() => {
    setWingOpen(scrollProgress < 0.22 || scrollProgress > 0.82)
  }, [scrollProgress])

  /* ── Scroll-based scale/position ── */
  let containerScale = 1
  let containerX = 0
  let containerOpacity = 1

  if (scrollProgress < 0.22) {
    containerScale = 1
    containerX = 0
    containerOpacity = 1
  } else if (scrollProgress < 0.58) {
    const p = (scrollProgress - 0.22) / 0.36
    containerScale = 1 - 0.48 * p
    containerX = 280 * p
    containerOpacity = 1
  } else if (scrollProgress < 0.82) {
    const p = (scrollProgress - 0.58) / 0.24
    containerScale = 0.52
    containerX = 280
    containerOpacity = 1 - p
  } else {
    const p = (scrollProgress - 0.82) / 0.18
    containerScale = 0.52 + 0.48 * p
    containerX = 280 * (1 - p)
    containerOpacity = p
  }

  const s = size

  return (
    <div
      ref={containerRef}
      style={{
        width: s,
        height: s,
        transform: `translateX(${containerX}px) scale(${containerScale})`,
        opacity: containerOpacity,
        transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease',
        transformOrigin: 'center center',
        position: 'relative',
      }}
    >
      <svg
        viewBox="0 0 400 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          {/* Accent glow filter */}
          <filter id="glow-accent" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-eye" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="body-grad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#1e1240"/>
            <stop offset="100%" stopColor="#0d0820"/>
          </radialGradient>
          <radialGradient id="head-grad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#231550"/>
            <stop offset="100%" stopColor="#0e0a22"/>
          </radialGradient>
          <radialGradient id="eye-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F0ABFC" stopOpacity="1"/>
            <stop offset="60%" stopColor="#C084FC" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="iris-grad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#F0ABFC"/>
            <stop offset="50%" stopColor="#C084FC"/>
            <stop offset="100%" stopColor="#7c3aed"/>
          </radialGradient>
          <clipPath id="left-eye-clip">
            <ellipse cx="148" cy="168" rx="32" ry="32"/>
          </clipPath>
          <clipPath id="right-eye-clip">
            <ellipse cx="252" cy="168" rx="32" ry="32"/>
          </clipPath>
        </defs>

        {/* ── Ambient aura behind owl ── */}
        <motion.ellipse
          cx="200" cy="260"
          rx="110" ry="80"
          fill="url(#eye-glow)"
          opacity={0.18}
          animate={{ ry: [80, 95, 80], opacity: [0.18, 0.26, 0.18] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── LEFT WING ── */}
        <motion.g
          animate={{ rotate: wingOpen ? -28 : -8, x: wingOpen ? -8 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '130px 280px' }}
        >
          {/* Wing shape — organic path */}
          <path
            d="M130 275 C90 255 42 230 28 195 C18 170 35 158 55 168 C72 178 88 195 105 210 C118 222 130 250 130 275Z"
            fill="#160d36"
            stroke="#C084FC"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          {/* Wing feather lines */}
          <path d="M130 270 C100 248 58 218 38 188" stroke="#C084FC" strokeWidth="0.8" strokeOpacity="0.25" fill="none"/>
          <path d="M128 260 C102 242 70 215 52 192" stroke="#C084FC" strokeWidth="0.8" strokeOpacity="0.2" fill="none"/>
          <path d="M126 250 C105 238 80 215 65 196" stroke="#C084FC" strokeWidth="0.6" strokeOpacity="0.15" fill="none"/>
          {/* Wing tip accent */}
          <circle cx="32" cy="192" r="3" fill="#C084FC" opacity="0.5" filter="url(#glow-soft)"/>
        </motion.g>

        {/* ── RIGHT WING ── */}
        <motion.g
          animate={{ rotate: wingOpen ? 28 : 8, x: wingOpen ? 8 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '270px 280px' }}
        >
          <path
            d="M270 275 C310 255 358 230 372 195 C382 170 365 158 345 168 C328 178 312 195 295 210 C282 222 270 250 270 275Z"
            fill="#160d36"
            stroke="#C084FC"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <path d="M270 270 C300 248 342 218 362 188" stroke="#C084FC" strokeWidth="0.8" strokeOpacity="0.25" fill="none"/>
          <path d="M272 260 C298 242 330 215 348 192" stroke="#C084FC" strokeWidth="0.8" strokeOpacity="0.2" fill="none"/>
          <path d="M274 250 C295 238 320 215 335 196" stroke="#C084FC" strokeWidth="0.6" strokeOpacity="0.15" fill="none"/>
          <circle cx="368" cy="192" r="3" fill="#C084FC" opacity="0.5" filter="url(#glow-soft)"/>
        </motion.g>

        {/* ── BODY ── */}
        {/* Body base */}
        <ellipse cx="200" cy="300" rx="88" ry="95" fill="url(#body-grad)" />
        {/* Body outline — clean single stroke */}
        <ellipse cx="200" cy="300" rx="88" ry="95"
          stroke="#C084FC" strokeWidth="1" strokeOpacity="0.3" fill="none"/>

        {/* Chest feather texture — layered arcs */}
        {[0,1,2,3,4].map(row => (
          [0,1,2].map(col => {
            const x = 158 + col * 22
            const y = 248 + row * 24
            return (
              <path
                key={`f-${row}-${col}`}
                d={`M${x-9} ${y} Q${x} ${y-9} ${x+9} ${y}`}
                stroke="#C084FC"
                strokeWidth="0.8"
                strokeOpacity={0.12 + row * 0.02}
                fill="none"
              />
            )
          })
        ))}

        {/* Body bottom accent stripe */}
        <path
          d="M138 370 Q200 388 262 370"
          stroke="#C084FC" strokeWidth="1.5" strokeOpacity="0.25" fill="none"
        />

        {/* Talons */}
        <path d="M172 390 C166 398 158 404 152 410" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
        <path d="M180 393 C178 402 176 408 174 414" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
        <path d="M228 390 C234 398 242 404 248 410" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
        <path d="M220 393 C222 402 224 408 226 414" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>

        {/* ── HEAD ── */}
        <motion.g
          animate={{ rotate: headTilt }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: '200px 175px' }}
        >
          {/* Head base */}
          <ellipse cx="200" cy="168" rx="82" ry="82" fill="url(#head-grad)" />
          <ellipse cx="200" cy="168" rx="82" ry="82"
            stroke="#C084FC" strokeWidth="1" strokeOpacity="0.35" fill="none"/>

          {/* Facial disc — subtle lighter oval */}
          <ellipse cx="200" cy="172" rx="56" ry="58"
            stroke="#C084FC" strokeWidth="0.8" strokeOpacity="0.2"
            fill="#C084FC" fillOpacity="0.04"
          />

          {/* ── EAR TUFTS ── */}
          {/* Left tuft */}
          <path
            d="M140 108 C132 88 136 72 142 64 C146 76 148 90 148 104Z"
            fill="#160d36"
            stroke="#C084FC" strokeWidth="1" strokeOpacity="0.5"
          />
          <path d="M141 105 C138 90 139 78 143 68" stroke="#C084FC" strokeWidth="0.7" strokeOpacity="0.3" fill="none"/>

          {/* Right tuft */}
          <path
            d="M260 108 C268 88 264 72 258 64 C254 76 252 90 252 104Z"
            fill="#160d36"
            stroke="#C084FC" strokeWidth="1" strokeOpacity="0.5"
          />
          <path d="M259 105 C262 90 261 78 257 68" stroke="#C084FC" strokeWidth="0.7" strokeOpacity="0.3" fill="none"/>

          {/* ── LEFT EYE ── */}
          <g>
            {/* Outer glow ring */}
            <circle cx="148" cy="168" r="38"
              fill="none" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.2"/>
            {/* Eye socket */}
            <ellipse cx="148" cy="168" rx="32" ry="32" fill="#080810"/>
            {/* Iris */}
            <motion.circle
              cx="148" cy="168" r="22"
              fill="url(#iris-grad)"
              filter="url(#glow-eye)"
              animate={{ r: [22, 23, 22] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Pupil — tracks mouse */}
            <g clipPath="url(#left-eye-clip)">
              <circle
                cx={148 + pupilOffset.x}
                cy={168 + pupilOffset.y}
                r="10"
                fill="#000"
                style={{ transition: 'cx 0.12s ease, cy 0.12s ease' }}
              />
              {/* Pupil shine */}
              <circle
                cx={145 + pupilOffset.x}
                cy={164 + pupilOffset.y}
                r="3"
                fill="white"
                opacity="0.6"
                style={{ transition: 'cx 0.12s ease, cy 0.12s ease' }}
              />
            </g>
            {/* Eye ring accent */}
            <circle cx="148" cy="168" r="32"
              fill="none" stroke="#F0ABFC" strokeWidth="1.5" strokeOpacity="0.5"/>
            {/* Eyelid blink */}
            <motion.ellipse
              cx="148" cy="168" rx="32" ry="32"
              fill="#0e0a22"
              animate={{ ry: blink ? 32 : 0, cy: blink ? 168 : 136 }}
              transition={{ duration: 0.07 }}
            />
          </g>

          {/* ── RIGHT EYE ── */}
          <g>
            <circle cx="252" cy="168" r="38"
              fill="none" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.2"/>
            <ellipse cx="252" cy="168" rx="32" ry="32" fill="#080810"/>
            <motion.circle
              cx="252" cy="168" r="22"
              fill="url(#iris-grad)"
              filter="url(#glow-eye)"
              animate={{ r: [22, 23, 22] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <g clipPath="url(#right-eye-clip)">
              <circle
                cx={252 + pupilOffset.x}
                cy={168 + pupilOffset.y}
                r="10"
                fill="#000"
                style={{ transition: 'cx 0.12s ease, cy 0.12s ease' }}
              />
              <circle
                cx={249 + pupilOffset.x}
                cy={164 + pupilOffset.y}
                r="3"
                fill="white"
                opacity="0.6"
                style={{ transition: 'cx 0.12s ease, cy 0.12s ease' }}
              />
            </g>
            <circle cx="252" cy="168" r="32"
              fill="none" stroke="#F0ABFC" strokeWidth="1.5" strokeOpacity="0.5"/>
            <motion.ellipse
              cx="252" cy="168" rx="32" ry="32"
              fill="#0e0a22"
              animate={{ ry: blink ? 32 : 0, cy: blink ? 168 : 136 }}
              transition={{ duration: 0.07 }}
            />
          </g>

          {/* ── BEAK ── */}
          <path
            d="M192 194 L200 208 L208 194 Q200 190 192 194Z"
            fill="#FCD34D"
            opacity="0.9"
          />
          <path d="M192 194 L200 208 L208 194" stroke="#FCD34D" strokeWidth="0.5" fill="none" opacity="0.5"/>

          {/* Head top feather detail */}
          <path d="M170 100 Q180 92 190 96" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.3" fill="none"/>
          <path d="M210 96 Q220 92 230 100" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.3" fill="none"/>
        </motion.g>

        {/* ── Floating accent particles ── */}
        {[
          { cx: 68, cy: 140, r: 2, delay: 0 },
          { cx: 328, cy: 155, r: 1.5, delay: 0.8 },
          { cx: 55, cy: 290, r: 1.5, delay: 1.6 },
          { cx: 345, cy: 270, r: 2, delay: 2.4 },
          { cx: 100, cy: 360, r: 1, delay: 1.2 },
          { cx: 300, cy: 350, r: 1, delay: 0.4 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx} cy={p.cy} r={p.r}
            fill="#C084FC"
            animate={{ opacity: [0.2, 0.8, 0.2], cy: [p.cy, p.cy - 8, p.cy] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  )
}
