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
      <IconButton
        icon="chart"
        small
        :highlight="highlighted"
        :onclick="toggleDialog"
        >Statistics</IconButton
      >
      <button class="button" @click="restart">New game</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, reactive, toRefs } from 'vue'

  import IconButton from '/@/components/IconButton.vue'

  import { useToggleControls } from '/@/composables/useToggleControls'
  import { useToggleDialog } from '/@/composables/useToggleDialog'

  import { Board } from '/@/classes/Board'

  interface IActionsPanel {
    applicationName: string
    repositoryUrl: string
    readonly applicationLink: string
  }

  export default defineComponent({
    name: 'ActionsPanel',
    components: {
      IconButton,
    },
    props: {
      current: {
        type: Object as PropType<Board>,
        required: true,
      },
      onrestart: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const { current } = toRefs(props)
      const board = current

      const { toggle: toggleControls } = useToggleControls()
      const { toggle: toggleDialog } = useToggleDialog()

      const data: IActionsPanel = reactive({
        applicationName: import.meta.env.VITE_APP_NAME,
        repositoryUrl: import.meta.env.VITE_APP_GIT_URL,
        get applicationLink() {
          return `${this.repositoryUrl}/${this.applicationName}`
        },
      })

      const highlighted = computed((): boolean => {
        return board.value.hasWon() || board.value.hasLost()
      })

      const redirect = (): void => {
        window.open(data.applicationLink, '_blank')
      }

      const restart = (): void => {
        props.onrestart && props.onrestart()
      }

      return {
        data,
        highlighted,
        redirect,
        restart,
        toggleControls,
        toggleDialog,
      }
    },
  })
</script>
