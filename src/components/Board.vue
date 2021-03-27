<template>
  <div class="board" tabIndex="1">
    <div v-for="(r_item, r_i) in board.getCells()" :key="r_i">
      <Cell v-for="(c_item, c_i) in r_item" :key="c_i"></Cell>
    </div>
    <Tile v-for="(tile, i) in tiles" :key="i" :tile="tile" />
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
  import { Board } from '/@/Board'

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
        if (event.keyCode >= 37 && event.keyCode <= 40) {
          event.preventDefault()
          console.log('[app] Made a move on board.')
          // TODO: move in a specific direction
          // TODO: use something different than keyCode (deprecated)
        }
      }
      const onRestart = () => {
        board.value = new Board()
      }
      console.log(
        '[app] ' +
          (board.value.hasWon()
            ? 'Player has won.'
            : 'Player has not won yet.'),
      )
      console.log(board.value.getCells())
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

<style lang="scss" scoped>
  .board {
    order: 1;
    width: 440px;
    height: 440px;
    padding: 5px;
    background-color: #001427;
    border-radius: 7px;
    outline: none;
    position: relative;
  }
</style>
