'use server'

import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'
import { createUser, getUserByEmail, createApiKey, deleteApiKey, getApiKeysByUser, deleteDocument, updateDocumentTitle } from './db'
import { hashPassword, verifyPassword, setSession, clearSession, getCurrentUser } from './auth'

// ---------- Auth Actions ----------

export async function signupAction(formData: FormData) {
  const name = formData.get('name') as string
  const email = (formData.get('email') as string)?.toLowerCase().trim()
  const password = formData.get('password') as string

  if (!name || !email || !password) {
    return { error: 'All fields are required' }
  }
  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  const existing = await getUserByEmail(email)
  if (existing) {
    return { error: 'Email already registered' }
  }

  const userId = nanoid(12)
  await createUser({
    id: userId,
    email,
    name,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  })

  await setSession(userId)
  const redirectTo = formData.get('redirectTo') as string
  redirect(redirectTo || '/dashboard')
}

export async function loginAction(formData: FormData) {
  const email = (formData.get('email') as string)?.toLowerCase().trim()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const user = await getUserByEmail(email)
  if (!user) {
    return { error: 'Invalid email or password' }
  }

  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) {
    return { error: 'Invalid email or password' }
  }

  await setSession(user.id)
  const redirectTo = formData.get('redirectTo') as string
  redirect(redirectTo || '/dashboard')
}

export async function logoutAction() {
  await clearSession()
  redirect('/')
}

// ---------- API Key Actions ----------

export async function createApiKeyAction(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) return { error: 'Not authenticated' }

  const name = (formData.get('name') as string) || 'Default'
  const keyId = nanoid(12)
  const key = `os_${nanoid(32)}`

  await createApiKey({
    id: keyId,
    key,
    name,
    userId: user.id,
    createdAt: new Date().toISOString(),
    lastUsedAt: null,
  })

  return { key } // Show once to the user
}

export async function deleteApiKeyAction(keyId: string) {
  const user = await getCurrentUser()
  if (!user) return { error: 'Not authenticated' }

  // Verify ownership
  const keys = await getApiKeysByUser(user.id)
  const owns = keys.find(k => k.id === keyId)
  if (!owns) return { error: 'Not found' }

  await deleteApiKey(keyId)
  return { success: true }
}

// ---------- Document Actions ----------

export async function deleteDocAction(docId: string) {
  const user = await getCurrentUser()
  if (!user) return { error: 'Not authenticated' }
  await deleteDocument(docId)
  return { success: true }
}

export async function renameDocAction(docId: string, title: string) {
  const user = await getCurrentUser()
  if (!user) return { error: 'Not authenticated' }
  await updateDocumentTitle(docId, title)
  return { success: true }
}
