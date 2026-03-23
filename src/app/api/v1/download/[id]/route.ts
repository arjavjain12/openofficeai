import { NextRequest, NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'
import { getDocument } from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const doc = await getDocument(id)
  if (!doc) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const format = req.nextUrl.searchParams.get('format') || 'json'

  if (format === 'json') {
    const json = JSON.stringify(doc.data, null, 2)
    return new NextResponse(json, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${sanitize(doc.title)}.json"`,
      },
    })
  }

  if (format === 'csv' && doc.type === 'sheet') {
    const csv = sheetToCSV(doc.data)
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${sanitize(doc.title)}.csv"`,
      },
    })
  }

  if (format === 'html') {
    const html = doc.type === 'sheet' ? sheetToHTML(doc.data, doc.title) : docToHTML(doc.data, doc.title)
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${sanitize(doc.title)}.html"`,
      },
    })
  }

  if (format === 'xlsx' && doc.type === 'sheet') {
    const buffer = await sheetToXLSX(doc.data, doc.title)
    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${sanitize(doc.title)}.xlsx"`,
      },
    })
  }

  if (format === 'txt' && doc.type === 'doc') {
    const txt = docToPlainText(doc.data)
    return new NextResponse(txt, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${sanitize(doc.title)}.txt"`,
      },
    })
  }

  if (format === 'docx' && doc.type === 'doc') {
    const buffer = await docToDOCX(doc.data, doc.title)
    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${sanitize(doc.title)}.docx"`,
      },
    })
  }

  if (format === 'pdf' && doc.type === 'doc') {
    const html = docToHTML(doc.data, doc.title)
    const pdf = await htmlToPDF(html)
    return new NextResponse(pdf as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${sanitize(doc.title)}.pdf"`,
      },
    })
  }

  return NextResponse.json({ error: 'Unsupported format' }, { status: 400 })
}

function sanitize(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_ ]/g, '').trim() || 'untitled'
}

// ---------- Sheet → XLSX ----------

async function sheetToXLSX(data: unknown, title: string): Promise<Buffer> {
  const d = data as {
    sheets?: Record<string, {
      name?: string
      cellData?: Record<string, Record<string, { v?: unknown; f?: string; s?: { bl?: number; it?: number; fs?: number; cl?: { rgb?: string }; bg?: { rgb?: string } } }>>
    }>
    sheetOrder?: string[]
  }
  const sheets = d?.sheets || {}
  const sheetOrder = d?.sheetOrder || Object.keys(sheets)

  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'OpenSheet'
  workbook.created = new Date()

  for (const sheetId of sheetOrder) {
    const sheetData = sheets[sheetId]
    if (!sheetData) continue

    const ws = workbook.addWorksheet(sheetData.name || title)
    const cellData = sheetData.cellData || {}

    const rows = Object.keys(cellData).map(Number).sort((a, b) => a - b)
    if (rows.length === 0) continue

    const maxRow = rows[rows.length - 1]
    let maxCol = 0
    for (const r of rows) {
      const cols = Object.keys(cellData[r]).map(Number)
      if (cols.length > 0) maxCol = Math.max(maxCol, Math.max(...cols))
    }

    for (let r = 0; r <= maxRow; r++) {
      for (let c = 0; c <= maxCol; c++) {
        const cell = cellData[r]?.[c]
        if (!cell) continue

        const wsCell = ws.getCell(r + 1, c + 1)

        if (cell.f) {
          wsCell.value = { formula: cell.f.startsWith('=') ? cell.f.slice(1) : cell.f } as ExcelJS.CellFormulaValue
        } else if (cell.v !== undefined) {
          wsCell.value = cell.v as ExcelJS.CellValue
        }

        // Apply styles
        if (cell.s) {
          const font: Partial<ExcelJS.Font> = {}
          if (cell.s.bl) font.bold = true
          if (cell.s.it) font.italic = true
          if (cell.s.fs) font.size = cell.s.fs
          if (cell.s.cl?.rgb) font.color = { argb: cell.s.cl.rgb.replace('#', 'FF') }
          if (Object.keys(font).length > 0) wsCell.font = font

          if (cell.s.bg?.rgb) {
            wsCell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: cell.s.bg.rgb.replace('#', 'FF') },
            }
          }
        }
      }
    }
  }

  const buffer = await workbook.xlsx.writeBuffer()
  return Buffer.from(buffer)
}

// ---------- Sheet → CSV ----------

function sheetToCSV(data: unknown): string {
  const d = data as { sheets?: Record<string, { cellData?: Record<string, Record<string, { v?: unknown; f?: string }>> }> }
  const sheets = d?.sheets
  if (!sheets) return ''

  const firstSheetId = Object.keys(sheets)[0]
  if (!firstSheetId) return ''
  const cellData = sheets[firstSheetId].cellData || {}

  const rows = Object.keys(cellData).map(Number).sort((a, b) => a - b)
  if (rows.length === 0) return ''

  const maxRow = rows[rows.length - 1]
  let maxCol = 0
  for (const r of rows) {
    const cols = Object.keys(cellData[r]).map(Number)
    if (cols.length > 0) maxCol = Math.max(maxCol, Math.max(...cols))
  }

  const lines: string[] = []
  for (let r = 0; r <= maxRow; r++) {
    const cells: string[] = []
    for (let c = 0; c <= maxCol; c++) {
      const cell = cellData[r]?.[c]
      const val = cell?.v ?? cell?.f ?? ''
      const str = String(val)
      // Escape CSV
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        cells.push(`"${str.replace(/"/g, '""')}"`)
      } else {
        cells.push(str)
      }
    }
    lines.push(cells.join(','))
  }

  return lines.join('\n')
}

// ---------- Sheet → HTML ----------

function sheetToHTML(data: unknown, title: string): string {
  const csv = sheetToCSV(data)
  const rows = csv.split('\n').map(line => {
    const cells: string[] = []
    let current = ''
    let inQuotes = false
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; continue }
      if (ch === ',' && !inQuotes) { cells.push(current); current = ''; continue }
      current += ch
    }
    cells.push(current)
    return cells
  })

  const headerRow = rows[0] || []
  const bodyRows = rows.slice(1)

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>
  body { font-family: -apple-system, sans-serif; padding: 24px; }
  h1 { font-size: 1.5em; margin-bottom: 16px; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; font-size: 14px; }
  th { background: #f9fafb; font-weight: 600; }
  tr:hover { background: #f9fafb; }
</style></head><body>
<h1>${esc(title)}</h1>
<table>
<thead><tr>${headerRow.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>
<tbody>${bodyRows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('\n')}</tbody>
</table></body></html>`
}

// ---------- Doc → HTML ----------

function docToHTML(data: unknown, title: string): string {
  const d = data as { body?: { dataStream?: string; paragraphs?: { startIndex: number; paragraphStyle?: { namedStyleType?: number } }[]; textRuns?: { st: number; ed: number; ts?: { bl?: number; it?: number; fs?: number } }[] } }
  const stream = d?.body?.dataStream || ''
  const paragraphs = d?.body?.paragraphs || []
  const textRuns = d?.body?.textRuns || []

  // Split by paragraph breaks
  const parts = stream.replace(/\n\0$/, '').split('\r')
  let html = ''
  let charIdx = 0

  for (let i = 0; i < parts.length; i++) {
    const text = parts[i]
    const para = paragraphs[i]
    const namedStyle = para?.paragraphStyle?.namedStyleType || 0

    // Apply text runs
    let styledText = esc(text)
    for (const run of textRuns) {
      if (run.st >= charIdx && run.ed <= charIdx + text.length) {
        const localStart = run.st - charIdx
        const localEnd = run.ed - charIdx
        const slice = esc(text.slice(localStart, localEnd))
        let wrapped = slice
        if (run.ts?.bl) wrapped = `<strong>${wrapped}</strong>`
        if (run.ts?.it) wrapped = `<em>${wrapped}</em>`
        styledText = styledText.replace(slice, wrapped)
      }
    }

    const tag = namedStyle >= 2 && namedStyle <= 6 ? `h${namedStyle - 1}` : 'p'
    if (text.trim()) html += `<${tag}>${styledText}</${tag}>\n`
    charIdx += text.length + 1 // +1 for \r
  }

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>
  body { font-family: -apple-system, sans-serif; max-width: 680px; margin: 40px auto; padding: 0 24px; line-height: 1.6; }
  h1 { font-size: 2em; } h2 { font-size: 1.5em; } h3 { font-size: 1.25em; }
</style></head><body>
${html}</body></html>`
}

// ---------- Doc → Markdown ----------

function docToMarkdown(data: unknown): string {
  const d = data as { body?: { dataStream?: string; paragraphs?: { startIndex: number; paragraphStyle?: { namedStyleType?: number } }[] } }
  const stream = d?.body?.dataStream || ''
  const paragraphs = d?.body?.paragraphs || []
  const parts = stream.replace(/\n\0$/, '').split('\r')

  let md = ''
  for (let i = 0; i < parts.length; i++) {
    const text = parts[i]
    if (!text.trim()) continue
    const para = paragraphs[i]
    const namedStyle = para?.paragraphStyle?.namedStyleType || 0
    if (namedStyle >= 2 && namedStyle <= 6) {
      md += '#'.repeat(namedStyle - 1) + ' ' + text + '\n\n'
    } else {
      md += text + '\n\n'
    }
  }

  return md.trim() + '\n'
}

// ---------- Doc → Plain Text ----------

function docToPlainText(data: unknown): string {
  const d = data as { body?: { dataStream?: string; paragraphs?: { startIndex: number; paragraphStyle?: { namedStyleType?: number } }[] } }
  const stream = d?.body?.dataStream || ''
  const parts = stream.replace(/\n\0$/, '').split('\r')
  return parts.filter(p => p.trim()).join('\n\n') + '\n'
}

// ---------- Doc → DOCX ----------

async function docToDOCX(data: unknown, title: string): Promise<Buffer> {
  const d = data as { body?: { dataStream?: string; paragraphs?: { startIndex: number; paragraphStyle?: { namedStyleType?: number } }[]; textRuns?: { st: number; ed: number; ts?: { bl?: number; it?: number; fs?: number } }[] } }
  const stream = d?.body?.dataStream || ''
  const paragraphs = d?.body?.paragraphs || []
  const textRuns = d?.body?.textRuns || []
  const parts = stream.replace(/\n\0$/, '').split('\r')

  const docParagraphs: Paragraph[] = []
  let charIdx = 0

  for (let i = 0; i < parts.length; i++) {
    const text = parts[i]
    if (!text.trim()) { charIdx += text.length + 1; continue }

    const para = paragraphs[i]
    const namedStyle = para?.paragraphStyle?.namedStyleType || 0

    // Find text runs for this paragraph
    const runs: TextRun[] = []
    const relevantRuns = textRuns.filter(r => r.st >= charIdx && r.ed <= charIdx + text.length)

    if (relevantRuns.length === 0) {
      runs.push(new TextRun({ text }))
    } else {
      let pos = 0
      for (const run of relevantRuns) {
        const localStart = run.st - charIdx
        const localEnd = run.ed - charIdx
        if (localStart > pos) {
          runs.push(new TextRun({ text: text.slice(pos, localStart) }))
        }
        runs.push(new TextRun({
          text: text.slice(localStart, localEnd),
          bold: run.ts?.bl === 1,
          italics: run.ts?.it === 1,
          size: run.ts?.fs ? run.ts.fs * 2 : undefined,
        }))
        pos = localEnd
      }
      if (pos < text.length) {
        runs.push(new TextRun({ text: text.slice(pos) }))
      }
    }

    const headingMap: Record<number, typeof HeadingLevel[keyof typeof HeadingLevel]> = {
      2: HeadingLevel.HEADING_1,
      3: HeadingLevel.HEADING_2,
      4: HeadingLevel.HEADING_3,
      5: HeadingLevel.HEADING_4,
      6: HeadingLevel.HEADING_5,
    }

    docParagraphs.push(new Paragraph({
      children: runs,
      heading: headingMap[namedStyle],
    }))

    charIdx += text.length + 1
  }

  const doc = new Document({
    title,
    sections: [{ children: docParagraphs }],
  })

  const buffer = await Packer.toBuffer(doc)
  return Buffer.from(buffer)
}

// ---------- HTML → PDF ----------

async function htmlToPDF(html: string): Promise<Uint8Array> {
  const puppeteer = await import('puppeteer')
  const browser = await puppeteer.default.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })
  const pdf = await page.pdf({
    format: 'A4',
    margin: { top: '40px', bottom: '40px', left: '50px', right: '50px' },
    printBackground: true,
  })
  await browser.close()
  return new Uint8Array(pdf)
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
