function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">About</h1>
      <p className="text-gray-600 mb-8">Learn more about this project</p>

      <section className="mb-12">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why I Built This</h2>
          <p className="text-gray-700 mb-4">
            I'm <span className="font-semibold">Tanya Gupta</span>, a Product Portfolio Manager in a B2B manufacturing
            environment, responsible for New Product Development, P&L ownership across multiple product
            lines, Go-To-Market strategy, sales enablement, and leading product migration initiatives.
            Like many PMs, I'm actively learning how AI changes product thinking, trade-offs, and
            expectations in interviews. Most existing PM prep content is software- or growth-centric;
            this is my attempt to bridge that gap while building real understanding, not just memorized answers.
          </p>
          <p className="text-gray-700 mb-4">
            The questions and resources here reflect the areas I'm personally studying and practicing:
            Product Sense for AI systems, technical fundamentals, behavioral scenarios, analytics, and
            the ethics and UX challenges that are specific to AI-driven products.
          </p>
          <p className="text-gray-700">
            I use this site as part of my own interview prep and skill-building. It will continue to
            evolve as I learn more, hopefully it's useful to others on a similar path. More content
            and features coming soon!
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-700 mb-4">
            Have suggestions, feedback, or want to share your own AI PM interview experiences?
            I'd love to hear from you!
          </p>
          <a
            href="mailto:hello.tanyaa.pm@gmail.com"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            hello.tanyaa.pm@gmail.com
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acknowledgments</h2>
          <p className="text-gray-700 mb-4">
            This project was inspired by and references content from BonnieYu's Substack article
            on building an AI PM interview site:
          </p>
          <a
            href="https://bonnieyu.substack.com/p/building-an-ai-pm-interview-site?fbclid=IwY2xjawPdJBVleHRuA2FlbQIxMABicmlkETFTSndaRWlFOTZ2ZjVkdUVuc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnL0UXaAzQldn4ET5vXVGDMrKN9ze2K8jSC28JoV0JPOCKAK-an6qDPIZkTu_aem_6u-I2BtL-5EWvAIkpSs2hQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
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
