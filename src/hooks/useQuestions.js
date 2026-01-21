import { useState, useEffect, useCallback } from 'react'
import {
  fetchQuestions,
  getCategories,
  filterByCategory,
  getRandomQuestion
} from '../services/questionsService'

export function useQuestions(selectedCategory = 'all', recentQuestions = []) {
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

  const filteredQuestions = filterByCategory(allQuestions, selectedCategory)
  const categories = getCategories(allQuestions)

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
  }, [selectedCategory])

  const getNextQuestion = useCallback(() => {
    setCurrentQuestion(getRandomQuestion(filteredQuestions, recentQuestions))
  }, [filteredQuestions, recentQuestions])

  return {
    questions: filteredQuestions,
    allQuestions,
    categories,
    currentQuestion,
    getNextQuestion,
    isLoading,
    error
  }
}
