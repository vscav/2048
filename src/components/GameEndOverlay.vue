<template>
  <div v-show="show" class="overlay">
    <p class="message">{{ content }}</p>
    <button class="button" @click="restart">Try again</button>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, toRefs } from 'vue'

  import { Board } from '/@/classes/Board'

  export default defineComponent({
    name: 'GameEndOverlay',
    props: {
      board: {
        type: Object as PropType<Board>,
        required: true,
        validator: (board: Board) => board.tiles.length > 0,
      },
      onrestart: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const { board } = toRefs(props)

      const show = computed(() => {
        return board.value.hasWon() || board.value.hasLost()
      })

      const content = computed(() => {
        if (board.value.hasWon()) {
          return 'You win!'
        } else if (board.value.hasLost()) {
          return 'Game over!'
        } else {
          return ''
        }
      })

      const restart = () => {
        props.onrestart && props.onrestart()
      }

      return {
        content,
        restart,
        show,
      }
    },
  })
</script>
