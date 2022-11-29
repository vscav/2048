<template>
  <teleport to="#app">
    <div ref="sidebar" class="sidebar">
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

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import { useClickOutside } from '/@/composables/useClickOutside'
  import { useToggleControls } from '/@/composables/useToggleControls'

  export default defineComponent({
    name: 'Sidebar',
    setup() {
      const { isOpen, toggle } = useToggleControls()
      const sidebar = ref<HTMLDivElement | null>(null)

      useClickOutside(sidebar, () => {
        if (isOpen.value) isOpen.value = false
      })

      return {
        isOpen,
        sidebar,
        toggle,
      }
    },
  })
</script>
