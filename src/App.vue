<template>
  <Board />
  <Dialog>
    <p>Dialog component</p>
  </Dialog>
  <Sidebar>
    <p>Sidebar component</p>
  </Sidebar>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Board from '/@/components/Board.vue'
  import Dialog from '/@/components/Dialog.vue'
  import Sidebar from '/@/components/Sidebar.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Board,
      Dialog,
      Sidebar,
    },
    setup() {
      return {}
    },
  })
</script>
