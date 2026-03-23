'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { loginAction } from '@/lib/actions'
import { signInWithGoogle } from '@/lib/google-auth'

export default function LoginPage() {
  return <Suspense><LoginContent /></Suspense>
}

function LoginContent() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const then = searchParams.get('then')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)

    if (then) {
      formData.set('redirectTo', '/dashboard?create=' + then)
    }

    const result = await loginAction(formData)
    if (result?.error) { setError(result.error); setLoading(false) }
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[var(--bg)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[380px]"
      >
        <a href="/" className="flex items-center gap-2.5 mb-10">
          <div className="w-8 h-8 rounded-[10px] bg-zinc-900 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.95" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.2" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">OpenOfficeAI</span>
        </a>

        <h1 className="text-xl font-semibold tracking-tight mb-1">Welcome back</h1>
        <p className="text-sm text-zinc-500 mb-6">Log in to your account</p>

        {error && (
          <div className="mb-4 p-3 rounded-[10px] bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>
        )}

        <button
          onClick={() => signInWithGoogle(then || undefined)}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-2.5 border border-zinc-200 rounded-[10px] text-sm font-medium hover:bg-zinc-50 transition-all active:scale-[0.98]"
        >
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 2.58Z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-zinc-200" />
          <span className="text-xs text-zinc-400">or</span>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700">Email</label>
            <input type="email" name="email" required
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all placeholder:text-zinc-400"
              placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700">Password</label>
            <input type="password" name="password" required
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all placeholder:text-zinc-400"
              placeholder="Your password" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2.5 bg-zinc-900 text-white rounded-[10px] text-sm font-medium hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50">
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          No account? <a href={`/signup${then ? '?then=' + then : ''}`} className="text-zinc-900 font-medium hover:underline">Sign up</a>
        </p>
      </motion.div>
    </div>
  )
}
