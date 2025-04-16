import { useState } from 'react'
import useStore from '../store/useStore'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

const TalkList = () => {
  const [sortBy, setSortBy] = useState('date')
  const [editingTalk, setEditingTalk] = useState(null)
  const talks = useStore((state) => state.talks)
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
    const talkDate = new Date(talk.createdAt)
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
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Liste des Talks</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="date">Trier par date</option>
          <option value="duration">Trier par durée</option>
          <option value="title">Trier par titre</option>
        </select>
      </div>

      <div className="grid gap-4">
        {sortedTalks.map((talk) => (
          <div
            key={talk.id}
            className={`p-4 rounded-lg shadow-md ${
              isPastTalk(talk)
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            {editingTalk?.id === talk.id ? (
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Titre
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingTalk.title}
                    onChange={handleEditChange}
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
                    value={editingTalk.subject}
                    onChange={handleEditChange}
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
                    value={editingTalk.duration}
                    onChange={handleEditChange}
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
                    value={editingTalk.presenter}
                    onChange={handleEditChange}
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
                    value={editingTalk.objective}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows="3"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingTalk(null)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{talk.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{talk.subject}</p>
                    <p className="text-gray-600 dark:text-gray-300">Présenté par: {talk.presenter}</p>
                    <p className="text-gray-600 dark:text-gray-300">Durée: {talk.duration} minutes</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      <span className="font-semibold">Objectif:</span> {talk.objective}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(talk)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full dark:hover:bg-blue-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => removeTalk(talk.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full dark:hover:bg-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {isPastTalk(talk) && (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                    Ce talk est passé
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TalkList 