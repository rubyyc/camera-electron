<script setup lang="ts">
import Camera from '@components/Camera.vue'
import Setting from '@components/Setting.vue'
import { Setting as SettingIcon, CameraFive,InnerShadowTopLeft} from '@icon-park/vue-next'
// import useConfig from '@components/composables/useConfig';
import { useConfigStore } from './stores/useConfigStore';
// import { ipcRenderer } from 'electron';

// const { config,updateConfig } = useConfig()
const { config } = useConfigStore()


let animationId
let mouseX
let mouseY

const moveWindow = ()=> {
  // console.log('send前');
  window.ipcRenderer.send('windowMoving',{ mouseX, mouseY });
  animationId = requestAnimationFrame(moveWindow);
}

const onMouseDown = (e: MouseEvent) => {
  console.log(e.button);
  // 监控鼠标左键按下
  if (e.button == 0) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    document.addEventListener('mouseup', onMouseUp)
    requestAnimationFrame(moveWindow);
  }
  // 监控鼠标右键按下,显示退出
  if (e.button == 2) {
    window.ipcRenderer.send('quit')
  }
}

function onMouseUp() {
  window.ipcRenderer.send('windowMoved');
  document.removeEventListener('mouseup', onMouseUp)
  cancelAnimationFrame(animationId)
}


</script>

<template>

  <Suspense>
    <main class="relative group" id="draggable" @mousedown="onMouseDown" >
        <SettingIcon @click="config.page ='setting'" v-if="config.page == 'camera'" class="invisible group-hover:visible z-10 absolute left-1/2 -translate-x-1/2 mt-3 cursor-pointer" theme="outline" size="24" fill="#7ed321" />

        <CameraFive @click="config.page ='camera'" v-if="config.page == 'setting'" class="z-10 absolute left-1/2 -translate-x-1/2 mt-3 cursor-pointer" theme="outline" size="24" fill="#7ed321" />

        <InnerShadowTopLeft  v-if="config.page == 'camera'" class="hidden group-hover:block z-10 absolute left-1/2 -translate-x-1/2 mt-3 bottom-3 cursor-pointer" theme="outline" size="24" fill="#7ed321" @click="config.rounded = !config.rounded" />

      <section>
        <Camera v-if="config.page == 'camera'" />
        <Setting v-else />
      </section>
    </main>
  </Suspense>
</template>

<style scoped>
</style>
