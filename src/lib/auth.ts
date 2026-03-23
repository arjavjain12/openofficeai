import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { getUserById, getApiKeyByKey, updateApiKeyLastUsed } from './db'
import type { UserRecord } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'opensheet-dev-secret-change-in-prod'
const COOKIE_NAME = 'os_session'

// ---------- Password ----------

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// ---------- Session (JWT in httpOnly cookie) ----------

export function createToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' })
}

export async function setSession(userId: string): Promise<void> {
  const token = createToken(userId)
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  })
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function getCurrentUser(): Promise<UserRecord | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return null

    const payload = jwt.verify(token, JWT_SECRET) as { userId: string }
    return getUserById(payload.userId)
  } catch {
    return null
  }
}

// ---------- API Key Auth ----------

export async function authenticateApiKey(request: Request): Promise<string | null> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return null

  const key = authHeader.slice(7)
  const apiKey = await getApiKeyByKey(key)
  if (!apiKey) return null

  // Update last used timestamp (fire and forget)
  updateApiKeyLastUsed(key).catch(() => {})

  return apiKey.userId
}
