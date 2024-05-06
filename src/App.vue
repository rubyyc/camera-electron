<script setup lang="ts">
import Camera from '@components/Camera.vue'
import Setting from '@components/Setting.vue'
import { ref } from 'vue'
import { Setting as SettingIcon} from '@icon-park/vue-next'
const page = ref('setting')

</script>

<template>

  <Suspense>
    <main class="relative bg-red-500">
      <section class="pointer-event">
        <SettingIcon class="no-drag absolute left-1/2 -translate-x-1/2 mt-3 cursor-pointer" theme="outline" size="24" fill="#7ed321" />
      </section>

      <section>
        <Camera v-if="page == 'camera'" />
        <Setting v-else />
      </section>
    </main>
  </Suspense>
</template>

<style scoped>
</style>
