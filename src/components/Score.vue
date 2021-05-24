<template>
  <div class="board-score">
    <p>Score: {{ totalScore }}</p>
    <span v-show="scoreAnimation">+{{ lastScore }}</span>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, toRefs } from 'vue'

  import { Board } from '/@/classes/Board'

  export default defineComponent({
    name: 'Score',
    props: {
      board: {
        type: Object as PropType<Board>,
        required: true,
        validator: (board: Board) => board.tiles.length > 0,
      },
    },
    setup(props) {
      const { board } = toRefs(props)

      const lastScore = computed(() => {
        return board.value.lastScorePoints
      })

      const scoreAnimation = computed(() => {
        return board.value.lastScoreAnimation
      })

      const totalScore = computed(() => {
        return board.value.score
      })

      return {
        lastScore,
        totalScore,
        scoreAnimation,
      }
    },
  })
</script>
