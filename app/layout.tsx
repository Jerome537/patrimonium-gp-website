import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gp.patrimonium.nc'),
  title: {
    default: 'Patrimonium GP - Conseil en Gestion de Patrimoine',
    template: '%s | Patrimonium GP',
  },
  description: 'Cabinet de conseil en gestion de patrimoine à Tahiti et en Nouvelle-Calédonie. Expertise financière, optimisation fiscale et stratégies patrimoniales sur mesure.',
  keywords: 'gestion patrimoine, conseil financier, Tahiti, Nouvelle-Calédonie, optimisation fiscale, investissement, retraite, succession',
  authors: [{ name: 'Patrimonium GP' }],
  creator: 'Patrimonium GP',
  publisher: 'Patrimonium GP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Patrimonium GP',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Patrimonium GP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@patrimoniumgp',
    creator: '@patrimoniumgp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
