import fallbackQuestions from '../data/questions.json'

const CATEGORY_MAP = {
  'Product Strategy': 'Product Sense',
  'AI Product Sense': 'Product Sense',
  'AI/ML Concepts': 'Technical',
  'AI Technical': 'Technical',
  'Technical Trade-offs': 'Technical',
  'General': 'Behavioral',
  'Communication': 'Behavioral',
  'Metrics & Analytics': 'Analytics',
  'AI Ethics': 'Ethics & UX',
  'User Experience': 'Ethics & UX'
}

const CATEGORIES = ['Product Sense', 'Technical', 'Behavioral', 'Analytics', 'Ethics & UX']

export function mapCategory(category) {
  return CATEGORY_MAP[category] || category
}

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
  return CATEGORIES
}

export function getCompanies(questions) {
  const companies = [...new Set(questions.filter(q => q.company).map(q => q.company))]
  return companies.sort()
}

export function filterByCompany(questions, company) {
  if (!company || company === 'all') return questions
  return questions.filter(q => q.company === company)
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
    const questions = fallbackQuestions.questions || []
    return questions.map(q => ({
      ...q,
      category: mapCategory(q.category)
    }))
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
  getCompanies,
  filterByCategory,
  filterByCompany,
  getRandomQuestion,
  fetchQuestions,
  mapCategory
}
