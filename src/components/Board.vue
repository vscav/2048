<template>
  <div class="board" tabIndex="1" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Board } from '/@/Board'

  export default defineComponent({
    name: 'Board',
    props: {},
    setup: () => {
      console.log('Board component was set up.')
      const board = ref(new Board())
      console.log(
        board.value.getWinningStatus()
          ? 'Player has won.'
          : 'Player has not won yet.',
      )
      return {}
    },
  })
</script>

<style lang="scss" scoped>
  .board {
    order: 1;
    width: 440px;
    height: 440px;
    padding: 5px;
    background-color: #001527;
    border-radius: 7px;
    outline: none;
    position: relative;
  }
</style>
