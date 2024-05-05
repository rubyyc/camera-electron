<template>
    <div class="main">
      {{devices}}
    </div>
</template>

<script setup lang="ts">
const devices = await navigator.mediaDevices.enumerateDevices()
console.log(devices);
</script>

<style lang="scss" scoped>
.main{
  background-color: red;
}
</style>

