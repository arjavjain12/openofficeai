import { NextRequest, NextResponse } from 'next/server'
import { getDocument, updateDocumentData, deleteDocument } from '@/lib/db'
import { authenticateApiKey, getCurrentUser } from '@/lib/auth'
import { incrementApiCalls } from '@/lib/rate-limit'

async function getAuthUserId(req: NextRequest): Promise<string | null> {
  const apiUserId = await authenticateApiKey(req)
  if (apiUserId) return apiUserId
  const user = await getCurrentUser()
  return user?.id || null
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const doc = await getDocument(id)
  if (!doc || doc.type !== 'doc') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({
    id: doc.id,
    type: doc.type,
    title: doc.title,
    data: doc.data,
    created_at: doc.createdAt,
    updated_at: doc.updatedAt,
  })
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getAuthUserId(req)
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }
  const allowed = await incrementApiCalls(userId)
  if (!allowed) {
    return NextResponse.json({ error: 'API call limit reached. Upgrade your plan at /pricing' }, { status: 429 })
  }
  const { id } = await params
  const body = await req.json()
  const success = await updateDocumentData(id, body.data)
  if (!success) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ id, updated: true })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getAuthUserId(req)
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }
  const { id } = await params
  const success = await deleteDocument(id)
  if (!success) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ id, deleted: true })
}
