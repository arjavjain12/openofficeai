import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'
import { createUser, getUserByEmail } from '@/lib/db'
import { setSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const then = url.searchParams.get('then')

  if (!code) {
    // No code means Supabase might be using implicit flow
    // Serve a page that extracts the hash fragment client-side
    const html = `<!DOCTYPE html>
<html><head><title>Signing in...</title></head>
<body>
<script>
  // Supabase returns tokens in the URL hash
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');

  if (accessToken) {
    // Send token to our server endpoint to complete login
    fetch('/auth/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: accessToken,
        then: '${then || ''}'
      })
    }).then(r => r.json()).then(data => {
      window.location.href = data.redirect || '/dashboard';
    }).catch(() => {
      window.location.href = '/login?error=auth_failed';
    });
  } else {
    // Try with code from query params
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      fetch('/auth/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, then: '${then || ''}' })
      }).then(r => r.json()).then(data => {
        window.location.href = data.redirect || '/dashboard';
      }).catch(() => {
        window.location.href = '/login?error=auth_failed';
      });
    } else {
      window.location.href = '/login?error=no_token';
    }
  }
</script>
<p>Signing you in...</p>
</body></html>`;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  // PKCE flow — code is in query params
  return await handleCodeExchange(code, then, req)
}

async function handleCodeExchange(code: string, then: string | null, req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: { user: googleUser }, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !googleUser) {
    return NextResponse.redirect(new URL('/login?error=auth_failed', req.url))
  }

  await syncUserAndSetSession(googleUser)

  const redirectUrl = then ? `/dashboard?create=${then}` : '/dashboard'
  return NextResponse.redirect(new URL(redirectUrl, req.url))
}

async function syncUserAndSetSession(googleUser: { email?: string; user_metadata?: Record<string, string> }) {
  const email = googleUser.email?.toLowerCase()
  if (!email) throw new Error('No email')

  let user = await getUserByEmail(email)

  if (!user) {
    const userId = nanoid(12)
    const name = googleUser.user_metadata?.full_name || googleUser.user_metadata?.name || email.split('@')[0]

    await createUser({
      id: userId,
      email,
      name,
      passwordHash: '',
      createdAt: new Date().toISOString(),
    })

    user = { id: userId, email, name, passwordHash: '', createdAt: new Date().toISOString() }
  }

  await setSession(user.id)
}
