// stores/global.js
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return { user: {},connected: false }
  },
})