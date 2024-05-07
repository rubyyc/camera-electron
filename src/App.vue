<script setup lang="ts">
import Camera from '@components/Camera.vue'
import Setting from '@components/Setting.vue'
import { Setting as SettingIcon, CameraFive} from '@icon-park/vue-next'
// import useConfig from '@components/composables/useConfig';
import { useConfigStore } from './stores/useConfigStore';

// const { config,updateConfig } = useConfig()
const { config,updateConfig} = useConfigStore()
const updatePage = ()=>{
  const page = config.page

  config.page = page == 'setting' ? 'camera' : 'setting'

  updateConfig()
}

</script>

<template>

  <Suspense>
    <main class="relative" >
        <SettingIcon @click="updatePage" v-if="config.page == 'camera'" class="no-drag z-10 absolute left-1/2 -translate-x-1/2 mt-3 cursor-pointer" theme="outline" size="24" fill="#7ed321" />

        <CameraFive @click="updatePage" v-if="config.page == 'setting'" class="no-drag z-10 absolute left-1/2 -translate-x-1/2 mt-3 cursor-pointer" theme="outline" size="24" fill="#7ed321" />

      <section>
        <Camera v-if="config.page == 'camera'" />
        <Setting v-else />
      </section>
    </main>
  </Suspense>
</template>

<style scoped>
</style>
