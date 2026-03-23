import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getDocumentsByUser, getApiKeysByUser } from '@/lib/db'
import { getUsage, PLAN_LIMITS } from '@/lib/rate-limit'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  const [docs, apiKeys, usage] = await Promise.all([
    getDocumentsByUser(user.id),
    getApiKeysByUser(user.id),
    getUsage(user.id),
  ])

  const plan = 'free' // TODO: check from DB
  const limits = PLAN_LIMITS[plan]

  return (
    <DashboardClient
      user={{ id: user.id, name: user.name, email: user.email }}
      docs={docs}
      apiKeys={apiKeys.map(k => ({
        id: k.id,
        name: k.name,
        keyPreview: k.key.slice(0, 8) + '...' + k.key.slice(-4),
        createdAt: k.createdAt,
        lastUsedAt: k.lastUsedAt,
      }))}
      usage={{ apiCalls: usage.apiCalls, docsCreated: usage.docsCreated }}
      limits={{ apiCalls: limits.apiCalls, docs: limits.docs }}
      plan={plan}
    />
  )
}
