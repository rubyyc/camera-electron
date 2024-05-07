<template>
  <main class="bg-[#2c3e50] w-screen h-screen p-5">
    <h2 class="text-gray-50 text-center text-sm mt-6 mb-5 opacity-70">参数设置</h2>
    {{ config }}
    <el-form label-position="top" ref="form" :inline="false" size="large" >
      <el-form-item>
        <el-select  v-model="config.deviceId" placeholder="请选择摄像头"  clearable filterable>
          <el-option v-for="item in cameras"
            :key="item.deviceId"
            :label="item.label"
            :value="item.deviceId">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item class="mt-10 bg-red-500 flex">
        <el-button class="flex-1" type="success" size="large" @click="updateConfig">保存</el-button>
      </el-form-item>
    </el-form>

  </main>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/useConfigStore';
// import useConfig from '@components/composables/useConfig';

// const {config,updateConfig} = useConfig()

const {config,updateConfig} = useConfigStore()

const devices = await navigator.mediaDevices.enumerateDevices()
console.log(devices);

const cameras = devices.filter(d => d.kind.includes('video'))

</script>

<style lang="scss" scoped>
main{
  color: white;
}
</style>
