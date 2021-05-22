<template>
  <button class="button" @click="restart">New game</button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ActionsPanel',
    components: {},
    props: {
      onrestart: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const restart = () => {
        props.onrestart && props.onrestart()
      }

      return {
        restart,
      }
    },
  })
</script>
