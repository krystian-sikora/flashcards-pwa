import { defineStore } from 'pinia'

export const useSetsStore = defineStore('sets', {
  state: () => ({ sets: [] }),
  getters: {
  },
  actions: {
    addSnapshot(snapshot) {
        this.sets = snapshot
    }
  },
})
