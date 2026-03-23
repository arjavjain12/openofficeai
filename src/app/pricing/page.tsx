'use client'

import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'For trying things out',
    features: [
      '25 documents',
      '500 API calls / month',
      '50 MB storage',
      'All export formats',
      'Shareable links',
      'Community support',
    ],
    cta: 'Get Started',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/ month',
    desc: 'For developers and small teams',
    features: [
      'Unlimited documents',
      '25,000 API calls / month',
      '1 GB storage',
      'All export formats',
      'Priority support',
      'No branding on shared links',
      '$0.002 per extra API call',
    ],
    cta: 'Upgrade to Pro',
    href: '/signup',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: '$49',
    period: '/ month',
    desc: 'For production workloads',
    features: [
      'Unlimited documents',
      '200,000 API calls / month',
      '10 GB storage',
      'All export formats',
      'Dedicated support',
      'Custom domain for links',
      'Webhooks',
      'Team members (up to 10)',
      '$0.001 per extra API call',
    ],
    cta: 'Contact Us',
    href: 'mailto:hello@openofficeai.com',
    highlighted: false,
  },
]

const usagePricing = [
  { resource: 'API Calls', free: '500 / mo', pro: '25k / mo', scale: '200k / mo', overage: '$0.002 / call' },
  { resource: 'Documents', free: '25', pro: 'Unlimited', scale: 'Unlimited', overage: '-' },
  { resource: 'Storage', free: '50 MB', pro: '1 GB', scale: '10 GB', overage: '$0.10 / GB' },
  { resource: 'Exports (XLSX, PDF, DOCX)', free: 'Included', pro: 'Included', scale: 'Included', overage: '-' },
  { resource: 'Team Members', free: '1', pro: '1', scale: '10', overage: '$5 / seat' },
]

export default function PricingPage() {
  return (
    <div className="min-h-[100dvh] bg-[#fafafa]">
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
          <a href="/login" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-2">Log in</a>
          <a href="/dashboard" className="text-sm text-zinc-700 px-4 py-2 rounded-[10px] border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all active:scale-[0.98]">Dashboard</a>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-3xl font-semibold tracking-tighter text-zinc-900 mb-3">Simple, usage-based pricing</h1>
          <p className="text-base text-zinc-500 max-w-lg mx-auto">Start free. Pay only when you grow. No surprises.</p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-7 rounded-2xl border ${
                plan.highlighted
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-200 bg-white'
              }`}
            >
              <div className="mb-6">
                <h2 className={`text-sm font-semibold mb-2 ${plan.highlighted ? 'text-zinc-300' : 'text-zinc-500'}`}>{plan.name}</h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tighter">{plan.price}</span>
                  <span className={`text-sm ${plan.highlighted ? 'text-zinc-400' : 'text-zinc-400'}`}>{plan.period}</span>
                </div>
                <p className={`text-sm mt-2 ${plan.highlighted ? 'text-zinc-400' : 'text-zinc-500'}`}>{plan.desc}</p>
              </div>

              <a
                href={plan.href}
                className={`block text-center py-2.5 rounded-[10px] text-sm font-medium transition-all active:scale-[0.98] mb-6 ${
                  plan.highlighted
                    ? 'bg-white text-zinc-900 hover:bg-zinc-100'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
              >
                {plan.cta}
              </a>

              <ul className="space-y-2.5">
                {plan.features.map(f => (
                  <li key={f} className={`text-sm flex items-start gap-2 ${plan.highlighted ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={plan.highlighted ? '#a1a1aa' : '#10b981'} strokeWidth="1.5" strokeLinecap="round" className="mt-0.5 shrink-0"><polyline points="3 7 6 10 11 4" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Usage comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-6">Detailed comparison</h2>
          <div className="border border-zinc-200 rounded-2xl bg-white overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Resource</th>
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Free</th>
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Pro</th>
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Scale</th>
                  <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-5 py-3">Overage</th>
                </tr>
              </thead>
              <tbody>
                {usagePricing.map((row) => (
                  <tr key={row.resource} className="border-b border-zinc-50 last:border-0">
                    <td className="px-5 py-3 text-sm font-medium text-zinc-900">{row.resource}</td>
                    <td className="px-5 py-3 text-sm text-zinc-500">{row.free}</td>
                    <td className="px-5 py-3 text-sm text-zinc-500">{row.pro}</td>
                    <td className="px-5 py-3 text-sm text-zinc-500">{row.scale}</td>
                    <td className="px-5 py-3 text-sm text-zinc-400">{row.overage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-2xl"
        >
          <h2 className="text-xl font-semibold tracking-tighter text-zinc-900 mb-6">Common questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What counts as an API call?', a: 'Every POST, PUT, or DELETE request to the API counts as one call. GET requests (loading a document) are free.' },
              { q: 'Can I switch plans anytime?', a: 'Yes. Upgrade or downgrade at any time. When upgrading, you get immediate access. When downgrading, the change takes effect at the next billing cycle.' },
              { q: 'What happens to my data if I stop paying?', a: 'Your documents are never deleted. After your plan expires, you keep read access. You just cannot create new documents or make API calls until you resubscribe.' },
              { q: 'Do you offer annual billing?', a: 'Not yet, but we plan to. When we do, annual plans will come with 2 months free.' },
            ].map(faq => (
              <div key={faq.q} className="border-t border-zinc-200 pt-4">
                <h3 className="text-sm font-semibold text-zinc-900 mb-1">{faq.q}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
