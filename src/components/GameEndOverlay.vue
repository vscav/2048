<template>
  <div v-show="show" class="overlay">
    <p class="message">{{ content }}</p>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'GameEndOverlay',
    components: {},
    props: {
      board: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      console.log('[app] GameEndOverlay component was set up.')
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
      return {
        content,
        show,
      }
    },
  })
</script>
