import { supabase } from './supabase'

// ---------- Types ----------

interface UserRecord {
  id: string
  email: string
  name: string
  passwordHash: string
  createdAt: string
}

interface ApiKeyRecord {
  id: string
  key: string
  name: string
  userId: string
  createdAt: string
  lastUsedAt: string | null
}

interface DocRecord {
  id: string
  type: 'sheet' | 'doc'
  title: string
  data: unknown
  userId: string | null
  editToken: string | null
  createdAt: string
  updatedAt: string
}

// ---------- Users ----------

export async function createUser(user: UserRecord): Promise<void> {
  const { error } = await supabase.from('users').insert({
    id: user.id,
    email: user.email,
    name: user.name,
    password_hash: user.passwordHash,
  })
  if (error) throw new Error(`Failed to create user: ${error.message}`)
}

export async function getUserById(id: string): Promise<UserRecord | null> {
  const { data } = await supabase.from('users').select('*').eq('id', id).single()
  if (!data) return null
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    passwordHash: data.password_hash,
    createdAt: data.created_at,
  }
}

export async function getUserByEmail(email: string): Promise<UserRecord | null> {
  const { data } = await supabase.from('users').select('*').eq('email', email).single()
  if (!data) return null
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    passwordHash: data.password_hash,
    createdAt: data.created_at,
  }
}

// ---------- API Keys ----------

export async function createApiKey(apiKey: ApiKeyRecord): Promise<void> {
  const { error } = await supabase.from('api_keys').insert({
    id: apiKey.id,
    key_hash: apiKey.key, // storing full key for now, hash in production
    name: apiKey.name,
    user_id: apiKey.userId,
  })
  if (error) throw new Error(`Failed to create API key: ${error.message}`)
}

export async function getApiKeyByKey(key: string): Promise<ApiKeyRecord | null> {
  const { data } = await supabase.from('api_keys').select('*').eq('key_hash', key).single()
  if (!data) return null
  return {
    id: data.id,
    key: data.key_hash,
    name: data.name,
    userId: data.user_id,
    createdAt: data.created_at,
    lastUsedAt: data.last_used_at,
  }
}

export async function getApiKeysByUser(userId: string): Promise<ApiKeyRecord[]> {
  const { data } = await supabase.from('api_keys').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (!data) return []
  return data.map(d => ({
    id: d.id,
    key: d.key_hash,
    name: d.name,
    userId: d.user_id,
    createdAt: d.created_at,
    lastUsedAt: d.last_used_at,
  }))
}

export async function deleteApiKey(id: string): Promise<boolean> {
  const { error } = await supabase.from('api_keys').delete().eq('id', id)
  return !error
}

export async function updateApiKeyLastUsed(key: string): Promise<void> {
  await supabase.from('api_keys').update({ last_used_at: new Date().toISOString() }).eq('key_hash', key)
}

// ---------- Documents ----------

export async function saveDocument(doc: DocRecord): Promise<void> {
  const { error } = await supabase.from('documents').insert({
    id: doc.id,
    type: doc.type,
    title: doc.title,
    data: doc.data,
    user_id: doc.userId,
    edit_token: doc.editToken,
  })
  if (error) throw new Error(`Failed to save document: ${error.message}`)
}

export async function getDocument(id: string): Promise<DocRecord | null> {
  const { data } = await supabase.from('documents').select('*').eq('id', id).single()
  if (!data) return null
  return {
    id: data.id,
    type: data.type,
    title: data.title,
    data: data.data,
    userId: data.user_id,
    editToken: data.edit_token,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

export async function getDocumentsByUser(userId: string): Promise<Omit<DocRecord, 'data'>[]> {
  const { data } = await supabase
    .from('documents')
    .select('id, type, title, user_id, edit_token, created_at, updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  if (!data) return []
  return data.map(d => ({
    id: d.id,
    type: d.type,
    title: d.title,
    userId: d.user_id,
    editToken: d.edit_token,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
  }))
}

export async function updateDocumentData(id: string, data: unknown): Promise<boolean> {
  const { error } = await supabase
    .from('documents')
    .update({ data, updated_at: new Date().toISOString() })
    .eq('id', id)
  return !error
}

export async function updateDocumentTitle(id: string, title: string): Promise<boolean> {
  const { error } = await supabase
    .from('documents')
    .update({ title, updated_at: new Date().toISOString() })
    .eq('id', id)
  return !error
}

export async function deleteDocument(id: string): Promise<boolean> {
  const { error } = await supabase.from('documents').delete().eq('id', id)
  return !error
}

export type { UserRecord, ApiKeyRecord, DocRecord }
