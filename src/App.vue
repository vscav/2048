<template>
  <Board />
  <Dialog>
    <p>Custom text goes here</p>
  </Dialog>
  <button class="button" type="button" @click="toggle">Open Modal</button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { useToggleDialog } from '/@/composables/useToggleDialog'

  import Board from '/@/components/Board.vue'
  import Dialog from '/@/components/Dialog.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Board,
      Dialog,
    },
    setup() {
      const { toggle } = useToggleDialog()
      return {
        toggle,
      }
    },
  })
</script>
