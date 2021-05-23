<template>
  <div class="top-bar">
    <div class="title">
      <h1>{{ applicationName }}</h1>
    </div>
    <div class="actions">
      <IconButton icon="github" small :onclick="() => console.log('coucou')"
        >Github</IconButton
      >
      <IconButton icon="controls" small :onclick="toggle">Controls</IconButton>
      <button class="button" @click="restart">New game</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import IconButton from '/@/components/IconButton.vue'

  import { useToggleControls } from '/@/composables/useToggleControls'

  export default defineComponent({
    name: 'ActionsPanel',
    components: {
      IconButton,
    },
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
