import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import QuestionsPage from './pages/QuestionsPage'
import ResourcesPage from './pages/ResourcesPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<QuestionsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
