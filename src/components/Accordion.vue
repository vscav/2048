<template>
  <ul class="accordion">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
  import { defineComponent, provide, reactive } from 'vue'

  export interface IAccordion {
    count: number
    active: number | undefined | null
  }

  export default defineComponent({
    name: 'Accordion',
    setup() {
      const accordion = reactive({
        count: 0,
        active: null,
      })
      provide('accordion', accordion)

      return {}
    },
  })
</script>
