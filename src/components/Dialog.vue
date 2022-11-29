<template>
  <teleport to="#app">
    <div
      v-show="isOpen"
      ref="modal"
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div class="modal-title">
        <slot name="header">
          <h2>Default header</h2>
        </slot>
      </div>
      <slot name="content">
        <p>Default content</p>
      </slot>
      <div class="modal-control-container">
        <button class="button" @click="toggle">Close</button>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import { useClickOutside } from '/@/composables/useClickOutside'
  import { useToggleDialog } from '/@/composables/useToggleDialog'

  export default defineComponent({
    name: 'Dialog',
    setup() {
      const { isOpen, toggle } = useToggleDialog()
      const modal = ref<HTMLDivElement | null>(null)

      useClickOutside(modal, () => {
        if (isOpen.value) isOpen.value = false
      })

      return {
        isOpen,
        modal,
        toggle,
      }
    },
  })
</script>
