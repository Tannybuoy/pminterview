import fallbackQuestions from '../data/questions.json'

export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim())
  const questionIndex = headers.findIndex(h => h.includes('question'))
  const categoryIndex = headers.findIndex(h => h.includes('category'))

  if (questionIndex === -1) {
    console.warn('CSV missing question column')
    return []
  }

  const questions = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
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

  return questions
}

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

export function validateQuestion(q) {
  return Boolean(q && q.id && q.question && q.category)
}

export function sanitizeQuestions(questions) {
  return questions.filter(validateQuestion)
}

export function getCategories(questions) {
  const categories = [...new Set(questions.map(q => q.category))]
  return categories.sort()
}

export function filterByCategory(questions, category) {
  if (!category || category === 'all') return questions
  return questions.filter(q => q.category === category)
}

export function getRandomQuestion(questions, excludeIds = []) {
  const available = questions.filter(q => !excludeIds.includes(q.id))
  if (available.length === 0) {
    return questions.length > 0 ? questions[Math.floor(Math.random() * questions.length)] : null
  }
  return available[Math.floor(Math.random() * available.length)]
}

export async function fetchQuestions() {
  try {
    return fallbackQuestions.questions || []
  } catch (error) {
    console.error('Error loading questions:', error)
    return []
  }
}

export const questionsService = {
  parseCSV,
  validateQuestion,
  sanitizeQuestions,
  getCategories,
  filterByCategory,
  getRandomQuestion,
  fetchQuestions
}
