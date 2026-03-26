'use client'

import { useState } from 'react'

export default function WebhookToSpreadsheet() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    // For now, just show confirmation. In production, send to a mailing list API.
    setSubmitted(true)
  }

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

      <div className="max-w-[800px] mx-auto px-6 pt-10 pb-24">
        <div className="flex items-center gap-1.5 text-sm text-zinc-400 mb-8">
          <a href="/tools" className="hover:text-zinc-600 transition-colors">Tools</a>
          <span>/</span>
          <span className="text-zinc-600">Webhook to Spreadsheet</span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900">Webhook to Spreadsheet</h1>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md border bg-amber-50 text-amber-700 border-amber-200">Coming Soon</span>
        </div>
        <p className="text-base text-zinc-500 leading-relaxed mb-10 max-w-xl">
          Generate a unique webhook URL. Every POST request sent to it automatically appends a new row to a live spreadsheet. No code, no integrations, no middleware.
        </p>

        {/* How it will work */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-7 mb-8">
          <h2 className="text-lg font-semibold text-zinc-900 mb-5">How it will work</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-1">Create a webhook endpoint</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Click a button and get a unique URL like <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>https://opensheet-seven.vercel.app/hook/abc123</code>. A blank spreadsheet is created and linked to this URL.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-1">Send POST requests</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Any JSON payload sent to your webhook URL is parsed and appended as a new row. Keys become column headers (auto-detected on the first request).</p>
                <pre className="mt-3 bg-[#18181b] text-zinc-300 rounded-xl p-4 text-[13px] leading-[1.8] overflow-x-auto border border-zinc-800" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
{`curl -X POST https://opensheet-seven.vercel.app/hook/abc123 \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Alice", "event": "signup", "timestamp": "2026-03-24"}'`}
                </pre>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-1">View the live spreadsheet</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Open the spreadsheet link and watch rows appear in real time. Share the link with your team. Sort, filter, and add formulas to analyze incoming data.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Use cases */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-7 mb-8">
          <h2 className="text-lg font-semibold text-zinc-900 mb-5">Use cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Form submissions', desc: 'Point your Typeform, Tally, or custom form webhook at this URL. Every submission becomes a spreadsheet row.' },
              { title: 'IoT and sensor data', desc: 'Have devices POST readings (temperature, humidity, GPS) to your webhook. Analyze trends in a spreadsheet.' },
              { title: 'Event logging', desc: 'Log Stripe payments, GitHub events, or Slack messages to a spreadsheet for easy review and sharing.' },
              { title: 'Zapier/Make alternative', desc: 'Skip the middleware. Instead of Zapier -> Google Sheets, point your trigger directly at this webhook.' },
            ].map((c) => (
              <div key={c.title} className="p-4 rounded-xl border border-zinc-100">
                <h3 className="text-sm font-semibold text-zinc-900 mb-1">{c.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email capture */}
        <div className="rounded-2xl border border-zinc-900 bg-zinc-900 p-7 text-white">
          <h2 className="text-lg font-semibold mb-2">Get notified when this launches</h2>
          <p className="text-sm text-zinc-400 mb-5 leading-relaxed">
            We are building this right now. Leave your email and we will let you know as soon as webhook-to-spreadsheet is live. Early subscribers get 1,000 free webhook calls.
          </p>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-700/30">
              <p className="text-sm text-emerald-300 font-medium">You are on the list. We will email you when this launches.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-[10px] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-zinc-500 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-[10px] bg-white text-zinc-900 text-sm font-medium hover:bg-zinc-100 transition-colors active:scale-[0.98] shrink-0"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>

        {/* In the meantime */}
        <div className="mt-14">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">In the meantime</h2>
          <p className="text-sm text-zinc-500 leading-relaxed mb-4">
            You can already create spreadsheets programmatically using the OpenOfficeAI API. If your webhook source can run a small script (or you use a tool like Zapier), you can call our API to append rows to a spreadsheet today.
          </p>
          <pre className="bg-[#18181b] text-zinc-300 rounded-xl p-5 text-[13px] leading-[1.8] overflow-x-auto border border-zinc-800 mb-6" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
{`// Example: create a spreadsheet with data from a webhook payload
const res = await fetch("https://opensheet-seven.vercel.app/api/v1/sheets", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  },
  body: JSON.stringify({
    title: "Webhook Log",
    sheets: [{
      name: "Events",
      rows: [
        ["Timestamp", "Event", "User", "Data"],
        [payload.timestamp, payload.event, payload.user, payload.data]
      ]
    }]
  })
});

const { url } = await res.json();
console.log("Spreadsheet:", url);`}
          </pre>
          <div className="flex gap-3">
            <a href="/signup" className="text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 px-5 py-2.5 rounded-[10px] transition-colors active:scale-[0.98]">Get Your API Key</a>
            <a href="/docs" className="text-sm font-medium text-zinc-700 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 px-5 py-2.5 rounded-[10px] transition-all active:scale-[0.98]">Read the Docs</a>
          </div>
        </div>

        {/* Related */}
        <div className="mt-10 flex items-center gap-4 text-sm">
          <span className="text-zinc-400">Related:</span>
          <a href="/tools/csv-to-spreadsheet" className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors">CSV to Spreadsheet</a>
          <a href="/tools/json-to-spreadsheet" className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors">JSON to Spreadsheet</a>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Webhook to Spreadsheet',
              description: 'Generate a unique webhook URL that appends every POST request as a new row in a live spreadsheet.',
              url: 'https://opensheet-seven.vercel.app/tools/webhook-to-spreadsheet',
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              creator: {
                '@type': 'Organization',
                name: 'OpenOfficeAI',
                url: 'https://opensheet-seven.vercel.app',
              },
            }),
          }}
        />
      </div>
    </div>
  )
}
