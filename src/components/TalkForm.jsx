import { useState } from 'react'
import useStore from '../store/useStore'
import './TalkForm.css'

const inputClassName = (darkMode) => `
  w-full px-4 py-3 border rounded-xl transition-all duration-200
  ${darkMode 
    ? 'bg-gray-800/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20' 
    : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
  }
  backdrop-blur-sm
  hover:border-opacity-80
  focus:outline-none
`

const labelClassName = (darkMode) => `
  block text-sm font-medium mb-1.5
  ${darkMode ? 'text-gray-300' : 'text-gray-600'}
`

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
    submitForm()
  }

  const submitForm = () => {
    if (!formData.title || !formData.subject || !formData.duration || !formData.presenter || !formData.objective) {
      return
    }
    
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submitForm()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className={`text-2xl font-bold tracking-tight ${
        darkMode 
          ? 'text-white' 
          : 'text-gray-900'
      }`}>
        Ajouter un Talk
      </h2>
      
      <div className="space-y-5">
        <div>
          <label className={labelClassName(darkMode)}>
            Date du Talk
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={inputClassName(darkMode)}
            required
          />
        </div>

        <div>
          <label className={labelClassName(darkMode)}>
            Titre
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={inputClassName(darkMode)}
            placeholder="Titre du talk"
            required
          />
        </div>

        <div>
          <label className={labelClassName(darkMode)}>
            Sujet
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={inputClassName(darkMode)}
            placeholder="Sujet du talk"
            required
          />
        </div>

        <div>
          <label className={labelClassName(darkMode)}>
            Durée (minutes)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={inputClassName(darkMode)}
            placeholder="Durée en minutes"
            required
          />
        </div>

        <div>
          <label className={labelClassName(darkMode)}>
            Présentateur
          </label>
          <input
            type="text"
            name="presenter"
            value={formData.presenter}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={inputClassName(darkMode)}
            placeholder="Nom du présentateur"
            required
          />
        </div>

        <div>
          <label className={labelClassName(darkMode)}>
            Objectif
          </label>
          <textarea
            name="objective"
            value={formData.objective}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={inputClassName(darkMode)}
            placeholder="Objectif du talk"
            rows="3"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 
          ${darkMode 
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30' 
            : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30'
          }
          transform hover:scale-[1.02] active:scale-[0.98]
        `}
      >
        Ajouter le Talk
      </button>
    </form>
  )
}

export default TalkForm 