import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — OpenOfficeAI',
  description: 'Guides, tutorials, and insights on API-first document creation, AI agent integrations, and spreadsheet automation.',
  openGraph: {
    title: 'Blog — OpenOfficeAI',
    description: 'Guides, tutorials, and insights on API-first document creation, AI agent integrations, and spreadsheet automation.',
    url: 'https://opensheet-seven.vercel.app/blog',
  },
}

const posts = [
  {
    slug: 'why-ai-agents-need-document-api',
    title: 'Why AI Agents Need a Document API',
    date: 'March 20, 2026',
    excerpt: 'AI agents can reason, plan, and execute. But when they need to produce a real document — a spreadsheet with formulas, an invoice with formatting — the tooling falls short. Here is why a dedicated document API changes everything.',
    readTime: '8 min read',
  },
  {
    slug: 'google-sheets-api-vs-openofficeai',
    title: 'Google Sheets API vs OpenOfficeAI: A Developer\'s Honest Comparison',
    date: 'March 15, 2026',
    excerpt: 'OAuth flows, service accounts, and scope management versus a single Bearer token. We compare setup complexity, code, pricing, and limitations — and we are honest about when Google Sheets is the better choice.',
    readTime: '9 min read',
  },
  {
    slug: 'automate-spreadsheet-creation',
    title: 'How to Automate Spreadsheet Creation With One API Call',
    date: 'March 10, 2026',
    excerpt: 'A step-by-step tutorial for creating spreadsheets programmatically using curl, Python, and JavaScript. From getting your API key to adding formulas and formatting — everything you need to get started.',
    readTime: '7 min read',
  },
]

function Nav() {
  return (
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
        <a href="/about" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">About</a>
        <a href="/docs" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Docs</a>
        <a href="/pricing" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Pricing</a>
        <a href="/login" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Log in</a>
        <a href="/signup" className="text-sm text-zinc-700 px-4 py-2 rounded-[10px] border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all active:scale-[0.98]">Get Started</a>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="border-t border-zinc-200 mt-24">
      <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[6px] bg-zinc-900 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.95" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.2" />
            </svg>
          </div>
          <span className="text-sm text-zinc-400">OpenOfficeAI</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/docs" className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors">Docs</a>
          <a href="/pricing" className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors">Pricing</a>
          <a href="/blog" className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors">Blog</a>
          <a href="/about" className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors">About</a>
        </div>
      </div>
    </footer>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-[100dvh] bg-[#fafafa]">
      <Nav />

      <main className="max-w-[800px] mx-auto px-6 pt-16 pb-24">
        <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-3">Blog</h1>
        <p className="text-base text-zinc-500 mb-12">Guides, tutorials, and insights on API-first document creation.</p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <time className="text-xs text-zinc-400">{post.date}</time>
                <span className="text-xs text-zinc-300">|</span>
                <span className="text-xs text-zinc-400">{post.readTime}</span>
              </div>
              <h2 className="text-lg font-semibold text-zinc-900 mb-2 tracking-tight">{post.title}</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
