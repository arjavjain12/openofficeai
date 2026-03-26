import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JSON to Spreadsheet Online — Free Converter | OpenOfficeAI',
  description: 'Convert JSON arrays to live, editable spreadsheets online. Paste JSON data and get a shareable spreadsheet link instantly. Auto-flattens nested objects.',
  openGraph: {
    title: 'JSON to Spreadsheet Online — Free Converter',
    description: 'Convert JSON to a live spreadsheet with a shareable link. Nested objects auto-flatten into columns.',
    url: 'https://opensheet-seven.vercel.app/tools/json-to-spreadsheet',
    type: 'website',
  },
  alternates: {
    canonical: 'https://opensheet-seven.vercel.app/tools/json-to-spreadsheet',
  },
}

export default function JsonLayout({ children }: { children: React.ReactNode }) {
  return children
}
