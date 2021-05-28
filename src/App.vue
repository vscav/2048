<template>
  <ActionsPanel :onrestart="onRestart" />
  <button @click="changeStats">Change stats</button>
  <Board :current="board" :onrestart="onRestart" />
  <Dialog>
    <template #header>
      <h2>Statistics</h2>
    </template>
    <template #description>
      <h3>Tile type distribution</h3>
    </template>
    <template #content>
      <div class="visualization-container">
        <Statistics
          :statistics="statistics"
          :options="{
            responsive: false,
            maintainAspectRatio: true,
            borderWidth: 0,
            plugins: {
              tooltip: {
                enabled: false,
              },
            },
          }"
        />
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
  import RangeSlider, {
    IRSliders,
    IRSliderPayload,
  } from '/@/components/RangeSlider.vue'
  import Slider from '/@/components/Sidebar.vue'
  import Statistics, { IStatistics } from '/@/components/Statistics.vue'

  import { Board as Game } from '/@/classes/Board'

  export default defineComponent({
    name: 'App',
    components: {
      ActionsPanel,
      Board,
      Dialog,
      RangeSlider,
      Slider,
      Statistics,
    },
    setup() {
      const board = ref<Game>(new Game())

      const key = ref<number>(0)

      const onRestart = () => {
        board.value = new Game()
      }

      const statistics = ref<IStatistics>({
        data: [20, 65, 5, 10],
        labels: ['Classic', 'Joker', 'Secret', 'Obstacle'],
        colors: ['#86cb92', '#8c2155', '#e4717a', '#b9b9bb'],
      })

      const changeStats = () => {
        statistics.value = {
          ...statistics.value,
          data: [20, 25, 5, 40],
        }
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
        changeStats,
        key,
        onRestart,
        sliders,
        statistics,
      }
    },
  })
</script>
