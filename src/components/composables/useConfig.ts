import { ref } from 'vue'

type ConfigType = {
  deviceId: string
  page: string
}

// 响应数据
const initConfig = {
  deviceId: 'select your camera',
  page: 'camera',
}

export default () => {
  const cache = localStorage.getItem('config')

  const data = cache ? (JSON.parse(cache) as ConfigType) : initConfig

  const config = ref(data)

  const updateConfig = () => {
    localStorage.setItem('config', JSON.stringify(config.value))
  }
  return {
    config,
    updateConfig,
  }
}
