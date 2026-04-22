import type { Metadata } from 'next'
import { DM_Sans, Cormorant_Garamond, Bebas_Neue } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['300', '400', '500'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Strix Lab — Marketing de Alta Performance',
  description:
    'Dados, criatividade e tecnologia para transformar presença digital em resultado real.',
  openGraph: {
    title: 'Strix Lab',
    description: 'Marketing digital de alta performance.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${cormorant.variable} ${bebasNeue.variable}`}>
      <body className="grain">{children}</body>
    </html>
  )
}
