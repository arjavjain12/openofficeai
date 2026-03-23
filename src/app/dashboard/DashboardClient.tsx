'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { logoutAction, createApiKeyAction, deleteApiKeyAction, deleteDocAction, renameDocAction } from '@/lib/actions'

interface Doc { id: string; type: 'sheet' | 'doc'; title: string; createdAt: string; updatedAt: string }
interface ApiKey { id: string; name: string; keyPreview: string; createdAt: string; lastUsedAt: string | null }
interface Props { user: { id: string; name: string; email: string }; docs: Doc[]; apiKeys: ApiKey[] }

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const days = Math.floor(h / 24)
  if (days < 30) return `${days}d ago`
  return new Date(d).toLocaleDateString()
}

export default function DashboardClient({ user, docs, apiKeys }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Auto-create doc if redirected from signup/login with ?create=sheet|doc
  useEffect(() => {
    const createType = searchParams.get('create')
    if (createType === 'sheet' || createType === 'doc') {
      // Remove the param from URL so it doesn't fire again
      window.history.replaceState({}, '', '/dashboard')
      createFile(createType)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [tab, setTab] = useState<'files' | 'keys'>('files')
  const [newKey, setNewKey] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [dlOpen, setDlOpen] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  async function handleCreateKey(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setCreating(true)
    const fd = new FormData(e.currentTarget)
    const result = await createApiKeyAction(fd)
    if (result?.key) setNewKey(result.key)
    setCreating(false)
    router.refresh()
  }

  async function deleteKey(id: string) {
    if (!confirm('Revoke this key? Integrations using it will break.')) return
    await deleteApiKeyAction(id)
    router.refresh()
  }

  async function deleteDoc(id: string) {
    if (!confirm('Delete permanently?')) return
    await deleteDocAction(id)
    router.refresh()
  }

  async function rename(id: string) {
    if (!editTitle.trim()) return
    await renameDocAction(id, editTitle.trim())
    setEditingId(null)
    router.refresh()
  }

  async function createFile(type: 'sheet' | 'doc') {
    const res = await fetch(type === 'sheet' ? '/api/v1/sheets' : '/api/v1/docs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: type === 'sheet' ? 'Untitled Spreadsheet' : 'Untitled Document' }),
    })
    const data = await res.json()
    window.location.href = data.url
  }

  function copy(doc: Doc) {
    navigator.clipboard.writeText(`${window.location.origin}${doc.type === 'sheet' ? '/s/' : '/d/'}${doc.id}`)
    setCopied(doc.id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-[100dvh] bg-[var(--bg)]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[var(--bg)]/80 backdrop-blur-lg border-b border-zinc-100">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[8px] bg-zinc-900 flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.95" />
                  <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
                  <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
                  <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.2" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-tight">OpenSheet</span>
            </a>
            <span className="text-zinc-300">/</span>
            <span className="text-sm text-zinc-500">{user.name}</span>
          </div>
          <form action={logoutAction}>
            <button className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">Log out</button>
          </form>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-semibold tracking-tight mb-0.5">Dashboard</h1>
            <p className="text-sm text-zinc-400">{docs.length} files, {apiKeys.length} API keys</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => createFile('sheet')}
              className="px-4 py-2 rounded-[10px] bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-all active:scale-[0.98]">
              New Spreadsheet
            </button>
            <button onClick={() => createFile('doc')}
              className="px-4 py-2 rounded-[10px] border border-zinc-200 text-zinc-700 text-sm font-medium hover:border-zinc-300 hover:bg-zinc-50 transition-all active:scale-[0.98]">
              New Document
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-zinc-100">
          {(['files', 'keys'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${tab === t ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}>
              {t === 'files' ? `Files (${docs.length})` : `API Keys (${apiKeys.length})`}
              {tab === t && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900 rounded-full" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'files' && (
            <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {docs.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-zinc-200 rounded-2xl">
                  <p className="text-zinc-500 mb-1">No files yet</p>
                  <p className="text-sm text-zinc-400">Create a spreadsheet or document to get started.</p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {docs.map((doc, i) => (
                    <motion.div key={doc.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                      className="group flex items-center gap-4 py-3.5 -mx-3 px-3 rounded-xl hover:bg-zinc-50 transition-colors"
                    >
                      <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${doc.type === 'sheet' ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'}`}>
                        {doc.type === 'sheet' ? (
                          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="16" height="16" rx="2.5" /><path d="M1 6h16M1 11h16M7 1v16" /></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="1" width="14" height="16" rx="2.5" /><line x1="5" y1="5" x2="13" y2="5" strokeLinecap="round" /><line x1="5" y1="8.5" x2="13" y2="8.5" strokeLinecap="round" /><line x1="5" y1="12" x2="10" y2="12" strokeLinecap="round" /></svg>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {editingId === doc.id ? (
                          <form onSubmit={(e) => { e.preventDefault(); rename(doc.id) }} className="flex gap-2 items-center">
                            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} autoFocus
                              className="flex-1 px-2.5 py-1 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10" />
                            <button type="submit" className="text-xs font-medium text-emerald-600">Save</button>
                            <button type="button" onClick={() => setEditingId(null)} className="text-xs text-zinc-400">Cancel</button>
                          </form>
                        ) : (
                          <a href={doc.type === 'sheet' ? `/s/${doc.id}` : `/d/${doc.id}`}
                            className="text-sm font-medium text-zinc-900 hover:text-emerald-600 transition-colors truncate block">
                            {doc.title}
                          </a>
                        )}
                        <p className="text-xs text-zinc-400 mt-0.5">{timeAgo(doc.updatedAt)}</p>
                      </div>

                      <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md ${doc.type === 'sheet' ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'}`}>
                        {doc.type}
                      </span>

                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => copy(doc)} title="Copy link"
                          className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors active:scale-[0.95]">
                          {copied === doc.id ? (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"><polyline points="3 7 6 10 11 4" /></svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="8" height="8" rx="1.5" /><path d="M10 4V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v5.5A1.5 1.5 0 0 0 3 10h1" /></svg>
                          )}
                        </button>

                        <div className="relative">
                          <button onClick={() => setDlOpen(dlOpen === doc.id ? null : doc.id)} title="Download"
                            className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors active:scale-[0.95]">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M7 2v8M4 7l3 3 3-3" /><path d="M2 11h10" /></svg>
                          </button>
                          {dlOpen === doc.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setDlOpen(null)} />
                              <div className="absolute right-0 top-full mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg py-1 z-20 min-w-[140px]">
                                {doc.type === 'sheet' ? (
                                  <>
                                    <a href={`/api/v1/download/${doc.id}?format=xlsx`} className="block px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50">Excel (.xlsx)</a>
                                    <a href={`/api/v1/download/${doc.id}?format=csv`} className="block px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50">CSV</a>
                                    <a href={`/api/v1/download/${doc.id}?format=json`} className="block px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50">JSON</a>
                                  </>
                                ) : (
                                  <>
                                    <a href={`/api/v1/download/${doc.id}?format=pdf`} className="block px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50">PDF</a>
                                    <a href={`/api/v1/download/${doc.id}?format=docx`} className="block px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50">Word (.docx)</a>
                                    <a href={`/api/v1/download/${doc.id}?format=txt`} className="block px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50">Plain Text</a>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        </div>

                        <button onClick={() => { setEditingId(doc.id); setEditTitle(doc.title) }} title="Rename"
                          className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors active:scale-[0.95]">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8.5 2.5l3 3L4 13H1v-3l7.5-7.5Z" /></svg>
                        </button>
                        <button onClick={() => deleteDoc(doc.id)} title="Delete"
                          className="p-2 rounded-lg hover:bg-red-50 text-zinc-400 hover:text-red-500 transition-colors active:scale-[0.95]">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 4h10M5 4V2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V4M11 4v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4" /></svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {tab === 'keys' && (
            <motion.div key="k" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
              {/* Create */}
              <div className="p-6 border border-zinc-200 rounded-2xl bg-white">
                <h3 className="text-sm font-semibold mb-4">Generate API Key</h3>
                <form onSubmit={handleCreateKey} className="flex gap-3">
                  <input name="name" placeholder="Key name (e.g. Claude, Production)"
                    className="flex-1 px-3.5 py-2.5 border border-zinc-200 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 placeholder:text-zinc-400" />
                  <button type="submit" disabled={creating}
                    className="px-4 py-2.5 bg-zinc-900 text-white rounded-[10px] text-sm font-medium hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50">
                    Generate
                  </button>
                </form>
                <AnimatePresence>
                  {newKey && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                      <p className="text-xs font-medium text-emerald-700 mb-2">Copy now — shown only once</p>
                      <div className="flex gap-2">
                        <code className="flex-1 px-3 py-2 bg-white border border-emerald-200 rounded-lg text-sm select-all overflow-x-auto" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
                          {newKey}
                        </code>
                        <button onClick={() => navigator.clipboard.writeText(newKey)}
                          className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs hover:bg-emerald-500 transition-colors active:scale-[0.95]">
                          Copy
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* List */}
              {apiKeys.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-zinc-200 rounded-2xl">
                  <p className="text-zinc-500 mb-1">No API keys</p>
                  <p className="text-sm text-zinc-400">Create one above to use the API.</p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {apiKeys.map((k, i) => (
                    <motion.div key={k.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                      className="group flex items-center gap-4 py-4">
                      <div className="w-9 h-9 rounded-[10px] bg-zinc-100 flex items-center justify-center text-zinc-500 shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10 2L8.5 3.5 11 6l1.5-1.5L10 2ZM5 7L1 11v3h3l4-4" /><path d="M8.5 5.5l2 2" /></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900">{k.name}</p>
                        <p className="text-xs text-zinc-400 mt-0.5" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>{k.keyPreview}</p>
                      </div>
                      <div className="text-right text-xs text-zinc-400 hidden sm:block">
                        <p>{timeAgo(k.createdAt)}</p>
                        <p>{k.lastUsedAt ? `Used ${timeAgo(k.lastUsedAt)}` : 'Never used'}</p>
                      </div>
                      <button onClick={() => deleteKey(k.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-zinc-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 active:scale-[0.95]">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 4h10M5 4V2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V4M11 4v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4" /></svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Usage */}
              <div className="code-surface rounded-2xl p-6 overflow-x-auto">
                <p className="text-xs text-zinc-500 mb-3 uppercase tracking-widest" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>Quick start</p>
                <pre className="text-[13px] leading-[1.7] text-zinc-300" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
<span className="text-emerald-400">curl</span> -X POST {typeof window !== 'undefined' ? window.location.origin : ''}/api/v1/sheets \{'\n'}
  -H <span className="text-amber-300">&quot;Authorization: Bearer YOUR_KEY&quot;</span> \{'\n'}
  -H <span className="text-amber-300">&quot;Content-Type: application/json&quot;</span> \{'\n'}
  -d <span className="text-zinc-500">&apos;{'{'}&quot;title&quot;:&quot;Report&quot;, &quot;sheets&quot;:[{'{'}&quot;rows&quot;:[[&quot;A&quot;,1],[&quot;B&quot;,2]]{'}'}]{'}'}&apos;</span>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
