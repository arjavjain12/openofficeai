// Transform API input into Univer data models

interface CellInput {
  value?: string | number | boolean
  formula?: string
  bold?: boolean
  italic?: boolean
  fontSize?: number
  fontColor?: string
  bgColor?: string
  format?: string
}

interface SheetInput {
  name?: string
  cells?: Record<string, CellInput> // "A1" -> cell data
  rows?: (string | number | boolean | null)[][] // simple 2D array
}

interface SheetApiInput {
  title?: string
  sheets?: SheetInput[]
}

interface DocBlockInput {
  type: 'heading' | 'paragraph' | 'text'
  level?: 1 | 2 | 3 | 4 | 5
  text: string
  bold?: boolean
  italic?: boolean
  color?: string
}

interface DocApiInput {
  title?: string
  content?: DocBlockInput[]
}

// Convert "A1" -> { row: 0, col: 0 }
function cellRef(ref: string): { row: number; col: number } {
  const match = ref.match(/^([A-Z]+)(\d+)$/)
  if (!match) throw new Error(`Invalid cell reference: ${ref}`)
  const colStr = match[1]
  const row = parseInt(match[2], 10) - 1
  let col = 0
  for (let i = 0; i < colStr.length; i++) {
    col = col * 26 + (colStr.charCodeAt(i) - 64)
  }
  return { row, col: col - 1 }
}

export function transformSheetInput(input: SheetApiInput) {
  const sheets: Record<string, unknown> = {}
  const sheetOrder: string[] = []

  const sheetInputs = input.sheets?.length ? input.sheets : [{}]

  sheetInputs.forEach((sheetInput, idx) => {
    const sheetId = `sheet-${idx + 1}`
    sheetOrder.push(sheetId)

    const cellData: Record<number, Record<number, unknown>> = {}

    // Process cells object (e.g., { "A1": { value: "Hello", bold: true } })
    if (sheetInput.cells) {
      for (const [ref, cell] of Object.entries(sheetInput.cells)) {
        const { row, col } = cellRef(ref.toUpperCase())
        if (!cellData[row]) cellData[row] = {}

        const cellObj: Record<string, unknown> = {}
        if (cell.formula) {
          cellObj.f = cell.formula.startsWith('=') ? cell.formula : `=${cell.formula}`
        } else if (cell.value !== undefined) {
          cellObj.v = cell.value
        }

        // Inline styles
        const s: Record<string, unknown> = {}
        if (cell.bold) s.bl = 1
        if (cell.italic) s.it = 1
        if (cell.fontSize) s.fs = cell.fontSize
        if (cell.fontColor) s.cl = { rgb: cell.fontColor }
        if (cell.bgColor) s.bg = { rgb: cell.bgColor }
        if (Object.keys(s).length > 0) cellObj.s = s

        cellData[row][col] = cellObj
      }
    }

    // Process rows array (simple 2D data)
    if (sheetInput.rows) {
      sheetInput.rows.forEach((row, rowIdx) => {
        if (!cellData[rowIdx]) cellData[rowIdx] = {}
        row.forEach((val, colIdx) => {
          if (val !== null && val !== undefined) {
            if (!cellData[rowIdx][colIdx]) {
              cellData[rowIdx][colIdx] = { v: val }
            }
          }
        })
      })
    }

    sheets[sheetId] = {
      id: sheetId,
      name: sheetInput.name || `Sheet${idx + 1}`,
      rowCount: 1000,
      columnCount: 26,
      cellData,
    }
  })

  return {
    id: '', // will be set by caller
    name: input.title || 'Untitled Spreadsheet',
    appVersion: '0.17.0',
    locale: 'EN_US',
    styles: {},
    sheetOrder,
    sheets,
  }
}

export function transformDocInput(input: DocApiInput) {
  let dataStream = ''
  const textRuns: { st: number; ed: number; ts: Record<string, unknown> }[] = []
  const paragraphs: { startIndex: number; paragraphStyle?: Record<string, unknown> }[] = []

  const blocks = input.content || []

  // If there's a title and no explicit title block, add one
  if (input.title && (!blocks.length || blocks[0].type !== 'heading' || blocks[0].level !== 1)) {
    blocks.unshift({ type: 'heading', level: 1, text: input.title })
  }

  blocks.forEach((block) => {
    const start = dataStream.length
    dataStream += block.text
    const end = dataStream.length

    // Text style
    const ts: Record<string, unknown> = {}
    if (block.bold || block.type === 'heading') ts.bl = 1
    if (block.italic) ts.it = 1
    if (block.color) ts.cl = { rgb: block.color }

    if (block.type === 'heading') {
      const sizes: Record<number, number> = { 1: 26, 2: 22, 3: 18, 4: 16, 5: 14 }
      ts.fs = sizes[block.level || 1] || 18
    }

    if (Object.keys(ts).length > 0) {
      textRuns.push({ st: start, ed: end, ts })
    }

    // Paragraph break
    dataStream += '\r'
    const namedStyleMap: Record<string, number> = {
      heading1: 2, heading2: 3, heading3: 4, heading4: 5, heading5: 6,
    }
    const pStyle: Record<string, unknown> = {}
    if (block.type === 'heading') {
      pStyle.namedStyleType = namedStyleMap[`heading${block.level || 1}`] || 2
    }
    paragraphs.push({ startIndex: dataStream.length - 1, ...(Object.keys(pStyle).length ? { paragraphStyle: pStyle } : {}) })
  })

  // End markers
  dataStream += '\n\0'

  return {
    id: '',
    body: {
      dataStream,
      textRuns,
      paragraphs,
      sectionBreaks: [{ startIndex: dataStream.length - 1 }],
    },
    documentStyle: {
      pageSize: { width: 595, height: 842 },
      marginTop: 50,
      marginBottom: 50,
      marginLeft: 60,
      marginRight: 60,
    },
  }
}

export type { SheetApiInput, DocApiInput, CellInput, SheetInput, DocBlockInput }
