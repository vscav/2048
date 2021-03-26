<template>
  <h1>{{ title }}</h1>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Board',
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    setup: (props) => {
      let a
      console.log(`${props.title} component was set up.`)
      return {}
    },
  })
</script>
