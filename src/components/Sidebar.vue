<template>
  <div class="sidebar">
    <div v-if="isOpen" class="sidebar-backdrop" @click="toggle"></div>
    <transition name="slide">
      <div v-if="isOpen" class="sidebar-panel">
        <slot></slot>
      </div>
    </transition>
  </div>
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
