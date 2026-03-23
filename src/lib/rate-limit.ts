import { supabase } from './supabase'

// Plan limits
const PLAN_LIMITS = {
  free: { apiCalls: 500, docs: 25 },
  pro: { apiCalls: 25000, docs: Infinity },
  scale: { apiCalls: 200000, docs: Infinity },
}

function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export async function getUsage(userId: string) {
  const month = getCurrentMonth()

  const { data } = await supabase
    .from('api_usage')
    .select('*')
    .eq('user_id', userId)
    .eq('month', month)
    .single()

  if (!data) {
    return { apiCalls: 0, docsCreated: 0, month }
  }

  return {
    apiCalls: data.api_calls || 0,
    docsCreated: data.docs_created || 0,
    month,
  }
}

export async function incrementApiCalls(userId: string): Promise<boolean> {
  const month = getCurrentMonth()
  const usage = await getUsage(userId)
  const plan = 'free' // TODO: check user's actual plan
  const limits = PLAN_LIMITS[plan]

  if (usage.apiCalls >= limits.apiCalls) {
    return false // Rate limited
  }

  // Upsert usage
  await supabase.from('api_usage').upsert(
    {
      user_id: userId,
      month,
      api_calls: usage.apiCalls + 1,
      docs_created: usage.docsCreated,
    },
    { onConflict: 'user_id,month' }
  )

  return true
}

export async function incrementDocsCreated(userId: string): Promise<boolean> {
  const month = getCurrentMonth()
  const usage = await getUsage(userId)
  const plan = 'free' // TODO: check user's actual plan
  const limits = PLAN_LIMITS[plan]

  if (usage.docsCreated >= limits.docs) {
    return false // Doc limit reached
  }

  await supabase.from('api_usage').upsert(
    {
      user_id: userId,
      month,
      api_calls: usage.apiCalls,
      docs_created: usage.docsCreated + 1,
    },
    { onConflict: 'user_id,month' }
  )

  return true
}

export async function checkApiLimit(userId: string): Promise<{ allowed: boolean; usage: { apiCalls: number; docsCreated: number }; limits: { apiCalls: number; docs: number } }> {
  const usage = await getUsage(userId)
  const plan = 'free' // TODO: check user's actual plan
  const limits = PLAN_LIMITS[plan]

  return {
    allowed: usage.apiCalls < limits.apiCalls,
    usage,
    limits,
  }
}

export { PLAN_LIMITS }
