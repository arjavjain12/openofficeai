import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up — OpenOfficeAI',
  description: 'Create your free OpenOfficeAI account. Start creating spreadsheets and documents via API in minutes.',
  robots: 'noindex, nofollow',
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children
}
