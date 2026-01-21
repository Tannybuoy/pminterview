function QuestionCard({ question, currentStatus }) {
  const statusColors = {
    needs_practice: 'border-l-red-500',
    comfortable: 'border-l-yellow-500',
    mastered: 'border-l-green-500'
  }

  const borderClass = currentStatus ? statusColors[currentStatus] : 'border-l-amber-300'

  return (
    <div className={`bg-amber-50 rounded-lg border border-amber-200 border-l-4 ${borderClass} p-6`}>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-block px-3 py-1 bg-amber-200 text-amber-900 text-sm font-medium rounded-full">
          {question.category}
        </span>
        {question.company && (
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
            {question.company}
          </span>
        )}
      </div>
      <p className="text-xl text-amber-900 leading-relaxed">
        {question.question}
      </p>
    </div>
  )
}

export default QuestionCard
