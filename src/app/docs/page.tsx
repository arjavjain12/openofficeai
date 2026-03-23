'use client'

import { useState } from 'react'

const sections = [
  {
    id: 'auth',
    title: 'Authentication',
    content: `All API requests require a Bearer token. Generate an API key from your Dashboard → API Keys tab.

Include it in every request:`,
    code: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://opensheet-seven.vercel.app/api/v1/sheets`,
  },
  {
    id: 'create-sheet',
    title: 'Create a Spreadsheet',
    method: 'POST',
    endpoint: '/api/v1/sheets',
    desc: 'Creates a new spreadsheet and returns a shareable link.',
    request: `{
  "title": "Q1 Sales Report",
  "sheets": [
    {
      "name": "Revenue",
      "rows": [
        ["Product", "Revenue", "Units"],
        ["Widget A", 50000, 1200],
        ["Widget B", 32000, 800]
      ]
    }
  ]
}`,
    requestFields: [
      { name: 'title', type: 'string', required: false, desc: 'Document title. Defaults to "Untitled Spreadsheet".' },
      { name: 'sheets', type: 'array', required: false, desc: 'Array of sheet objects.' },
      { name: 'sheets[].name', type: 'string', required: false, desc: 'Sheet tab name. Defaults to "Sheet1".' },
      { name: 'sheets[].rows', type: 'array', required: false, desc: '2D array of cell values (strings, numbers, booleans).' },
      { name: 'sheets[].cells', type: 'object', required: false, desc: 'Cell-by-cell data keyed by reference (e.g. "A1"). Supports value, formula, bold, italic, fontSize, fontColor, bgColor.' },
    ],
    response: `{
  "id": "x7k2m9p3",
  "type": "sheet",
  "title": "Q1 Sales Report",
  "url": "https://opensheet-seven.vercel.app/s/x7k2m9p3",
  "edit_token": "tok_NEwHxo...",
  "created_at": "2026-03-23T10:00:00.000Z"
}`,
    curl: `curl -X POST https://opensheet-seven.vercel.app/api/v1/sheets \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Q1 Sales Report",
    "sheets": [{
      "rows": [
        ["Product", "Revenue"],
        ["Widget A", 50000]
      ]
    }]
  }'`,
  },
  {
    id: 'create-sheet-advanced',
    title: 'Create with Formatting & Formulas',
    method: 'POST',
    endpoint: '/api/v1/sheets',
    desc: 'Use the cells object for per-cell control over values, formulas, and styling.',
    request: `{
  "title": "Formatted Report",
  "sheets": [{
    "name": "Summary",
    "cells": {
      "A1": { "value": "Product", "bold": true, "bgColor": "#f0f0f0" },
      "B1": { "value": "Revenue", "bold": true, "bgColor": "#f0f0f0" },
      "A2": { "value": "Widget A" },
      "B2": { "value": 50000 },
      "A3": { "value": "Widget B" },
      "B3": { "value": 32000 },
      "A4": { "value": "Total", "bold": true },
      "B4": { "formula": "=SUM(B2:B3)", "bold": true }
    }
  }]
}`,
    requestFields: [
      { name: 'cells[ref].value', type: 'string | number', required: false, desc: 'Cell value.' },
      { name: 'cells[ref].formula', type: 'string', required: false, desc: 'Excel formula (e.g. "=SUM(A1:A10)").' },
      { name: 'cells[ref].bold', type: 'boolean', required: false, desc: 'Bold text.' },
      { name: 'cells[ref].italic', type: 'boolean', required: false, desc: 'Italic text.' },
      { name: 'cells[ref].fontSize', type: 'number', required: false, desc: 'Font size in points.' },
      { name: 'cells[ref].fontColor', type: 'string', required: false, desc: 'Hex color (e.g. "#ff0000").' },
      { name: 'cells[ref].bgColor', type: 'string', required: false, desc: 'Background hex color.' },
    ],
  },
  {
    id: 'create-doc',
    title: 'Create a Document',
    method: 'POST',
    endpoint: '/api/v1/docs',
    desc: 'Creates a new rich text document and returns a shareable link.',
    request: `{
  "title": "Meeting Notes",
  "content": [
    { "type": "heading", "level": 1, "text": "Weekly Standup" },
    { "type": "paragraph", "text": "Discussed the Q1 roadmap and upcoming deadlines." },
    { "type": "heading", "level": 2, "text": "Action Items" },
    { "type": "paragraph", "text": "Ship the API docs by Friday." },
    { "type": "paragraph", "text": "Review the pricing model with the team." }
  ]
}`,
    requestFields: [
      { name: 'title', type: 'string', required: false, desc: 'Document title.' },
      { name: 'content', type: 'array', required: false, desc: 'Array of content blocks.' },
      { name: 'content[].type', type: 'string', required: true, desc: '"heading" or "paragraph".' },
      { name: 'content[].text', type: 'string', required: true, desc: 'The text content.' },
      { name: 'content[].level', type: 'number', required: false, desc: 'Heading level (1-5). Only for type "heading".' },
      { name: 'content[].bold', type: 'boolean', required: false, desc: 'Bold the entire block.' },
      { name: 'content[].italic', type: 'boolean', required: false, desc: 'Italicize the entire block.' },
      { name: 'content[].color', type: 'string', required: false, desc: 'Text color (hex).' },
    ],
    response: `{
  "id": "p3n8q2w1",
  "type": "doc",
  "title": "Meeting Notes",
  "url": "https://opensheet-seven.vercel.app/d/p3n8q2w1",
  "edit_token": "tok_abc123...",
  "created_at": "2026-03-23T10:00:00.000Z"
}`,
    curl: `curl -X POST https://opensheet-seven.vercel.app/api/v1/docs \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Meeting Notes",
    "content": [
      { "type": "heading", "level": 1, "text": "Weekly Standup" },
      { "type": "paragraph", "text": "Discussed the roadmap." }
    ]
  }'`,
  },
  {
    id: 'get',
    title: 'Get a Document',
    method: 'GET',
    endpoint: '/api/v1/sheets/:id  or  /api/v1/docs/:id',
    desc: 'Retrieve a document by ID. Returns the full Univer snapshot data. No authentication required.',
    response: `{
  "id": "x7k2m9p3",
  "type": "sheet",
  "title": "Q1 Sales Report",
  "data": { ... },
  "created_at": "2026-03-23T10:00:00.000Z",
  "updated_at": "2026-03-23T12:30:00.000Z"
}`,
    curl: `curl https://opensheet-seven.vercel.app/api/v1/sheets/x7k2m9p3`,
  },
  {
    id: 'update',
    title: 'Update a Document',
    method: 'PUT',
    endpoint: '/api/v1/sheets/:id  or  /api/v1/docs/:id',
    desc: 'Update the data of an existing document. Requires authentication.',
    request: `{
  "data": { ... }
}`,
    curl: `curl -X PUT https://opensheet-seven.vercel.app/api/v1/sheets/x7k2m9p3 \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "data": { ... } }'`,
  },
  {
    id: 'delete',
    title: 'Delete a Document',
    method: 'DELETE',
    endpoint: '/api/v1/sheets/:id  or  /api/v1/docs/:id',
    desc: 'Permanently delete a document. Requires authentication.',
    curl: `curl -X DELETE https://opensheet-seven.vercel.app/api/v1/sheets/x7k2m9p3 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    id: 'download',
    title: 'Download / Export',
    method: 'GET',
    endpoint: '/api/v1/download/:id?format=FORMAT',
    desc: 'Export a document in various formats. No authentication required.',
    requestFields: [
      { name: 'format (sheets)', type: 'string', required: true, desc: '"xlsx", "csv", "html", or "json".' },
      { name: 'format (docs)', type: 'string', required: true, desc: '"pdf", "docx", "txt", or "json".' },
    ],
    curl: `# Download as Excel
curl -O https://opensheet-seven.vercel.app/api/v1/download/x7k2m9p3?format=xlsx

# Download as PDF
curl -O https://opensheet-seven.vercel.app/api/v1/download/p3n8q2w1?format=pdf`,
  },
  {
    id: 'rate-limits',
    title: 'Rate Limits',
    content: `API calls are tracked per user per month. GET requests are free and unlimited.

| Plan | API Calls/month | Documents |
|------|----------------|-----------|
| Free | 500 | 25 |
| Pro ($12/mo) | 25,000 | Unlimited |
| Scale ($49/mo) | 200,000 | Unlimited |

When you exceed your limit, the API returns 429 Too Many Requests. Usage resets on the 1st of each month.`,
  },
  {
    id: 'errors',
    title: 'Error Responses',
    content: `All errors return JSON with an "error" field:`,
    request: `// 400 Bad Request
{ "error": "Invalid request", "details": "..." }

// 401 Unauthorized
{ "error": "Authentication required" }

// 404 Not Found
{ "error": "Not found" }

// 429 Too Many Requests
{ "error": "API call limit reached. Upgrade your plan at /pricing" }`,
  },
]

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    POST: 'bg-blue-50 text-blue-700 border-blue-200',
    PUT: 'bg-amber-50 text-amber-700 border-amber-200',
    DELETE: 'bg-red-50 text-red-700 border-red-200',
  }
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${colors[method] || 'bg-zinc-50 text-zinc-700 border-zinc-200'}`} style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
      {method}
    </span>
  )
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('auth')

  return (
    <div className="min-h-[100dvh] bg-[#fafafa]">
      <nav className="sticky top-0 z-20 bg-[#fafafa]/80 backdrop-blur-lg border-b border-zinc-100">
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
            <span className="text-zinc-300 ml-1">/</span>
            <span className="text-sm text-zinc-500 ml-1">API Docs</span>
          </a>
          <div className="flex items-center gap-2">
            <a href="/dashboard" className="text-sm text-zinc-500 hover:text-zinc-900 px-3 py-2 transition-colors">Dashboard</a>
            <a href="/pricing" className="text-sm text-zinc-500 hover:text-zinc-900 px-3 py-2 transition-colors">Pricing</a>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-0.5">
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">Reference</p>
              {sections.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActiveSection(s.id)}
                  className={`block text-sm py-1.5 px-2 rounded-lg transition-colors ${activeSection === s.id ? 'text-zinc-900 bg-zinc-100 font-medium' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  {s.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tighter mb-2">API Reference</h1>
            <p className="text-sm text-zinc-500 mb-10">Everything you need to create spreadsheets and documents programmatically.</p>

            <div className="space-y-16">
              {sections.map(s => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-lg font-semibold tracking-tight">{s.title}</h2>
                    {'method' in s && s.method && <MethodBadge method={s.method} />}
                  </div>

                  {'endpoint' in s && s.endpoint && (
                    <div className="mb-4 px-3 py-2 bg-zinc-100 rounded-lg text-sm" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
                      {s.endpoint}
                    </div>
                  )}

                  {'desc' in s && s.desc && <p className="text-sm text-zinc-600 mb-4 leading-relaxed">{s.desc}</p>}
                  {'content' in s && s.content && (
                    <div className="text-sm text-zinc-600 mb-4 leading-relaxed whitespace-pre-line">{s.content}</div>
                  )}

                  {'requestFields' in s && s.requestFields && (
                    <div className="mb-4 border border-zinc-200 rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-zinc-50 border-b border-zinc-100">
                            <th className="text-left px-4 py-2 text-xs font-medium text-zinc-400">Field</th>
                            <th className="text-left px-4 py-2 text-xs font-medium text-zinc-400">Type</th>
                            <th className="text-left px-4 py-2 text-xs font-medium text-zinc-400">Required</th>
                            <th className="text-left px-4 py-2 text-xs font-medium text-zinc-400">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {s.requestFields.map(f => (
                            <tr key={f.name} className="border-b border-zinc-50 last:border-0">
                              <td className="px-4 py-2 font-medium" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{f.name}</td>
                              <td className="px-4 py-2 text-zinc-500" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{f.type}</td>
                              <td className="px-4 py-2 text-zinc-500">{f.required ? 'Yes' : 'No'}</td>
                              <td className="px-4 py-2 text-zinc-500">{f.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {'request' in s && s.request && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Request Body</p>
                      <pre className="bg-[#1c1c1f] text-zinc-300 rounded-xl p-4 text-[13px] leading-[1.7] overflow-x-auto" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
                        {s.request}
                      </pre>
                    </div>
                  )}

                  {'response' in s && s.response && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Response</p>
                      <pre className="bg-[#1c1c1f] text-zinc-300 rounded-xl p-4 text-[13px] leading-[1.7] overflow-x-auto" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
                        {s.response}
                      </pre>
                    </div>
                  )}

                  {'curl' in s && s.curl && (
                    <div>
                      <p className="text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Example</p>
                      <pre className="bg-[#1c1c1f] text-zinc-300 rounded-xl p-4 text-[13px] leading-[1.7] overflow-x-auto" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
                        {s.curl}
                      </pre>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
