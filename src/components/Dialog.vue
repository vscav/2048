<template>
  <teleport to="#app">
    <div v-show="isOpen" ref="modal-backdrop" class="modal-backdrop">
      <div
        v-show="isOpen"
        ref="modal"
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <slot>Default is empty</slot>
        <button class="button" @click="toggle">Close modal</button>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import { useToggleDialog } from '/@/composables/useToggleDialog'

  export default defineComponent({
    name: 'Dialog',
    setup() {
      const { isOpen, toggle } = useToggleDialog()
      const modal = ref<HTMLDivElement | null>(null)

      return {
        isOpen,
        modal,
        toggle,
      }
    },
  })
</script>
