import { Metadata } from 'next'
import Link from 'next/link'
import { templates } from '@/data/templates'

export const metadata: Metadata = {
  title: 'Free Spreadsheet Templates',
  description:
    'Browse free spreadsheet templates for invoices, budgets, project trackers, CRM, and more. Create any template instantly via API or use it in the browser editor.',
  alternates: {
    canonical: 'https://opensheet-seven.vercel.app/templates',
  },
  openGraph: {
    title: 'Free Spreadsheet Templates — OpenOfficeAI',
    description:
      'Browse free spreadsheet templates for invoices, budgets, project trackers, CRM, and more. Create any template instantly via API.',
    url: 'https://opensheet-seven.vercel.app/templates',
  },
}

const categoryColors: Record<string, string> = {
  Finance: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Project Management': 'bg-blue-50 text-blue-700 border-blue-200',
  Productivity: 'bg-violet-50 text-violet-700 border-violet-200',
  Marketing: 'bg-pink-50 text-pink-700 border-pink-200',
  HR: 'bg-amber-50 text-amber-700 border-amber-200',
  Operations: 'bg-orange-50 text-orange-700 border-orange-200',
  Sales: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Engineering: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  Product: 'bg-indigo-50 text-indigo-700 border-indigo-200',
}

export default function TemplatesPage() {
  return (
    <div className="min-h-[100dvh] bg-[#fafafa]">
      {/* Nav */}
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
          <a href="/docs" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">
            Docs
          </a>
          <a href="/pricing" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">
            Pricing
          </a>
          <a
            href="/signup"
            className="text-sm text-zinc-700 px-4 py-2 rounded-[10px] border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all active:scale-[0.98]"
          >
            Get Started
          </a>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-24">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-3">
            Free Spreadsheet Templates
          </h1>
          <p className="text-base text-zinc-500 max-w-xl mx-auto">
            Start with a template, customize it in the browser, or create it programmatically via the API.
            Every template is free to use.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((template) => (
            <Link
              key={template.slug}
              href={`/templates/${template.slug}`}
              className="group p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-[15px] font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                  {template.name}
                </h2>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md border shrink-0 ${
                    categoryColors[template.category] || 'bg-zinc-100 text-zinc-600 border-zinc-200'
                  }`}
                >
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                {template.description.slice(0, 160)}...
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-400">
                <span>{template.columns.length} columns</span>
                <span className="text-zinc-300">·</span>
                <span>{template.sampleRows.length} sample rows</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-zinc-500 mb-4">
            Need a custom template? Create any spreadsheet structure with a single API call.
          </p>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 px-5 py-2.5 rounded-[10px] border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all active:scale-[0.98]"
          >
            Read the API docs
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
