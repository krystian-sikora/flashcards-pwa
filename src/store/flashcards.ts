import { defineStore } from 'pinia'

export const useSetsStore = defineStore('sets', {
  state: () => ({ 
    sets: [],
    lastSession: null,
    statistics: []
  }),
  getters: {
    getSet: (state) => (id) => state.sets.find((set) => set['id'] === id),
  },
  actions: {
    addSnapshot(snapshot) {
        this.sets = snapshot
    },
    updateLastSession(snapshot) {
        this.lastSession = snapshot
    },
    loadStatistics(snapshot) {
        this.statistics = snapshot
    }
  },
})
