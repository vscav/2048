<template>
  <ActionsPanel :onrestart="onRestart" />
  <Board :current="board" :onrestart="onRestart" />
  <Sidebar>
    <div class="sidebar-title">
      <h2>Controls</h2>
    </div>
    <RangeSlider
      v-for="slider in sliders"
      :key="slider.name"
      :slider="slider"
      @onchange="slider.onchange"
    />
  </Sidebar>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref } from 'vue'

  import ActionsPanel from '/@/components/ActionsPanel.vue'
  import Board from '/@/components/Board.vue'
  import RangeSlider, {
    IRSliders,
    IRSliderPayload,
  } from '/@/components/RangeSlider.vue'
  import Sidebar from '/@/components/Sidebar.vue'

  import { Board as Game } from '/@/classes/Board'

  export default defineComponent({
    name: 'App',
    components: {
      Board,
      ActionsPanel,
      RangeSlider,
      Sidebar,
    },
    setup() {
      const board = ref<Game>(new Game())

      const onRestart = () => {
        board.value = new Game()
      }

      const sliders: IRSliders = reactive({
        bernouilli: {
          name: 'bernouilli',
          value: computed(() => {
            return board.value.probabilityManager.p
          }),
          min: 0,
          max: 1,
          step: 0.01,
          description: "Poisson's average number of successes",
          onchange: (payload: IRSliderPayload) => {
            board.value.updateBernouilliProbability(payload.value)
          },
        },
        binomial: {
          name: 'binomial',
          value: computed(() => {
            return board.value.probabilityManager.n
          }),
          min: 5,
          max: 20,
          step: 1,
          description: "Binomial's number of experiences",
          onchange: (payload: IRSliderPayload) => {
            board.value.updateBinomialNumberOfExperiences(payload.value)
          },
        },
        geometric: {
          name: 'geometric',
          value: computed(() => {
            return board.value.probabilityManager.k
          }),
          min: 1,
          max: 50,
          step: 1,
          description: "Geometric's number of experiences",
          onchange: (payload: IRSliderPayload) => {
            board.value.updateGeometricNumberOfExperiences(payload.value)
          },
        },
        poisson: {
          name: 'poisson',
          value: computed(() => {
            return board.value.probabilityManager.lambda
          }),
          min: 1,
          max: 15,
          step: 1,
          description: "Poisson's average number of successes",
          onchange: (payload: IRSliderPayload) => {
            board.value.updatePoissonNumberOfSuccesses(payload.value)
          },
        },
      })

      return {
        board,
        onRestart,
        sliders,
      }
    },
  })
</script>
