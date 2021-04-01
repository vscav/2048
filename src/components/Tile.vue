<template>
  <span :class="classes">{{
    typeof tile.value === 'string' ? '' : tile.value
  }}</span>
</template>

<script lang="ts">
  import { computed, defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'Tile',
    components: {},
    props: {
      tile: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      console.log('[app] A new Tile component was set up.')
      const { tile } = toRefs(props)

      const classes = computed(() => {
        const classesArray = ['tile']

        classesArray.push('tile' + tile.value.value)

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
          )
          classesArray.push(
            'column_from_' +
              tile.value.fromColumn() +
              '_to_' +
              tile.value.toColumn(),
          )
          classesArray.push('isMoving')
        }

        return classesArray.join(' ')
      })
      return {
        classes,
      }
    },
  })
</script>
