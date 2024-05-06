<template>
  <main class="bg-[#2c3e50] w-screen h-screen p-5">
    <h2 class="text-gray-50 text-center text-sm mb-5 opacity-70">参数设置1</h2>
    <el-form class="no-drag-area"  label-position="top" ref="form" label-width="80px" :inline="false" size="large">
      <el-form-item>
        <el-select  v-model="deviceId" placeholder="请选择摄像头" @change="$forceUpdate()" clearable filterable>
          <el-option v-for="item in cameras"
            :key="item.deviceId"
            :label="item.label"
            :value="item.deviceId">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item class="mt-20">
        <el-button class="no-drag-area" type="success" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>

  </main>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const devices = await navigator.mediaDevices.enumerateDevices()
console.log(devices);

const cameras = devices.filter(d => d.kind.includes('video'))

const deviceId = ref('')
const form = ref('')

const onSubmit = () => {
  console.log('click');
}
</script>

<style lang="scss" scoped>
</style>
