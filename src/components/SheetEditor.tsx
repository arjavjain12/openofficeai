'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

interface SheetEditorProps {
  id: string
  initialData: Record<string, unknown> | null
  canEdit: boolean
}

export default function SheetEditor({ id, initialData, canEdit }: SheetEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const univerRef = useRef<{ univerAPI: unknown } | null>(null)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [dlOpen, setDlOpen] = useState(false)

  const save = useCallback(async () => {
    if (!univerRef.current || !canEdit) return
    const api = univerRef.current.univerAPI as { getActiveWorkbook: () => { save: () => unknown } | null }
    const workbook = api.getActiveWorkbook()
    if (!workbook) return
    const snapshot = workbook.save()
    await fetch(`/api/v1/sheets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: snapshot }),
    })
  }, [id, canEdit])

  useEffect(() => {
    if (!containerRef.current) return

    let disposed = false

    async function init() {
      const { createUniver, LocaleType, mergeLocales } = await import('@univerjs/presets')
      const { UniverSheetsCorePreset } = await import('@univerjs/preset-sheets-core')
      const enUS = (await import('@univerjs/preset-sheets-core/locales/en-US')).default

      await import('@univerjs/preset-sheets-core/lib/index.css')

      if (disposed || !containerRef.current) return

      const { univerAPI } = createUniver({
        locale: LocaleType.EN_US,
        locales: {
          [LocaleType.EN_US]: mergeLocales(enUS),
        },
        presets: [
          UniverSheetsCorePreset({ container: containerRef.current }),
        ],
      })

      if (initialData) {
        univerAPI.createWorkbook(initialData)
      } else {
        univerAPI.createWorkbook({})
      }

      univerRef.current = { univerAPI }

      // Auto-save on changes (only if user can edit)
      if (canEdit) {
        univerAPI.onCommandExecuted(() => {
          if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
          saveTimerRef.current = setTimeout(() => save(), 2000)
        })
      }
    }

    init()

    return () => {
      disposed = true
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      if (univerRef.current) {
        const api = univerRef.current.univerAPI as { dispose: () => void }
        api.dispose()
        univerRef.current = null
      }
    }
  }, [initialData, save, canEdit])

  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="h-12 border-b border-zinc-200 flex items-center px-4 justify-between bg-white shrink-0">
        <div className="flex items-center gap-3">
          <a href="/" className="font-semibold text-sm text-zinc-900">OpenSheet</a>
          <span className="text-xs text-zinc-400">/ Spreadsheet</span>
          {!canEdit && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 font-medium">View only</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative inline-block">
            <button
              onClick={() => setDlOpen(!dlOpen)}
              className="text-xs px-3 py-1.5 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Download
            </button>
            {dlOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDlOpen(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg py-1 z-20 min-w-[130px]">
                  <a href={`/api/v1/download/${id}?format=xlsx`} onClick={() => setDlOpen(false)} className="block px-3 py-2 text-xs hover:bg-zinc-50">Excel (.xlsx)</a>
                  <a href={`/api/v1/download/${id}?format=csv`} onClick={() => setDlOpen(false)} className="block px-3 py-2 text-xs hover:bg-zinc-50">CSV</a>
                  <a href={`/api/v1/download/${id}?format=html`} onClick={() => setDlOpen(false)} className="block px-3 py-2 text-xs hover:bg-zinc-50">HTML</a>
                  <a href={`/api/v1/download/${id}?format=json`} onClick={() => setDlOpen(false)} className="block px-3 py-2 text-xs hover:bg-zinc-50">JSON</a>
                </div>
              </>
            )}
          </div>
          {canEdit ? (
            <button
              onClick={save}
              className="text-xs px-3 py-1.5 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Save
            </button>
          ) : (
            <a
              href="/login"
              className="text-xs px-3 py-1.5 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Sign in to edit
            </a>
          )}
        </div>
      </header>
      <div ref={containerRef} className="flex-1" />
    </div>
  )
}
