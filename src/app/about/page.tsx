import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — OpenOfficeAI',
  description: 'OpenOfficeAI is an API-first document platform built by Arjav Jain and Vaibhav Jain. Create spreadsheets and documents programmatically with one API call.',
  openGraph: {
    title: 'About — OpenOfficeAI',
    description: 'OpenOfficeAI is an API-first document platform built by Arjav Jain and Vaibhav Jain. Create spreadsheets and documents programmatically with one API call.',
    url: 'https://opensheet-seven.vercel.app/about',
  },
}

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
        <a href="/blog" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Blog</a>
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

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] bg-[#fafafa]">
      <Nav />

      <main className="max-w-[720px] mx-auto px-6 pt-16 pb-24">
        <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-3">About OpenOfficeAI</h1>
        <p className="text-base text-zinc-500 mb-12">The document output layer for AI agents and developers.</p>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-zinc-900 mb-3">Who we are</h2>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            OpenOfficeAI is built by <span className="font-medium text-zinc-900">Arjav Jain</span> and <span className="font-medium text-zinc-900">Vaibhav Jain</span>. We are developers who spent too long wrestling with document APIs that were never designed for the way software is built today.
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            We started OpenOfficeAI because we kept running into the same problem: every time an AI agent, script, or automation needed to produce a spreadsheet or document, the integration was the hardest part. We decided to fix that.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-zinc-900 mb-3">What we build</h2>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            OpenOfficeAI is an API-first document platform. You send one API call, and you get back a fully-formed spreadsheet or document with a shareable link. Anyone can open and edit it in the browser — no account required.
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            We support spreadsheets with formulas, formatting, and multiple sheets. We support documents with rich text, headings, and structured content. Everything is exportable to XLSX, PDF, DOCX, and CSV.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-zinc-900 mb-3">The problem</h2>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            AI agents and automations are getting better at reasoning, planning, and executing. But when it comes to producing output, they are stuck. Most tools generate plain text, JSON, or markdown. When you need a real document — a spreadsheet with formulas, an invoice with proper formatting, a report that a non-technical person can open and use — the gap is enormous.
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Existing solutions like the Google Sheets API require OAuth setup, service accounts, permission scoping, and dozens of lines of boilerplate before you can write a single cell. That complexity is a tax on every developer and every AI agent that needs structured document output.
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            OpenOfficeAI removes that tax. One API key. One POST request. One shareable link.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-zinc-900 mb-3">Our vision</h2>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            We believe that in the next few years, most business documents will be generated by software — not typed by hand. Financial reports, client proposals, inventory exports, onboarding checklists, data summaries. All of it.
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            OpenOfficeAI aims to become the default document output layer for AI agents and developer tools. When any piece of software needs to produce a document, we want OpenOfficeAI to be the obvious answer.
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Simple API. Real documents. Shareable by default. That is what we are building.
          </p>
        </section>

        <section className="border-t border-zinc-200 pt-10">
          <h2 className="text-lg font-semibold text-zinc-900 mb-3">Get in touch</h2>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            We would love to hear from you — whether you are building something with our API, considering it for your product, or just have a question.
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Email us at <a href="mailto:hello@openofficeai.com" className="text-zinc-900 underline underline-offset-2">hello@openofficeai.com</a>, or get started with a <a href="/signup" className="text-zinc-900 underline underline-offset-2">free account</a>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
