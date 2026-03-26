'use client'

import { useState, useRef } from 'react'

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let current = ''
  let inQuotes = false
  let row: string[] = []

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') {
        current += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        current += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        row.push(current)
        current = ''
      } else if (char === '\n' || (char === '\r' && next === '\n')) {
        row.push(current)
        current = ''
        if (row.some((c) => c.trim() !== '')) rows.push(row)
        row = []
        if (char === '\r') i++
      } else {
        current += char
      }
    }
  }
  row.push(current)
  if (row.some((c) => c.trim() !== '')) rows.push(row)
  return rows
}

export default function CsvToSpreadsheet() {
  const [csvText, setCsvText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ url: string; id: string } | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    setCsvText(text)
  }

  async function handleConvert() {
    if (!csvText.trim()) {
      setError('Please paste some CSV data or upload a file.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const rows = parseCsv(csvText)
      if (rows.length === 0) {
        setError('Could not parse any rows from the CSV data.')
        setLoading(false)
        return
      }

      // First row as headers (bold), rest as data
      const headers = rows[0]
      const dataRows = rows.slice(1)

      const cells: Record<string, { value: string | number; bold?: boolean }> = {}

      headers.forEach((h, col) => {
        const colLetter = String.fromCharCode(65 + col)
        cells[`${colLetter}1`] = { value: h.trim(), bold: true }
      })

      dataRows.forEach((row, rowIdx) => {
        row.forEach((cell, col) => {
          if (col > 25) return // A-Z only for simplicity
          const colLetter = String.fromCharCode(65 + col)
          const val = cell.trim()
          const num = Number(val)
          cells[`${colLetter}${rowIdx + 2}`] = {
            value: val !== '' && !isNaN(num) && val === String(num) ? num : val,
          }
        })
      })

      const res = await fetch('/api/v1/sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'CSV Import',
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

  const preview = csvText.trim() ? parseCsv(csvText).slice(0, 6) : []

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
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-zinc-400 mb-8">
          <a href="/tools" className="hover:text-zinc-600 transition-colors">Tools</a>
          <span>/</span>
          <span className="text-zinc-600">CSV to Spreadsheet</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-3">CSV to Spreadsheet Online</h1>
        <p className="text-base text-zinc-500 leading-relaxed mb-8 max-w-xl">
          Paste your CSV data or upload a .csv file. We will convert it into a live, editable spreadsheet with a shareable link. Unlike static file converters, your result is a real spreadsheet anyone can open and edit.
        </p>

        {/* Input area */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-zinc-700">CSV Data</label>
            <button
              onClick={() => fileRef.current?.click()}
              className="text-xs text-zinc-500 hover:text-zinc-900 border border-zinc-200 rounded-lg px-3 py-1.5 transition-colors"
            >
              Upload .csv file
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder={`Name,Email,Amount\nAlice,alice@example.com,250\nBob,bob@test.com,180\nCharlie,charlie@demo.io,320`}
            className="w-full h-48 bg-zinc-50 rounded-xl border border-zinc-100 p-4 text-sm text-zinc-800 placeholder:text-zinc-300 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all"
            style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
          />
        </div>

        {/* Preview */}
        {preview.length > 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 mb-5">
            <p className="text-sm font-medium text-zinc-700 mb-3">Preview ({preview.length > 5 ? '5' : preview.length} of {parseCsv(csvText).length} rows)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {preview.map((row, i) => (
                    <tr key={i} className="border-b border-zinc-50 last:border-0">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-3 py-2 ${i === 0 ? 'font-medium text-zinc-900' : 'text-zinc-600'}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Convert button */}
        <button
          onClick={handleConvert}
          disabled={loading || !csvText.trim()}
          className="w-full py-3 rounded-[10px] text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-colors active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Converting...' : 'Convert to Live Spreadsheet'}
        </button>

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Result */}
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
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-6">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { step: '1', title: 'Paste or upload', desc: 'Enter your CSV data in the text area or upload a .csv file from your computer.' },
              { step: '2', title: 'We parse and create', desc: 'We parse your CSV, detect headers and data types, and create a live spreadsheet via the OpenOfficeAI API.' },
              { step: '3', title: 'Share the link', desc: 'You get a unique URL. Anyone with the link can open and edit the spreadsheet in their browser.' },
            ].map((s) => (
              <div key={s.step} className="p-5 rounded-xl border border-zinc-100 bg-white">
                <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center text-xs font-bold mb-3">{s.step}</div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-1">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why this is different */}
        <div className="mt-14">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">Why this is different from other CSV converters</h2>
          <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
            <p>
              Most CSV-to-spreadsheet tools give you a file download. You get an .xlsx or .ods file, save it to your computer, and share it as an email attachment. That workflow is slow and creates version control problems.
            </p>
            <p>
              This tool creates a <strong className="text-zinc-900">live spreadsheet</strong> hosted on the web. You get a shareable URL that anyone can open in their browser. They can view and edit the data immediately, with no software to install and no account to create.
            </p>
            <p>
              Under the hood, we use the OpenOfficeAI API to create the spreadsheet. The first row of your CSV becomes bold column headers. Numeric values are automatically detected. The spreadsheet supports formulas, formatting, and real-time collaboration.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 p-7 rounded-2xl border border-zinc-200 bg-white">
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">Want to do this via API?</h2>
          <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
            Everything this tool does, you can do programmatically. Send a single POST request with your data and get back a spreadsheet URL. Perfect for automating reports, data pipelines, and AI agent workflows.
          </p>
          <div className="flex gap-3">
            <a href="/signup" className="text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 px-5 py-2.5 rounded-[10px] transition-colors active:scale-[0.98]">Get Your API Key</a>
            <a href="/docs" className="text-sm font-medium text-zinc-700 border border-zinc-200 hover:border-zinc-300 px-5 py-2.5 rounded-[10px] transition-all active:scale-[0.98]">Read the Docs</a>
          </div>
        </div>

        {/* Related tools */}
        <div className="mt-10 flex items-center gap-4 text-sm">
          <span className="text-zinc-400">Related:</span>
          <a href="/tools/json-to-spreadsheet" className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors">JSON to Spreadsheet</a>
          <a href="/tools/webhook-to-spreadsheet" className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors">Webhook to Spreadsheet</a>
        </div>

        {/* Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'CSV to Spreadsheet Online',
              description: 'Convert CSV data to a live, editable spreadsheet with a shareable link.',
              url: 'https://opensheet-seven.vercel.app/tools/csv-to-spreadsheet',
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
