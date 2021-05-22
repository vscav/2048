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
    toRefs,
  } from 'vue'

  import Cell from '/@/components/Cell.vue'
  import GameEndOverlay from '/@/components/GameEndOverlay.vue'
  import Score from '/@/components/Score.vue'
  import Tile from '/@/components/Tile.vue'

  export default defineComponent({
    name: 'Board',
    components: {
      Cell,
      GameEndOverlay,
      Score,
      Tile,
    },
    props: {
      current: {
        type: Object,
        required: true,
      },
      onrestart: {
        type: Function,
        required: true,
      },
    },
    setup: (props) => {
      const { current } = toRefs(props)
      const board = current

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
        props.onrestart && props.onrestart()
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
