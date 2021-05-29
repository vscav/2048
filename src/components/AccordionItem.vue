<template>
  <li class="accordion__item">
    <div
      class="accordion__trigger"
      :class="{ accordion__trigger_active: visible }"
      @click="open"
    >
      <slot name="accordion-trigger"></slot>
    </div>

    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div v-show="visible" class="accordion__content">
        <ul>
          <slot name="accordion-content"></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, inject } from 'vue'

  import { IAccordion } from '/@/components/Accordion.vue'

  export default defineComponent({
    name: 'AccordionItem',
    props: {},
    setup() {
      let index: number | undefined
      const accordion = inject('accordion') as IAccordion
      index = accordion.count++
      const visible: ComputedRef<boolean> = computed(
        () => index === accordion.active,
      )
      const open = () => {
        if (visible.value) {
          accordion.active = null
        } else {
          accordion.active = index
        }
      }
      const start = (el) => {
        el.style.height = el.scrollHeight + 'px'
      }
      const end = (el) => {
        el.style.height = ''
      }
      return {
        end,
        open,
        start,
        visible,
      }
    },
  })
</script>
