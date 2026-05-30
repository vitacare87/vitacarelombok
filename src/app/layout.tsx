import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EmergencyButton from '@/components/EmergencyButton'
import { SEO_KEYWORDS } from '@/lib/data'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vitacarelombok.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Vita Care Lombok | Home Care Profesional - Dokter & Perawat ke Rumah',
    template: '%s | Vita Care Lombok',
  },
  description:
    'Vita Care Lombok adalah layanan Home Care profesional di Lombok & Mataram: booking dokter, perawat, bidan, fisioterapi, infus, dan ambulans ke rumah. Sistem rujukan terintegrasi & tracking realtime.',
  keywords: SEO_KEYWORDS,
  authors: [{ name: 'Vita Care Lombok' }],
  applicationName: 'Vita Care Lombok',
  manifest: '/manifest.webmanifest',
  icons: { icon: '/logo.png', shortcut: '/logo.png', apple: '/logo.png' },
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'Vita Care Lombok',
    title: 'Vita Care Lombok | Home Care Profesional di Lombok',
    description:
      'Layanan kesehatan ke rumah di Lombok: dokter panggilan, perawat, bidan, fisioterapi, infus & ambulans. Cepat, profesional, terpercaya.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vita Care Lombok | Home Care Profesional di Lombok',
    description:
      'Layanan kesehatan ke rumah di Lombok: dokter, perawat, bidan, fisioterapi, infus & ambulans.',
  },
  robots: { index: true, follow: true },
  category: 'health',
}

export const viewport: Viewport = {
  themeColor: '#1259c3',
  width: 'device-width',
  initialScale: 1,
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Vita Care Lombok',
  description: 'Layanan Home Care profesional di Lombok dan Mataram.',
  url: siteUrl,
  areaServed: ['Lombok', 'Mataram', 'Nusa Tenggara Barat'],
  medicalSpecialty: ['PrimaryCare', 'Physiotherapy', 'Emergency'],
  telephone: process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '+6281900000000',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = { __html: JSON.stringify(orgJsonLd) }
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd} />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <EmergencyButton />
      </body>
    </html>
  )
}
