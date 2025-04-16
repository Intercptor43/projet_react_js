import { useState } from 'react'
import useStore from '../store/useStore'
import './TalkList.css'
import { PencilLine, Trash2 } from 'lucide-react'

const TalkList = () => {
  const [sortBy, setSortBy] = useState('date')
  const [editingTalk, setEditingTalk] = useState(null)
  const talks = useStore((state) => state.talks)
  const darkMode = useStore((state) => state.darkMode)
  const removeTalk = useStore((state) => state.removeTalk)
  const updateTalk = useStore((state) => state.updateTalk)

  const sortedTalks = [...talks].sort((a, b) => {
    if (sortBy === 'duration') {
      return a.duration - b.duration
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  const isPastTalk = (talk) => {
    const talkDate = new Date(talk.scheduledDate)
    const now = new Date()
    return talkDate < now
  }

  const handleEdit = (talk) => {
    setEditingTalk(talk)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    updateTalk(editingTalk)
    setEditingTalk(null)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditingTalk(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Liste des Talks</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`px-3 py-2 border rounded-md transition-colors duration-200 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          }`}
        >
          <option value="date">Trier par date</option>
          <option value="duration">Trier par durée</option>
          <option value="title">Trier par titre</option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedTalks.map((talk) => (
          <div
            key={talk.id}
            className={`p-4 rounded-lg shadow-md transition-colors duration-200 ${
              darkMode 
                ? 'bg-gray-700 text-gray-100' 
                : 'bg-white text-gray-900'
            } ${isPastTalk(talk) ? 'opacity-50' : ''}`}
          >
            {editingTalk?.id === talk.id ? (
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Titre
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingTalk.title}
                    onChange={handleEditChange}
                    className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
                    }`}
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
                    value={editingTalk.subject}
                    onChange={handleEditChange}
                    className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
                    }`}
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
                    value={editingTalk.duration}
                    onChange={handleEditChange}
                    className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
                    }`}
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
                    value={editingTalk.presenter}
                    onChange={handleEditChange}
                    className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Objectif
                  </label>
                  <textarea
                    name="objective"
                    value={editingTalk.objective}
                    onChange={handleEditChange}
                    className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    rows="3"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingTalk(null)}
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-gray-600 hover:bg-gray-500 text-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-700' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                    }`}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    }`}
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {talk.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Par {talk.presenter} - {new Date(talk.scheduledDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(talk)}
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        darkMode 
                          ? 'hover:bg-gray-600 text-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-700' 
                          : 'hover:bg-gray-200 text-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                      }`}
                    >
                      <PencilLine className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => removeTalk(talk.id)}
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        darkMode 
                          ? 'hover:bg-gray-600 text-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-700' 
                          : 'hover:bg-gray-200 text-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                      }`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="font-medium">Sujet:</span> {talk.subject}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="font-medium">Durée:</span> {talk.duration} minutes
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="font-medium">Objectif:</span> {talk.objective}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="font-medium">Date:</span> {new Date(talk.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TalkList 