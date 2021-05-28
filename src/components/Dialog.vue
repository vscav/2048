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
        <div class="modal-title">
          <slot name="header">
            <h2>Default header</h2>
          </slot>
        </div>
        <div class="modal-description">
          <slot name="description">
            <h3>Default description</h3>
          </slot>
        </div>
        <slot name="content">
          <p>Default content</p>
        </slot>
        <div class="modal-control-container">
          <button class="button" @click="toggle">Close</button>
        </div>
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
