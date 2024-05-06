import { ref } from 'vue'

type ConfigType = {
  deviceId: String
  page: String
}

// 响应数据
const initConfig = ref<ConfigType>({
  deviceId: 'xxx',
  page: 'camera',
})

const localConfig = localStorage.getItem('config')

const getConfig = () => {
  return localConfig ? localConfig : initConfig
}

const updateConfig = (config: ConfigType) => {
  localStorage.setItem('config', JSON.stringify(config))
}

export default () => {
  return {
    initConfig,
    updateConfig,
    getConfig,
  }
}
