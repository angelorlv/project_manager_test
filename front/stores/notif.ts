// stores/notif.js
import { defineStore } from 'pinia'

export const useNotifStore = defineStore('notif', {
  state: () => {
    return {
        content:{},
        show:false
    }
  }
})