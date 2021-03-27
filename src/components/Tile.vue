<template>
  <span :class="classes">{{ tile.value }}</span>
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
      console.log('[app] Tile component was set up.')
      const { tile } = toRefs(props)
      const classes = computed(() => {
        const classesArray = ['tile']

        classesArray.push('tile' + tile.value.getValue())

        classesArray.push(
          'position-' + tile.value.getRow() + '-' + tile.value.getColumn(),
        )

        if (tile.value.isNew()) {
          classesArray.push('new')
        }

        return classesArray.join(' ')
      })
      return {
        classes,
      }
    },
  })
</script>
