import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OpenOfficeAI vs Google Sheets API — A Simpler Alternative (2026)',
  description: 'Compare OpenOfficeAI and Google Sheets API side by side. See the difference in setup, authentication, code complexity, and pricing. With code examples.',
  openGraph: {
    title: 'OpenOfficeAI vs Google Sheets API — A Simpler Alternative',
    description: 'Side-by-side comparison of setup, auth, code complexity, and pricing between OpenOfficeAI and Google Sheets API.',
    url: 'https://opensheet-seven.vercel.app/vs/google-sheets-api',
    type: 'article',
  },
  alternates: {
    canonical: 'https://opensheet-seven.vercel.app/vs/google-sheets-api',
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
  { feature: 'Create spreadsheet via API', openoffice: 'check', google: 'check' },
  { feature: 'Single API call to create + populate', openoffice: 'check', google: 'cross' },
  { feature: 'No OAuth / service account needed', openoffice: 'check', google: 'cross' },
  { feature: 'Shareable link (no login to view)', openoffice: 'check', google: 'partial' },
  { feature: 'Works from any language (simple REST)', openoffice: 'check', google: 'check' },
  { feature: 'Formulas support', openoffice: 'check', google: 'check' },
  { feature: 'Cell formatting (bold, colors, etc.)', openoffice: 'check', google: 'check' },
  { feature: 'Export to XLSX, PDF', openoffice: 'check', google: 'check' },
  { feature: 'Real-time collaboration', openoffice: 'check', google: 'check' },
  { feature: 'Google Workspace integration', openoffice: 'cross', google: 'check' },
  { feature: 'Free tier', openoffice: 'check', google: 'check' },
  { feature: 'Setup time', openoffice: '2 min', google: '30+ min' },
  { feature: 'Lines of code (create a sheet)', openoffice: '~10', google: '~40' },
]

const iconMap: Record<string, React.ReactNode> = {
  check: <Check />,
  cross: <Cross />,
  partial: <Partial />,
}

const faqs = [
  {
    q: 'Is OpenOfficeAI a full replacement for Google Sheets?',
    a: 'No. If you need the full Google Sheets desktop experience with 400+ functions, pivot tables, and Google Workspace integration, Google Sheets is the better choice. OpenOfficeAI is designed for programmatic use cases where you need to create and share spreadsheets via API.',
  },
  {
    q: 'Can I migrate from Google Sheets API to OpenOfficeAI?',
    a: 'Yes. If you are using Google Sheets API primarily to create spreadsheets and populate them with data, you can replace those calls with a single OpenOfficeAI POST request. Reading data back is also supported via our GET endpoint.',
  },
  {
    q: 'Does OpenOfficeAI support Google Sheets formulas?',
    a: 'OpenOfficeAI supports standard spreadsheet formulas (SUM, AVERAGE, VLOOKUP, IF, etc.). Most Google Sheets formulas will work as-is. Some Google-specific functions like GOOGLEFINANCE or IMPORTDATA are not supported.',
  },
  {
    q: 'What about data privacy?',
    a: 'OpenOfficeAI stores your data on encrypted servers. We do not use your data for training or analytics. You can delete any document at any time via the API. For enterprise needs, contact us about self-hosted deployments.',
  },
  {
    q: 'Is the free tier really free?',
    a: 'Yes. 25 documents and 500 API calls per month, forever. No credit card required. No trial period. You can upgrade to Pro ($12/month) when you need more.',
  },
]

export default function VsGoogleSheetsApi() {
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
          <span className="text-zinc-600">vs Google Sheets API</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-3">OpenOfficeAI vs Google Sheets API</h1>
        <p className="text-base text-zinc-500 leading-relaxed mb-10 max-w-xl">
          An honest, side-by-side comparison for developers who need to create spreadsheets programmatically. We cover setup, authentication, code complexity, pricing, and when you should use each one.
        </p>

        {/* TL;DR */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 mb-10">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">TL;DR</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            Google Sheets API is powerful but requires OAuth setup, service accounts, and multiple API calls to create and populate a spreadsheet. OpenOfficeAI does the same thing in a single POST request with a simple API key. If you need deep Google Workspace integration, use Google. If you need to create shareable spreadsheets from code quickly, OpenOfficeAI is simpler.
          </p>
        </div>

        {/* Section: The Setup Problem */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">The setup problem</h2>
          <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
            <p>
              If you have ever tried to create a Google Sheet from code, you know the pain. First, you go to the Google Cloud Console and create a project. Then you enable the Google Sheets API and the Google Drive API (yes, you need both). Then you create a service account, download the JSON key file, and figure out how to authenticate your requests.
            </p>
            <p>
              The process takes 30 minutes if you have done it before, and over an hour if you have not. And every time you set up a new project or environment, you repeat most of it. Service account key files need to be stored securely, rotated periodically, and shared carefully with team members.
            </p>
            <p>
              With OpenOfficeAI, you sign up, copy your API key from the dashboard, and make your first API call. The entire process takes about two minutes. Your API key works everywhere — Node.js, Python, curl, Postman, any language that can make an HTTP request.
            </p>
          </div>
        </section>

        {/* Section: Code Comparison */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">Code comparison: creating a spreadsheet with data</h2>
          <p className="text-sm text-zinc-500 leading-relaxed mb-6">
            The task: create a new spreadsheet with a title, column headers, and three rows of data. Return a URL that anyone can open.
          </p>

          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md border bg-zinc-100 text-zinc-700 border-zinc-200" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>Google Sheets API</span>
                <span className="text-xs text-zinc-400">~40 lines, 3 API calls</span>
              </div>
              <pre className="bg-[#18181b] text-zinc-300 rounded-xl p-5 text-[13px] leading-[1.8] overflow-x-auto border border-zinc-800" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
{`// Step 1: Authenticate with service account
const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: './service-account-key.json',
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
  ],
});
const sheets = google.sheets({ version: 'v4', auth });
const drive = google.drive({ version: 'v3', auth });

// Step 2: Create an empty spreadsheet
const createRes = await sheets.spreadsheets.create({
  resource: { properties: { title: 'Sales Report' } },
});
const spreadsheetId = createRes.data.spreadsheetId;

// Step 3: Populate the spreadsheet with data
await sheets.spreadsheets.values.update({
  spreadsheetId,
  range: 'Sheet1!A1:C4',
  valueInputOption: 'USER_ENTERED',
  resource: {
    values: [
      ['Name', 'Email', 'Amount'],
      ['Alice', 'alice@example.com', 250],
      ['Bob', 'bob@test.com', 180],
      ['Charlie', 'charlie@demo.io', 320],
    ],
  },
});

// Step 4: Make it shareable (requires Drive API)
await drive.permissions.create({
  fileId: spreadsheetId,
  resource: { type: 'anyone', role: 'reader' },
});

const url = \`https://docs.google.com/spreadsheets/d/\${spreadsheetId}\`;`}
              </pre>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md border bg-emerald-50 text-emerald-700 border-emerald-200" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>OpenOfficeAI</span>
                <span className="text-xs text-zinc-400">~10 lines, 1 API call</span>
              </div>
              <pre className="bg-[#18181b] text-zinc-300 rounded-xl p-5 text-[13px] leading-[1.8] overflow-x-auto border border-zinc-800" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
{`const res = await fetch("https://opensheet-seven.vercel.app/api/v1/sheets", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
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
});

const { url } = await res.json();
// url is already shareable — anyone can open and edit it`}
              </pre>
            </div>
          </div>

          <p className="text-sm text-zinc-500 leading-relaxed mt-5">
            The Google version requires three separate API calls (create, populate, share), two different Google APIs (Sheets + Drive), a service account key file, and ~40 lines of code. The OpenOfficeAI version is a single POST request that creates, populates, and shares the spreadsheet in one step.
          </p>
        </section>

        {/* Section: Authentication */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">Authentication</h2>
          <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
            <p>
              Google Sheets API supports three authentication methods: OAuth 2.0 (for end users), service accounts (for server-to-server), and API keys (read-only). To create and write to spreadsheets, you need either OAuth or a service account. Both require setting up credentials in the Google Cloud Console.
            </p>
            <p>
              Service accounts are the most common choice for backend applications, but they come with their own complexity. The key file must be stored securely (not committed to git), the service account needs the right IAM permissions, and spreadsheets created by service accounts are owned by the service account (not you) by default.
            </p>
            <p>
              OpenOfficeAI uses a single API key for all operations. You get it from your dashboard after signing up. Pass it in the Authorization header as a Bearer token. That is the entire auth setup. The key works for creating, reading, and updating documents.
            </p>
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
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Google Sheets API</th>
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
                        {iconMap[row.google] || <span className="text-sm font-medium text-zinc-900">{row.google}</span>}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Pricing */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">Pricing comparison</h2>
          <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
            <p>
              Google Sheets API is free for most use cases. You get generous quotas: 300 requests per minute per project, and 60 requests per minute per user. For most applications, you will never hit these limits. However, there is a hidden cost: developer time. Setting up and maintaining Google Cloud credentials, handling token refresh, and debugging permission issues takes real engineering hours.
            </p>
            <p>
              OpenOfficeAI has a free tier (25 documents, 500 API calls/month) that works for personal projects and prototyping. The Pro plan is $12/month for 25,000 API calls and unlimited documents. The Scale plan is $49/month for 200,000 API calls. Overage is $0.002 per extra call on Pro and $0.001 on Scale.
            </p>
            <p>
              If you are making fewer than 500 API calls per month, both options are effectively free. If you are making thousands of calls, consider whether the time saved on setup and maintenance justifies the $12/month. For many teams, an hour of developer time costs more than a year of OpenOfficeAI Pro.
            </p>
          </div>

          <div className="border border-zinc-200 rounded-2xl bg-white overflow-hidden mt-5">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Plan</th>
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">OpenOfficeAI</th>
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Google Sheets API</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-50">
                  <td className="px-5 py-3 text-sm font-medium text-zinc-900">Free tier</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">25 docs, 500 calls/mo</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">Generous (300 req/min)</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="px-5 py-3 text-sm font-medium text-zinc-900">Paid tier</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">$12/mo (Pro), $49/mo (Scale)</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">Free (part of Google Cloud)</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="px-5 py-3 text-sm font-medium text-zinc-900">Setup cost (dev time)</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">~2 minutes</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">30-60 minutes</td>
                </tr>
                <tr className="border-b border-zinc-50 last:border-0">
                  <td className="px-5 py-3 text-sm font-medium text-zinc-900">Maintenance cost</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">None</td>
                  <td className="px-5 py-3 text-sm text-zinc-600">Key rotation, IAM, token refresh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: When to use Google Sheets */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-4">When to use Google Sheets API instead</h2>
          <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
            <p>
              We believe in being honest about when our product is not the right choice. Here are scenarios where Google Sheets API is the better option:
            </p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Google Workspace integration:</strong> If your organization uses Google Workspace and you need spreadsheets to appear in users&apos; Google Drive, use Google Sheets API. OpenOfficeAI spreadsheets are hosted on our platform, not in Google Drive.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Advanced spreadsheet features:</strong> Google Sheets has 400+ built-in functions, pivot tables, charts, data validation, conditional formatting rules, and more. OpenOfficeAI supports core spreadsheet functions but not the full Google Sheets feature set.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Reading existing Google Sheets:</strong> If you need to read data from spreadsheets that already exist in Google Sheets, you need the Google Sheets API. OpenOfficeAI is for creating new spreadsheets, not reading from Google.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Zero cost at any scale:</strong> If you are already in the Google Cloud ecosystem and cost is the primary concern, Google Sheets API is free regardless of volume (within reasonable rate limits).</span>
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
                <span><strong className="text-zinc-900">Speed of integration:</strong> If you need to ship today and cannot spend an hour setting up Google Cloud, OpenOfficeAI gets you running in two minutes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">AI agents and automation:</strong> If you are building an AI agent that needs to create spreadsheets (reports, data dumps, formatted tables), a single API call is much easier to integrate than the multi-step Google workflow.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Shareable links without Google accounts:</strong> OpenOfficeAI spreadsheets can be opened by anyone with the link. No Google account required. No &quot;request access&quot; screen.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">Prototyping and MVPs:</strong> If you are building a prototype and want to add spreadsheet output quickly, OpenOfficeAI is the faster path.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-1">-</span>
                <span><strong className="text-zinc-900">No Google dependency:</strong> If you want to avoid vendor lock-in with Google Cloud, OpenOfficeAI is an independent alternative.</span>
              </li>
            </ul>
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
            Create your first spreadsheet in under a minute. No credit card required. See how it compares to your current Google Sheets workflow.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="/signup" className="text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 px-5 py-2.5 rounded-[10px] transition-colors active:scale-[0.98]">Get Started Free</a>
            <a href="/docs" className="text-sm font-medium text-zinc-700 border border-zinc-200 hover:border-zinc-300 px-5 py-2.5 rounded-[10px] transition-all active:scale-[0.98]">API Docs</a>
            <a href="/tools/csv-to-spreadsheet" className="text-sm font-medium text-zinc-700 border border-zinc-200 hover:border-zinc-300 px-5 py-2.5 rounded-[10px] transition-all active:scale-[0.98]">Try CSV Tool</a>
          </div>
        </div>

        {/* Related */}
        <div className="mt-10 flex items-center gap-4 text-sm">
          <span className="text-zinc-400">Also read:</span>
          <a href="/vs/airtable" className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors">OpenOfficeAI vs Airtable</a>
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
