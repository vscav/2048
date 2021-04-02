<template>
  <div>Controls panel</div>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'ControlsPanel',
    components: {},
    props: {
      board: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const { board } = toRefs(props)
      console.log(board)
      return {}
    },
  })
</script>
