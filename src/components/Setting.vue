<template>
  <main class="bg-[#2c3e50] w-screen h-screen p-5 flex flex-col gap-4 py-10" :style="`border: solid ${config.borderWidth}px ${config.borderColor}`">
    <h2 class="text-gray-50 text-center text-sm opacity-70">参数设置</h2>

        <el-select v-model="config.deviceId" placeholder="请选择摄像头"  clearable filterable>
          <el-option v-for="item in cameras"
            :key="item.deviceId"
            :label="item.label"
            :value="item.deviceId">
          </el-option>
        </el-select>

        <el-input-number :max="15" :min="0" class="no-drag w-full" size="large" v-model="config.borderWidth" placeholder="请输入边框宽度"></el-input-number>
        <el-input v-model="config.borderColor" placeholder="请输入边框颜色" size="large" clearable></el-input>
        <a
         href="https://www.rubyc.cn"
         target="_blank"
         class="text-center opacity-70  text-teal-100 hover:text-yellow-400"
         >苑畅的博客</a>
  </main>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/useConfigStore';
// import useConfig from '@components/composables/useConfig';

// const {config,updateConfig} = useConfig()

const {config} = useConfigStore()

const devices = await navigator.mediaDevices.enumerateDevices()
// console.log(devices);

const cameras = devices.filter(d => d.kind.includes('video'))

</script>

<style lang="scss" scoped>
main{
  color: white;
}
</style>
