import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSV to Spreadsheet Online — Free Converter | OpenOfficeAI',
  description: 'Convert CSV to a live, editable spreadsheet online. Paste or upload CSV data and get a shareable spreadsheet link instantly. No signup required.',
  openGraph: {
    title: 'CSV to Spreadsheet Online — Free Converter',
    description: 'Convert CSV to a live, editable spreadsheet with a shareable link. No signup required.',
    url: 'https://opensheet-seven.vercel.app/tools/csv-to-spreadsheet',
    type: 'website',
  },
  alternates: {
    canonical: 'https://opensheet-seven.vercel.app/tools/csv-to-spreadsheet',
  },
}

export default function CsvLayout({ children }: { children: React.ReactNode }) {
  return children
}
