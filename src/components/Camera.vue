<template>
  <div class="w-screen h-screen flex">
    <video class="object-cover"></video>
    <div id="errorMsg"></div>
  </div>
</template>

<script setup lang="ts">
// const devices = await navigator.mediaDevices.enumerateDevices()
// console.log(devices);
import { useConfigStore } from '@/stores/useConfigStore';
import { onMounted } from 'vue'
// import useConfig from '@components/composables/useConfig';

// const { config } = useConfig()
const { config } = useConfigStore()

onMounted(() => {
  // Put variables in global scope to make them available to the browser console.
var video = document.querySelector("video");

var constraints = (window.constraints = {
  audio: false,
  video: {deviceId: config.deviceId},
} as MediaStreamConstraints);
var errorElement = document.querySelector("#errorMsg");

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(function (stream) {
    var videoTracks = stream.getVideoTracks();
    console.log("Got stream with constraints:", constraints);
    console.log("Using video device1: " + videoTracks[0].label);
    stream.onended = function () {
      console.log("Stream ended");
    };
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
    video.play()
  })
  .catch(function (error) {
    if (error.name === "ConstraintNotSatisfiedError") {
      errorMsg(
        "The resolution " +
          constraints.video.width.exact +
          "x" +
          constraints.video.width.exact +
          " px is not supported by your device.",
      );
    } else if (error.name === "PermissionDeniedError") {
      errorMsg(
        "Permissions have not been granted to use your camera and " +
          "microphone, you need to allow the page access to your devices in " +
          "order for the demo to work.",
      );
    }
    errorMsg("getUserMedia error: " + error.name, error);
  });

function errorMsg(msg, error) {
  errorElement.innerHTML += "<p>" + msg + "</p>";
  if (typeof error !== "undefined") {
    console.error(error);
  }
}

})


</script>

<style lang="scss" scoped>

</style>

