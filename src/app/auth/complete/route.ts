import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'
import { createUser, getUserByEmail } from '@/lib/db'
import { setSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { access_token, code, then } = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    let email: string | undefined
    let name: string | undefined

    if (access_token) {
      // Get user info from Supabase using the access token
      const { data: { user }, error } = await supabase.auth.getUser(access_token)
      if (error || !user) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
      }
      email = user.email?.toLowerCase()
      name = user.user_metadata?.full_name || user.user_metadata?.name
    } else if (code) {
      const anonSupabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data: { user }, error } = await anonSupabase.auth.exchangeCodeForSession(code)
      if (error || !user) {
        return NextResponse.json({ error: 'Invalid code' }, { status: 401 })
      }
      email = user.email?.toLowerCase()
      name = user.user_metadata?.full_name || user.user_metadata?.name
    } else {
      return NextResponse.json({ error: 'No token or code' }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ error: 'No email from Google' }, { status: 400 })
    }

    // Sync user to our users table
    let user = await getUserByEmail(email)

    if (!user) {
      const userId = nanoid(12)
      await createUser({
        id: userId,
        email,
        name: name || email.split('@')[0],
        passwordHash: '',
        createdAt: new Date().toISOString(),
      })
      user = { id: userId, email, name: name || email.split('@')[0], passwordHash: '', createdAt: new Date().toISOString() }
    }

    // Set our session cookie
    await setSession(user.id)

    const redirect = then ? `/dashboard?create=${then}` : '/dashboard'
    return NextResponse.json({ redirect })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
