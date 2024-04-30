import { defineStore } from 'pinia'

export const useSetsStore = defineStore('sets', {
  state: () => ({ sets: [] }),
  getters: {
    getSet: (state) => (id) => state.sets.find((set) => set['id'] === id),
  },
  actions: {
    addSnapshot(snapshot) {
        this.sets = snapshot
    }
  },
})
