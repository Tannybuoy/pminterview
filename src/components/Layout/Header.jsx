import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-amber-50 border-b border-amber-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-amber-900 tracking-wide">
            AI PM Interview Preparation with Tanya
          </Link>

          <nav className="flex gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'bg-amber-200 text-amber-900'
                  : 'text-amber-700 hover:bg-amber-100'
              }`}
            >
              Questions
            </Link>
            <Link
              to="/resources"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/resources')
                  ? 'bg-amber-200 text-amber-900'
                  : 'text-amber-700 hover:bg-amber-100'
              }`}
            >
              Resources
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'bg-amber-200 text-amber-900'
                  : 'text-amber-700 hover:bg-amber-100'
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
