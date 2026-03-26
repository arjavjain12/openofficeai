import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OpenOfficeAI vs Airtable — Spreadsheet API vs Database (2026)',
  description: 'Compare OpenOfficeAI and Airtable: pricing, API design, use cases, and when to choose each one. Airtable is a database. OpenOfficeAI is a spreadsheet with an API.',
  openGraph: {
    title: 'OpenOfficeAI vs Airtable — Spreadsheet API vs Database',
    description: 'Airtable is a database with a spreadsheet UI. OpenOfficeAI is a spreadsheet with an API. Compare pricing, features, and use cases.',
    url: 'https://opensheet-seven.vercel.app/vs/airtable',
    type: 'article',
  },
  alternates: {
    canonical: 'https://opensheet-seven.vercel.app/vs/airtable',
  },
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" className="shrink-0">
      <polyline points="3.5 8 6.5 11 12.5 5" />
    </svg>
  )
}

function Cross() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" className="shrink-0">
      <line x1="4" y1="4" x2="12" y2="12" />
      <line x1="12" y1="4" x2="4" y2="12" />
    </svg>
  )
}

function Partial() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" className="shrink-0">
      <line x1="4" y1="8" x2="12" y2="8" />
    </svg>
  )
}

const features = [
  { feature: 'Core model', openoffice: 'Spreadsheet', airtable: 'Database' },
  { feature: 'Create via API', openoffice: 'check', airtable: 'check' },
  { feature: 'Formulas (SUM, IF, etc.)', openoffice: 'check', airtable: 'partial' },
  { feature: 'Shareable link (no login)', openoffice: 'check', airtable: 'cross' },
  { feature: 'Relational data (linked records)', openoffice: 'cross', airtable: 'check' },
  { feature: 'Views (Kanban, Calendar, Gallery)', openoffice: 'cross', airtable: 'check' },
  { feature: 'Automations (built-in)', openoffice: 'cross', airtable: 'check' },
  { feature: 'Export to XLSX, PDF', openoffice: 'check', airtable: 'check' },
  { feature: 'Cell-level formatting', openoffice: 'check', airtable: 'cross' },
  { feature: 'Single API call to create + populate', openoffice: 'check', airtable: 'cross' },
  { feature: 'No per-seat pricing', openoffice: 'check', airtable: 'cross' },
  { feature: 'Self-serve free tier', openoffice: 'check', airtable: 'check' },
]

const iconMap: Record<string, React.ReactNode> = {
  check: <Check />,
  cross: <Cross />,
  partial: <Partial />,
}

const faqs = [
  {
    q: 'Is OpenOfficeAI a replacement for Airtable?',
    a: 'No. They serve different purposes. Airtable is a relational database with a spreadsheet-like interface, built for project management, CRM, and structured workflows. OpenOfficeAI is a spreadsheet creation API, built for generating and sharing spreadsheets programmatically. If you need linked records, Kanban views, or built-in automations, use Airtable.',
  },
  {
    q: 'Can I use OpenOfficeAI as a database?',
    a: 'OpenOfficeAI is not a database. It creates spreadsheets. There are no relations, no field types, no views. If you need to store and query structured data, use a real database (PostgreSQL, Supabase, Airtable). Use OpenOfficeAI when you need to output data as a spreadsheet that humans can read and edit.',
  },
  {
    q: 'Why is Airtable so much more expensive?',
    a: 'Airtable is a full-featured platform with a database engine, multiple views, built-in automations, a forms system, and collaboration tools. You are paying for a much larger product. OpenOfficeAI is deliberately simpler and cheaper because it does one thing: create spreadsheets via API.',
  },
  {
    q: 'Can I migrate from Airtable to OpenOfficeAI?',
    a: 'It depends on your use case. If you use Airtable purely to collect data via its API and share it as spreadsheets, then yes, OpenOfficeAI can replace that workflow at a lower cost. If you rely on Airtable views, automations, linked records, or the Airtable UI, then no.',
  },
  {
    q: 'Does OpenOfficeAI have an Airtable-like UI?',
    a: 'No. OpenOfficeAI spreadsheets look and feel like traditional spreadsheets (think Excel or Google Sheets). There is no Kanban view, no Gallery view, and no record expansion. If you need those, Airtable is the right tool.',
  },
]

export default function VsAirtable() {
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
          <a href="/vs" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Comparisons</a>
          <a href="/docs" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Docs</a>
          <a href="/pricing" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Pricing</a>
          <a href="/signup" className="text-sm text-zinc-700 px-4 py-2 rounded-[10px] border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all active:scale-[0.98]">Get Started</a>
        </div>
      </nav>

      <article className="max-w-[800px] mx-auto px-6 pt-10 pb-24">
        <div className="flex items-center gap-1.5 text-sm text-zinc-400 mb-8">
          <a href="/vs" className="hover:text-zinc-600 transition-colors">Comparisons</a>
          <span>/</span>
          <span className="text-zinc-600">vs Airtable</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-3">OpenOfficeAI vs Airtable</h1>
        <p className="text-base text-zinc-500 leading-relaxed mb-10 max-w-xl">
          Airtable is a database that looks like a spreadsheet. OpenOfficeAI is a spreadsheet that has an API. They sound similar but solve very different problems. This page helps you decide which one is right for your use case.
        </p>

        {/* TL;DR */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 mb-10">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">TL;DR</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            Use Airtable if you need a relational database with views, automations, and collaboration features. Use OpenOfficeAI if you need to create shareable spreadsheets from code — reports, data exports, formatted tables — via a simple API. OpenOfficeAI is $12/mo flat; Airtable is $20/seat/mo and scales with team size.
          </p>
        </div>

        {/* Section: Fundamental difference */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">The fundamental difference</h2>
          <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
            <p>
              Airtable looks like a spreadsheet, but it is actually a relational database. Each table has typed fields (text, number, date, single select, linked record). You can create multiple views of the same data: Grid, Kanban, Calendar, Gallery, Gantt. You can link records across tables, set up automations, and build forms that feed into your base.
            </p>
            <p>
              OpenOfficeAI is a real spreadsheet. Cells can contain any value, any formula, any formatting. There are no field types, no views, no automations. It is closer to Google Sheets or Excel than to Airtable. The key difference from Google Sheets is that OpenOfficeAI is API-first: you create spreadsheets with a single POST request and get a shareable link back.
            </p>
            <p>
              This distinction matters because it determines what each tool is good at. Airtable excels at structured data management: project tracking, CRM, content calendars, inventory management. OpenOfficeAI excels at spreadsheet generation: automated reports, data exports, formatted tables that need to be shared or downloaded.
            </p>
          </div>
        </section>

        {/* Section: Code Comparison */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">API comparison: adding data</h2>
          <p className="text-sm text-zinc-500 leading-relaxed mb-6">
            Both tools have APIs, but they are designed for different workflows. Airtable&apos;s API is CRUD-oriented (create, read, update, delete records). OpenOfficeAI&apos;s API is creation-oriented (create a spreadsheet with data in one call).
          </p>

          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md border bg-zinc-100 text-zinc-700 border-zinc-200" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>Airtable API</span>
                <span className="text-xs text-zinc-400">Add records to an existing base</span>
              </div>
              <pre className="bg-[#18181b] text-zinc-300 rounded-xl p-5 text-[13px] leading-[1.8] overflow-x-auto border border-zinc-800" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
{`// Airtable requires a pre-created base + table with defined fields
const res = await fetch(
  "https://api.airtable.com/v0/BASE_ID/TABLE_NAME",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer AIRTABLE_TOKEN",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      records: [
        { fields: { "Name": "Alice", "Email": "alice@example.com", "Amount": 250 } },
        { fields: { "Name": "Bob", "Email": "bob@test.com", "Amount": 180 } },
        { fields: { "Name": "Charlie", "Email": "charlie@demo.io", "Amount": 320 } }
      ]
    })
  }
);

// Records are added to the existing table
// To share: manually configure sharing settings in Airtable UI
// Base and table must be created manually first`}
              </pre>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md border bg-emerald-50 text-emerald-700 border-emerald-200" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>OpenOfficeAI</span>
                <span className="text-xs text-zinc-400">Create a new spreadsheet with data</span>
              </div>
              <pre className="bg-[#18181b] text-zinc-300 rounded-xl p-5 text-[13px] leading-[1.8] overflow-x-auto border border-zinc-800" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
{`// No pre-setup needed — the spreadsheet is created on the fly
const res = await fetch(
  "https://opensheet-seven.vercel.app/api/v1/sheets",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: "Sales Report",
      sheets: [{
        name: "Sheet1",
        rows: [
          ["Name", "Email", "Amount"],
          ["Alice", "alice@example.com", 250],
          ["Bob", "bob@test.com", 180],
          ["Charlie", "charlie@demo.io", 320]
        ]
      }]
    })
  }
);

const { url } = await res.json();
// url is instantly shareable — no additional setup`}
              </pre>
            </div>
          </div>

          <p className="text-sm text-zinc-500 leading-relaxed mt-5">
            The key difference: Airtable expects you to create a base and table first (manually, in their UI), then add records via API. OpenOfficeAI creates the entire spreadsheet in one API call. This makes OpenOfficeAI better for on-the-fly report generation, while Airtable is better for ongoing data management.
          </p>
        </section>

        {/* Section: Pricing */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">Pricing: per-seat vs flat rate</h2>
          <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
            <p>
              Airtable uses per-seat pricing. The free tier gives you unlimited bases but limits you to 1,000 records per base and 1 GB of attachments. The Team plan is $20 per seat per month (billed annually) and raises the limit to 50,000 records per base and 20 GB of attachments. The Business plan is $45 per seat per month.
            </p>
            <p>
              For a team of 5 on the Team plan, that is $100/month. For a team of 20, it is $400/month. Airtable gets expensive fast as your team grows, even if most members only view data occasionally.
            </p>
            <p>
              OpenOfficeAI uses flat-rate pricing. The Pro plan is $12/month regardless of how many people view or edit your spreadsheets. There are no seats, no per-user fees. Your API key creates spreadsheets, and anyone with the link can access them. The Scale plan is $49/month for higher API limits.
            </p>
            <p>
              This pricing difference reflects the different models. Airtable is a collaboration platform — more users means more value, so they charge per seat. OpenOfficeAI is a creation tool — you create spreadsheets and share them, so usage is measured in API calls, not users.
            </p>
          </div>

          <div className="border border-zinc-200 rounded-2xl bg-white overflow-hidden mt-5">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Scenario</th>
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">OpenOfficeAI</th>
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Airtable (Team)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-50">
                  <td className="px-5 py-3 text-sm text-zinc-900">Solo developer</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">$12/mo</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">$20/mo</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="px-5 py-3 text-sm text-zinc-900">Team of 5</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">$12/mo</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">$100/mo</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="px-5 py-3 text-sm text-zinc-900">Team of 20</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">$49/mo (Scale)</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">$400/mo</td>
                </tr>
                <tr className="last:border-0">
                  <td className="px-5 py-3 text-sm text-zinc-900">50 viewers, 1 creator</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">$12/mo</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">$20/mo (1 seat, shared views)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Feature comparison table */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-6">Feature comparison</h2>
          <div className="border border-zinc-200 rounded-2xl bg-white overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Feature</th>
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">OpenOfficeAI</th>
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Airtable</th>
                </tr>
              </thead>
              <tbody>
                {features.map((row) => (
                  <tr key={row.feature} className="border-b border-zinc-50 last:border-0">
                    <td className="px-5 py-3 text-sm text-zinc-900">{row.feature}</td>
                    <td className="px-5 py-3 text-sm text-zinc-600">
                      <span className="flex items-center gap-2">
                        {iconMap[row.openoffice] || <span className="text-sm font-medium text-zinc-900">{row.openoffice}</span>}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-zinc-600">
                      <span className="flex items-center gap-2">
                        {iconMap[row.airtable] || <span className="text-sm font-medium text-zinc-900">{row.airtable}</span>}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: When to use Airtable */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">When to use Airtable instead</h2>
          <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
            <p>
              Airtable is the better choice in these scenarios:
            </p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Structured data management:</strong> If you are building a CRM, project tracker, content calendar, or inventory system, Airtable&apos;s relational model with linked records, rollups, and lookups is purpose-built for this.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Multiple views of the same data:</strong> Need to see your data as a Kanban board AND a calendar AND a gallery? Airtable does this natively. OpenOfficeAI only has the spreadsheet view.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Built-in automations:</strong> Airtable has a visual automation builder (when X happens, do Y). If you want to send emails, update records, or trigger webhooks based on data changes without writing code, Airtable is the right tool.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Non-technical team collaboration:</strong> If your team is not technical and needs a friendly UI for data entry, filtering, and grouping, Airtable&apos;s interface is best-in-class.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Forms:</strong> Airtable has built-in forms that map directly to table fields. Great for data collection without any code.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section: When to use OpenOfficeAI */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">When OpenOfficeAI is the better choice</h2>
          <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
            <ul className="space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Automated report generation:</strong> Your backend runs a query and needs to produce a formatted spreadsheet with headers, formulas, and styling. One API call does it.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Data exports:</strong> Users of your app request a data export. Instead of generating a CSV file, create a live spreadsheet they can open instantly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">AI agent output:</strong> Your AI agent needs to return structured data to a user. A spreadsheet link is more useful than a JSON blob.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Budget-conscious teams:</strong> If you have many viewers but few creators, OpenOfficeAI&apos;s flat pricing is significantly cheaper than Airtable&apos;s per-seat model.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Spreadsheet features:</strong> If you actually need spreadsheet features (cell-level formatting, formulas across cells, merged cells), OpenOfficeAI is a real spreadsheet while Airtable is a database.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Real-world examples */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">Real-world decision examples</h2>
          <div className="space-y-4">
            {[
              {
                scenario: 'A SaaS app wants to let users export their data as a spreadsheet.',
                verdict: 'OpenOfficeAI',
                reason: 'You need to create spreadsheets on-demand from code. No need for Airtable bases or views.',
              },
              {
                scenario: 'A marketing team tracks their content calendar and assigns tasks.',
                verdict: 'Airtable',
                reason: 'This is structured data management with multiple collaborators, views, and statuses.',
              },
              {
                scenario: 'An AI agent generates weekly financial reports.',
                verdict: 'OpenOfficeAI',
                reason: 'The agent needs to create a formatted spreadsheet and share a link. One API call.',
              },
              {
                scenario: 'A startup manages their hiring pipeline with interview scorecards.',
                verdict: 'Airtable',
                reason: 'Linked records (candidates to interviews to scorecards), Kanban stages, and team collaboration.',
              },
            ].map((ex) => (
              <div key={ex.scenario} className="p-5 rounded-xl border border-zinc-100 bg-white">
                <p className="text-sm text-zinc-900 font-medium mb-2">{ex.scenario}</p>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                    ex.verdict === 'OpenOfficeAI'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {ex.verdict}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{ex.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-t border-zinc-200 pt-4">
                <h3 className="text-sm font-semibold text-zinc-900 mb-1">{faq.q}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="p-7 rounded-2xl border border-zinc-200 bg-white">
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">Try OpenOfficeAI for free</h2>
          <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
            Create a spreadsheet with one API call. No credit card, no per-seat pricing. See if it fits your workflow.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="/signup" className="text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 px-5 py-2.5 rounded-[10px] transition-colors active:scale-[0.98]">Get Started Free</a>
            <a href="/pricing" className="text-sm font-medium text-zinc-700 border border-zinc-200 hover:border-zinc-300 px-5 py-2.5 rounded-[10px] transition-all active:scale-[0.98]">See Pricing</a>
            <a href="/tools/json-to-spreadsheet" className="text-sm font-medium text-zinc-700 border border-zinc-200 hover:border-zinc-300 px-5 py-2.5 rounded-[10px] transition-all active:scale-[0.98]">Try JSON Tool</a>
          </div>
        </div>

        {/* Related */}
        <div className="mt-10 flex items-center gap-4 text-sm">
          <span className="text-zinc-400">Also read:</span>
          <a href="/vs/google-sheets-api" className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors">OpenOfficeAI vs Google Sheets API</a>
          <a href="/tools" className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors">Free Tools</a>
        </div>

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.a,
                },
              })),
            }),
          }}
        />
      </article>
    </div>
  )
}
