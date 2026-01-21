function CompanyCard({ company }) {
  return (
    <div className="bg-amber-50 rounded-lg border border-amber-200 p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-amber-900 mb-1">{company.name}</h3>
      <p className="text-sm text-amber-700 mb-3">{company.description}</p>
      <a
        href={company.careersUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-900"
      >
        View Careers
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  )
}

export default CompanyCard
