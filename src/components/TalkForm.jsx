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
  })

  const addTalk = useStore((state) => state.addTalk)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTalk = {
      id: Date.now(),
      ...formData,
      duration: parseInt(formData.duration),
      createdAt: new Date().toISOString(),
    }
    addTalk(newTalk)
    setFormData({
      title: '',
      subject: '',
      duration: '',
      presenter: '',
      objective: '',
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
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Ajouter un Talk</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Titre
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Sujet
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Durée (minutes)
        </label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          min="1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Présentateur/trice
        </label>
        <input
          type="text"
          name="presenter"
          value={formData.presenter}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Objectif
        </label>
        <textarea
          name="objective"
          value={formData.objective}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Ajouter le Talk
      </button>
    </form>
  )
}

export default TalkForm 