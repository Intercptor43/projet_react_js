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
    <div className={`fixed inset-0 flex flex-col ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-gray-50'
    }`}>
      <div className="flex-1 flex flex-col">
        <div className={`flex justify-between items-center px-8 py-6 ${
          darkMode 
            ? 'bg-gray-900/30 border-b border-gray-700/50 backdrop-blur-xl' 
            : 'bg-white/30 border-b border-gray-200/50 backdrop-blur-xl'
        }`}>
          <h1 className={`text-3xl font-bold tracking-tight bg-clip-text text-transparent ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
              : 'bg-gradient-to-r from-blue-600 to-blue-800'
          }`}>
            Gestionnaire de Talks
          </h1>
          <ThemeToggle />
        </div>

        <div className="flex-1 flex gap-8 p-8 max-w-8xl mx-auto w-full">
          <div className={`w-1/2 rounded-2xl transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl shadow-gray-900/20' 
              : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-2xl shadow-gray-200/20'
          }`}>
            <div className="p-8">
              <TalkForm />
            </div>
          </div>
          <div className={`w-1/2 rounded-2xl transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl shadow-gray-900/20' 
              : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-2xl shadow-gray-200/20'
          }`}>
            <div className="p-8">
              <TalkList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
