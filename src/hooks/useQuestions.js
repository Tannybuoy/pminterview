import { useState, useEffect, useCallback } from 'react'
import {
  fetchQuestions,
  getCategories,
  getCompanies,
  filterByCategory,
  filterByCompany,
  getRandomQuestion
} from '../services/questionsService'

export function useQuestions(selectedCategory = 'all', selectedCompany = 'all', recentQuestions = []) {
  const [allQuestions, setAllQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [questionHistory, setQuestionHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    async function loadQuestions() {
      try {
        setIsLoading(true)
        const questions = await fetchQuestions()
        setAllQuestions(questions)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    loadQuestions()
  }, [])

  const filteredByCategory = filterByCategory(allQuestions, selectedCategory)
  const filteredQuestions = filterByCompany(filteredByCategory, selectedCompany)
  const categories = getCategories(allQuestions)
  const companies = getCompanies(allQuestions)

  useEffect(() => {
    if (filteredQuestions.length > 0 && !currentQuestion) {
      const question = getRandomQuestion(filteredQuestions, recentQuestions)
      setCurrentQuestion(question)
      if (question) {
        setQuestionHistory([question])
        setHistoryIndex(0)
      }
    }
  }, [filteredQuestions.length])

  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const question = getRandomQuestion(filteredQuestions, recentQuestions)
      setCurrentQuestion(question)
      if (question) {
        setQuestionHistory([question])
        setHistoryIndex(0)
      }
    } else {
      setCurrentQuestion(null)
      setQuestionHistory([])
      setHistoryIndex(-1)
    }
  }, [selectedCategory, selectedCompany])

  const getNextQuestion = useCallback(() => {
    if (historyIndex < questionHistory.length - 1) {
      const nextIndex = historyIndex + 1
      setHistoryIndex(nextIndex)
      setCurrentQuestion(questionHistory[nextIndex])
    } else {
      const newQuestion = getRandomQuestion(filteredQuestions, recentQuestions)
      if (newQuestion) {
        setQuestionHistory(prev => [...prev, newQuestion])
        setHistoryIndex(prev => prev + 1)
        setCurrentQuestion(newQuestion)
      }
    }
  }, [filteredQuestions, recentQuestions, historyIndex, questionHistory])

  const getPreviousQuestion = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1
      setHistoryIndex(prevIndex)
      setCurrentQuestion(questionHistory[prevIndex])
      return true
    }
    return false
  }, [historyIndex, questionHistory])

  const hasPreviousQuestion = historyIndex > 0
  const hasNextInHistory = historyIndex < questionHistory.length - 1

  const getCategoryCounts = useCallback(() => {
    const counts = {}
    allQuestions.forEach(q => {
      counts[q.category] = (counts[q.category] || 0) + 1
    })
    return counts
  }, [allQuestions])

  const getCompanyCounts = useCallback(() => {
    const counts = {}
    allQuestions.forEach(q => {
      if (q.company) {
        counts[q.company] = (counts[q.company] || 0) + 1
      }
    })
    return counts
  }, [allQuestions])

  return {
    questions: filteredQuestions,
    allQuestions,
    categories,
    companies,
    currentQuestion,
    getNextQuestion,
    getPreviousQuestion,
    hasPreviousQuestion,
    hasNextInHistory,
    getCategoryCounts,
    getCompanyCounts,
    isLoading,
    error
  }
}
