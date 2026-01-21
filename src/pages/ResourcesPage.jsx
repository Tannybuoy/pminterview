import { useState } from 'react'
import CompanyCard from '../components/Resources/CompanyCard'
import ResourceCard from '../components/Resources/ResourceCard'
import companies from '../data/companies.json'
import resources from '../data/resources.json'

function ResourcesPage() {
  const [selectedTopic, setSelectedTopic] = useState(resources.topics[0]?.id || '')

  const currentTopic = resources.topics.find(t => t.id === selectedTopic)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Resources</h1>
      <p className="text-gray-600 mb-8">Curated resources to help you prepare for AI PM interviews</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Top AI Companies Hiring</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Learning Resources</h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {resources.topics.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTopic === topic.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>

        {currentTopic && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">{currentTopic.name}</h3>
            <div className="space-y-3">
              {currentTopic.resources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default ResourcesPage
