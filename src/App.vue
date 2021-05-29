<template>
  <ActionsPanel :current="board" :onrestart="onRestart" />
  <Board :current="board" :onrestart="onRestart" />
  <Dialog>
    <template #header>
      <h2>Statistics</h2>
    </template>
    <template #content>
      <div class="modal-content">
        <Distribution
          type="doughnut"
          :statistics="statistics"
          :options="{
            responsive: false,
            maintainAspectRatio: true,
            borderWidth: 0,
            animation: {
              duration: 0,
            },
            plugins: {
              tooltip: {
                enabled: false,
              },
              legend: {
                display: true,
                labels: {
                  color: '#f9f6f2',
                  usePointStyle: true,
                  boxWidth: 10,
                },
              },
            },
          }"
        />
        <Statistics :current="board" />
      </div>
    </template>
  </Dialog>
  <Slider>
    <template #header>
      <h2>Controls</h2>
    </template>
    <template #content>
      <RangeSlider
        v-for="slider in sliders"
        :key="slider.name"
        :slider="slider"
        @onchange="slider.onchange"
      />
    </template>
  </Slider>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref } from 'vue'

  import ActionsPanel from '/@/components/ActionsPanel.vue'
  import Board from '/@/components/Board.vue'
  import Dialog from '/@/components/Dialog.vue'
  import Distribution, { IDistribution } from '/@/components/Distribution.vue'
  import RangeSlider, {
    IRSliders,
    IRSliderPayload,
  } from '/@/components/RangeSlider.vue'
  import Slider from '/@/components/Sidebar.vue'
  import Statistics from '/@/components/Statistics.vue'

  import { Board as Game } from '/@/classes/Board'

  export default defineComponent({
    name: 'App',
    components: {
      ActionsPanel,
      Board,
      Dialog,
      Distribution,
      RangeSlider,
      Slider,
      Statistics,
    },
    setup() {
      const board = ref<Game>(new Game())

      const onRestart = (): void => {
        board.value = new Game()
      }

      const statistics = reactive<IDistribution>({
        data: computed(() => [
          board.value.probabilityManager.tileTwoProbability,
          board.value.probabilityManager.tileFourProbability,
          board.value.probabilityManager.jokerTileProbability,
          board.value.probabilityManager.secretTileProbability,
          board.value.probabilityManager.obstacleTileProbability,
        ]),
        labels: ['2', '4', 'Joker', 'Secret', 'Obstacle'],
        colors: ['#86cb92', '#70b28b', '#8c2155', '#e4717a', '#b9b9bb'],
      })

      const sliders: IRSliders = reactive({
        bernouilli: {
          name: 'bernouilli',
          value: computed((): number => {
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
          value: computed((): number => {
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
          value: computed((): number => {
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
          value: computed((): number => {
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
        statistics,
      }
    },
  })
</script>
