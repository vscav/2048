<template>
  <span class="cell">{{ '' }}</span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Cell',
    components: {},
    props: {},
    setup() {
      return {}
    },
  })
</script>

<style ang="scss" scoped>
  .cell {
    user-select: none;
    cursor: default;
    width: 100px;
    height: 100px;
    margin: 5px;
    line-height: 90px;
    display: inline-block;
    font-size: 55px;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    border-radius: 7px;
    color: #766;
    background-color: #002b44;
  }
</style>
