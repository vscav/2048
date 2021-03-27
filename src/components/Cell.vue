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
      console.log('[app] Cell component was set up.')
      return {}
    },
  })
</script>
