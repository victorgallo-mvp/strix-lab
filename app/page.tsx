'use client'

import { useState, useEffect } from 'react'
import { useScroll } from 'framer-motion'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MetricsBar from '@/components/MetricsBar'
import Services from '@/components/Services'
import { Results, Process, Testimonials, FAQ } from '@/components/Sections'
import { CTA, Footer } from '@/components/CTAFooter'

export default function Home() {
  const [scrollProg, setScrollProg] = useState(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    return scrollYProgress.on('change', v => setScrollProg(v))
  }, [scrollYProgress])

  return (
    <>
      <Cursor />
      <Navbar />
      <div className="grid-bg" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.4 }}/>
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero scrollProgress={scrollProg} />
        <MetricsBar />
        <Services />
        <Results />
        <Process />
        <Testimonials />
        <FAQ />
        <CTA scrollProgress={scrollProg} />
        <Footer />
      </main>
    </>
  )
}
