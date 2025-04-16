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
      document.body.classList.add('dark:bg-gray-900', 'dark:text-gray-100')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark:bg-gray-900', 'dark:text-gray-100')
    }
  }, [darkMode])

  return (
    <div className={`fixed inset-0 flex flex-col ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Gestionnaire de Talks
          </h1>
          <ThemeToggle />
        </div>

        <div className="flex-1 flex">
          <div className={`w-1/2 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <div className="p-6">
              <TalkForm />
            </div>
          </div>
          <div className={`w-1/2 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <div className="p-6">
              <TalkList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
