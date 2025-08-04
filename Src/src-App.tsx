import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProgressProvider } from './contexts/UserProgressContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import Analytics from './pages/Analytics'
import Community from './pages/Community'
import StudyTools from './pages/StudyTools'
import QuizResults from './pages/QuizResults'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProgressProvider>
        <Router>
          <div className="min-h-screen bg-background text-text">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/quiz/results" element={<QuizResults />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/community" element={<Community />} />
                <Route path="/study-tools" element={<StudyTools />} />
              </Routes>
            </main>
          </div>
        </Router>
      </UserProgressProvider>
    </ThemeProvider>
  )
}

export default App