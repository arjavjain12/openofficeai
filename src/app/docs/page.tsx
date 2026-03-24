'use client'

import { useState } from 'react'

function Badge({ text, color }: { text: string; color: string }) {
  const styles: Record<string, string> = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    zinc: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  }
  return (
    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${styles[color]}`} style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
      {text}
    </span>
  )
}

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#18181b] text-zinc-300 rounded-xl p-5 text-[13px] leading-[1.8] overflow-x-auto border border-zinc-800" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
      {children}
    </pre>
  )
}

function Field({ name, type, required, children }: { name: string; type: string; required?: boolean; children: string }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-zinc-100 last:border-0">
      <div className="w-44 shrink-0">
        <code className="text-[13px] font-medium text-zinc-900" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{name}</code>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[11px] text-zinc-400" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{type}</span>
          {required && <span className="text-[10px] text-red-500 font-medium">required</span>}
        </div>
      </div>
      <p className="text-sm text-zinc-500 leading-relaxed">{children}</p>
    </div>
  )
}

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'quickstart', label: 'Quick Start' },
  { id: 'auth', label: 'Authentication' },
  { id: 'create-sheet', label: 'Create Sheet' },
  { id: 'create-sheet-cells', label: 'Formatting & Formulas' },
  { id: 'create-doc', label: 'Create Document' },
  { id: 'get', label: 'Get Document' },
  { id: 'update', label: 'Update Document' },
  { id: 'delete', label: 'Delete Document' },
  { id: 'download', label: 'Download / Export' },
  { id: 'sharing', label: 'Sharing & Permissions' },
  { id: 'limits', label: 'Rate Limits' },
  { id: 'errors', label: 'Errors' },
]

export default function DocsPage() {
  const [active, setActive] = useState('overview')

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-zinc-100">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-14">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[8px] bg-zinc-900 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.95" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.2" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight">OpenOfficeAI</span>
            <span className="text-zinc-300 mx-1">/</span>
            <span className="text-sm text-zinc-500">API Docs</span>
          </a>
          <div className="flex gap-3">
            <a href="/dashboard" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Dashboard</a>
            <a href="/pricing" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Pricing</a>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 space-y-0.5">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActive(item.id)}
                  className={`block text-[13px] py-1.5 px-2.5 rounded-lg transition-colors ${active === item.id ? 'text-zinc-900 bg-zinc-100 font-medium' : 'text-zinc-400 hover:text-zinc-700'}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <main className="min-w-0 space-y-20">

            {/* Overview */}
            <section id="overview" className="scroll-mt-24">
              <h1 className="text-2xl font-semibold tracking-tighter mb-3">API Reference</h1>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl mb-6">
                OpenOfficeAI lets you create spreadsheets and documents with a single API call. You get back a shareable URL that opens a full editor in the browser. No SDK needed — just HTTP.
              </p>
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                <p className="text-xs text-zinc-400 mb-1">Base URL</p>
                <code className="text-sm text-zinc-900" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>https://opensheet-seven.vercel.app</code>
              </div>
            </section>

            {/* Quick Start */}
            <section id="quickstart" className="scroll-mt-24">
              <h2 className="text-lg font-semibold tracking-tight mb-4">Quick Start</h2>
              <p className="text-sm text-zinc-500 mb-4">Create a spreadsheet in 3 steps:</p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-zinc-900 mb-2">1. Get an API key</p>
                  <p className="text-sm text-zinc-500 mb-2">Sign up at <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">/signup</code>, then go to Dashboard and generate an API key.</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-900 mb-2">2. Create a spreadsheet</p>
                  <Code>{`curl -X POST https://opensheet-seven.vercel.app/api/v1/sheets \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My First Sheet",
    "sheets": [{
      "rows": [
        ["Name", "Email", "Role"],
        ["Arjav Jain", "arjav@example.com", "Founder"],
        ["Vaibhav Jain", "vaibhav@example.com", "Co-founder"]
      ]
    }]
  }'`}</Code>
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-900 mb-2">3. Open the link</p>
                  <p className="text-sm text-zinc-500">The response includes a <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">url</code> field. Open it in a browser — full spreadsheet editor, instantly shareable.</p>
                  <Code>{`{
  "id": "x7k2m9p3",
  "url": "https://opensheet-seven.vercel.app/s/x7k2m9p3",
  "type": "sheet",
  "title": "My First Sheet",
  "edit_token": "tok_...",
  "created_at": "2026-03-24T10:00:00.000Z"
}`}</Code>
                </div>
              </div>
            </section>

            {/* Auth */}
            <section id="auth" className="scroll-mt-24">
              <h2 className="text-lg font-semibold tracking-tight mb-4">Authentication</h2>
              <p className="text-sm text-zinc-500 mb-4">All write operations (POST, PUT, DELETE) require a Bearer token. GET requests are public and free.</p>
              <Code>{`Authorization: Bearer YOUR_API_KEY`}</Code>
              <p className="text-sm text-zinc-500 mt-4">Generate API keys from your <a href="/dashboard" className="text-zinc-900 underline">Dashboard</a> under the API Keys tab.</p>
            </section>

            {/* Create Sheet */}
            <section id="create-sheet" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold tracking-tight">Create a Spreadsheet</h2>
                <Badge text="POST" color="blue" />
              </div>
              <div className="mb-4 px-3.5 py-2 bg-zinc-50 border border-zinc-100 rounded-lg">
                <code className="text-sm text-zinc-700" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>/api/v1/sheets</code>
              </div>
              <p className="text-sm text-zinc-500 mb-6">Creates a new spreadsheet with optional pre-filled data. Returns a shareable URL.</p>

              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Request Body</p>
              <div className="border border-zinc-100 rounded-xl p-4 mb-6">
                <Field name="title" type="string">Title shown in the editor tab and dashboard. Defaults to &quot;Untitled Spreadsheet&quot;.</Field>
                <Field name="sheets" type="array">Array of sheet objects. Each sheet becomes a tab in the spreadsheet.</Field>
                <Field name="sheets[].name" type="string">Tab name (e.g. &quot;Revenue&quot;, &quot;Q1 Data&quot;). Defaults to &quot;Sheet1&quot;.</Field>
                <Field name="sheets[].rows" type="array">Simple 2D array. First row is typically headers. Each inner array is one row. Values can be strings, numbers, or booleans.</Field>
                <Field name="sheets[].cells" type="object">Cell-by-cell data keyed by cell reference (e.g. &quot;A1&quot;, &quot;B2&quot;). Use this instead of rows when you need formatting or formulas. See next section.</Field>
              </div>

              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Example — Simple rows</p>
              <Code>{`curl -X POST https://opensheet-seven.vercel.app/api/v1/sheets \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Sales Report Q1",
    "sheets": [
      {
        "name": "Revenue",
        "rows": [
          ["Product", "Revenue", "Units Sold"],
          ["Widget A", 50000, 1200],
          ["Widget B", 32000, 800],
          ["Widget C", 78000, 2100]
        ]
      },
      {
        "name": "Costs",
        "rows": [
          ["Category", "Amount"],
          ["Marketing", 12000],
          ["Engineering", 45000]
        ]
      }
    ]
  }'`}</Code>

              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3 mt-8">Response</p>
              <Code>{`{
  "id": "x7k2m9p3",
  "type": "sheet",
  "title": "Sales Report Q1",
  "url": "https://opensheet-seven.vercel.app/s/x7k2m9p3",
  "edit_token": "tok_NEwHxoaxrJ1bILIa...",
  "created_at": "2026-03-24T10:00:00.000Z"
}`}</Code>
            </section>

            {/* Create Sheet — Cells */}
            <section id="create-sheet-cells" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold tracking-tight">Formatting & Formulas</h2>
                <Badge text="POST" color="blue" />
              </div>
              <p className="text-sm text-zinc-500 mb-6">Use the <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">cells</code> object instead of <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">rows</code> for per-cell control. Keys are cell references like &quot;A1&quot;, &quot;B2&quot;, etc.</p>

              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Cell Properties</p>
              <div className="border border-zinc-100 rounded-xl p-4 mb-6">
                <Field name="value" type="string | number">The cell value.</Field>
                <Field name="formula" type="string">Excel-style formula. Must start with = (e.g. &quot;=SUM(B2:B10)&quot;, &quot;=A1*1.1&quot;). Supports 400+ functions.</Field>
                <Field name="bold" type="boolean">Bold the cell text.</Field>
                <Field name="italic" type="boolean">Italicize the cell text.</Field>
                <Field name="fontSize" type="number">Font size in points (e.g. 14).</Field>
                <Field name="fontColor" type="string">Text color as hex (e.g. &quot;#ff0000&quot; for red).</Field>
                <Field name="bgColor" type="string">Background color as hex (e.g. &quot;#f0f0f0&quot; for light gray).</Field>
              </div>

              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Example</p>
              <Code>{`curl -X POST https://opensheet-seven.vercel.app/api/v1/sheets \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Budget Calculator",
    "sheets": [{
      "name": "Summary",
      "cells": {
        "A1": { "value": "Category", "bold": true, "bgColor": "#1e1e1e", "fontColor": "#ffffff" },
        "B1": { "value": "Budget", "bold": true, "bgColor": "#1e1e1e", "fontColor": "#ffffff" },
        "C1": { "value": "Actual", "bold": true, "bgColor": "#1e1e1e", "fontColor": "#ffffff" },
        "D1": { "value": "Diff", "bold": true, "bgColor": "#1e1e1e", "fontColor": "#ffffff" },
        "A2": { "value": "Marketing" },
        "B2": { "value": 15000 },
        "C2": { "value": 12300 },
        "D2": { "formula": "=B2-C2" },
        "A3": { "value": "Engineering" },
        "B3": { "value": 50000 },
        "C3": { "value": 48700 },
        "D3": { "formula": "=B3-C3" },
        "A4": { "value": "Total", "bold": true },
        "B4": { "formula": "=SUM(B2:B3)", "bold": true },
        "C4": { "formula": "=SUM(C2:C3)", "bold": true },
        "D4": { "formula": "=B4-C4", "bold": true, "fontColor": "#10b981" }
      }
    }]
  }'`}</Code>
            </section>

            {/* Create Doc */}
            <section id="create-doc" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold tracking-tight">Create a Document</h2>
                <Badge text="POST" color="blue" />
              </div>
              <div className="mb-4 px-3.5 py-2 bg-zinc-50 border border-zinc-100 rounded-lg">
                <code className="text-sm text-zinc-700" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>/api/v1/docs</code>
              </div>
              <p className="text-sm text-zinc-500 mb-6">Creates a rich text document with headings, paragraphs, and formatting.</p>

              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Content Block Properties</p>
              <div className="border border-zinc-100 rounded-xl p-4 mb-6">
                <Field name="type" type="string" required>&quot;heading&quot; or &quot;paragraph&quot;. Determines how the block is rendered.</Field>
                <Field name="text" type="string" required>The text content of the block.</Field>
                <Field name="level" type="number">Heading level from 1 (largest) to 5 (smallest). Only applies when type is &quot;heading&quot;.</Field>
                <Field name="bold" type="boolean">Bold the entire block.</Field>
                <Field name="italic" type="boolean">Italicize the entire block.</Field>
                <Field name="color" type="string">Text color as hex.</Field>
              </div>

              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Example</p>
              <Code>{`curl -X POST https://opensheet-seven.vercel.app/api/v1/docs \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Project Brief",
    "content": [
      { "type": "heading", "level": 1, "text": "Project Brief: OpenOfficeAI" },
      { "type": "heading", "level": 2, "text": "Overview" },
      { "type": "paragraph", "text": "OpenOfficeAI is an API-first document platform that lets developers and AI agents create spreadsheets and documents programmatically." },
      { "type": "heading", "level": 2, "text": "Goals" },
      { "type": "paragraph", "text": "1. Launch public beta by end of March" },
      { "type": "paragraph", "text": "2. Reach 500 API keys in first month" },
      { "type": "paragraph", "text": "3. Achieve $2k MRR by Q2" },
      { "type": "heading", "level": 2, "text": "Timeline" },
      { "type": "paragraph", "text": "Week 1: API docs + SDK. Week 2: Stripe billing. Week 3: Product Hunt launch." }
    ]
  }'`}</Code>
            </section>

            {/* Get */}
            <section id="get" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold tracking-tight">Get a Document</h2>
                <Badge text="GET" color="green" />
              </div>
              <div className="mb-4 px-3.5 py-2 bg-zinc-50 border border-zinc-100 rounded-lg">
                <code className="text-sm text-zinc-700" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>/api/v1/sheets/:id</code>
                <span className="text-zinc-300 mx-2">or</span>
                <code className="text-sm text-zinc-700" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>/api/v1/docs/:id</code>
              </div>
              <p className="text-sm text-zinc-500 mb-4">Retrieve a document by ID. Returns the full data. <strong>No authentication required</strong> — anyone with the ID can read it.</p>
              <Code>{`curl https://opensheet-seven.vercel.app/api/v1/sheets/x7k2m9p3`}</Code>
            </section>

            {/* Update */}
            <section id="update" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold tracking-tight">Update a Document</h2>
                <Badge text="PUT" color="amber" />
              </div>
              <div className="mb-4 px-3.5 py-2 bg-zinc-50 border border-zinc-100 rounded-lg">
                <code className="text-sm text-zinc-700" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>/api/v1/sheets/:id</code>
                <span className="text-zinc-300 mx-2">or</span>
                <code className="text-sm text-zinc-700" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>/api/v1/docs/:id</code>
              </div>
              <p className="text-sm text-zinc-500 mb-4">Replace the document data. Requires authentication. The <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">data</code> field should contain the full Univer snapshot object (the same format returned by GET).</p>
              <Code>{`curl -X PUT https://opensheet-seven.vercel.app/api/v1/sheets/x7k2m9p3 \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "data": { ... } }'`}</Code>
            </section>

            {/* Delete */}
            <section id="delete" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold tracking-tight">Delete a Document</h2>
                <Badge text="DELETE" color="red" />
              </div>
              <div className="mb-4 px-3.5 py-2 bg-zinc-50 border border-zinc-100 rounded-lg">
                <code className="text-sm text-zinc-700" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>/api/v1/sheets/:id</code>
                <span className="text-zinc-300 mx-2">or</span>
                <code className="text-sm text-zinc-700" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>/api/v1/docs/:id</code>
              </div>
              <p className="text-sm text-zinc-500 mb-4">Permanently delete a document. Requires authentication. This cannot be undone.</p>
              <Code>{`curl -X DELETE https://opensheet-seven.vercel.app/api/v1/sheets/x7k2m9p3 \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</Code>
            </section>

            {/* Download */}
            <section id="download" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold tracking-tight">Download / Export</h2>
                <Badge text="GET" color="green" />
              </div>
              <div className="mb-4 px-3.5 py-2 bg-zinc-50 border border-zinc-100 rounded-lg">
                <code className="text-sm text-zinc-700" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>/api/v1/download/:id?format=FORMAT</code>
              </div>
              <p className="text-sm text-zinc-500 mb-4">Export a document in various formats. No authentication required.</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl border border-zinc-100">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Spreadsheet Formats</p>
                  <div className="space-y-1.5 text-sm text-zinc-600">
                    <p><code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">xlsx</code> — Excel workbook</p>
                    <p><code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">csv</code> — Comma-separated values</p>
                    <p><code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">html</code> — HTML table</p>
                    <p><code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">json</code> — Raw JSON snapshot</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-zinc-100">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Document Formats</p>
                  <div className="space-y-1.5 text-sm text-zinc-600">
                    <p><code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">pdf</code> — PDF document</p>
                    <p><code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">docx</code> — Word document</p>
                    <p><code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">txt</code> — Plain text</p>
                    <p><code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">json</code> — Raw JSON snapshot</p>
                  </div>
                </div>
              </div>

              <Code>{`# Download spreadsheet as Excel
curl -O https://opensheet-seven.vercel.app/api/v1/download/x7k2m9p3?format=xlsx

# Download document as PDF
curl -O https://opensheet-seven.vercel.app/api/v1/download/p3n8q2w1?format=pdf`}</Code>
            </section>

            {/* Sharing */}
            <section id="sharing" className="scroll-mt-24">
              <h2 className="text-lg font-semibold tracking-tight mb-4">Sharing & Permissions</h2>
              <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
                <p><strong>Viewing:</strong> Anyone with the document URL can view it. No account needed. The URL format is <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">/s/:id</code> for sheets and <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">/d/:id</code> for docs.</p>
                <p><strong>Editing:</strong> Requires a signed-in account. Anonymous visitors see a &quot;Sign in to edit&quot; button. Edits auto-save every 2 seconds.</p>
                <p><strong>API access:</strong> GET requests are public. POST/PUT/DELETE require a valid API key via the Authorization header.</p>
              </div>
            </section>

            {/* Rate Limits */}
            <section id="limits" className="scroll-mt-24">
              <h2 className="text-lg font-semibold tracking-tight mb-4">Rate Limits</h2>
              <p className="text-sm text-zinc-500 mb-4">API calls are counted per user per month. GET requests are free and unlimited. Usage resets on the 1st of each month.</p>

              <div className="border border-zinc-100 rounded-xl overflow-hidden mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-widest">Plan</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-widest">Price</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-widest">API Calls / month</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-widest">Documents</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-widest">Overage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-50">
                      <td className="px-4 py-2.5 font-medium text-zinc-900">Free</td>
                      <td className="px-4 py-2.5 text-zinc-500">$0</td>
                      <td className="px-4 py-2.5 text-zinc-500">500</td>
                      <td className="px-4 py-2.5 text-zinc-500">25</td>
                      <td className="px-4 py-2.5 text-zinc-400">Blocked</td>
                    </tr>
                    <tr className="border-b border-zinc-50">
                      <td className="px-4 py-2.5 font-medium text-zinc-900">Pro</td>
                      <td className="px-4 py-2.5 text-zinc-500">$12/mo</td>
                      <td className="px-4 py-2.5 text-zinc-500">25,000</td>
                      <td className="px-4 py-2.5 text-zinc-500">Unlimited</td>
                      <td className="px-4 py-2.5 text-zinc-400">$0.002/call</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-medium text-zinc-900">Scale</td>
                      <td className="px-4 py-2.5 text-zinc-500">$49/mo</td>
                      <td className="px-4 py-2.5 text-zinc-500">200,000</td>
                      <td className="px-4 py-2.5 text-zinc-500">Unlimited</td>
                      <td className="px-4 py-2.5 text-zinc-400">$0.001/call</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-zinc-500">When you hit the limit, the API returns <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">429 Too Many Requests</code>. Existing documents remain accessible.</p>
            </section>

            {/* Errors */}
            <section id="errors" className="scroll-mt-24">
              <h2 className="text-lg font-semibold tracking-tight mb-4">Error Responses</h2>
              <p className="text-sm text-zinc-500 mb-4">All errors return JSON with an <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">error</code> field.</p>

              <div className="border border-zinc-100 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-widest">Status</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-widest">Meaning</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-400 uppercase tracking-widest">Body</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-50">
                      <td className="px-4 py-2.5"><Badge text="400" color="zinc" /></td>
                      <td className="px-4 py-2.5 text-zinc-600">Bad request — invalid JSON or missing fields</td>
                      <td className="px-4 py-2.5 text-zinc-400" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{`{"error": "Invalid request"}`}</td>
                    </tr>
                    <tr className="border-b border-zinc-50">
                      <td className="px-4 py-2.5"><Badge text="401" color="zinc" /></td>
                      <td className="px-4 py-2.5 text-zinc-600">Missing or invalid API key</td>
                      <td className="px-4 py-2.5 text-zinc-400" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{`{"error": "Authentication required"}`}</td>
                    </tr>
                    <tr className="border-b border-zinc-50">
                      <td className="px-4 py-2.5"><Badge text="404" color="zinc" /></td>
                      <td className="px-4 py-2.5 text-zinc-600">Document not found</td>
                      <td className="px-4 py-2.5 text-zinc-400" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{`{"error": "Not found"}`}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5"><Badge text="429" color="zinc" /></td>
                      <td className="px-4 py-2.5 text-zinc-600">Rate limit exceeded</td>
                      <td className="px-4 py-2.5 text-zinc-400" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{`{"error": "API call limit reached..."}`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  )
}
