<template>
  <Board />
  <Dialog :show="showModal" @close="showModal = false">
    <p>Custom text goes here</p>
  </Dialog>
  <button class="button" type="button" @click="showModal = !showModal">
    Open Modal
  </button>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Board from '/@/components/Board.vue'
  import Dialog from '/@/components/Dialog.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Board,
      Dialog,
    },
    setup() {
      const showModal = ref(false)

      return {
        showModal,
      }
    },
  })
</script>
