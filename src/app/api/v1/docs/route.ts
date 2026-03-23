import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { saveDocument } from '@/lib/db'
import { transformDocInput, type DocApiInput } from '@/lib/transform'
import { authenticateApiKey, getCurrentUser } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    let userId: string | null = await authenticateApiKey(req)
    if (!userId) {
      const user = await getCurrentUser()
      userId = user?.id || null
    }

    const body = (await req.json()) as DocApiInput
    const id = nanoid(10)
    const editToken = nanoid(24)

    const univerData = transformDocInput(body)
    univerData.id = id

    await saveDocument({
      id,
      type: 'doc',
      title: body.title || 'Untitled Document',
      data: univerData,
      userId,
      editToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    const baseUrl = req.nextUrl.origin
    return NextResponse.json({
      id,
      type: 'doc',
      title: body.title || 'Untitled Document',
      url: `${baseUrl}/d/${id}`,
      edit_token: editToken,
      created_at: new Date().toISOString(),
    }, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid request', details: String(err) },
      { status: 400 }
    )
  }
}
