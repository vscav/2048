<template>
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
  import GameEndOverlay from '/@/components/GameEndOverlay.vue'
  import Score from '/@/components/Score.vue'
  import Tile from '/@/components/Tile.vue'

  import { Board } from '/@/classes/Board'
  import { Probability } from '/@/utils/probability'

  export default defineComponent({
    name: 'Board',
    components: {
      Cell,
      GameEndOverlay,
      Score,
      Tile,
    },
    props: {},
    setup: () => {
      console.log('[app] Board component was set up.')

      const prob = new Probability()
      const uniform = prob.uniform(0, 1)
      const value = uniform.random()
      console.log(`Random value from uniform distribution: ${value}`)
      console.log(
        `The min random number which could be returned by 'uniform()' (inclusive): ${uniform.min}`,
      )
      console.log(
        `The max random number which could be returned by 'uniform()' (exclusive): ${uniform.max}`,
      )
      console.log(`The expected mean for this distribution: ${uniform.mean}`)
      console.log(
        `The expected variance for this distribution: ${uniform.variance}`,
      )

      const board = ref(new Board())
      const handleKeyDown = (event: KeyboardEvent) => {
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
        tiles,
      }
    },
  })
</script>
