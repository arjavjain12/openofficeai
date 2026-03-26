import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — OpenOfficeAI',
  description:
    'Terms of service for OpenOfficeAI. Read about service usage, API limits, data ownership, and liability.',
  alternates: {
    canonical: 'https://opensheet-seven.vercel.app/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <nav className="max-w-3xl mx-auto flex items-center justify-between px-6 py-5">
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
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-8 pb-24">
        <h1 className="text-2xl font-semibold tracking-tighter text-zinc-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-zinc-400 mb-10">Last updated: March 24, 2026</p>

        <div className="space-y-8 text-sm text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">1. Service Description</h2>
            <p>
              OpenOfficeAI provides an API and web interface for creating, editing, and sharing
              spreadsheets and documents. You can create documents programmatically via our REST API
              and share them with anyone using a unique URL.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">2. Account Responsibilities</h2>
            <p>
              You are responsible for maintaining the security of your account credentials and API keys.
              Do not share your API keys publicly. You are responsible for all activity that occurs under
              your account, including API calls made with your keys.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">3. Acceptable Use</h2>
            <p>
              You agree not to use the service to store or distribute illegal content, malware, or spam.
              You may not attempt to circumvent rate limits, abuse the API, or interfere with other
              users&apos; access to the service. We reserve the right to suspend accounts that violate
              these terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">4. API Usage Limits</h2>
            <p>
              Each plan has defined API call limits and storage quotas. When you exceed your plan limits,
              API calls will be rejected with a 429 status code. Your existing documents remain
              accessible. Overage pricing applies on paid plans as described on our pricing page.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">5. Data Ownership</h2>
            <p>
              You retain full ownership of all content you create using OpenOfficeAI. We do not claim
              any intellectual property rights over your spreadsheets, documents, or data. You grant us
              a limited license to store and serve your content solely for the purpose of providing the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">6. Service Availability</h2>
            <p>
              We strive to maintain high uptime but do not guarantee uninterrupted service. We may
              perform scheduled maintenance with advance notice. We are not liable for any downtime,
              data loss, or service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">7. Limitation of Liability</h2>
            <p>
              OpenOfficeAI is provided &quot;as is&quot; without warranty of any kind, express or implied. To the
              maximum extent permitted by law, we shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of profits or data, arising out
              of or in connection with your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">8. Termination</h2>
            <p>
              You may close your account at any time. We may terminate or suspend your account if you
              violate these terms. Upon termination, your data will be retained for 30 days to allow
              for export, after which it may be permanently deleted.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">9. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the service after changes
              constitutes acceptance. We will notify registered users of significant changes via email.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">10. Contact</h2>
            <p>
              Questions about these terms? Email us at{' '}
              <a href="mailto:hello@openofficeai.com" className="text-zinc-900 underline">
                hello@openofficeai.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
