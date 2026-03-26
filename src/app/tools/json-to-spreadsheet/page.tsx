'use client'

import { useState } from 'react'

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string | number | boolean> {
  const result: Record<string, string | number | boolean> = {}
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const val = obj[key]
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val as Record<string, unknown>, fullKey))
    } else if (Array.isArray(val)) {
      result[fullKey] = val.join(', ')
    } else if (val === null || val === undefined) {
      result[fullKey] = ''
    } else {
      result[fullKey] = val as string | number | boolean
    }
  }
  return result
}

function jsonToRows(data: unknown[]): { headers: string[]; rows: (string | number | boolean)[][] } {
  const flattened = data.map((item) =>
    typeof item === 'object' && item !== null ? flattenObject(item as Record<string, unknown>) : { value: String(item) }
  )

  const headerSet = new Set<string>()
  flattened.forEach((row) => Object.keys(row).forEach((k) => headerSet.add(k)))
  const headers = Array.from(headerSet)

  const rows = flattened.map((row) => headers.map((h) => row[h] ?? ''))

  return { headers, rows }
}

export default function JsonToSpreadsheet() {
  const [jsonText, setJsonText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ url: string; id: string } | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleConvert() {
    if (!jsonText.trim()) {
      setError('Please paste some JSON data.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      let parsed: unknown
      try {
        parsed = JSON.parse(jsonText)
      } catch {
        setError('Invalid JSON. Please check your syntax and try again.')
        setLoading(false)
        return
      }

      // Accept array of objects or a single object
      const items = Array.isArray(parsed) ? parsed : [parsed]

      if (items.length === 0) {
        setError('The JSON array is empty.')
        setLoading(false)
        return
      }

      const { headers, rows } = jsonToRows(items)

      const cells: Record<string, { value: string | number | boolean; bold?: boolean }> = {}

      headers.forEach((h, col) => {
        if (col > 25) return
        const colLetter = String.fromCharCode(65 + col)
        cells[`${colLetter}1`] = { value: h, bold: true }
      })

      rows.forEach((row, rowIdx) => {
        row.forEach((cell, col) => {
          if (col > 25) return
          const colLetter = String.fromCharCode(65 + col)
          cells[`${colLetter}${rowIdx + 2}`] = { value: cell }
        })
      })

      const res = await fetch('/api/v1/sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'JSON Import',
          sheets: [{ name: 'Sheet1', cells }],
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `API returned ${res.status}`)
      }

      const data = await res.json()
      setResult({ url: data.url, id: data.id })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!result) return
    navigator.clipboard.writeText(result.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Preview
  let preview: { headers: string[]; rows: (string | number | boolean)[][] } | null = null
  try {
    const parsed = JSON.parse(jsonText)
    const items = Array.isArray(parsed) ? parsed : [parsed]
    if (items.length > 0) {
      const full = jsonToRows(items)
      preview = { headers: full.headers, rows: full.rows.slice(0, 5) }
    }
  } catch {
    // invalid json, no preview
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
          <span className="text-zinc-600">JSON to Spreadsheet</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-3">JSON to Spreadsheet Online</h1>
        <p className="text-base text-zinc-500 leading-relaxed mb-8 max-w-xl">
          Paste a JSON array of objects and convert it into a live, editable spreadsheet. Nested keys are automatically flattened into dot-notation columns. Numbers, strings, and booleans are preserved.
        </p>

        {/* Input */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 mb-5">
          <label className="text-sm font-medium text-zinc-700 mb-3 block">JSON Data</label>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder={`[\n  { "name": "Alice", "email": "alice@example.com", "plan": { "type": "pro", "price": 12 } },\n  { "name": "Bob", "email": "bob@test.com", "plan": { "type": "free", "price": 0 } }\n]`}
            className="w-full h-56 bg-zinc-50 rounded-xl border border-zinc-100 p-4 text-sm text-zinc-800 placeholder:text-zinc-300 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all"
            style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
          />
        </div>

        {/* Preview */}
        {preview && preview.headers.length > 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 mb-5 overflow-x-auto">
            <p className="text-sm font-medium text-zinc-700 mb-3">Preview (flattened)</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  {preview.headers.map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-zinc-500 px-3 py-2" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((row, i) => (
                  <tr key={i} className="border-b border-zinc-50 last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className="px-3 py-2 text-zinc-600">{String(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={handleConvert}
          disabled={loading || !jsonText.trim()}
          className="w-full py-3 rounded-[10px] text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-colors active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Converting...' : 'Convert to Live Spreadsheet'}
        </button>

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-5 p-5 rounded-2xl border border-emerald-200 bg-emerald-50">
            <p className="text-sm font-medium text-emerald-800 mb-3">Your spreadsheet is ready!</p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={result.url}
                className="flex-1 bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm text-zinc-700"
                style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-700 text-white hover:bg-emerald-600 transition-colors shrink-0"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-emerald-700 hover:text-emerald-900 underline underline-offset-2"
            >
              Open spreadsheet in new tab
            </a>
          </div>
        )}

        {/* How it works */}
        <div className="mt-14">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-6">How JSON flattening works</h2>
          <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
            <p>
              When you paste a JSON array of objects, we extract every unique key to create column headers. Nested objects are flattened using dot notation. For example, <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{"{ \"user\": { \"name\": \"Alice\" } }"}</code> becomes a column called <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>user.name</code>.
            </p>
            <p>
              Arrays within objects are joined with commas into a single cell value. Numbers stay as numbers (so you can use spreadsheet formulas on them). Booleans are preserved as-is. Null values become empty cells.
            </p>
            <p>
              The resulting spreadsheet is fully editable. You can add formulas, change formatting, sort columns, and share the link with anyone. No software to install, no account required to view.
            </p>
          </div>
        </div>

        {/* Use cases */}
        <div className="mt-14">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-6">Common use cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'API response inspection', desc: 'Paste a JSON API response to quickly visualize and share the data in spreadsheet format.' },
              { title: 'Database exports', desc: 'Export a collection from MongoDB or Firestore, paste it here, and get a spreadsheet for non-technical teammates.' },
              { title: 'Log analysis', desc: 'Convert structured log entries into a spreadsheet for filtering, sorting, and pattern detection.' },
              { title: 'Configuration review', desc: 'Turn JSON config files into a readable table to review with your team.' },
            ].map((c) => (
              <div key={c.title} className="p-5 rounded-xl border border-zinc-100 bg-white">
                <h3 className="text-sm font-semibold text-zinc-900 mb-1">{c.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 p-7 rounded-2xl border border-zinc-200 bg-white">
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">Automate this with our API</h2>
          <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
            Convert JSON to spreadsheets programmatically. One POST request creates a spreadsheet and returns a shareable URL. Ideal for automated reporting, data pipelines, and AI agent integrations.
          </p>
          <div className="flex gap-3">
            <a href="/signup" className="text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 px-5 py-2.5 rounded-[10px] transition-colors active:scale-[0.98]">Get Your API Key</a>
            <a href="/docs" className="text-sm font-medium text-zinc-700 border border-zinc-200 hover:border-zinc-300 px-5 py-2.5 rounded-[10px] transition-all active:scale-[0.98]">Read the Docs</a>
          </div>
        </div>

        {/* Related */}
        <div className="mt-10 flex items-center gap-4 text-sm">
          <span className="text-zinc-400">Related:</span>
          <a href="/tools/csv-to-spreadsheet" className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors">CSV to Spreadsheet</a>
          <a href="/tools/webhook-to-spreadsheet" className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors">Webhook to Spreadsheet</a>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'JSON to Spreadsheet Online',
              description: 'Convert JSON arrays to live, editable spreadsheets with shareable links.',
              url: 'https://opensheet-seven.vercel.app/tools/json-to-spreadsheet',
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
