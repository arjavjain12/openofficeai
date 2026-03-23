import { getDocument } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { notFound } from 'next/navigation'
import SheetEditor from '@/components/SheetEditor'

export default async function SheetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const doc = await getDocument(id)

  if (!doc || doc.type !== 'sheet') {
    notFound()
  }

  const user = await getCurrentUser()
  const canEdit = !!user

  return <SheetEditor id={id} initialData={doc.data as Record<string, unknown>} canEdit={canEdit} />
}
