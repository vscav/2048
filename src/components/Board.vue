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
        console.log(event.key)
        if (board.value.hasWon()) {
          return
        }
        if (event.keyCode >= 37 && event.keyCode <= 40) {
          event.preventDefault()
          const direction = event.keyCode - 37
          board.value.move(direction)
          // TODO: use something different than keyCode (deprecated)
        }
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
