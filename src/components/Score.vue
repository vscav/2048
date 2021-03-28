<template>
  <div>
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
        console.log(board.value.getLastScorePoints())
        return board.value.getLastScorePoints()
      })
      const scoreAnimation = computed(() => {
        return board.value.getLastScoreAnimation()
      })
      const totalScore = computed(() => {
        return board.value.getScore()
      })
      return {
        lastScore,
        totalScore,
        scoreAnimation,
      }
    },
  })
</script>
