<template>
  <ControlsPanel :board="board" :onrestart="onRestart" />
  <Score :board="board" />
  <div class="board" tabIndex="1">
    <div v-for="(rowItem, rowIndex) in board.cells" :key="rowIndex">
      <Cell
        v-for="(columnItem, columnIndex) in rowItem"
        :key="columnIndex"
      ></Cell>
    </div>
    <Tile v-for="(tile, index) in tiles" :key="index" :tile="tile" />
    <GameEndOverlay :board="board" :onrestart="onRestart" />
  </div>
  <!-- <RangeSlider :value="25" :min="1" :max="50" @onchange="updateValue" /> -->
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onBeforeUnmount,
    onMounted,
    ref,
  } from 'vue'

  import Cell from '/@/components/Cell.vue'
  import ControlsPanel from './ControlsPanel.vue'
  import GameEndOverlay from '/@/components/GameEndOverlay.vue'
  // import RangeSlider, { SliderPayload } from '/@/components/RangeSlider.vue'
  import Score from '/@/components/Score.vue'
  import Tile from '/@/components/Tile.vue'

  import { Board } from '/@/classes/Board'

  export default defineComponent({
    name: 'Board',
    components: {
      Cell,
      ControlsPanel,
      GameEndOverlay,
      // RangeSlider,
      Score,
      Tile,
    },
    props: {},
    setup: () => {
      console.log('[app] Board component was set up.')

      const board = ref<Board>(new Board())

      const handleKeyDown = (event: KeyboardEvent) => {
        // if (showModal.value) {
        //   console.log('Modal is opened.')
        //   return
        // }
        if (board.value.hasWon()) {
          console.log('Player have already won.')
          return
        }
        let direction: number
        switch (event.key) {
          case 'ArrowLeft':
            direction = 0
            break
          case 'ArrowUp':
            direction = 1
            break
          case 'ArrowRight':
            direction = 2
            break
          case 'ArrowDown':
            direction = 3
            break
          default:
            return
        }
        board.value.move(direction)
      }
      const onRestart = () => {
        board.value = new Board()
      }
      // const updateValue = (payload: SliderPayload) => {
      //   console.log('Value received from slider: ', payload.value)
      // }
      onMounted(() => {
        window.addEventListener('keydown', handleKeyDown)
      })
      onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeyDown)
      })
      const tiles = computed(() => {
        return board.value.tiles.filter((tile) => tile.value !== 0)
      })
      return {
        board,
        onRestart,
        // updateValue,
        tiles,
      }
    },
  })
</script>
