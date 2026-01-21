import { useState } from 'react'

function QuestionCard({ question, currentStatus }) {
  const [showHints, setShowHints] = useState(false)

  const statusColors = {
    needs_practice: 'border-l-red-500',
    comfortable: 'border-l-yellow-500',
    mastered: 'border-l-green-500'
  }

  const borderClass = currentStatus ? statusColors[currentStatus] : 'border-l-gray-200'

  return (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 ${borderClass} p-6`}>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
          {question.category}
        </span>
        {question.company && (
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
            {question.company}
          </span>
        )}
      </div>
      <p className="text-xl text-gray-900 leading-relaxed">
        {question.question}
      </p>

      {question.hints && question.hints.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 2C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2 14h-4v-1h4v1zm0-2H9v-1h5v1zm1.31-3.26l-.71.49V12.5h-5.2v-1.27l-.71-.49A4.992 4.992 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.79 3.16-2.19 4.14l-.5.36z" />
            </svg>
            <span className="text-sm font-medium">
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-4 h-4 transition-transform ${showHints ? 'rotate-180' : ''}`}
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {showHints && (
            <div className="mt-3 bg-amber-50 rounded-lg p-4">
              <ul className="space-y-2">
                {question.hints.map((hint, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuestionCard
