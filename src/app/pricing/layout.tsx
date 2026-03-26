import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — OpenOfficeAI | Free Tier + Usage-Based API Pricing',
  description:
    'Start free with 500 API calls/month. Upgrade to Pro ($12/mo) or Scale ($49/mo) for unlimited documents and higher limits. No surprises — pay only for what you use.',
  openGraph: {
    title: 'Pricing — OpenOfficeAI | Free Tier + Usage-Based API Pricing',
    description:
      'Start free with 500 API calls/month. Upgrade to Pro or Scale for unlimited documents. Usage-based pricing with no surprises.',
    url: 'https://opensheet-seven.vercel.app/pricing',
    siteName: 'OpenOfficeAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — OpenOfficeAI',
    description:
      'Free tier with 500 API calls/month. Pro at $12/mo. Scale at $49/mo. No surprises.',
  },
  alternates: {
    canonical: 'https://opensheet-seven.vercel.app/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
