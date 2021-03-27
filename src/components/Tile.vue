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
        if (!tile.value.hasMergedInto()) {
          classesArray.push(
            'position_' + tile.value.getRow() + '_' + tile.value.getColumn(),
          )
        }
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

<style lang="scss" scoped>
  .tile {
    position: absolute;
    user-select: none;
    cursor: default;
    width: 100px;
    height: 100px;
    margin: 5px;
    line-height: 95px;
    display: inline-block;
    font-size: 55px;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    border-radius: 7px;
    color: #f9f6f2;
    background-color: #002b44;
  }

  @for $row from 0 through 3 {
    @for $column from 0 through 3 {
      .position_#{$row}_#{$column}:not(.isMoving) {
        top: 110px * $row + 5px;
        left: 110px * $column + 5px;
      }
    }
  }

  .tile0 {
    background-color: #002b44;
  }

  .tile2 {
    background-color: #86cb92;
  }

  .tile4 {
    background-color: #70b28b;
  }

  .tile8 {
    background-color: #609977;
  }

  .tile16 {
    background-color: #40664f;
  }

  .tile32 {
    background-color: #edcf72;
  }

  .tile64 {
    background-color: #edc44b;
  }

  .tile128 {
    background-color: #eac317;
    font-size: 45px;
  }

  .tile256 {
    background-color: #ddb500;
    font-size: 45px;
  }

  .tile512 {
    background-color: #ff7759;
    font-size: 45px;
  }

  .tile1024 {
    background-color: #f65e3b;
    font-size: 35px;
  }

  .tile2048 {
    background-color: #252424;
    font-size: 35px;
  }
</style>
