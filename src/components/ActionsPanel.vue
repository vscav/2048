<template>
  <div class="top-bar">
    <div class="title">
      <h1>{{ applicationName }}</h1>
    </div>
    <div class="actions">
      <button class="button">Github</button>
      <button class="button" @click="toggle">Controls</button>
      <button class="button" @click="restart">New game</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { useToggleControls } from '/@/composables/useToggleControls'

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
      const { toggle } = useToggleControls()

      const restart = () => {
        props.onrestart && props.onrestart()
      }

      const applicationName = '2048'

      // const applicationName = computed(() => {
      //   return import.meta.env.VITE_APP_NAME
      // })

      return {
        applicationName,
        restart,
        toggle,
      }
    },
  })
</script>
