import { create } from 'zustand'

interface AppState {
  lastPlayedGameId: string | null
  setLastPlayedGameId: (id: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  lastPlayedGameId: null,
  setLastPlayedGameId: (id) => set({ lastPlayedGameId: id }),
}))
