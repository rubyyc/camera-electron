<script setup lang="ts">
import Camera from '@components/Camera.vue'
import Setting from '@components/Setting.vue'
import { ref } from 'vue'
import { Setting as SettingIcon, CameraFive} from '@icon-park/vue-next'
const page = ref('setting')

</script>

<template>

  <Suspense>
    <main class="relative">
        <SettingIcon @click="page = 'setting'" v-if="page == 'camera'" class="no-drag z-10 absolute left-1/2 -translate-x-1/2 mt-3 cursor-pointer" theme="outline" size="24" fill="#7ed321" />

        <CameraFive @click="page = 'camera'" v-if="page == 'setting'" class="no-drag z-10 absolute left-1/2 -translate-x-1/2 mt-3 cursor-pointer" theme="outline" size="24" fill="#7ed321" />

      <section>
        <Camera v-if="page == 'camera'" />
        <Setting v-else />
      </section>
    </main>
  </Suspense>
</template>

<style scoped>
</style>
