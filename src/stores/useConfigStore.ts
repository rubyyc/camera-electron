import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore(
  'main',
  () => {
    const config = ref({
      page: 'camera',
      deviceId: '',
    })

    const updateConfig = () => {}
    return { config, updateConfig }
  },
  {
    persist: true,
  }
)
