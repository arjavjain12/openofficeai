export interface Template {
  slug: string
  name: string
  category: string
  description: string
  columns: string[]
  sampleRows: string[][]
  relatedSlugs: string[]
  faqs: { question: string; answer: string }[]
}

export const templates: Template[] = [
  {
    slug: 'invoice',
    name: 'Invoice',
    category: 'Finance',
    description:
      'Generate professional invoices that your clients can view and download instantly. This template includes all the fields you need for compliant invoicing: line item descriptions, quantities, unit prices, tax calculations, and payment terms. Each row represents a billable item, making it easy to calculate subtotals and apply discounts or tax rates programmatically. Whether you are a freelancer sending a single invoice or a SaaS platform generating thousands of invoices per month through the API, this template gives you a clean starting point. The column structure follows standard accounting conventions, so the data exports cleanly to PDF or XLSX for your records. You can extend it with custom columns for purchase order numbers, project codes, or currency fields to support international billing workflows.',
    columns: ['Item', 'Description', 'Quantity', 'Unit Price', 'Tax %', 'Total'],
    sampleRows: [
      ['Web Development', 'Frontend build — React dashboard', '40', '$150.00', '0%', '$6,000.00'],
      ['UI Design', 'Figma mockups for 12 screens', '1', '$2,400.00', '0%', '$2,400.00'],
      ['Hosting Setup', 'AWS infrastructure + CI/CD pipeline', '1', '$800.00', '8%', '$864.00'],
      ['QA Testing', 'Manual + automated test suite', '16', '$95.00', '0%', '$1,520.00'],
    ],
    relatedSlugs: ['budget', 'expense-report', 'profit-and-loss'],
    faqs: [
      {
        question: 'Can I add tax calculations to invoices created via the API?',
        answer:
          'Yes. You can include a Tax % column and a computed Total column. When you export the spreadsheet to PDF or XLSX, the values render exactly as you set them. For dynamic formulas, use the cells endpoint to apply Excel-style formulas like =C2*D2*(1+E2/100).',
      },
      {
        question: 'How do I send an invoice link to a client?',
        answer:
          'Every document created through the API gets a unique shareable URL. You can send this link directly to your client — they can view the invoice in their browser without signing up. If you need a PDF, append /export?format=pdf to the document URL.',
      },
      {
        question: 'Is there a way to auto-number invoices?',
        answer:
          'The API does not auto-increment invoice numbers, but you can include an invoice number in the document title or as a metadata field. Most teams generate the invoice number in their own backend and pass it as part of the API request payload.',
      },
    ],
  },
  {
    slug: 'budget',
    name: 'Budget',
    category: 'Finance',
    description:
      'Plan and track your spending with a structured budget spreadsheet that breaks expenses into categories. This template organizes your finances into clear line items with columns for planned amounts, actual spend, and the variance between them. It works for personal budgets, departmental budgets, or project-level financial planning. The category column lets you group expenses by type — marketing, engineering, operations, rent — so you can quickly see where money is going. When generated via the API, you can pull real transaction data from your accounting system and populate the budget automatically on a weekly or monthly cadence. The variance column highlights overspend at a glance, making it a practical tool for financial reviews and board reporting.',
    columns: ['Category', 'Line Item', 'Planned', 'Actual', 'Variance', 'Notes'],
    sampleRows: [
      ['Marketing', 'Google Ads', '$4,000', '$4,312', '-$312', 'CPC increased in Q2'],
      ['Engineering', 'AWS Infrastructure', '$8,500', '$7,940', '+$560', 'Reserved instances savings'],
      ['Operations', 'Office Lease', '$6,200', '$6,200', '$0', 'Fixed through Dec 2026'],
      ['HR', 'Recruiting Fees', '$3,000', '$1,800', '+$1,200', 'One hire delayed to Q3'],
      ['Sales', 'CRM Software', '$1,200', '$1,200', '$0', 'Annual Salesforce license'],
    ],
    relatedSlugs: ['expense-report', 'profit-and-loss', 'invoice'],
    faqs: [
      {
        question: 'Can I update the budget spreadsheet after creating it?',
        answer:
          'Absolutely. Use the PATCH endpoint to update specific cells or add new rows as actual spending data comes in. This is useful for teams that populate planned budgets at the start of the quarter and then update actuals weekly from their accounting software.',
      },
      {
        question: 'How do I share a budget with my team without giving edit access?',
        answer:
          'When you create the document, set the sharing permission to "view." Anyone with the link can see the budget but cannot modify it. You can change permissions later through the API if you need to grant edit access to specific collaborators.',
      },
      {
        question: 'Can I create monthly budgets automatically?',
        answer:
          'Yes. Schedule a monthly API call from your backend or a cron job that pulls your planned figures and last month actuals, then creates a new budget spreadsheet. Each document gets its own URL, so you build a historical archive of monthly budgets over time.',
      },
    ],
  },
  {
    slug: 'expense-report',
    name: 'Expense Report',
    category: 'Finance',
    description:
      'Submit and review employee expenses with a clear, auditable spreadsheet format. This template captures each expense as a separate row with the date, merchant, category, amount, and approval status. It is designed for companies that need a lightweight expense tracking workflow without a dedicated expense management tool. Employees fill in their expenses, attach receipt references, and managers can review and approve line items directly in the shared spreadsheet. When integrated with the API, you can auto-populate expense reports from corporate card transaction feeds or receipt scanning services. The status column supports a simple approval workflow: Pending, Approved, or Rejected. Export to PDF for reimbursement records or to XLSX for import into your accounting system.',
    columns: ['Date', 'Merchant', 'Category', 'Amount', 'Receipt Ref', 'Status'],
    sampleRows: [
      ['2026-03-12', 'Delta Airlines', 'Travel', '$487.00', 'REC-0041', 'Approved'],
      ['2026-03-14', 'Hilton Hotels', 'Lodging', '$312.00', 'REC-0042', 'Approved'],
      ['2026-03-14', 'Uber', 'Transport', '$34.50', 'REC-0043', 'Pending'],
      ['2026-03-15', 'Blue Bottle Coffee', 'Meals', '$18.75', 'REC-0044', 'Pending'],
    ],
    relatedSlugs: ['invoice', 'budget', 'profit-and-loss'],
    faqs: [
      {
        question: 'Can I set up an approval workflow using the API?',
        answer:
          'The spreadsheet itself does not enforce workflow logic, but you can use the Status column to track approvals. Your backend can read the spreadsheet via the API, check for rows marked "Pending," and update them to "Approved" or "Rejected" after a manager takes action in your internal tool.',
      },
      {
        question: 'How do I attach receipts to an expense report?',
        answer:
          'Use the Receipt Ref column to store a reference ID or URL that links to the receipt image in your file storage. The spreadsheet acts as the structured index, while the actual receipt files live in your own S3 bucket or document management system.',
      },
      {
        question: 'Can multiple employees use the same expense report?',
        answer:
          'It is better to create one expense report per employee per period. This keeps the data clean and makes it easier to calculate totals per person. You can use the API to batch-create expense reports for your entire team at the start of each month.',
      },
    ],
  },
  {
    slug: 'profit-and-loss',
    name: 'Profit & Loss Statement',
    category: 'Finance',
    description:
      'Build a clear profit and loss statement that summarizes revenue, costs, and net income over a given period. This template follows the standard P&L structure used by accountants and CFOs: revenue at the top, cost of goods sold, gross profit, operating expenses broken into categories, and net income at the bottom. Each row represents a financial line item with the current period amount and the prior period for comparison. The variance column makes it easy to spot trends — growing revenue, rising costs, or improving margins. When generated via the API, you can pull data directly from your ERP or accounting software and produce a fresh P&L every month without manual spreadsheet work. Export to PDF for board decks or to XLSX for further analysis in Excel.',
    columns: ['Line Item', 'Category', 'Current Period', 'Prior Period', 'Variance', 'Variance %'],
    sampleRows: [
      ['Product Revenue', 'Revenue', '$142,000', '$128,500', '+$13,500', '+10.5%'],
      ['Service Revenue', 'Revenue', '$38,000', '$41,200', '-$3,200', '-7.8%'],
      ['Cost of Goods Sold', 'COGS', '$52,400', '$48,100', '-$4,300', '+8.9%'],
      ['Salaries & Wages', 'Operating Expenses', '$64,000', '$61,000', '-$3,000', '+4.9%'],
      ['Net Income', 'Bottom Line', '$28,600', '$31,100', '-$2,500', '-8.0%'],
    ],
    relatedSlugs: ['budget', 'invoice', 'expense-report'],
    faqs: [
      {
        question: 'Can I generate a P&L statement every month automatically?',
        answer:
          'Yes. Set up a monthly cron job or scheduled function that queries your accounting database, formats the numbers into the P&L structure, and sends a POST request to the API. Each month you get a new shareable spreadsheet with a unique URL you can send to stakeholders.',
      },
      {
        question: 'Does the template support multiple currencies?',
        answer:
          'The template uses plain text columns, so you can format amounts in any currency. If you need to handle multi-currency P&L statements, add a Currency column and store amounts as raw numbers with the currency symbol in a separate field for clean calculations.',
      },
      {
        question: 'How do I compare P&L across multiple periods?',
        answer:
          'Add additional columns for each period you want to compare — Q1, Q2, Q3, Q4, for example. The API lets you define as many columns as you need. You can also create separate spreadsheets per period and link them in a summary document.',
      },
    ],
  },
  {
    slug: 'project-tracker',
    name: 'Project Tracker',
    category: 'Project Management',
    description:
      'Keep your team aligned with a project tracker that shows every task, its owner, status, and deadline in one spreadsheet. This template is built for teams that want a simple, shareable view of project progress without the overhead of a full project management tool. Each row is a task with columns for the assignee, priority level, current status, start date, and due date. The status column uses plain text values like Not Started, In Progress, In Review, and Done, which your backend can update programmatically as work moves through your pipeline. Generate a new project tracker at the start of each sprint via the API, or maintain a single living document that gets updated throughout the project lifecycle. Share the link with stakeholders who need visibility without giving them access to your internal tools.',
    columns: ['Task', 'Assignee', 'Priority', 'Status', 'Start Date', 'Due Date'],
    sampleRows: [
      ['Design homepage mockup', 'Sarah Chen', 'High', 'Done', '2026-03-01', '2026-03-05'],
      ['Build authentication flow', 'Marcus Webb', 'High', 'In Progress', '2026-03-04', '2026-03-11'],
      ['Write API documentation', 'Priya Sharma', 'Medium', 'In Progress', '2026-03-06', '2026-03-14'],
      ['Set up CI/CD pipeline', 'James Okoro', 'Medium', 'Not Started', '2026-03-10', '2026-03-17'],
      ['User acceptance testing', 'Sarah Chen', 'Low', 'Not Started', '2026-03-15', '2026-03-21'],
    ],
    relatedSlugs: ['task-list', 'content-calendar', 'changelog'],
    faqs: [
      {
        question: 'Can I update task statuses from my CI/CD pipeline?',
        answer:
          'Yes. Use the PATCH endpoint to update specific cells when events happen in your pipeline. For example, when a pull request is merged, your GitHub Action can call the API to change the task status from "In Progress" to "In Review" automatically.',
      },
      {
        question: 'How many tasks can a single project tracker hold?',
        answer:
          'There is no hard limit on the number of rows. Spreadsheets with up to 10,000 rows perform well in the browser editor. For very large projects, consider splitting tasks across multiple spreadsheets by sprint or workstream.',
      },
      {
        question: 'Can I filter or sort tasks in the shared view?',
        answer:
          'The browser editor supports basic sorting by clicking column headers. For advanced filtering, you can pre-sort the data before sending it to the API, or create multiple views by generating separate spreadsheets filtered by assignee or status.',
      },
    ],
  },
  {
    slug: 'meeting-notes',
    name: 'Meeting Notes',
    category: 'Productivity',
    description:
      'Capture meeting outcomes in a structured format that is easy to reference later. This template turns unstructured meeting notes into an organized spreadsheet with columns for the topic discussed, key decisions made, action items, the person responsible, and the deadline. Instead of burying important decisions in a wall of text, each row isolates a single discussion point so your team can quickly scan for what matters to them. The structured format also makes it possible to programmatically extract action items and push them into your task management system. Use the API to auto-create a meeting notes spreadsheet before each recurring meeting, pre-populated with agenda items from your calendar integration. After the meeting, update the spreadsheet with decisions and action items, then share the link in Slack so everyone has a single source of truth.',
    columns: ['Topic', 'Discussion Summary', 'Decision', 'Action Item', 'Owner', 'Deadline'],
    sampleRows: [
      ['Q2 Roadmap', 'Reviewed feature priorities for April-June', 'Approved mobile app MVP scope', 'Draft mobile spec doc', 'Lena Park', '2026-03-28'],
      ['Hiring Update', 'Three candidates in final round for senior eng', 'Extend offer to candidate B', 'Send offer letter', 'Tom Rivera', '2026-03-25'],
      ['Bug Triage', 'Payment timeout issue affecting 2% of checkouts', 'Escalate to P0', 'Hotfix by end of week', 'Aisha Patel', '2026-03-26'],
    ],
    relatedSlugs: ['task-list', 'project-tracker', 'content-calendar'],
    faqs: [
      {
        question: 'Can I auto-create meeting notes from my calendar?',
        answer:
          'Yes. Integrate your calendar API (Google Calendar, Outlook) with a script that triggers before each meeting. The script pulls the meeting title and agenda, then calls the OpenOfficeAI API to create a pre-populated meeting notes spreadsheet with the agenda items as rows.',
      },
      {
        question: 'How do I extract action items into my task manager?',
        answer:
          'Use the GET endpoint to read the spreadsheet data as JSON. Filter for rows where the Action Item column is not empty, then push those items into Jira, Linear, or Asana via their respective APIs. This turns your meeting notes into a lightweight workflow automation.',
      },
      {
        question: 'Can multiple people edit the meeting notes at the same time?',
        answer:
          'Yes. The browser editor supports concurrent editing. Share the link with your team before the meeting starts, and anyone with edit access can add notes in real time. Changes are saved automatically and visible to all participants.',
      },
    ],
  },
  {
    slug: 'task-list',
    name: 'Task List',
    category: 'Productivity',
    description:
      'A straightforward task list for tracking to-dos with priorities and deadlines. Unlike a full project tracker, this template is intentionally lightweight — it focuses on individual tasks without the overhead of project phases or dependencies. Each row is a single task with a status, priority, assignee, and due date. This makes it ideal for personal productivity, team standups, or lightweight sprint planning. The simplicity of the structure means you can generate it quickly via the API and share a link without any onboarding. Teams often use this as a daily checklist that gets regenerated each morning from their backlog, showing only the tasks that are due today or overdue. The clean column structure also makes it easy to parse programmatically, so you can build dashboards or Slack bots that report on task completion rates.',
    columns: ['Task', 'Status', 'Priority', 'Assignee', 'Due Date', 'Notes'],
    sampleRows: [
      ['Review PR #247', 'Done', 'High', 'Dana Kim', '2026-03-22', 'Approved with minor comments'],
      ['Update staging env', 'In Progress', 'High', 'Raj Mehta', '2026-03-24', 'Waiting on DevOps'],
      ['Write unit tests for auth', 'Not Started', 'Medium', 'Dana Kim', '2026-03-26', ''],
      ['Prepare demo for Friday', 'Not Started', 'Low', 'Raj Mehta', '2026-03-28', 'Include new dashboard'],
    ],
    relatedSlugs: ['project-tracker', 'meeting-notes', 'content-calendar'],
    faqs: [
      {
        question: 'What is the difference between the Task List and Project Tracker templates?',
        answer:
          'The Task List is a flat list of individual to-dos, ideal for daily standups or personal tracking. The Project Tracker adds start dates, richer priority levels, and is designed for multi-week projects with multiple contributors. Use the Task List when you want simplicity, and the Project Tracker when you need timeline visibility.',
      },
      {
        question: 'Can I mark tasks as done through the API?',
        answer:
          'Yes. Use the PATCH endpoint to update the Status cell of any row. For example, when a webhook fires from your CI system, you can automatically mark the corresponding task as "Done" without anyone opening the spreadsheet manually.',
      },
      {
        question: 'How do I create a recurring daily task list?',
        answer:
          'Set up a cron job that runs each morning. The script queries your backlog or project management tool for tasks due today, formats them into the task list structure, and creates a new spreadsheet via the API. Share the link in your team Slack channel to kick off the day.',
      },
    ],
  },
  {
    slug: 'content-calendar',
    name: 'Content Calendar',
    category: 'Marketing',
    description:
      'Plan your content pipeline with a calendar-style spreadsheet that shows what is being published, when, and on which platform. This template is designed for marketing teams, content creators, and social media managers who need a shared view of their editorial schedule. Each row represents a content piece with its title, platform, publish date, status, and the team member responsible. The status column tracks the content through its lifecycle: Idea, Writing, Review, Scheduled, and Published. By generating this via the API, you can pull in data from your CMS or social media scheduler and keep the calendar in sync without manual updates. Share the link with freelancers, designers, and stakeholders so everyone knows what is coming up next. The spreadsheet format makes it easy to spot gaps in your schedule or imbalances across platforms.',
    columns: ['Title', 'Platform', 'Content Type', 'Publish Date', 'Status', 'Author'],
    sampleRows: [
      ['10 Tips for Remote Teams', 'Blog', 'Article', '2026-04-01', 'Writing', 'Megan Cross'],
      ['Product Launch Reel', 'Instagram', 'Video', '2026-04-03', 'Review', 'Alex Huang'],
      ['API Best Practices Thread', 'Twitter/X', 'Thread', '2026-04-05', 'Idea', 'Megan Cross'],
      ['Customer Story: Acme Corp', 'Blog', 'Case Study', '2026-04-08', 'Scheduled', 'Jordan Ellis'],
      ['Monthly Newsletter', 'Email', 'Newsletter', '2026-04-10', 'Writing', 'Alex Huang'],
    ],
    relatedSlugs: ['task-list', 'project-tracker', 'meeting-notes'],
    faqs: [
      {
        question: 'Can I sync the content calendar with my CMS?',
        answer:
          'Yes. Use a webhook or scheduled script that reads new posts from your CMS (WordPress, Contentful, etc.) and adds them as rows to the content calendar via the API. This keeps the spreadsheet in sync with your actual publishing pipeline without duplicate data entry.',
      },
      {
        question: 'How do I plan content across multiple platforms?',
        answer:
          'The Platform column lets you tag each piece of content with its target platform. You can then filter or sort by platform to see your publishing schedule for just Instagram, just your blog, or just email. Create multiple rows for cross-posted content with different publish dates per platform.',
      },
      {
        question: 'Can freelancers view the calendar without an account?',
        answer:
          'Yes. Shared spreadsheet links do not require the viewer to have an OpenOfficeAI account. Send the link to your freelancers and they can see the full content calendar in their browser. If you want them to update their row status, grant edit access on the document.',
      },
    ],
  },
  {
    slug: 'employee-directory',
    name: 'Employee Directory',
    category: 'HR',
    description:
      'Maintain a clean, searchable employee directory that your team can access from a single link. This template stores essential employee information: name, job title, department, email, phone, office location, and start date. It is particularly useful for growing companies that do not yet have an HRIS but need a centralized place for contact information. The spreadsheet format makes it easy to search, sort by department, and export for onboarding packets or org chart tools. When integrated with the API, you can sync the directory with your identity provider (Okta, Google Workspace) so it stays up to date as people join and leave. New hires get added automatically, and departures get flagged or removed. Share a read-only link company-wide so anyone can look up a colleague without pinging HR.',
    columns: ['Full Name', 'Title', 'Department', 'Email', 'Phone', 'Office', 'Start Date'],
    sampleRows: [
      ['Natalie Reeves', 'VP of Engineering', 'Engineering', 'natalie@example.com', '(415) 555-0134', 'San Francisco', '2022-06-15'],
      ['Derek Yamamoto', 'Product Designer', 'Design', 'derek@example.com', '(212) 555-0187', 'New York', '2023-09-04'],
      ['Fatima Al-Hassan', 'Data Analyst', 'Analytics', 'fatima@example.com', '(512) 555-0221', 'Austin', '2024-01-22'],
      ['Carlos Mendez', 'Account Executive', 'Sales', 'carlos@example.com', '(305) 555-0098', 'Miami', '2025-03-10'],
    ],
    relatedSlugs: ['crm', 'inventory', 'task-list'],
    faqs: [
      {
        question: 'How do I keep the employee directory in sync with our HR system?',
        answer:
          'Set up a nightly sync script that pulls employee data from your HRIS or identity provider, compares it with the current spreadsheet, and uses the PATCH endpoint to add, update, or remove rows. This ensures the directory is always current without anyone manually editing it.',
      },
      {
        question: 'Can I restrict who sees the phone numbers?',
        answer:
          'The sharing model is per-document, not per-column, so you cannot hide specific columns from certain viewers. If phone numbers are sensitive, create two versions of the directory: a full version for HR and a public version without the Phone column for company-wide sharing.',
      },
      {
        question: 'Is there a limit to how many employees I can list?',
        answer:
          'No practical limit for a typical organization. Spreadsheets with up to 10,000 rows load quickly in the browser. For companies with thousands of employees, the spreadsheet will work fine, though you might want to paginate or split by department for easier navigation.',
      },
    ],
  },
  {
    slug: 'inventory',
    name: 'Inventory',
    category: 'Operations',
    description:
      'Track your product inventory with a spreadsheet that shows stock levels, reorder points, and supplier information at a glance. This template is designed for e-commerce sellers, warehouse managers, and small businesses that need to monitor what is in stock without investing in a full inventory management system. Each row represents a product with its SKU, current quantity, reorder threshold, unit cost, and supplier name. When the quantity drops below the reorder point, your automation can flag the row or trigger a purchase order. By generating and updating this spreadsheet through the API, you can connect it to your point-of-sale system or e-commerce platform so stock levels update in real time. Share the link with your purchasing team so they always have visibility into what needs to be reordered.',
    columns: ['SKU', 'Product Name', 'Category', 'Quantity', 'Reorder Point', 'Unit Cost', 'Supplier'],
    sampleRows: [
      ['SKU-1001', 'Wireless Mouse', 'Electronics', '342', '100', '$12.50', 'TechSource Ltd'],
      ['SKU-1002', 'USB-C Hub 7-Port', 'Electronics', '87', '50', '$24.00', 'TechSource Ltd'],
      ['SKU-2010', 'Standing Desk Mat', 'Office', '156', '75', '$18.00', 'ErgoSupply Co'],
      ['SKU-2011', 'Monitor Arm', 'Office', '43', '30', '$45.00', 'ErgoSupply Co'],
      ['SKU-3005', 'Notebook — Lined A5', 'Stationery', '1,204', '500', '$1.80', 'PaperWorks Inc'],
    ],
    relatedSlugs: ['invoice', 'pricing-table', 'crm'],
    faqs: [
      {
        question: 'Can I set up alerts when stock drops below the reorder point?',
        answer:
          'The spreadsheet itself does not send alerts, but you can build a simple automation. Use the GET endpoint to read inventory data on a schedule, check each row where Quantity is below the Reorder Point, and send a Slack message or email to your purchasing team with the items that need restocking.',
      },
      {
        question: 'How do I update quantities when orders come in?',
        answer:
          'Use the PATCH endpoint to decrement quantities when an order is placed. Your e-commerce platform webhook can trigger an API call that reads the current quantity, subtracts the ordered amount, and writes the new value back. This keeps the spreadsheet in sync with real sales.',
      },
      {
        question: 'Can I track inventory across multiple warehouses?',
        answer:
          'Add a Warehouse or Location column to distinguish stock levels per facility. Alternatively, create separate spreadsheets per warehouse and a summary spreadsheet that aggregates totals. The API makes it easy to maintain all of these programmatically.',
      },
    ],
  },
  {
    slug: 'crm',
    name: 'CRM',
    category: 'Sales',
    description:
      'Manage your sales pipeline with a lightweight CRM spreadsheet that tracks leads, deal stages, and expected revenue. This template is designed for startups and small sales teams that want pipeline visibility without the complexity of a full CRM platform. Each row represents a deal with the company name, contact person, deal value, current stage, expected close date, and the sales rep responsible. The stage column follows a standard pipeline: Lead, Qualified, Proposal, Negotiation, Closed Won, Closed Lost. By populating this through the API, you can sync it with your lead generation tools — when a new lead comes in from your website form or a third-party enrichment service, it automatically gets added as a row. Sales managers can share the pipeline link with leadership for weekly reviews, and export to XLSX for revenue forecasting models.',
    columns: ['Company', 'Contact', 'Deal Value', 'Stage', 'Expected Close', 'Sales Rep'],
    sampleRows: [
      ['Acme Corp', 'Jennifer Wu', '$45,000', 'Proposal', '2026-04-15', 'Brian Foster'],
      ['Globex Inc', 'Mark Stevens', '$12,000', 'Qualified', '2026-05-01', 'Sara Knight'],
      ['Initech', 'Peter Gibbons', '$28,500', 'Negotiation', '2026-04-08', 'Brian Foster'],
      ['Umbrella LLC', 'Alice Wong', '$8,000', 'Lead', '2026-06-01', 'Sara Knight'],
    ],
    relatedSlugs: ['employee-directory', 'invoice', 'pricing-table'],
    faqs: [
      {
        question: 'Can I move deals through pipeline stages via the API?',
        answer:
          'Yes. Use the PATCH endpoint to update the Stage cell for any deal row. Your sales automation tool can trigger stage changes based on events — for example, moving a deal to "Proposal" when a proposal document is sent, or to "Closed Won" when a contract is signed in DocuSign.',
      },
      {
        question: 'How do I calculate total pipeline value?',
        answer:
          'You can add a formula row at the bottom of the spreadsheet that sums the Deal Value column. Alternatively, read all rows via the GET endpoint and calculate pipeline totals in your backend, broken down by stage, rep, or expected close month for more detailed reporting.',
      },
      {
        question: 'Is this a replacement for Salesforce or HubSpot?',
        answer:
          'Not for large teams with complex workflows. This CRM template is best for early-stage startups or small teams that need basic pipeline tracking without the cost and onboarding time of enterprise CRM software. It shines when you need a quick, shareable view of your deals.',
      },
    ],
  },
  {
    slug: 'api-documentation',
    name: 'API Documentation',
    category: 'Engineering',
    description:
      'Document your API endpoints in a structured spreadsheet that developers can reference and share. This template lists every endpoint with its HTTP method, path, description, required parameters, and an example response summary. It is useful for teams that want a quick reference table alongside their full documentation site, or for sharing API specs with external partners who do not have access to your internal docs. The spreadsheet format makes it easy to sort endpoints by method or search for a specific path. When generated via the API, you can pull endpoint definitions from your OpenAPI spec or code annotations and produce an always-current reference sheet. Share the link with third-party integrators, include it in onboarding docs for new engineers, or embed it in your internal wiki as a living reference.',
    columns: ['Method', 'Endpoint', 'Description', 'Auth Required', 'Parameters', 'Response'],
    sampleRows: [
      ['POST', '/api/v1/sheets', 'Create a new spreadsheet', 'Yes', 'title, columns, rows', '{ id, url, created_at }'],
      ['GET', '/api/v1/sheets/:id', 'Retrieve spreadsheet data', 'Yes', 'id (path)', '{ id, title, columns, rows }'],
      ['PATCH', '/api/v1/sheets/:id', 'Update cells or rows', 'Yes', 'id (path), cells', '{ updated: true }'],
      ['DELETE', '/api/v1/sheets/:id', 'Delete a spreadsheet', 'Yes', 'id (path)', '{ deleted: true }'],
      ['GET', '/api/v1/sheets/:id/export', 'Export as XLSX/PDF/CSV', 'No', 'id (path), format (query)', 'Binary file download'],
    ],
    relatedSlugs: ['changelog', 'feature-comparison', 'project-tracker'],
    faqs: [
      {
        question: 'Can I generate the API docs table from my OpenAPI spec?',
        answer:
          'Yes. Parse your openapi.json or openapi.yaml file to extract endpoints, methods, descriptions, and parameters. Then format the data into the template structure and send it to the API. Run this script on every deploy to keep the reference table in sync with your actual API.',
      },
      {
        question: 'How do I share API docs with external partners?',
        answer:
          'Create the spreadsheet with view-only sharing enabled. Send the link to your partners — they can view the full endpoint reference in their browser without creating an account. If you update the spreadsheet later, the same link reflects the latest version automatically.',
      },
      {
        question: 'Can I include code examples in the spreadsheet cells?',
        answer:
          'Yes. Cells support plain text of any length, so you can include short code snippets or curl examples in the Parameters or Response columns. For longer examples, consider linking to a separate documentation page from within the cell text.',
      },
    ],
  },
  {
    slug: 'changelog',
    name: 'Changelog',
    category: 'Engineering',
    description:
      'Keep a structured changelog that records every release, what changed, and who shipped it. This template organizes releases into rows with the version number, release date, change type (Feature, Fix, Improvement, Breaking Change), a description of the change, and the author. Unlike a markdown changelog file buried in your repo, a spreadsheet changelog can be shared with non-technical stakeholders via a link — product managers, customer success, and leadership can see what shipped without digging through Git history. When integrated with the API, you can auto-populate the changelog from your CI/CD pipeline. Each time a release is tagged, your deploy script adds a row with the version, description from the release notes, and the engineer who authored the commit. Over time, you build a searchable, sortable record of every change your product has ever shipped.',
    columns: ['Version', 'Date', 'Type', 'Description', 'Author', 'PR/Issue'],
    sampleRows: [
      ['2.4.0', '2026-03-22', 'Feature', 'Added bulk row insert endpoint', 'Priya Nair', '#412'],
      ['2.3.2', '2026-03-18', 'Fix', 'Fixed CSV export encoding for Unicode characters', 'Leo Chang', '#408'],
      ['2.3.1', '2026-03-15', 'Improvement', 'Reduced spreadsheet load time by 40%', 'Priya Nair', '#405'],
      ['2.3.0', '2026-03-10', 'Feature', 'Added document sharing permissions API', 'Kenji Tanaka', '#398'],
    ],
    relatedSlugs: ['api-documentation', 'project-tracker', 'feature-comparison'],
    faqs: [
      {
        question: 'Can I auto-generate the changelog from GitHub releases?',
        answer:
          'Yes. Set up a GitHub Action that triggers on new releases. The action reads the release tag, title, and body, formats them into a changelog row, and calls the API to append the row to your changelog spreadsheet. This eliminates manual changelog maintenance entirely.',
      },
      {
        question: 'How do I categorize changes by type?',
        answer:
          'Use the Type column with consistent values: Feature, Fix, Improvement, Breaking Change, Deprecation. You can enforce these values in your automation script. Once the data is in the spreadsheet, stakeholders can sort or filter by type to see only bug fixes or only new features.',
      },
      {
        question: 'Should I use this instead of a CHANGELOG.md file?',
        answer:
          'They serve different audiences. A CHANGELOG.md file lives in your repo and is useful for developers reading the source code. A spreadsheet changelog is better for sharing with non-technical stakeholders who want a link they can open in their browser without touching your codebase.',
      },
    ],
  },
  {
    slug: 'feature-comparison',
    name: 'Feature Comparison',
    category: 'Product',
    description:
      'Compare features across products, plans, or competitors in a clear matrix format. This template puts features in rows and comparison targets in columns, with checkmarks, values, or notes in each cell. It is the standard format for product comparison pages, internal competitive analysis, and plan-tier breakdowns. Marketing teams use it to build comparison tables for landing pages, product managers use it to evaluate build-vs-buy decisions, and sales teams use it to show prospects how their product stacks up. When generated via the API, you can keep the comparison data in your CMS or product database and produce a fresh, shareable spreadsheet whenever features or pricing change. The structured format also makes it easy to convert into an HTML table for your website or a slide for a sales deck.',
    columns: ['Feature', 'Our Product', 'Competitor A', 'Competitor B', 'Notes'],
    sampleRows: [
      ['API Access', 'Yes', 'Yes', 'No', 'Competitor B is UI-only'],
      ['Real-time Collaboration', 'Yes', 'Yes', 'Yes', ''],
      ['Export to PDF', 'Yes', 'Paid only', 'Yes', 'Competitor A charges extra'],
      ['Custom Branding', 'Pro plan', 'Enterprise', 'No', ''],
      ['Uptime SLA', '99.9%', '99.5%', 'None', 'We offer the best SLA'],
    ],
    relatedSlugs: ['pricing-table', 'api-documentation', 'changelog'],
    faqs: [
      {
        question: 'How do I keep the comparison table up to date when competitors change?',
        answer:
          'Store your competitive intelligence data in a structured format (database or JSON file). When you learn about a competitor update, edit the source data and re-generate the spreadsheet via the API. This ensures the comparison always reflects the latest information without manual spreadsheet editing.',
      },
      {
        question: 'Can I use this for internal plan comparisons?',
        answer:
          'Absolutely. Replace the competitor columns with your plan names (Free, Pro, Enterprise) and list features in each row. This is a great way to produce a plan comparison table that your sales team can share with prospects or embed in proposals.',
      },
      {
        question: 'Can I embed the comparison table on my website?',
        answer:
          'You can link to the shared spreadsheet from your website, or use the GET endpoint to read the data as JSON and render it as an HTML table in your frontend. This gives you full control over styling while keeping the data managed in one place.',
      },
    ],
  },
  {
    slug: 'pricing-table',
    name: 'Pricing Table',
    category: 'Product',
    description:
      'Build a structured pricing table that lists your products or services with their tiers, features, and prices. This template is designed for businesses that need to maintain and share pricing information in a clear, tabular format. Each row represents a product or plan with columns for the plan name, monthly price, annual price, key features included, and any usage limits. The spreadsheet format makes it easy to update prices, add new tiers, or adjust features without rebuilding a web page. When generated via the API, you can pull pricing data from your billing system and produce an always-current pricing sheet for your sales team. Share the link with prospects during negotiations, export to PDF for formal proposals, or use the data to power your public pricing page. The structured columns also make it simple to calculate annual savings, compare tiers, or model pricing changes before going live.',
    columns: ['Plan', 'Monthly Price', 'Annual Price', 'Users Included', 'Storage', 'Key Features'],
    sampleRows: [
      ['Starter', '$19/mo', '$190/yr', '3', '10 GB', 'Core features, email support'],
      ['Professional', '$49/mo', '$490/yr', '10', '100 GB', 'All Starter + API access, priority support'],
      ['Business', '$99/mo', '$990/yr', '25', '500 GB', 'All Pro + SSO, custom integrations'],
      ['Enterprise', 'Custom', 'Custom', 'Unlimited', 'Unlimited', 'All Business + SLA, dedicated CSM'],
    ],
    relatedSlugs: ['feature-comparison', 'invoice', 'crm'],
    faqs: [
      {
        question: 'How do I update pricing without breaking shared links?',
        answer:
          'Use the PATCH endpoint to update price cells in place. The spreadsheet URL remains the same, so anyone who bookmarked the link will see the updated pricing automatically. This is much easier than re-generating a new document every time a price changes.',
      },
      {
        question: 'Can I use this to generate a pricing page on my website?',
        answer:
          'Yes. Use the GET endpoint to read the pricing data as JSON, then render it dynamically on your website. This gives you a single source of truth for pricing: update the spreadsheet and your website reflects the change without a code deploy.',
      },
      {
        question: 'How do I handle multiple currencies?',
        answer:
          'Add separate columns for each currency (USD Price, EUR Price, GBP Price) or create separate spreadsheets per region. If you have a currency conversion service, you can auto-populate localized prices via the API when the base price changes.',
      },
    ],
  },
]

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug)
}

export function getAllSlugs(): string[] {
  return templates.map((t) => t.slug)
}
