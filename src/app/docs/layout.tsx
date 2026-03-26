import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Documentation — OpenOfficeAI | REST API for Spreadsheets & Docs',
  description:
    'Complete API reference for OpenOfficeAI. Create spreadsheets and documents with a single POST request. Supports formatting, formulas, multi-sheet workbooks, and export to XLSX, PDF, CSV, and more.',
  openGraph: {
    title: 'API Documentation — OpenOfficeAI | REST API for Spreadsheets & Docs',
    description:
      'Complete REST API reference. Create spreadsheets and documents programmatically with formatting, formulas, and export support.',
    url: 'https://opensheet-seven.vercel.app/docs',
    siteName: 'OpenOfficeAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Docs — OpenOfficeAI',
    description:
      'REST API for creating spreadsheets and documents. Formatting, formulas, multi-sheet, and export to XLSX/PDF/CSV.',
  },
  alternates: {
    canonical: 'https://opensheet-seven.vercel.app/docs',
  },
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children
}
