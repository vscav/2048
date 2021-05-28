<template>
  <teleport to="#app">
    <div class="sidebar">
      <div v-if="isOpen" class="sidebar-backdrop"></div>
      <transition name="slide">
        <div v-if="isOpen" class="sidebar-panel">
          <div class="sidebar-title">
            <slot name="header">
              <h2>Default header</h2>
            </slot>
          </div>
          <slot name="content">
            <p>Default content</p>
          </slot>
          <button class="button" @click="toggle">Close</button>
        </div>
      </transition>
    </div>
  </teleport>
</template>
<script>
  import { defineComponent } from 'vue'

  import { useToggleControls } from '/@/composables/useToggleControls'

  export default defineComponent({
    name: 'Sidebar',
    setup() {
      const { isOpen, toggle } = useToggleControls()

      return {
        isOpen,
        toggle,
      }
    },
  })
</script>
