'use client'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase instance for OAuth
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export async function signInWithGoogle(redirectAfter?: string) {
  const redirectTo = `${window.location.origin}/auth/callback${redirectAfter ? '?then=' + redirectAfter : ''}`

  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  })

  if (error) {
    console.error('Google sign-in error:', error)
    alert('Failed to sign in with Google. Please try again.')
  }
}
