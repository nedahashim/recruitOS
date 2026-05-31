import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null,
    isLoading: false,
  }),
  actions: {
    setUser(user) {
      this.user = user
    },
    setLoading(val) {
      this.isLoading = val
    },
  }
})