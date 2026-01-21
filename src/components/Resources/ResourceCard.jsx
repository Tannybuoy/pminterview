function ResourceCard({ resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-amber-50 rounded-lg border border-amber-200 p-4 hover:border-amber-400 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-amber-900 mb-1">{resource.title}</h4>
          <p className="text-sm text-amber-700">{resource.description}</p>
        </div>
        <svg className="w-5 h-5 text-amber-500 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  )
}

export default ResourceCard
