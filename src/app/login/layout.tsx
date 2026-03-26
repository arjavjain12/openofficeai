import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log In — OpenOfficeAI',
  description: 'Log in to your OpenOfficeAI account to manage your spreadsheets, documents, and API keys.',
  robots: 'noindex, nofollow',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
