<template>
  <div class="top-bar">
    <div class="title">
      <h1>{{ data.applicationName }}</h1>
    </div>
    <div class="actions">
      <IconButton icon="github" small :onclick="redirect">Github</IconButton>
      <IconButton icon="controls" small :onclick="toggleControls"
        >Controls</IconButton
      >
      <IconButton icon="chart" small :onclick="toggleDialog"
        >Statistics</IconButton
      >
      <button class="button" @click="restart">New game</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'

  import IconButton from '/@/components/IconButton.vue'

  import { useToggleControls } from '/@/composables/useToggleControls'
  import { useToggleDialog } from '/@/composables/useToggleDialog'

  interface IActionsPanel {
    applicationName: string
    repoUrl: string
    readonly applicationLink: string
  }

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
      const { toggle: toggleControls } = useToggleControls()
      const { toggle: toggleDialog } = useToggleDialog()

      const data: IActionsPanel = reactive({
        applicationName: import.meta.env.VITE_APP_NAME,
        repoUrl: import.meta.env.VITE_APP_GIT_URL,
        get applicationLink() {
          return `${this.repoUrl}/${this.applicationName}`
        },
      })

      const redirect = (): void => {
        window.open(data.applicationLink, '_blank')
      }

      const restart = (): void => {
        props.onrestart && props.onrestart()
      }

      return {
        data,
        redirect,
        restart,
        toggleControls,
        toggleDialog,
      }
    },
  })
</script>
