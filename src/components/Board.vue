<template>
  <div class="board" tabIndex="1">
    <div v-for="(rowItem, rowIndex) in board.getCells()" :key="rowIndex">
      <Cell
        v-for="(columnItem, columnIndex) in rowItem"
        :key="columnIndex"
      ></Cell>
    </div>
    <Tile v-for="(tile, index) in tiles" :key="index" :tile="tile" />
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
  import Tile from '/@/components/Tile.vue'
  import { Board } from '/@/classes/Board'

  export default defineComponent({
    name: 'Board',
    components: {
      Cell,
      Tile,
    },
    props: {},
    setup: () => {
      console.log('[app] Board component was set up.')
      const board = ref(new Board())
      const handleKeyDown = (event: KeyboardEvent) => {
        if (board.value.hasWon()) {
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
        return board.value.getTiles().filter((tile) => tile.getValue() !== 0)
      })
      return {
        board,
        onRestart,
        tiles,
      }
    },
  })
</script>
