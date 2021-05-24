<template>
  <div class="title-container">2048</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Title',
    setup() {
      return {}
    },
  })
</script>

<style lang="scss">
  .title-container {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    background-color: red;
    font-size: 30rem;
  }
</style>
