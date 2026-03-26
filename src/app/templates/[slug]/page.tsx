import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { templates, getTemplateBySlug, getAllSlugs } from '@/data/templates'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const template = getTemplateBySlug(slug)
  if (!template) return {}

  const title = `${template.name} Template — Free Online Spreadsheet`
  const description = template.description.slice(0, 155) + '...'

  return {
    title,
    description,
    alternates: {
      canonical: `https://opensheet-seven.vercel.app/templates/${slug}`,
    },
    openGraph: {
      title: `${template.name} Template — OpenOfficeAI`,
      description,
      url: `https://opensheet-seven.vercel.app/templates/${slug}`,
    },
  }
}

function getCustomizationTips(template: { slug: string; name: string; columns: string[] }): string[] {
  const tips: Record<string, string[]> = {
    invoice: [
      'Add a "Discount %" column between Unit Price and Total to handle volume discounts or promotional pricing for specific line items.',
      'Include a "Payment Terms" row at the bottom (e.g., Net 30, Net 60) and a "Notes" row for bank transfer details or late payment policies.',
      'Add a "Currency" column if you bill international clients, and use the formatting endpoint to apply number formatting to price columns.',
    ],
    budget: [
      'Add a "% of Total" column that calculates each line item as a percentage of total spend, making it easy to spot which categories consume the most budget.',
      'Break the budget into monthly sheets by creating one spreadsheet per month, then build a summary spreadsheet that links to each month for a full-year view.',
      'Add conditional formatting notes in a "Flag" column to mark any line item where actual spend exceeds planned by more than 10%.',
    ],
    'expense-report': [
      'Add a "Reimbursement Method" column (direct deposit, check, payroll) so finance knows how to process each approved expense.',
      'Include a "Project Code" column to allocate expenses to specific projects or cost centers for more granular accounting.',
      'Add a "Currency" and "Exchange Rate" column pair for international travel expenses that need to be converted to your base currency.',
    ],
    'profit-and-loss': [
      'Add quarterly columns (Q1, Q2, Q3, Q4) alongside the current/prior period to show seasonal trends and year-over-year performance.',
      'Include a "% of Revenue" column that shows each expense line as a percentage of total revenue, which is standard for financial analysis.',
      'Add a "Budget" column next to actuals so you can compare planned vs. actual performance in the same view.',
    ],
    'project-tracker': [
      'Add an "Estimated Hours" and "Actual Hours" column pair to track effort alongside task status for better sprint planning.',
      'Include a "Dependencies" column that references other task names, making it clear which tasks are blocked and by whom.',
      'Add a "Sprint" or "Milestone" column to group tasks by delivery phase, useful for filtering during sprint reviews.',
    ],
    'meeting-notes': [
      'Add an "Agenda Item #" column to number each topic, making it easy to reference specific discussion points in follow-up conversations.',
      'Include a "Follow-up Date" column separate from the deadline to schedule check-ins on long-running action items.',
      'Add a "Status" column for action items (Open, In Progress, Done) so you can review outstanding items at the start of the next meeting.',
    ],
    'task-list': [
      'Add a "Time Estimate" column so your team can gauge daily workload at a glance and avoid overcommitting.',
      'Include a "Tags" column with comma-separated labels (frontend, backend, design) for easy filtering by work type.',
      'Add a "Completed Date" column to track when tasks were actually finished, useful for measuring team velocity over time.',
    ],
    'content-calendar': [
      'Add a "Target Keywords" column to align each piece of content with your SEO strategy and track keyword coverage across your publishing schedule.',
      'Include a "Visual Assets" column to note whether the design team needs to create graphics, videos, or thumbnails for each content piece.',
      'Add a "Performance" column that you update after publication with metrics like views, shares, or conversions to inform future content decisions.',
    ],
    'employee-directory': [
      'Add a "Manager" column that references another employee name, enabling you to build an org chart from the spreadsheet data.',
      'Include a "Skills" column with comma-separated tags so team leads can quickly find colleagues with specific expertise.',
      'Add a "Pronouns" and "Time Zone" column to support distributed teams and inclusive communication.',
    ],
    inventory: [
      'Add a "Last Restocked" date column to track how long ago each item was replenished, helping you identify slow-moving stock.',
      'Include a "Warehouse Location" column (e.g., Aisle 3, Bin B-12) so warehouse staff can physically locate items quickly.',
      'Add a "Selling Price" column alongside Unit Cost to calculate margins per product directly in the spreadsheet.',
    ],
    crm: [
      'Add a "Lead Source" column (website, referral, cold outreach, event) to track which channels generate the highest-value deals.',
      'Include a "Next Action" and "Next Action Date" column so sales reps always know their immediate next step for each deal.',
      'Add a "Deal Probability" percentage column to weight your pipeline forecast — multiply Deal Value by probability for a weighted revenue projection.',
    ],
    'api-documentation': [
      'Add a "Rate Limit" column to document the request limits per endpoint, so integrators know their constraints upfront.',
      'Include a "Version Added" column to track when each endpoint was introduced, useful for maintaining backward compatibility notes.',
      'Add an "Example Request" column with a short curl command or JSON body that developers can copy and test immediately.',
    ],
    changelog: [
      'Add a "Impact" column (Low, Medium, High) to help users quickly assess whether a change affects their workflow.',
      'Include a "Migration Required" boolean column for breaking changes, so developers can filter for entries that need action on their end.',
      'Add a "Related Docs" column linking to updated documentation pages for each change, creating a bridge between your changelog and your docs site.',
    ],
    'feature-comparison': [
      'Replace text values with a consistent symbol system (checkmark, dash, "Partial") and add a legend row at the top for clarity.',
      'Add a "Weight" or "Importance" column to score features by priority, helping stakeholders focus on the features that matter most for their use case.',
      'Include a "Source/Date Verified" column to track when each competitive data point was last confirmed, keeping your comparison credible.',
    ],
    'pricing-table': [
      'Add a "Savings vs Monthly" column that calculates the percentage saved when paying annually, making the annual plan more compelling.',
      'Include a "Popular" or "Recommended" boolean column to flag your best-value plan, useful for rendering a highlighted card on your pricing page.',
      'Add a "Trial Available" column to indicate which plans offer a free trial, helping your sales team guide prospects to the right starting point.',
    ],
  }

  return tips[template.slug] || [
    `Add custom columns specific to your ${template.name.toLowerCase()} workflow.`,
    'Use the formatting endpoint to apply colors, bold headers, or number formatting to key columns.',
    'Set up a scheduled API call to regenerate this spreadsheet with fresh data on a weekly or monthly basis.',
  ]
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params
  const template = getTemplateBySlug(slug)

  if (!template) {
    notFound()
  }

  const relatedTemplates = template.relatedSlugs
    .map((s) => templates.find((t) => t.slug === s))
    .filter(Boolean)

  const tips = getCustomizationTips(template)

  const curlColumns = JSON.stringify(template.columns)
  const curlRows = JSON.stringify(template.sampleRows.slice(0, 2))

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: template.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="min-h-[100dvh] bg-[#fafafa]">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Nav */}
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
          <a href="/templates" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">
            Templates
          </a>
          <a href="/docs" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">
            Docs
          </a>
          <a href="/pricing" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">
            Pricing
          </a>
          <a
            href="/signup"
            className="text-sm text-zinc-700 px-4 py-2 rounded-[10px] border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all active:scale-[0.98]"
          >
            Get Started
          </a>
        </div>
      </nav>

      <div className="max-w-[800px] mx-auto px-6 pt-10 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-zinc-400 mb-8">
          <Link href="/templates" className="hover:text-zinc-600 transition-colors">
            Templates
          </Link>
          <span>/</span>
          <span className="text-zinc-600">{template.name}</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-4">
          {template.name} — Free Online Template
        </h1>

        {/* Description */}
        <p className="text-[15px] text-zinc-500 leading-relaxed mb-8">{template.description}</p>

        {/* CTA */}
        <div className="flex flex-wrap gap-3 mb-12">
          <a
            href={`/signup?then=sheet&template=${template.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-zinc-900 px-5 py-2.5 rounded-[10px] hover:bg-zinc-800 transition-all active:scale-[0.98]"
          >
            Use This Template
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3l4 4-4 4" />
            </svg>
          </a>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 px-5 py-2.5 rounded-[10px] border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all active:scale-[0.98]"
          >
            View API Docs
          </a>
        </div>

        {/* Preview table */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 mb-4">Preview</h2>
          <div className="border border-zinc-200 rounded-2xl bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-100">
                    {template.columns.map((col) => (
                      <th
                        key={col}
                        className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {template.sampleRows.map((row, i) => (
                    <tr key={i} className="border-b border-zinc-50 last:border-0">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-3 text-sm text-zinc-600 whitespace-nowrap">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Create via API */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 mb-2">Create via API</h2>
          <p className="text-sm text-zinc-500 mb-4">
            Generate this {template.name.toLowerCase()} programmatically with a single POST request.
            The API returns a shareable URL that anyone can open in the browser.
          </p>
          <div className="rounded-xl bg-[#18181b] border border-zinc-800 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800">
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
                curl
              </span>
            </div>
            <pre
              className="p-4 text-[13px] text-zinc-300 leading-[1.8] overflow-x-auto"
              style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
            >
{`curl -X POST https://opensheet-seven.vercel.app/api/v1/sheets \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My ${template.name}",
    "columns": ${curlColumns},
    "rows": ${curlRows}
  }'`}
            </pre>
          </div>
          <p className="text-xs text-zinc-400 mt-3">
            Returns <code className="text-zinc-500" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{'{ "id": "...", "url": "...", "created_at": "..." }'}</code>.
            See the <Link href="/docs" className="text-zinc-600 underline underline-offset-2 hover:text-zinc-900">full API docs</Link> for formatting, formulas, and export options.
          </p>
        </section>

        {/* What's included */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 mb-4">
            What&apos;s included
          </h2>
          <p className="text-sm text-zinc-500 mb-4">
            This template comes with {template.columns.length} columns designed for a standard {template.name.toLowerCase()} workflow. Each column can be renamed, reordered, or extended through the API or the browser editor.
          </p>
          <div className="border border-zinc-200 rounded-2xl bg-white divide-y divide-zinc-100">
            {template.columns.map((col) => (
              <div key={col} className="flex items-start gap-3 px-5 py-3.5">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-2 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-zinc-900">{col}</span>
                  <p className="text-sm text-zinc-500 mt-0.5">
                    {getColumnDescription(template.slug, col)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to customize */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 mb-4">
            How to customize
          </h2>
          <p className="text-sm text-zinc-500 mb-4">
            This template is a starting point. Here are specific ways to adapt it to your workflow:
          </p>
          <div className="space-y-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 bg-white">
                <span className="text-xs font-semibold text-zinc-400 bg-zinc-100 rounded-md w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-zinc-600 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {template.faqs.map((faq) => (
              <div key={faq.question} className="border-t border-zinc-200 pt-4">
                <h3 className="text-sm font-semibold text-zinc-900 mb-1.5">{faq.question}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related templates */}
        {relatedTemplates.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 mb-4">
              Related templates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTemplates.map((related) => related && (
                <Link
                  key={related.slug}
                  href={`/templates/${related.slug}`}
                  className="group p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm transition-all"
                >
                  <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors mb-1">
                    {related.name}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2">
                    {related.description.slice(0, 100)}...
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="border border-zinc-200 rounded-2xl bg-white p-8 text-center">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 mb-2">
            Ready to create your {template.name.toLowerCase()}?
          </h2>
          <p className="text-sm text-zinc-500 mb-5">
            Sign up for free and start building spreadsheets in seconds — from the browser or via the API.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href={`/signup?then=sheet&template=${template.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-zinc-900 px-5 py-2.5 rounded-[10px] hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              Use This Template
            </a>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 px-5 py-2.5 rounded-[10px] border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all active:scale-[0.98]"
            >
              Browse all templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function getColumnDescription(slug: string, column: string): string {
  const descriptions: Record<string, Record<string, string>> = {
    invoice: {
      'Item': 'The name or title of the billable item or service you are invoicing for.',
      'Description': 'A brief explanation of the work performed or product delivered for this line item.',
      'Quantity': 'The number of units, hours, or items being billed on this line.',
      'Unit Price': 'The price per unit before tax. Supports any currency format.',
      'Tax %': 'The tax rate applied to this line item, expressed as a percentage.',
      'Total': 'The calculated total for this line: quantity multiplied by unit price, plus tax.',
    },
    budget: {
      'Category': 'The department or expense category this line item belongs to (e.g., Marketing, Engineering).',
      'Line Item': 'The specific expense within the category, such as a software subscription or vendor payment.',
      'Planned': 'The budgeted amount allocated for this line item at the start of the period.',
      'Actual': 'The actual amount spent on this line item so far.',
      'Variance': 'The difference between planned and actual. Positive means under budget, negative means over.',
      'Notes': 'Additional context about the expense, such as reasons for variance or upcoming changes.',
    },
    'expense-report': {
      'Date': 'The date the expense was incurred, in YYYY-MM-DD format.',
      'Merchant': 'The vendor or business where the purchase was made.',
      'Category': 'The expense type: Travel, Meals, Lodging, Transport, Software, or Office Supplies.',
      'Amount': 'The total amount of the expense in your base currency.',
      'Receipt Ref': 'A reference ID or link to the receipt image stored in your file system.',
      'Status': 'The approval status of the expense: Pending, Approved, or Rejected.',
    },
    'profit-and-loss': {
      'Line Item': 'The financial line item name, such as Product Revenue, COGS, or Salaries & Wages.',
      'Category': 'The P&L section: Revenue, COGS, Operating Expenses, or Bottom Line.',
      'Current Period': 'The amount for the current reporting period.',
      'Prior Period': 'The amount for the previous period, used for comparison.',
      'Variance': 'The absolute difference between current and prior period.',
      'Variance %': 'The percentage change from the prior period to the current period.',
    },
    'project-tracker': {
      'Task': 'A clear, actionable description of the work to be done.',
      'Assignee': 'The team member responsible for completing this task.',
      'Priority': 'The urgency level: High, Medium, or Low.',
      'Status': 'The current state: Not Started, In Progress, In Review, or Done.',
      'Start Date': 'When work on this task is expected to begin.',
      'Due Date': 'The deadline for completing this task.',
    },
    'meeting-notes': {
      'Topic': 'The agenda item or subject discussed during the meeting.',
      'Discussion Summary': 'A brief summary of the key points raised during discussion.',
      'Decision': 'The outcome or decision made regarding this topic, if any.',
      'Action Item': 'A specific next step that needs to be completed after the meeting.',
      'Owner': 'The person responsible for completing the action item.',
      'Deadline': 'The date by which the action item should be completed.',
    },
    'task-list': {
      'Task': 'A short, clear description of what needs to be done.',
      'Status': 'The current state of the task: Done, In Progress, or Not Started.',
      'Priority': 'How urgent the task is: High, Medium, or Low.',
      'Assignee': 'The person responsible for this task.',
      'Due Date': 'When this task needs to be completed.',
      'Notes': 'Any additional context, blockers, or links related to the task.',
    },
    'content-calendar': {
      'Title': 'The working title of the content piece.',
      'Platform': 'Where the content will be published: Blog, Instagram, Twitter/X, Email, YouTube, etc.',
      'Content Type': 'The format: Article, Video, Thread, Newsletter, Case Study, Infographic.',
      'Publish Date': 'The planned or scheduled publication date.',
      'Status': 'Where the content is in the pipeline: Idea, Writing, Review, Scheduled, Published.',
      'Author': 'The person creating or responsible for the content.',
    },
    'employee-directory': {
      'Full Name': 'The employee first and last name.',
      'Title': 'The official job title or role within the company.',
      'Department': 'The team or department the employee belongs to.',
      'Email': 'The work email address.',
      'Phone': 'The work or mobile phone number.',
      'Office': 'The office location or city where the employee is based.',
      'Start Date': 'The date the employee joined the company.',
    },
    inventory: {
      'SKU': 'The unique stock keeping unit identifier for this product.',
      'Product Name': 'The display name of the product.',
      'Category': 'The product category for grouping and filtering.',
      'Quantity': 'The current number of units in stock.',
      'Reorder Point': 'The stock level at which you should place a new order with the supplier.',
      'Unit Cost': 'The cost per unit from the supplier, used for margin calculations.',
      'Supplier': 'The vendor or manufacturer who supplies this product.',
    },
    crm: {
      'Company': 'The business name of the prospect or customer.',
      'Contact': 'The primary point of contact at the company.',
      'Deal Value': 'The estimated total value of the deal in your pipeline.',
      'Stage': 'The current pipeline stage: Lead, Qualified, Proposal, Negotiation, Closed Won, or Closed Lost.',
      'Expected Close': 'The date you expect the deal to close.',
      'Sales Rep': 'The sales team member who owns this deal.',
    },
    'api-documentation': {
      'Method': 'The HTTP method: GET, POST, PATCH, PUT, or DELETE.',
      'Endpoint': 'The URL path for this API endpoint.',
      'Description': 'A brief explanation of what this endpoint does.',
      'Auth Required': 'Whether the endpoint requires an API key or bearer token.',
      'Parameters': 'The input parameters accepted by this endpoint (path, query, or body).',
      'Response': 'A summary of the response payload structure.',
    },
    changelog: {
      'Version': 'The semantic version number for this release (e.g., 2.4.0).',
      'Date': 'The date this version was released.',
      'Type': 'The kind of change: Feature, Fix, Improvement, Breaking Change, or Deprecation.',
      'Description': 'A concise explanation of what changed in this release.',
      'Author': 'The engineer or team member who shipped this change.',
      'PR/Issue': 'The pull request or issue number associated with this change.',
    },
    'feature-comparison': {
      'Feature': 'The specific capability or functionality being compared.',
      'Our Product': 'Whether and how your product supports this feature.',
      'Competitor A': 'Whether and how Competitor A supports this feature.',
      'Competitor B': 'Whether and how Competitor B supports this feature.',
      'Notes': 'Additional context or commentary about the comparison.',
    },
    'pricing-table': {
      'Plan': 'The name of the pricing tier.',
      'Monthly Price': 'The cost when billed monthly.',
      'Annual Price': 'The cost when billed annually, typically at a discount.',
      'Users Included': 'The number of user seats included in this plan.',
      'Storage': 'The amount of data storage included.',
      'Key Features': 'A summary of the main features available on this plan.',
    },
  }

  return descriptions[slug]?.[column] || `The ${column.toLowerCase()} field for this ${slug.replace(/-/g, ' ')}.`
}
