import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const BASE_URL = 'https://opensheet-seven.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'OpenOfficeAI — Create Spreadsheets & Docs via API',
    template: '%s | OpenOfficeAI',
  },
  description:
    'Create spreadsheets and documents with a single API call. Get a shareable link. Edit in browser. No signup to view. Built for developers, AI agents, and automations.',
  openGraph: {
    title: 'OpenOfficeAI — Create Spreadsheets & Docs via API',
    description:
      'Create spreadsheets and documents with a single API call. Get a shareable link. Edit in browser. No signup to view.',
    url: BASE_URL,
    siteName: 'OpenOfficeAI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenOfficeAI — Create Spreadsheets & Docs via API',
    description:
      'One API call creates a spreadsheet or document. Shareable link, browser editor, no signup to view.',
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'OpenOfficeAI',
  url: BASE_URL,
  description:
    'Create spreadsheets and documents with a single API call. Get a shareable link. Edit in browser. No signup to view.',
  applicationCategory: 'Productivity',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier with 500 API calls per month',
  },
  featureList: [
    'Create spreadsheets via API',
    'Create documents via API',
    'Shareable links',
    'Browser-based editor',
    'Export to XLSX, PDF, CSV, DOCX',
    'Formatting and formulas',
    'No signup required to view',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
