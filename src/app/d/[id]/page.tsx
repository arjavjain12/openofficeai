import { getDocument } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { notFound } from 'next/navigation'
import DocEditor from '@/components/DocEditor'

export default async function DocPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const doc = await getDocument(id)

  if (!doc || doc.type !== 'doc') {
    notFound()
  }

  const user = await getCurrentUser()
  const canEdit = !!user

  return <DocEditor id={id} initialData={doc.data as Record<string, unknown>} canEdit={canEdit} />
}
