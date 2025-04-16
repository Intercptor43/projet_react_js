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
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Liste des Talks</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${darkMode
              ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500'
              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            }`}
        >
          <option value="date">Trier par date</option>
          <option value="duration">Trier par durée</option>
          <option value="title">Trier par titre</option>
        </select>
      </div>

      <div className="space-y-6">
        {sortedTalks.map((talk) => (
          <div
            key={talk.id}
            className={`p-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] ${darkMode
                ? `${isPastTalk(talk) ? 'bg-gray-700 opacity-50' : 'bg-gray-800'} text-gray-100`
                : `${isPastTalk(talk) ? 'bg-white opacity-50' : 'bg-gray-50'} text-gray-900`
              }`}
          >
            {editingTalk?.id === talk.id ? (
              <form onSubmit={handleSaveEdit} className="space-y-6">
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Titre
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingTalk.title}
                    onChange={handleEditChange}
                    className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${darkMode
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
                    className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${darkMode
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
                    className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${darkMode
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
                    className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${darkMode
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
                    className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${darkMode
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
                    className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 text-white ${darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                        : 'bg-gray-500 hover:bg-gray-600 border border-gray-400'
                      }`}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${darkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700'
                        : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      }`}
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {talk.title}
                    </h3>
                    <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Par {talk.presenter} - {new Date(talk.scheduledDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(talk)}
                      className={`p-2.5 rounded-full transition-colors duration-200 ${darkMode
                          ? 'hover:bg-gray-600 text-gray-300 focus:ring-2 focus:ring-gray-500'
                          : 'hover:bg-gray-200 text-gray-600 focus:ring-2 focus:ring-gray-500'
                        }`}
                    >
                      <PencilLine className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => removeTalk(talk.id)}
                      className={`p-2.5 rounded-full transition-colors duration-200 ${darkMode
                          ? 'hover:bg-gray-600 text-gray-300 focus:ring-2 focus:ring-gray-500'
                          : 'hover:bg-gray-200 text-gray-600 focus:ring-2 focus:ring-gray-500'
                        }`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="font-medium">Sujet:</span> {talk.subject}
                  </p>
                  <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="font-medium">Durée:</span> {talk.duration} minutes
                  </p>
                  <p className={`text-base md:col-span-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="font-medium">Objectif:</span> {talk.objective}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TalkList 