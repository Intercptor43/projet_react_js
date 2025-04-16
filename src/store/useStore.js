import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set) => ({
            talks: [],
            darkMode: false,
            addTalk: (talk) => set((state) => ({ talks: [...state.talks, talk] })),
            removeTalk: (id) => set((state) => ({ talks: state.talks.filter(talk => talk.id !== id) })),
            updateTalk: (updatedTalk) => set((state) => ({
                talks: state.talks.map(talk => talk.id === updatedTalk.id ? updatedTalk : talk)
            })),
            toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
        }), {
            name: 'talks-storage',
        }
    )
)

export default useStore