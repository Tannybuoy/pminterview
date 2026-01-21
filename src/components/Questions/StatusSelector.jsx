function StatusSelector({ currentStatus, onChange }) {
  const statuses = [
    { id: 'needs_practice', label: 'Needs Practice', color: 'red' },
    { id: 'comfortable', label: 'Comfortable', color: 'yellow' },
    { id: 'mastered', label: 'Mastered', color: 'green' }
  ]

  const colorClasses = {
    red: {
      active: 'bg-red-600 text-white border-red-600',
      inactive: 'border-red-300 text-red-700 hover:bg-red-50'
    },
    yellow: {
      active: 'bg-yellow-500 text-white border-yellow-500',
      inactive: 'border-yellow-400 text-yellow-700 hover:bg-yellow-50'
    },
    green: {
      active: 'bg-green-600 text-white border-green-600',
      inactive: 'border-green-400 text-green-700 hover:bg-green-50'
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <span className="text-sm font-medium text-amber-800">Mark as:</span>
      <div className="flex flex-wrap gap-2">
        {statuses.map(status => {
          const isActive = currentStatus === status.id
          const classes = colorClasses[status.color]

          return (
            <button
              key={status.id}
              onClick={() => onChange(status.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${
                isActive ? classes.active : classes.inactive
              }`}
            >
              {status.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default StatusSelector
