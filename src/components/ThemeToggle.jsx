import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import useStore from '../store/useStore'

const ThemeToggle = () => {
  const darkMode = useStore((state) => state.darkMode)
  const toggleDarkMode = useStore((state) => state.toggleDarkMode)

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-600" />
      )}
    </button>
  )
}

export default ThemeToggle 