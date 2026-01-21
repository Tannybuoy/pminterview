/**
 * Test script for validating CSV parsing and question data
 * Run with: node scripts/test-data-parsing.js
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// CSV Parser (matching the one in questionsService.js)
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
  if (lines.length < 2) return { headers: [], rows: [], questions: [] }

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim())
  const questionIndex = headers.findIndex(h => h.includes('question'))
  const categoryIndex = headers.findIndex(h => h.includes('category'))

  const questions = []
  const rows = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    rows.push(values)

    const question = values[questionIndex]?.trim()
    const category = values[categoryIndex]?.trim() || 'General'

    if (question) {
      questions.push({
        id: `q_${i.toString().padStart(3, '0')}`,
        question,
        category
      })
    }
  }

  return { headers, rows, questions }
}

function validateQuestion(q) {
  const errors = []
  if (!q.id) errors.push('Missing id')
  if (!q.question) errors.push('Missing question')
  if (!q.category) errors.push('Missing category')
  if (q.question && q.question.length < 10) errors.push('Question too short')
  return errors
}

// Test Suite
let testsPassed = 0
let testsFailed = 0

function test(name, fn) {
  try {
    fn()
    console.log(`  ✓ ${name}`)
    testsPassed++
  } catch (error) {
    console.log(`  ✗ ${name}`)
    console.log(`    Error: ${error.message}`)
    testsFailed++
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

// Run Tests
console.log('\n📋 Testing CSV Parser\n')

test('parses simple CSV line', () => {
  const result = parseCSVLine('a,b,c')
  assert(result.length === 3, `Expected 3 values, got ${result.length}`)
  assert(result[0] === 'a', 'First value should be "a"')
})

test('handles quoted values with commas', () => {
  const result = parseCSVLine('a,"hello, world",c')
  assert(result.length === 3, `Expected 3 values, got ${result.length}`)
  assert(result[1] === 'hello, world', 'Should handle comma in quotes')
})

test('handles escaped quotes', () => {
  const result = parseCSVLine('a,"say ""hello""",c')
  assert(result.length === 3, `Expected 3 values, got ${result.length}`)
  assert(result[1] === 'say "hello"', 'Should handle escaped quotes')
})

test('handles empty values', () => {
  const result = parseCSVLine('a,,c')
  assert(result.length === 3, `Expected 3 values, got ${result.length}`)
  assert(result[1] === '', 'Middle value should be empty')
})

console.log('\n📋 Testing Full CSV Parsing\n')

const testCSV = `Question,Category,Difficulty
"How would you prioritize features?",Product Strategy,Medium
"What is RAG?",AI/ML Concepts,Easy
"Describe a trade-off you made",Behavioral,Hard`

test('parses CSV headers correctly', () => {
  const { headers } = parseCSV(testCSV)
  assert(headers.length === 3, `Expected 3 headers, got ${headers.length}`)
  assert(headers[0] === 'question', 'First header should be "question"')
})

test('extracts questions from CSV', () => {
  const { questions } = parseCSV(testCSV)
  assert(questions.length === 3, `Expected 3 questions, got ${questions.length}`)
})

test('assigns IDs correctly', () => {
  const { questions } = parseCSV(testCSV)
  assert(questions[0].id === 'q_001', 'First question ID should be q_001')
  assert(questions[2].id === 'q_003', 'Third question ID should be q_003')
})

test('extracts categories', () => {
  const { questions } = parseCSV(testCSV)
  assert(questions[0].category === 'Product Strategy', 'Should extract category')
  assert(questions[1].category === 'AI/ML Concepts', 'Should extract second category')
})

console.log('\n📋 Testing Question Validation\n')

test('validates complete question', () => {
  const errors = validateQuestion({
    id: 'q_001',
    question: 'How would you prioritize features for an AI product?',
    category: 'Product Strategy'
  })
  assert(errors.length === 0, `Expected no errors, got: ${errors.join(', ')}`)
})

test('catches missing id', () => {
  const errors = validateQuestion({
    question: 'Test question here',
    category: 'Test'
  })
  assert(errors.includes('Missing id'), 'Should catch missing id')
})

test('catches missing question', () => {
  const errors = validateQuestion({
    id: 'q_001',
    category: 'Test'
  })
  assert(errors.includes('Missing question'), 'Should catch missing question')
})

test('catches short question', () => {
  const errors = validateQuestion({
    id: 'q_001',
    question: 'Why?',
    category: 'Test'
  })
  assert(errors.includes('Question too short'), 'Should catch short question')
})

console.log('\n📋 Testing Static JSON Data\n')

try {
  const questionsPath = join(__dirname, '../src/data/questions.json')
  const questionsData = JSON.parse(readFileSync(questionsPath, 'utf-8'))

  test('questions.json has valid structure', () => {
    assert(questionsData.version, 'Should have version')
    assert(Array.isArray(questionsData.questions), 'Should have questions array')
    assert(Array.isArray(questionsData.categories), 'Should have categories array')
  })

  test('all questions are valid', () => {
    const invalidQuestions = []
    questionsData.questions.forEach((q, i) => {
      const errors = validateQuestion(q)
      if (errors.length > 0) {
        invalidQuestions.push({ index: i, id: q.id, errors })
      }
    })
    assert(
      invalidQuestions.length === 0,
      `Found ${invalidQuestions.length} invalid questions: ${JSON.stringify(invalidQuestions)}`
    )
  })

  test('has minimum number of questions', () => {
    assert(
      questionsData.questions.length >= 10,
      `Expected at least 10 questions, got ${questionsData.questions.length}`
    )
  })

  test('categories match questions', () => {
    const questionCategories = [...new Set(questionsData.questions.map(q => q.category))]
    const missingCategories = questionCategories.filter(c => !questionsData.categories.includes(c))
    assert(
      missingCategories.length === 0,
      `Categories missing from list: ${missingCategories.join(', ')}`
    )
  })

  test('no duplicate question IDs', () => {
    const ids = questionsData.questions.map(q => q.id)
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i)
    assert(duplicates.length === 0, `Duplicate IDs found: ${duplicates.join(', ')}`)
  })

} catch (error) {
  console.log(`  ✗ Failed to load questions.json: ${error.message}`)
  testsFailed++
}

console.log('\n📋 Testing Companies JSON\n')

try {
  const companiesPath = join(__dirname, '../src/data/companies.json')
  const companies = JSON.parse(readFileSync(companiesPath, 'utf-8'))

  test('companies.json is valid array', () => {
    assert(Array.isArray(companies), 'Should be an array')
  })

  test('all companies have required fields', () => {
    const invalid = companies.filter(c => !c.id || !c.name || !c.careersUrl)
    assert(invalid.length === 0, `Found ${invalid.length} companies with missing fields`)
  })

  test('all career URLs are valid', () => {
    const invalidUrls = companies.filter(c => {
      try {
        new URL(c.careersUrl)
        return false
      } catch {
        return true
      }
    })
    assert(invalidUrls.length === 0, `Invalid URLs: ${invalidUrls.map(c => c.name).join(', ')}`)
  })

  test('no duplicate company IDs', () => {
    const ids = companies.map(c => c.id)
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i)
    assert(duplicates.length === 0, `Duplicate IDs: ${duplicates.join(', ')}`)
  })

} catch (error) {
  console.log(`  ✗ Failed to load companies.json: ${error.message}`)
  testsFailed++
}

console.log('\n📋 Testing Resources JSON\n')

try {
  const resourcesPath = join(__dirname, '../src/data/resources.json')
  const resources = JSON.parse(readFileSync(resourcesPath, 'utf-8'))

  test('resources.json has topics array', () => {
    assert(resources.topics, 'Should have topics')
    assert(Array.isArray(resources.topics), 'Topics should be an array')
  })

  test('all topics have required fields', () => {
    const invalid = resources.topics.filter(t => !t.id || !t.name || !Array.isArray(t.resources))
    assert(invalid.length === 0, `Found ${invalid.length} topics with missing fields`)
  })

  test('all resources have required fields', () => {
    const invalidResources = []
    resources.topics.forEach(topic => {
      topic.resources.forEach((r, i) => {
        if (!r.title || !r.url) {
          invalidResources.push({ topic: topic.id, index: i })
        }
      })
    })
    assert(invalidResources.length === 0, `Found ${invalidResources.length} resources with missing fields`)
  })

  test('all resource URLs are valid', () => {
    const invalidUrls = []
    resources.topics.forEach(topic => {
      topic.resources.forEach(r => {
        try {
          new URL(r.url)
        } catch {
          invalidUrls.push({ topic: topic.id, title: r.title, url: r.url })
        }
      })
    })
    assert(invalidUrls.length === 0, `Invalid URLs found: ${JSON.stringify(invalidUrls)}`)
  })

} catch (error) {
  console.log(`  ✗ Failed to load resources.json: ${error.message}`)
  testsFailed++
}

// Summary
console.log('\n' + '='.repeat(50))
console.log(`\n📊 Test Results: ${testsPassed} passed, ${testsFailed} failed\n`)

if (testsFailed > 0) {
  process.exit(1)
} else {
  console.log('✅ All tests passed!\n')
  process.exit(0)
}
