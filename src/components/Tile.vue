<template>
  <span :class="classes">{{ tile.type === 'classic' ? tile.value : '' }}</span>
</template>

<script lang="ts">
  import { computed, defineComponent, toRefs } from 'vue'
  import { TileType } from '/@/classes/Tile'

  export default defineComponent({
    name: 'Tile',
    props: {
      tile: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const { tile } = toRefs(props)

      const classes = computed(() => {
        const classesArray = ['tile']

        if (tile.value.type === TileType.Classic)
          classesArray.push('tile' + tile.value.value)
        else {
          classesArray.push('tile-special', 'tile-' + tile.value.type)
        }

        if (!tile.value.mergedInto) {
          classesArray.push(
            'position_' + tile.value.row + '_' + tile.value.column,
          )
        }
        if (tile.value.mergedInto) {
          classesArray.push('merged')
        }
        if (tile.value.isNew()) {
          classesArray.push('new')
        }
        if (tile.value.hasMoved()) {
          classesArray.push(
            'row_from_' + tile.value.fromRow() + '_to_' + tile.value.toRow(),
            'column_from_' +
              tile.value.fromColumn() +
              '_to_' +
              tile.value.toColumn(),
            'isMoving',
          )
        }

        return classesArray.join(' ')
      })
      return {
        classes,
      }
    },
  })
</script>
