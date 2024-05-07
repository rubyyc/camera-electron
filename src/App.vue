<script setup lang="ts">
import Camera from '@components/Camera.vue'
import Setting from '@components/Setting.vue'
import { Setting as SettingIcon, CameraFive,InnerShadowTopLeft} from '@icon-park/vue-next'
// import useConfig from '@components/composables/useConfig';
import { useConfigStore } from './stores/useConfigStore';

// const { config,updateConfig } = useConfig()
const { config} = useConfigStore()

</script>

<template>

  <Suspense>
    <main class="relative" >
        <SettingIcon @click="config.page ='setting'" v-if="config.page == 'camera'" class="no-drag z-10 absolute left-1/2 -translate-x-1/2 mt-3 cursor-pointer" theme="outline" size="24" fill="#7ed321" />

        <CameraFive @click="config.page ='camera'" v-if="config.page == 'setting'" class="no-drag z-10 absolute left-1/2 -translate-x-1/2 mt-3 cursor-pointer" theme="outline" size="24" fill="#7ed321" />

        <InnerShadowTopLeft  v-if="config.page == 'camera'" class="no-drag z-10 absolute left-1/2 -translate-x-1/2 mt-3 bottom-3 cursor-pointer" theme="outline" size="24" fill="#7ed321" @click="config.rounded = !config.rounded" />

      <section>
        <Camera v-if="config.page == 'camera'" />
        <Setting v-else />
      </section>
    </main>
  </Suspense>
</template>

<style scoped>
</style>
