import { useState } from 'react'
import useStore from '../store/useStore'
import './TalkForm.css'

const TalkForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    duration: '',
    presenter: '',
    objective: '',
    date: new Date().toISOString().split('T')[0],
  })

  const darkMode = useStore((state) => state.darkMode)
  const addTalk = useStore((state) => state.addTalk)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTalk = {
      id: Date.now(),
      ...formData,
      duration: parseInt(formData.duration),
      createdAt: new Date().toISOString(),
      scheduledDate: formData.date,
    }
    addTalk(newTalk)
    setFormData({
      title: '',
      subject: '',
      duration: '',
      presenter: '',
      objective: '',
      date: new Date().toISOString().split('T')[0],
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ajouter un Talk</h2>
      
      <div className="space-y-2">
        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Date du Talk
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          }`}
          required
        />
      </div>

      <div className="space-y-2">
        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Titre
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder="Titre du talk"
          required
        />
      </div>

      <div className="space-y-2">
        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Sujet
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder="Sujet du talk"
          required
        />
      </div>

      <div className="space-y-2">
        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Durée (minutes)
        </label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder="Durée en minutes"
          required
        />
      </div>

      <div className="space-y-2">
        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Présentateur
        </label>
        <input
          type="text"
          name="presenter"
          value={formData.presenter}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder="Nom du présentateur"
          required
        />
      </div>

      <div className="space-y-2">
        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Objectif
        </label>
        <textarea
          name="objective"
          value={formData.objective}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder="Objectif du talk"
          rows="3"
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
          darkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800' 
            : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        }`}
      >
        Ajouter le Talk
      </button>
    </form>
  )
}

export default TalkForm 