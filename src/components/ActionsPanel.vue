<template>
  <div class="top-bar">
    <div class="title">
      <h1>{{ data.applicationName }}</h1>
    </div>
    <div class="actions">
      <IconButton icon="github" small :onclick="redirect">Github</IconButton>
      <IconButton icon="controls" small :onclick="toggle">Controls</IconButton>
      <button class="button" @click="restart">New game</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'

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

      const data = reactive({
        applicationName: import.meta.env.VITE_APP_NAME,
        get applicationLink() {
          return `https://github.com/vscav/${this.applicationName}`
        },
      })

      const redirect = () => {
        // window.location.href = data.applicationLink
        window.open(data.applicationLink, '_blank')
      }

      const restart = () => {
        props.onrestart && props.onrestart()
      }

      return {
        data,
        redirect,
        restart,
        toggle,
      }
    },
  })
</script>
