function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center text-gray-600 text-sm">
          <p className="mb-1">Built and maintained by Tanya Gupta</p>
          <p className="mb-3">&copy; 2026 AI PM Interview Prep. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://tanyagupta10.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Substack
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="mailto:hello.tanyaa.pm@gmail.com"
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              hello.tanyaa.pm@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
