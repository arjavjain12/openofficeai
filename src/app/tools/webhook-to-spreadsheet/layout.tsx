import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webhook to Spreadsheet — Log Any Webhook to a Live Spreadsheet | OpenOfficeAI',
  description: 'Generate a unique webhook URL that appends every POST request as a new row in a live spreadsheet. Perfect for form submissions, IoT, and event logging.',
  openGraph: {
    title: 'Webhook to Spreadsheet — Log Any Webhook to a Spreadsheet',
    description: 'Generate a webhook URL that auto-appends rows to a live spreadsheet. Coming soon.',
    url: 'https://opensheet-seven.vercel.app/tools/webhook-to-spreadsheet',
    type: 'website',
  },
  alternates: {
    canonical: 'https://opensheet-seven.vercel.app/tools/webhook-to-spreadsheet',
  },
}

export default function WebhookLayout({ children }: { children: React.ReactNode }) {
  return children
}
