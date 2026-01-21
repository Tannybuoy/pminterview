function CategoryFilter({ categories, selected, onChange, questionCounts }) {
  const totalCount = Object.values(questionCounts).reduce((a, b) => a + b, 0)

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="category-filter" className="text-sm font-medium text-amber-800">
        Category:
      </label>
      <select
        id="category-filter"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 bg-amber-50 border border-amber-300 rounded-lg text-sm text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
      >
        <option value="all">All Categories ({totalCount})</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category} ({questionCounts[category] || 0})
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter
