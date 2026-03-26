import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — OpenOfficeAI',
  description:
    'How OpenOfficeAI collects, stores, and protects your data. We never sell your information.',
  alternates: {
    canonical: 'https://opensheet-seven.vercel.app/privacy',
  },
}

export default function PrivacyPage() {
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
        <h1 className="text-2xl font-semibold tracking-tighter text-zinc-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-400 mb-10">Last updated: March 24, 2026</p>

        <div className="space-y-8 text-sm text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">1. Information We Collect</h2>
            <p>
              When you create an account, we collect your name and email address. When you use our
              service, we store the spreadsheets and documents you create. We also collect basic usage
              data such as API call counts and timestamps to enforce rate limits and improve the service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">2. How We Store Your Data</h2>
            <p>
              All data is stored securely in Supabase with encryption at rest and in transit. Passwords
              are hashed using industry-standard algorithms. Your documents are stored in our database
              and are only accessible via the unique URLs we generate or through authenticated API calls.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">3. We Never Sell Your Data</h2>
            <p>
              We do not sell, rent, or share your personal information or document contents with third
              parties for marketing or advertising purposes. Your data is yours.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">4. Cookies</h2>
            <p>
              We use essential cookies to maintain your session and authentication state. We do not use
              third-party tracking cookies or advertising pixels.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">5. Data Deletion</h2>
            <p>
              You can delete any document from your dashboard at any time. To delete your entire account
              and all associated data, contact us at the email below and we will process your request
              within 7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">6. Third-Party Services</h2>
            <p>
              We use Supabase for database and authentication, and Vercel for hosting. These services
              have their own privacy policies. We do not share your document contents with any other
              third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">7. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify registered users of
              significant changes via email.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 mb-2">8. Contact</h2>
            <p>
              If you have questions about this privacy policy or want to request data deletion, email us
              at{' '}
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
