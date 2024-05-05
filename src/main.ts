import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@assets/css/tailwind.css'
import '@assets/css/style.scss'
import '@assets/css/global.scss'
import App from './App.vue'

createApp(App)
  .use(ElementPlus)
  .mount('#app')
  .$nextTick(() => {
    // Use contextBridge
    window.ipcRenderer.on('main-process-message', (_event, message) => {
      console.log(message)
    })
  })
