import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Automate Spreadsheet Creation With One API Call — OpenOfficeAI',
  description: 'Step-by-step guide to creating spreadsheets programmatically via API using curl, Python, and JavaScript. Add formulas, formatting, and get shareable links.',
  keywords: ['automate spreadsheet creation', 'create spreadsheet via API', 'spreadsheet API tutorial', 'programmatic spreadsheet'],
  openGraph: {
    title: 'How to Automate Spreadsheet Creation With One API Call',
    description: 'Step-by-step guide to creating spreadsheets programmatically via API using curl, Python, and JavaScript. Add formulas, formatting, and get shareable links.',
    url: 'https://opensheet-seven.vercel.app/blog/automate-spreadsheet-creation',
    type: 'article',
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

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="my-6">
      {label && <div className="text-xs text-zinc-400 mb-2 font-medium" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{label}</div>}
      <pre className="bg-[#18181b] text-zinc-300 rounded-xl p-5 text-[13px] leading-[1.8] overflow-x-auto border border-zinc-800" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
        {children}
      </pre>
    </div>
  )
}

function StepHeading({ step, title }: { step: number; title: string }) {
  return (
    <h2 className="text-xl font-semibold text-zinc-900 mt-12 mb-4 flex items-center gap-3">
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-semibold shrink-0">{step}</span>
      {title}
    </h2>
  )
}

export default function AutomateSpreadsheetCreation() {
  return (
    <div className="min-h-[100dvh] bg-[#fafafa]">
      <Nav />

      <article className="max-w-[720px] mx-auto px-6 pt-16 pb-24">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <time className="text-xs text-zinc-400">March 10, 2026</time>
            <span className="text-xs text-zinc-300">|</span>
            <span className="text-xs text-zinc-400">7 min read</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-4">How to Automate Spreadsheet Creation With One API Call</h1>
          <p className="text-base text-zinc-500 leading-relaxed">
            A step-by-step tutorial for creating spreadsheets programmatically. We will cover getting an API key, making your first request, adding formulas and formatting, and working in three languages: curl, Python, and JavaScript.
          </p>
        </header>

        <section className="prose-zinc">
          <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">What you will build</h2>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            By the end of this tutorial, you will be able to create a fully-formatted spreadsheet with data, formulas, number formatting, and a shareable link — all from a single API call. The spreadsheet will be accessible to anyone via URL, downloadable as XLSX or PDF, and editable in the browser.
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            We will use the <Link href="/docs" className="text-zinc-900 underline underline-offset-2">OpenOfficeAI API</Link>, which is designed specifically for programmatic document creation. If you do not have an account yet, you can <Link href="/signup" className="text-zinc-900 underline underline-offset-2">sign up for free</Link> — no credit card required.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Prerequisites</h2>
          <ul className="text-sm text-zinc-600 leading-relaxed mb-4 list-disc list-inside space-y-2">
            <li>An OpenOfficeAI account (free tier works for everything in this tutorial).</li>
            <li>Your API key, available from the dashboard after signing up.</li>
            <li>curl, Python 3, or Node.js installed on your machine (depending on which examples you want to follow).</li>
          </ul>

          <StepHeading step={1} title="Get your API key" />
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            After signing up at <Link href="/signup" className="text-zinc-900 underline underline-offset-2">openofficeai.com/signup</Link>, go to your dashboard. Your API key is displayed in the API Keys section. Copy it — you will need it for every request.
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Your API key looks something like this: <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>ooai_sk_a1b2c3d4e5f6...</code>. Keep it secret. Do not commit it to version control. Use environment variables in production.
          </p>

          <StepHeading step={2} title="Create your first spreadsheet" />
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Let us start with the simplest possible request: a spreadsheet with a title and some data. Here it is in all three languages.
          </p>

          <CodeBlock label="curl">{`curl -X POST https://api.openofficeai.com/v1/sheets \\
  -H "Authorization: Bearer $OPENOFFICEAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My First Spreadsheet",
    "sheets": [{
      "name": "Sheet1",
      "data": [
        ["Name", "Department", "Salary"],
        ["Alice Chen", "Engineering", 125000],
        ["Bob Martinez", "Design", 110000],
        ["Carol Wu", "Marketing", 105000],
        ["David Kim", "Engineering", 130000]
      ]
    }]
  }'`}</CodeBlock>

          <CodeBlock label="Python">{`import requests
import os

response = requests.post(
    "https://api.openofficeai.com/v1/sheets",
    headers={
        "Authorization": f"Bearer {os.environ['OPENOFFICEAI_API_KEY']}",
        "Content-Type": "application/json",
    },
    json={
        "title": "My First Spreadsheet",
        "sheets": [{
            "name": "Sheet1",
            "data": [
                ["Name", "Department", "Salary"],
                ["Alice Chen", "Engineering", 125000],
                ["Bob Martinez", "Design", 110000],
                ["Carol Wu", "Marketing", 105000],
                ["David Kim", "Engineering", 130000],
            ]
        }]
    }
)

result = response.json()
print(f"Spreadsheet URL: {result['url']}")
print(f"Document ID: {result['id']}")`}</CodeBlock>

          <CodeBlock label="JavaScript (Node.js)">{`const response = await fetch("https://api.openofficeai.com/v1/sheets", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${process.env.OPENOFFICEAI_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "My First Spreadsheet",
    sheets: [{
      name: "Sheet1",
      data: [
        ["Name", "Department", "Salary"],
        ["Alice Chen", "Engineering", 125000],
        ["Bob Martinez", "Design", 110000],
        ["Carol Wu", "Marketing", 105000],
        ["David Kim", "Engineering", 130000],
      ]
    }]
  })
});

const result = await response.json();
console.log("Spreadsheet URL:", result.url);
console.log("Document ID:", result.id);`}</CodeBlock>

          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            All three produce the same result. The API returns a JSON object with the document <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>id</code>, a shareable <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>url</code>, and the document metadata. The URL is immediately accessible — send it to anyone and they can view the spreadsheet in their browser.
          </p>

          <StepHeading step={3} title="Add formulas" />
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Spreadsheets without formulas are just data tables. OpenOfficeAI supports standard spreadsheet formulas using the same syntax you would use in Excel or Google Sheets. Any cell value that starts with <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>=</code> is treated as a formula.
          </p>

          <CodeBlock label="Python — spreadsheet with formulas">{`response = requests.post(
    "https://api.openofficeai.com/v1/sheets",
    headers={"Authorization": f"Bearer {os.environ['OPENOFFICEAI_API_KEY']}"},
    json={
        "title": "Q1 Budget Tracker",
        "sheets": [{
            "name": "Budget",
            "data": [
                ["Category", "Budget", "Actual", "Variance", "% Used"],
                ["Payroll", 50000, 48500, "=C2-B2", "=C2/B2"],
                ["Marketing", 15000, 17200, "=C3-B3", "=C3/B3"],
                ["Infrastructure", 8000, 7100, "=C4-B4", "=C4/B4"],
                ["Office", 5000, 4800, "=C5-B5", "=C5/B5"],
                ["Travel", 3000, 3900, "=C6-B6", "=C6/B6"],
                ["Total", "=SUM(B2:B6)", "=SUM(C2:C6)",
                 "=SUM(D2:D6)", "=C7/B7"]
            ]
        }]
    }
)`}</CodeBlock>

          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Supported formula functions include SUM, AVERAGE, COUNT, MIN, MAX, IF, VLOOKUP, CONCATENATE, and most standard spreadsheet functions. Cell references work exactly as you would expect: <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>B2</code> for a single cell, <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>B2:B6</code> for a range, <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>$B$2</code> for absolute references.
          </p>

          <StepHeading step={4} title="Apply formatting" />
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Formatting is specified in the <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>formatting</code> object on each sheet. Keys are cell ranges (like <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>A1:E1</code>) and values describe the formatting to apply.
          </p>

          <CodeBlock label="JavaScript — with formatting">{`const response = await fetch("https://api.openofficeai.com/v1/sheets", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${process.env.OPENOFFICEAI_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Q1 Budget Tracker",
    sheets: [{
      name: "Budget",
      data: [
        ["Category", "Budget", "Actual", "Variance", "% Used"],
        ["Payroll", 50000, 48500, "=C2-B2", "=C2/B2"],
        ["Marketing", 15000, 17200, "=C3-B3", "=C3/B3"],
        ["Infrastructure", 8000, 7100, "=C4-B4", "=C4/B4"],
        ["Office", 5000, 4800, "=C5-B5", "=C5/B5"],
        ["Travel", 3000, 3900, "=C6-B6", "=C6/B6"],
        ["Total", "=SUM(B2:B6)", "=SUM(C2:C6)",
         "=SUM(D2:D6)", "=C7/B7"]
      ],
      formatting: {
        "A1:E1": {
          bold: true,
          background: "#18181b",
          color: "#ffffff"
        },
        "B2:C7": { format: "$#,##0" },
        "D2:D7": { format: "$#,##0" },
        "E2:E7": { format: "0.0%" },
        "A7:E7": {
          bold: true,
          borderTop: "2px solid #e4e4e7"
        }
      }
    }]
  })
});`}</CodeBlock>

          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Available formatting options include:
          </p>
          <ul className="text-sm text-zinc-600 leading-relaxed mb-4 list-disc list-inside space-y-2">
            <li><strong className="text-zinc-900">bold</strong>, <strong className="text-zinc-900">italic</strong>, <strong className="text-zinc-900">underline</strong> — boolean text styling.</li>
            <li><strong className="text-zinc-900">format</strong> — number format string (e.g., <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>$#,##0.00</code>, <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>0.0%</code>, <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>yyyy-mm-dd</code>).</li>
            <li><strong className="text-zinc-900">background</strong> — cell background color (hex).</li>
            <li><strong className="text-zinc-900">color</strong> — text color (hex).</li>
            <li><strong className="text-zinc-900">fontSize</strong> — font size in points.</li>
            <li><strong className="text-zinc-900">align</strong> — horizontal alignment (left, center, right).</li>
            <li><strong className="text-zinc-900">borderTop</strong>, <strong className="text-zinc-900">borderBottom</strong>, <strong className="text-zinc-900">borderLeft</strong>, <strong className="text-zinc-900">borderRight</strong> — CSS-style border strings.</li>
          </ul>

          <StepHeading step={5} title="Work with multiple sheets" />
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Real-world spreadsheets often have multiple sheets. The <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>sheets</code> array accepts multiple sheet objects. You can reference cells across sheets using the standard <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>SheetName!A1</code> syntax in formulas.
          </p>

          <CodeBlock label="curl — multi-sheet spreadsheet">{`curl -X POST https://api.openofficeai.com/v1/sheets \\
  -H "Authorization: Bearer $OPENOFFICEAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Sales Report — Multi-Region",
    "sheets": [
      {
        "name": "North America",
        "data": [
          ["Product", "Units", "Revenue"],
          ["Widget A", 1200, 36000],
          ["Widget B", 800, 32000],
          ["Total", "=SUM(B2:B3)", "=SUM(C2:C3)"]
        ]
      },
      {
        "name": "Europe",
        "data": [
          ["Product", "Units", "Revenue"],
          ["Widget A", 950, 28500],
          ["Widget B", 620, 24800],
          ["Total", "=SUM(B2:B3)", "=SUM(C2:C3)"]
        ]
      },
      {
        "name": "Summary",
        "data": [
          ["Region", "Total Revenue"],
          ["North America", "='"'"'North America'"'"'!C4"],
          ["Europe", "=Europe!C4"],
          ["Grand Total", "=SUM(B2:B3)"]
        ]
      }
    ]
  }'`}</CodeBlock>

          <StepHeading step={6} title="Download and export" />
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Every spreadsheet created through the API can be downloaded in multiple formats. Use the download endpoint with the document ID and your desired format.
          </p>

          <CodeBlock label="curl — download as XLSX">{`curl -O -J https://api.openofficeai.com/v1/sheets/{document_id}/download?format=xlsx \\
  -H "Authorization: Bearer $OPENOFFICEAI_API_KEY"`}</CodeBlock>

          <CodeBlock label="Python — download as PDF">{`response = requests.get(
    f"https://api.openofficeai.com/v1/sheets/{doc_id}/download",
    headers={"Authorization": f"Bearer {os.environ['OPENOFFICEAI_API_KEY']}"},
    params={"format": "pdf"}
)

with open("report.pdf", "wb") as f:
    f.write(response.content)`}</CodeBlock>

          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Supported export formats: <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>xlsx</code>, <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>pdf</code>, <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>csv</code>, and <code className="text-xs bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>json</code>. All formats are available on all plans, including the free tier.
          </p>

          <StepHeading step={7} title="Integrate into your application" />
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Once you have the basics working, integrating spreadsheet creation into a real application is straightforward. Here is a common pattern: a backend endpoint that accepts data from your frontend and creates a spreadsheet on demand.
          </p>

          <CodeBlock label="Express.js — on-demand report generation">{`import express from "express";

const app = express();
app.use(express.json());

app.post("/api/generate-report", async (req, res) => {
  const { reportType, dateRange, data } = req.body;

  // Transform your application data into spreadsheet format
  const rows = [
    ["Date", "Customer", "Amount", "Status"],
    ...data.map(order => [
      order.date,
      order.customerName,
      order.amount,
      order.status,
    ])
  ];

  // Add a totals row
  rows.push([
    "Total", "",
    \`=SUM(C2:C\${data.length + 1})\`,
    ""
  ]);

  const response = await fetch(
    "https://api.openofficeai.com/v1/sheets",
    {
      method: "POST",
      headers: {
        "Authorization": \`Bearer \${process.env.OPENOFFICEAI_API_KEY}\`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: \`\${reportType} Report — \${dateRange}\`,
        sheets: [{
          name: "Report",
          data: rows,
          formatting: {
            "A1:D1": { bold: true, background: "#f4f4f5" },
            "C2:C100": { format: "$#,##0.00" },
          }
        }]
      })
    }
  );

  const result = await response.json();

  // Return the shareable URL to your frontend
  res.json({
    spreadsheetUrl: result.url,
    documentId: result.id,
  });
});`}</CodeBlock>

          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            This pattern works with any backend framework. Your frontend makes a request to your server, your server calls the OpenOfficeAI API, and you return the shareable URL to the user. The user clicks the link and sees their spreadsheet instantly.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-12 mb-4">Common patterns and tips</h2>

          <h3 className="text-base font-semibold text-zinc-900 mt-8 mb-3">Store your API key in environment variables</h3>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Never hardcode your API key. Use environment variables in every environment — local development, staging, and production. Most deployment platforms (Vercel, Railway, Heroku, AWS) have built-in environment variable management.
          </p>

          <h3 className="text-base font-semibold text-zinc-900 mt-8 mb-3">Handle errors gracefully</h3>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            The API returns standard HTTP status codes. 201 means success. 400 means your request body has an error. 401 means your API key is invalid. 429 means you have hit the rate limit. Always check the status code before using the response.
          </p>

          <CodeBlock label="Python — error handling">{`response = requests.post(url, headers=headers, json=payload)

if response.status_code == 201:
    result = response.json()
    print(f"Success: {result['url']}")
elif response.status_code == 429:
    print("Rate limited. Wait and retry.")
else:
    print(f"Error {response.status_code}: {response.json()['error']}")`}</CodeBlock>

          <h3 className="text-base font-semibold text-zinc-900 mt-8 mb-3">Use the free tier for development</h3>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            The free tier gives you 500 API calls per month and 25 documents. That is more than enough for development and testing. You do not need to upgrade until you are ready to go to production. See our <Link href="/pricing" className="text-zinc-900 underline underline-offset-2">pricing page</Link> for details on all plans.
          </p>

          <h3 className="text-base font-semibold text-zinc-900 mt-8 mb-3">Batch data preparation, not API calls</h3>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Unlike some spreadsheet APIs that require multiple requests to build a document, OpenOfficeAI creates the entire spreadsheet in one call. This means you should do all your data preparation in your code before making the request. Query your database, transform the data, build the rows array, and then make a single POST request.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-12 mb-4">What to build next</h2>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Now that you know how to create spreadsheets via API, here are some ideas for what to build:
          </p>
          <ul className="text-sm text-zinc-600 leading-relaxed mb-4 list-disc list-inside space-y-2">
            <li><strong className="text-zinc-900">Automated reporting.</strong> Connect to your database and generate weekly or monthly reports automatically using a cron job.</li>
            <li><strong className="text-zinc-900">User-facing exports.</strong> Add an "Export to Spreadsheet" button to your SaaS application that generates a formatted spreadsheet on demand.</li>
            <li><strong className="text-zinc-900">AI agent output.</strong> Give your AI agent the ability to produce real spreadsheets as part of its workflow.</li>
            <li><strong className="text-zinc-900">Invoice generation.</strong> Create a billing pipeline that produces professional invoices as downloadable PDFs.</li>
            <li><strong className="text-zinc-900">Data pipeline exports.</strong> End your ETL pipeline with a spreadsheet that stakeholders can immediately open and use.</li>
          </ul>

          <div className="border-t border-zinc-200 mt-12 pt-8">
            <p className="text-sm text-zinc-600 leading-relaxed mb-4">
              Ready to start building? <Link href="/signup" className="text-zinc-900 underline underline-offset-2">Create your free account</Link> and you will have your first spreadsheet created in under five minutes.
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              For the full API reference — including document creation, updating, deletion, sharing, and webhooks — see the <Link href="/docs" className="text-zinc-900 underline underline-offset-2">API documentation</Link>.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </div>
  )
}
