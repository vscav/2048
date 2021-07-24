<template>
  <div class="statistics">
    <div class="statistics-title">
      <h3>Current game count statistics</h3>
    </div>
    <Accordion>
      <AccordionItem>
        <template #accordion-trigger>
          <div class="statistics-subtitle"><h4>Classic</h4></div>
          <span class="statistics-count">{{ totalClassic }}</span>
        </template>
        <template #accordion-content>
          <li>
            <div class="statistics-details">
              <div class="statistics-subtitle">2</div>
              <span class="statistics-subcount">{{ totalClassicTwo }}</span>
            </div>
          </li>
          <li>
            <div class="statistics-details">
              <div class="statistics-subtitle">4</div>
              <span class="statistics-subcount">{{ totalClassicFour }}</span>
            </div>
          </li>
        </template>
      </AccordionItem>
      <AccordionItem>
        <template #accordion-trigger>
          <div class="statistics-subtitle"><h4>Joker</h4></div>
          <span class="statistics-count">{{ totalJoker }}</span>
        </template>
      </AccordionItem>
      <AccordionItem>
        <template #accordion-trigger>
          <div class="statistics-subtitle"><h4>Obstacle</h4></div>
          <span class="statistics-count">{{ totalObstacle }}</span>
        </template>
      </AccordionItem>
      <AccordionItem>
        <template #accordion-trigger>
          <div class="statistics-subtitle"><h4>Secret</h4></div>
          <span class="statistics-count">{{ totalSecret }}</span>
        </template>
        <template #accordion-content>
          <li>
            <div class="statistics-details">
              <div class="statistics-subtitle">2</div>
              <span class="statistics-subcount">{{ totalSecretTwo }}</span>
            </div>
          </li>
          <li>
            <div class="statistics-details">
              <div class="statistics-subtitle">4</div>
              <span class="statistics-subcount">{{ totalSecretFour }}</span>
            </div>
          </li>
          <li>
            <div class="statistics-details">
              <div class="statistics-subtitle">8</div>
              <span class="statistics-subcount">{{ totalSecretEight }}</span>
            </div>
          </li>
          <li>
            <div class="statistics-details">
              <div class="statistics-subtitle">16</div>
              <span class="statistics-subcount">{{ totalSecretSixteen }}</span>
            </div>
          </li>
        </template>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, toRefs } from 'vue'

  import Accordion from '/@/components/Accordion.vue'
  import AccordionItem from '/@/components/AccordionItem.vue'

  import { Board } from '/@/classes/Board'
  import { TileType, TileValue } from '/@/classes/Tile'

  export default defineComponent({
    name: 'Statistics',
    components: {
      Accordion,
      AccordionItem,
    },
    props: {
      current: {
        type: Object as PropType<Board>,
        required: true,
        validator: (board: Board) => board.tiles.length > 0,
      },
    },
    setup(props) {
      const { current: board } = toRefs(props)

      const totalClassic = computed(() =>
        board.value.statisticsManager.count(TileType.Classic),
      )
      const totalClassicTwo = computed(() =>
        board.value.statisticsManager.count(TileType.Classic, 2 as TileValue),
      )
      const totalClassicFour = computed(() =>
        board.value.statisticsManager.count(TileType.Classic, 4 as TileValue),
      )
      const totalJoker = computed(() =>
        board.value.statisticsManager.count(TileType.Joker),
      )
      const totalObstacle = computed(() =>
        board.value.statisticsManager.count(TileType.Obstacle),
      )
      const totalSecret = computed(() =>
        board.value.statisticsManager.count(TileType.Secret),
      )
      const totalSecretTwo = computed(() =>
        board.value.statisticsManager.count(TileType.Secret, 2 as TileValue),
      )
      const totalSecretFour = computed(() =>
        board.value.statisticsManager.count(TileType.Secret, 4 as TileValue),
      )
      const totalSecretEight = computed(() =>
        board.value.statisticsManager.count(TileType.Secret, 8 as TileValue),
      )
      const totalSecretSixteen = computed(() =>
        board.value.statisticsManager.count(TileType.Secret, 16 as TileValue),
      )
      return {
        totalClassic,
        totalClassicTwo,
        totalClassicFour,
        totalJoker,
        totalObstacle,
        totalSecret,
        totalSecretTwo,
        totalSecretFour,
        totalSecretEight,
        totalSecretSixteen,
      }
    },
  })
</script>
