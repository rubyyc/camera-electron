import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('counter', () => {
  const config = ref({
    page: 'camera',
    deviceId: '',
  })

  const updateConfig = () => {}
  return { config, updateConfig }
})
