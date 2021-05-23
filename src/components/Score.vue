<template>
  <div class="board-score">
    <p>Score: {{ totalScore }}</p>
    <!-- <span v-show="scoreAnimation">+{{ lastScore }}</span> -->
  </div>
</template>

<script>
  import { computed, defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'Score',
    components: {},
    props: {
      board: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const { board } = toRefs(props)

      const lastScore = computed(() => {
        console.log(board.value.lastScorePoints)
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
