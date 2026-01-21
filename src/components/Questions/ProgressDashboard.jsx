function ProgressDashboard({ progress, totalQuestions, questionIds, onReset }) {
  const filteredProgress = questionIds
    ? Object.fromEntries(
        Object.entries(progress).filter(([id]) => questionIds.includes(id))
      )
    : progress

  const counts = {
    needs_practice: 0,
    comfortable: 0,
    mastered: 0
  }

  Object.values(filteredProgress).forEach(p => {
    if (counts.hasOwnProperty(p.status)) {
      counts[p.status]++
    }
  })

  const practiced = Object.keys(filteredProgress).length
  const progressPercent = totalQuestions > 0 ? Math.min((practiced / totalQuestions) * 100, 100) : 0

  return (
    <div className="bg-amber-50 rounded-lg border border-amber-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-amber-900">Your Progress</h3>
        <button
          onClick={onReset}
          className="text-sm text-amber-600 hover:text-red-600 transition-colors"
        >
          Reset Progress
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-amber-700 mb-1">
          <span>Questions Practiced</span>
          <span>{practiced} / {totalQuestions}</span>
        </div>
        <div className="w-full bg-amber-200 rounded-full h-2.5">
          <div
            className="bg-amber-700 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-600">{counts.needs_practice}</div>
          <div className="text-xs text-red-700">Needs Practice</div>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">{counts.comfortable}</div>
          <div className="text-xs text-yellow-700">Comfortable</div>
        </div>
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{counts.mastered}</div>
          <div className="text-xs text-green-700">Mastered</div>
        </div>
      </div>
    </div>
  )
}

export default ProgressDashboard
