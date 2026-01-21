import { useQuestions } from '../hooks/useQuestions'
import { useTimer } from '../hooks/useTimer'
import { useLocalStorage } from '../hooks/useLocalStorage'
import QuestionCard from '../components/Questions/QuestionCard'
import CategoryFilter from '../components/Questions/CategoryFilter'
import CompanyFilter from '../components/Questions/CompanyFilter'
import Timer from '../components/Questions/Timer'
import StatusSelector from '../components/Questions/StatusSelector'
import ProgressDashboard from '../components/Questions/ProgressDashboard'

function QuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useLocalStorage('aipm_selectedCategory', 'all')
  const [selectedCompany, setSelectedCompany] = useLocalStorage('aipm_selectedCompany', 'all')
  const [timerVisible, setTimerVisible] = useLocalStorage('aipm_timerVisible', true)
  const [progress, setProgress] = useLocalStorage('aipm_progress', {})
  const [recentQuestions, setRecentQuestions] = useLocalStorage('aipm_recentQuestions', [])

  const {
    questions,
    allQuestions,
    categories,
    companies,
    currentQuestion,
    getNextQuestion,
    getPreviousQuestion,
    hasPreviousQuestion,
    getCategoryCounts,
    getCompanyCounts,
    isLoading,
    error
  } = useQuestions(selectedCategory, selectedCompany, recentQuestions)

  const { time, reset: resetTimer } = useTimer(currentQuestion?.id)

  const handlePreviousQuestion = () => {
    getPreviousQuestion()
    resetTimer()
  }

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

  const attemptedInFilter = questions.filter(q => progress[q.id]?.status).length
  const allAttempted = questions.length > 0 && attemptedInFilter === questions.length
  const isFiltered = selectedCategory !== 'all' || selectedCompany !== 'all'

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
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
              questionCounts={getCategoryCounts()}
            />
            <CompanyFilter
              companies={companies}
              selected={selectedCompany}
              onChange={setSelectedCompany}
              questionCounts={getCompanyCounts()}
            />
          </div>
          <Timer
            time={time}
            visible={timerVisible}
            onToggle={() => setTimerVisible(v => !v)}
          />
        </div>
        <div className="text-sm text-gray-500">
          Showing {questions.length} of {allQuestions.length} questions
        </div>
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

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={!hasPreviousQuestion}
              className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                hasPreviousQuestion
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Previous Question
            </button>
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Question
            </button>
          </div>

          {allAttempted && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800 font-medium mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                All {questions.length} questions in this {selectedCompany !== 'all' ? 'company' : selectedCategory !== 'all' ? 'category' : 'selection'} attempted!
              </div>
              <p className="text-green-700 text-sm mb-3">
                Great job! You've practiced all questions in the current filter. Try switching to a different {isFiltered ? 'category or company' : 'filter'} to continue practicing.
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Show All Categories
                  </button>
                )}
                {selectedCompany !== 'all' && (
                  <button
                    onClick={() => setSelectedCompany('all')}
                    className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Show All Companies
                  </button>
                )}
                {!isFiltered && (
                  <span className="text-sm text-green-700">
                    You've attempted all available questions!
                  </span>
                )}
              </div>
            </div>
          )}
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
          questionIds={questions.map(q => q.id)}
          onReset={handleResetProgress}
        />
      </div>
    </div>
  )
}

export default QuestionsPage
