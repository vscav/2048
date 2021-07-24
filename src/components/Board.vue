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
    PropType,
    toRefs,
  } from 'vue'

  import { Board, MovementDirection } from '/@/classes/Board'

  import Cell from '/@/components/Cell.vue'
  import GameEndOverlay from '/@/components/GameEndOverlay.vue'
  import Score from '/@/components/Score.vue'
  import Tile from '/@/components/Tile.vue'

  import { fil } from '/@/lib/array'

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
        type: Object as PropType<Board>,
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

        let direction: MovementDirection
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
      const onRestart = (): void => {
        props.onrestart && props.onrestart()
      }
      onMounted(() => {
        window.addEventListener('keydown', handleKeyDown)
      })
      onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeyDown)
      })
      const tiles = computed(() => {
        return fil((tile) => tile.value !== 0, board.value.tiles)
      })
      return {
        board,
        onRestart,
        tiles,
      }
    },
  })
</script>
