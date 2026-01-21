function QuestionCard({ question, currentStatus }) {
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
    </div>
  )
}

export default QuestionCard
