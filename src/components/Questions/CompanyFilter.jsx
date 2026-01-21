function CompanyFilter({ companies, selected, onChange, questionCounts }) {
  const totalWithCompany = Object.values(questionCounts).reduce((a, b) => a + b, 0)

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="company-filter" className="text-sm font-medium text-gray-700">
        Company:
      </label>
      <select
        id="company-filter"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">All Companies</option>
        {companies.map(company => (
          <option key={company} value={company}>
            {company} ({questionCounts[company] || 0})
          </option>
        ))}
      </select>
    </div>
  )
}

export default CompanyFilter
