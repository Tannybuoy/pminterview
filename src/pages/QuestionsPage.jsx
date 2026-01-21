import { useState } from 'react'
import { useQuestions } from '../hooks/useQuestions'
import { useTimer } from '../hooks/useTimer'
import { useLocalStorage } from '../hooks/useLocalStorage'
import QuestionCard from '../components/Questions/QuestionCard'
import CategoryFilter from '../components/Questions/CategoryFilter'
import Timer from '../components/Questions/Timer'
import StatusSelector from '../components/Questions/StatusSelector'
import ProgressDashboard from '../components/Questions/ProgressDashboard'

function QuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useLocalStorage('aipm_selectedCategory', 'all')
  const [timerVisible, setTimerVisible] = useLocalStorage('aipm_timerVisible', true)
  const [progress, setProgress] = useLocalStorage('aipm_progress', {})
  const [recentQuestions, setRecentQuestions] = useLocalStorage('aipm_recentQuestions', [])

  const {
    questions,
    categories,
    currentQuestion,
    getNextQuestion,
    isLoading,
    error
  } = useQuestions(selectedCategory, recentQuestions)

  const { time, reset: resetTimer } = useTimer(currentQuestion?.id)

  const handleNextQuestion = () => {
    if (currentQuestion) {
      setRecentQuestions(prev => {
        const updated = [currentQuestion.id, ...prev].slice(0, 10)
        return updated
      })
    }
    getNextQuestion()
    resetTimer()
  }

  const handleStatusChange = (status) => {
    if (!currentQuestion) return
    setProgress(prev => ({
      ...prev,
      [currentQuestion.id]: {
        status,
        lastPracticed: new Date().toISOString(),
        practiceCount: (prev[currentQuestion.id]?.practiceCount || 0) + 1
      }
    }))
  }

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setProgress({})
      setRecentQuestions([])
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500">Loading questions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-red-500">Error loading questions. Please refresh the page.</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
          questionCounts={questions.reduce((acc, q) => {
            acc[q.category] = (acc[q.category] || 0) + 1
            return acc
          }, {})}
        />
        <Timer
          time={time}
          visible={timerVisible}
          onToggle={() => setTimerVisible(v => !v)}
        />
      </div>

      {currentQuestion ? (
        <>
          <QuestionCard
            question={currentQuestion}
            currentStatus={progress[currentQuestion.id]?.status}
          />

          <div className="mt-6">
            <StatusSelector
              currentStatus={progress[currentQuestion.id]?.status}
              onChange={handleStatusChange}
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Question
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No questions available for this category.
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <ProgressDashboard
          progress={progress}
          totalQuestions={questions.length}
          onReset={handleResetProgress}
        />
      </div>
    </div>
  )
}

export default QuestionsPage
