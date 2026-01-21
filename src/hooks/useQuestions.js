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
      setCurrentQuestion(getRandomQuestion(filteredQuestions, recentQuestions))
    }
  }, [filteredQuestions.length])

  useEffect(() => {
    if (filteredQuestions.length > 0) {
      setCurrentQuestion(getRandomQuestion(filteredQuestions, recentQuestions))
    } else {
      setCurrentQuestion(null)
    }
  }, [selectedCategory, selectedCompany])

  const getNextQuestion = useCallback(() => {
    setCurrentQuestion(getRandomQuestion(filteredQuestions, recentQuestions))
  }, [filteredQuestions, recentQuestions])

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
    getCategoryCounts,
    getCompanyCounts,
    isLoading,
    error
  }
}
