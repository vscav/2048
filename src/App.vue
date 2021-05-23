<template>
  <ActionsPanel :onrestart="onRestart" />
  <Board :current="board" :onrestart="onRestart" />
  <Sidebar>
    <div class="sidebar-title">
      <h2>Controls</h2>
    </div>
    <RangeSlider
      :value="initialBernouilliProbability"
      :min="0"
      :max="1"
      :step="0.01"
      description="Bernouilli's probability"
      @onchange="updateBernouilliProbability"
    />
    <RangeSlider
      :value="initialBinomialNumberOfExperiences"
      :min="5"
      :max="20"
      :step="1"
      description="Binomial's number of experiences"
      @onchange="updateBinomialNumberOfExperiences"
    />
    <RangeSlider
      :value="initialGeometricNumberOfExperiences"
      :min="1"
      :max="50"
      :step="1"
      description="Geometric's number of experiences"
      @onchange="updateGeometricNumberOfExperiences"
    />
    <RangeSlider
      :value="initialPoissonNumberOfSuccesses"
      :min="1"
      :max="15"
      :step="1"
      description="Poisson's average number of successes"
      @onchange="updatePoissonNumberOfSuccesses"
    />
  </Sidebar>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'

  import ActionsPanel from '/@/components/ActionsPanel.vue'
  import Board from '/@/components/Board.vue'
  import RangeSlider, { SliderPayload } from '/@/components/RangeSlider.vue'
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

      const updateBernouilliProbability = (payload: SliderPayload) => {
        board.value.updateBernouilliProbability(payload.value)
      }
      const updateBinomialNumberOfExperiences = (payload: SliderPayload) => {
        board.value.updateBinomialNumberOfExperiences(payload.value)
      }
      const updateGeometricNumberOfExperiences = (payload: SliderPayload) => {
        board.value.updateBinomialNumberOfExperiences(payload.value)
      }
      const updatePoissonNumberOfSuccesses = (payload: SliderPayload) => {
        board.value.updatePoissonNumberOfSuccesses(payload.value)
      }

      const initialBernouilliProbability = computed(() => {
        return board.value.probabilityManager.p
      })
      const initialBinomialNumberOfExperiences = computed(() => {
        return board.value.probabilityManager.n
      })
      const initialGeometricNumberOfExperiences = computed(() => {
        return board.value.probabilityManager.k
      })
      const initialPoissonNumberOfSuccesses = computed(() => {
        return board.value.probabilityManager.lambda
      })

      return {
        board,
        initialBernouilliProbability,
        initialBinomialNumberOfExperiences,
        initialGeometricNumberOfExperiences,
        initialPoissonNumberOfSuccesses,
        onRestart,
        updateBernouilliProbability,
        updateBinomialNumberOfExperiences,
        updateGeometricNumberOfExperiences,
        updatePoissonNumberOfSuccesses,
      }
    },
  })
</script>
