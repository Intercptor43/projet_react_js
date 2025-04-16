import { useEffect } from 'react'
import useStore from './store/useStore'
import TalkForm from './components/TalkForm'
import TalkList from './components/TalkList'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const darkMode = useStore((state) => state.darkMode)

  useEffect(() => {
    console.log('Dark mode state:', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark:bg-gray-900', 'dark:text-white')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark:bg-gray-900', 'dark:text-white')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Gestionnaire de Talks
          </h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <TalkForm />
          </div>
          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <TalkList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
