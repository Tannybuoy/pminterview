/**
 * Build-time script to fetch questions from Google Sheets
 *
 * SECURITY: This runs in Node.js at build time.
 * API keys are NEVER exposed to the browser.
 *
 * Usage: node scripts/fetch-questions.js
 */

import 'dotenv/config'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const QUESTIONS_PATH = join(__dirname, '../src/data/questions.json')

function parseCSVLine(line) {
  const values = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"'
      i++
    } else if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      values.push(current)
      current = ''
    } else {
      current += char
    }
  }
  values.push(current)

  return values
}

function parseCSV(csvText) {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim())
  const questionIndex = headers.findIndex(h => h.includes('question'))
  const categoryIndex = headers.findIndex(h => h.includes('category'))

  if (questionIndex === -1) {
    throw new Error('CSV must have a "question" column')
  }

  const questions = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    const question = values[questionIndex]?.trim()
    const category = values[categoryIndex]?.trim() || 'General'

    if (question && question.length > 0) {
      questions.push({
        id: `q_${i.toString().padStart(3, '0')}`,
        question,
        category
      })
    }
  }

  return questions
}

async function fetchFromGoogleSheets(sheetId, apiKey) {
  const range = 'Sheet1'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`

  console.log('Fetching from Google Sheets...')

  const response = await fetch(url)

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Google Sheets API error: ${response.status} - ${error}`)
  }

  const data = await response.json()

  if (!data.values || data.values.length < 2) {
    throw new Error('Sheet is empty or has no data rows')
  }

  const csvLines = data.values.map(row =>
    row.map(cell => {
      if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
        return `"${cell.replace(/"/g, '""')}"`
      }
      return cell
    }).join(',')
  ).join('\n')

  return parseCSV(csvLines)
}

async function main() {
  const sheetId = process.env.GOOGLE_SHEETS_ID
  const apiKey = process.env.GOOGLE_API_KEY

  if (!sheetId || !apiKey) {
    console.log('⚠️  GOOGLE_SHEETS_ID or GOOGLE_API_KEY not set')
    console.log('   Using existing questions.json (fallback mode)')
    console.log('   To fetch from Google Sheets, create a .env file with:')
    console.log('   GOOGLE_SHEETS_ID=your_sheet_id')
    console.log('   GOOGLE_API_KEY=your_api_key')
    process.exit(0)
  }

  try {
    const questions = await fetchFromGoogleSheets(sheetId, apiKey)

    if (questions.length === 0) {
      throw new Error('No valid questions found in sheet')
    }

    const categories = [...new Set(questions.map(q => q.category))].sort()

    const output = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      questions,
      categories
    }

    writeFileSync(QUESTIONS_PATH, JSON.stringify(output, null, 2))

    console.log(`✅ Fetched ${questions.length} questions`)
    console.log(`   Categories: ${categories.join(', ')}`)
    console.log(`   Saved to: src/data/questions.json`)

  } catch (error) {
    console.error(`❌ Error: ${error.message}`)
    console.log('   Keeping existing questions.json')
    process.exit(1)
  }
}

main()
