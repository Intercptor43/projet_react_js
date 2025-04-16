import { useEffect } from 'react'
import useStore from './store/useStore'
import TalkForm from './components/TalkForm'
import TalkList from './components/TalkList'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const darkMode = useStore((state) => state.darkMode)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Gestionnaire de Talks
          </h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TalkForm />
          <TalkList />
        </div>
      </div>
    </div>
  )
}

export default App
