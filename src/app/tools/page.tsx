import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Spreadsheet Tools | OpenOfficeAI',
  description: 'Free online tools to convert CSV, JSON, and webhooks into live, editable spreadsheets. No signup required.',
  openGraph: {
    title: 'Free Spreadsheet Tools | OpenOfficeAI',
    description: 'Convert CSV, JSON, and webhooks into live editable spreadsheets instantly.',
    url: 'https://opensheet-seven.vercel.app/tools',
  },
}

const tools = [
  {
    title: 'CSV to Spreadsheet',
    description: 'Paste CSV data or upload a .csv file and instantly get a live, editable spreadsheet with a shareable link. Unlike other converters, your result is a real spreadsheet anyone can collaborate on.',
    href: '/tools/csv-to-spreadsheet',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    ),
    badge: 'Live',
  },
  {
    title: 'JSON to Spreadsheet',
    description: 'Paste an array of JSON objects and convert it into a clean spreadsheet. Nested keys are auto-flattened into columns. Perfect for API responses, database exports, or log data.',
    href: '/tools/json-to-spreadsheet',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M2 15h10" />
        <path d="M9 12l3 3-3 3" />
      </svg>
    ),
    badge: 'Live',
  },
  {
    title: 'Webhook to Spreadsheet',
    description: 'Generate a unique webhook URL. Any POST request to it automatically appends a new row to a spreadsheet. Perfect for form submissions, IoT data, and event logging.',
    href: '/tools/webhook-to-spreadsheet',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    badge: 'Coming Soon',
  },
]

export default function ToolsHub() {
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
          <a href="/docs" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Docs</a>
          <a href="/pricing" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Pricing</a>
          <a href="/signup" className="text-sm text-zinc-700 px-4 py-2 rounded-[10px] border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all active:scale-[0.98]">Get Started</a>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-24">
        <div className="max-w-2xl mb-14">
          <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-3">Free Spreadsheet Tools</h1>
          <p className="text-base text-zinc-500 leading-relaxed">
            Convert your data into live, editable spreadsheets instantly. No signup required. Every tool creates a real spreadsheet with a shareable link — not just a static file download.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group p-7 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-600 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                  {tool.icon}
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                  tool.badge === 'Live'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {tool.badge}
                </span>
              </div>
              <h2 className="text-base font-semibold text-zinc-900 mb-2">{tool.title}</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{tool.description}</p>
            </a>
          ))}
        </div>

        <div className="mt-16 p-7 rounded-2xl border border-zinc-200 bg-white">
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">Want to automate these conversions?</h2>
          <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
            Every tool on this page is powered by the OpenOfficeAI API. You can do the same thing programmatically — create spreadsheets from any data source with a single API call.
          </p>
          <div className="flex gap-3">
            <a href="/docs" className="text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 px-5 py-2.5 rounded-[10px] transition-colors active:scale-[0.98]">Read the Docs</a>
            <a href="/vs" className="text-sm font-medium text-zinc-700 border border-zinc-200 hover:border-zinc-300 px-5 py-2.5 rounded-[10px] transition-all active:scale-[0.98]">Compare Alternatives</a>
          </div>
        </div>
      </div>
    </div>
  )
}
