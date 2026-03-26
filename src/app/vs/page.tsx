import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OpenOfficeAI vs Alternatives — Honest Comparisons',
  description: 'See how OpenOfficeAI compares to Google Sheets API, Airtable, and other spreadsheet platforms. Honest, detailed comparisons with code examples.',
  openGraph: {
    title: 'OpenOfficeAI vs Alternatives',
    description: 'Honest comparisons between OpenOfficeAI and Google Sheets API, Airtable, and more.',
    url: 'https://opensheet-seven.vercel.app/vs',
  },
}

const comparisons = [
  {
    title: 'OpenOfficeAI vs Google Sheets API',
    description: 'Google Sheets API requires OAuth, service accounts, and multiple API calls to create a spreadsheet. OpenOfficeAI does it in one POST request with a simple API key. See the side-by-side code comparison.',
    href: '/vs/google-sheets-api',
    competitor: 'Google Sheets API',
    keyDifference: 'Setup complexity',
  },
  {
    title: 'OpenOfficeAI vs Airtable',
    description: 'Airtable is a database with a spreadsheet UI. OpenOfficeAI is a spreadsheet with an API. Compare pricing, features, and when to use each one.',
    href: '/vs/airtable',
    competitor: 'Airtable',
    keyDifference: 'Database vs Spreadsheet',
  },
]

export default function VsHub() {
  return (
    <div className="min-h-[100dvh] bg-[#fafafa]">
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-zinc-900 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.95" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.2" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-900">OpenOfficeAI</span>
        </a>
        <div className="flex items-center gap-2">
          <a href="/tools" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Tools</a>
          <a href="/docs" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Docs</a>
          <a href="/pricing" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Pricing</a>
          <a href="/signup" className="text-sm text-zinc-700 px-4 py-2 rounded-[10px] border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all active:scale-[0.98]">Get Started</a>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-24">
        <div className="max-w-2xl mb-14">
          <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-3">OpenOfficeAI vs Alternatives</h1>
          <p className="text-base text-zinc-500 leading-relaxed">
            Honest, detailed comparisons between OpenOfficeAI and other tools. We tell you when to use us and when the alternative is the better choice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {comparisons.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="group p-7 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md border bg-blue-50 text-blue-700 border-blue-200">
                  {c.keyDifference}
                </span>
              </div>
              <h2 className="text-base font-semibold text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors">{c.title}</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{c.description}</p>
              <span className="inline-block mt-4 text-sm text-zinc-900 font-medium group-hover:underline underline-offset-2">Read comparison &rarr;</span>
            </a>
          ))}
        </div>

        <div className="mt-16 p-7 rounded-2xl border border-zinc-200 bg-white">
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">Try it yourself</h2>
          <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
            The best way to compare is to try it. Create a spreadsheet with one API call and see how it feels. No credit card required.
          </p>
          <div className="flex gap-3">
            <a href="/signup" className="text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 px-5 py-2.5 rounded-[10px] transition-colors active:scale-[0.98]">Get Started Free</a>
            <a href="/tools" className="text-sm font-medium text-zinc-700 border border-zinc-200 hover:border-zinc-300 px-5 py-2.5 rounded-[10px] transition-all active:scale-[0.98]">Try Free Tools</a>
          </div>
        </div>
      </div>
    </div>
  )
}
