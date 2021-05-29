<template>
  <div class="statistics">
    <div class="statistics-title">
      <h3>Current game statistics</h3>
    </div>
    <div class="statistics-content">
      <p>
        Total tiles played: <span>{{ total }}</span>
      </p>
      <p>
        Classic tiles played: <span>{{ totalClassic }}</span>
      </p>
      <p>
        Joker tiles played: <span>{{ totalJoker }}</span>
      </p>
      <p>
        Secret tiles played: <span>{{ totalSecret }}</span>
      </p>
      <p>
        Obstacle tiles played: <span>{{ totalObstacle }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, toRefs } from 'vue'

  import { Board } from '/@/classes/Board'
  import { TileType } from '/@/classes/Tile'

  export default defineComponent({
    name: 'Statistics',
    props: {
      current: {
        type: Object as PropType<Board>,
        required: true,
        validator: (board: Board) => board.tiles.length > 0,
      },
    },
    setup(props) {
      const { current: board } = toRefs(props)
      const total = computed(() => board.value.statisticsManager.total)
      const totalClassic = computed(() =>
        board.value.statisticsManager.getTotalByType(TileType.Classic),
      )
      const totalJoker = computed(() =>
        board.value.statisticsManager.getTotalByType(TileType.Joker),
      )
      const totalSecret = computed(() =>
        board.value.statisticsManager.getTotalByType(TileType.Secret),
      )
      const totalObstacle = computed(() =>
        board.value.statisticsManager.getTotalByType(TileType.Obstacle),
      )
      return {
        total,
        totalClassic,
        totalJoker,
        totalSecret,
        totalObstacle,
      }
    },
  })
</script>
