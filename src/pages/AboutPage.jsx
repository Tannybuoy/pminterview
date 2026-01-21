function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-900 mb-2">About</h1>
      <p className="text-amber-700 mb-8">Learn more about this project and its creator</p>

      <section className="mb-12">
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">About This Project</h2>
          <p className="text-amber-800 mb-4">
            AI PM Interview Preparation with Tanya is a free resource designed to help product managers prepare for
            interviews at top AI companies or for PM roles working on AI products. Whether you're
            transitioning into AI product management or looking to level up your skills, this site
            provides curated practice questions and resources to help you succeed.
          </p>
          <p className="text-amber-800 mb-4">
            The questions cover key areas including Product Sense, Technical understanding,
            Behavioral scenarios, Analytics, and Ethics & UX considerations specific to AI products.
          </p>
          <p className="text-amber-800">
            More content and features coming soon!
          </p>
        </div>

        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">About the Creator</h2>
          <p className="text-amber-800 mb-4">
            This site was built by <span className="font-semibold">Tanya Gupta</span>, a Portfolio Manager at Danfoss.
            With a passion for product management and AI, Tanya created this resource to help
            aspiring AI product managers prepare for their dream roles.
          </p>
        </div>

        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">Acknowledgments</h2>
          <p className="text-amber-800 mb-4">
            This project was inspired by and references content from BonnieYu's Substack article
            on building an AI PM interview site:
          </p>
          <a
            href="https://bonnieyu.substack.com/p/building-an-ai-pm-interview-site?fbclid=IwY2xjawPdJBVleHRuA2FlbQIxMABicmlkETFTSndaRWlFOTZ2ZjVkdUVuc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnL0UXaAzQldn4ET5vXVGDMrKN9ze2K8jSC28JoV0JPOCKAK-an6qDPIZkTu_aem_6u-I2BtL-5EWvAIkpSs2hQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium transition-colors"
          >
            Building an AI PM Interview Site - BonnieYu's Substack
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
