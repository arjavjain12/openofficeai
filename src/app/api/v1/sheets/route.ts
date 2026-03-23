import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { saveDocument } from '@/lib/db'
import { transformSheetInput, type SheetApiInput } from '@/lib/transform'
import { authenticateApiKey, getCurrentUser } from '@/lib/auth'
import { incrementApiCalls, incrementDocsCreated } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    let userId: string | null = await authenticateApiKey(req)
    if (!userId) {
      const user = await getCurrentUser()
      userId = user?.id || null
    }

    // Rate limit check (only for authenticated users)
    if (userId) {
      const apiAllowed = await incrementApiCalls(userId)
      if (!apiAllowed) {
        return NextResponse.json(
          { error: 'API call limit reached. Upgrade your plan at /pricing' },
          { status: 429 }
        )
      }

      const docAllowed = await incrementDocsCreated(userId)
      if (!docAllowed) {
        return NextResponse.json(
          { error: 'Document limit reached. Upgrade your plan at /pricing' },
          { status: 429 }
        )
      }
    }

    const body = (await req.json()) as SheetApiInput
    const id = nanoid(10)
    const editToken = nanoid(24)

    const univerData = transformSheetInput(body)
    univerData.id = id

    await saveDocument({
      id,
      type: 'sheet',
      title: body.title || 'Untitled Spreadsheet',
      data: univerData,
      userId,
      editToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    const baseUrl = req.nextUrl.origin
    return NextResponse.json({
      id,
      type: 'sheet',
      title: body.title || 'Untitled Spreadsheet',
      url: `${baseUrl}/s/${id}`,
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
