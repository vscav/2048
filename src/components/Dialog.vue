<template>
  <teleport to="#app">
    <div v-show="isModalOpen" ref="modal-backdrop" class="modal-backdrop">
      <div
        v-show="isModalOpen"
        ref="modal"
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <slot>Default is empty</slot>
        <button class="button" @click="toggleModal">Close modal</button>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import { useToggleModal } from '/@/composables/useToggleModal'

  export default defineComponent({
    name: 'Dialog',
    setup() {
      const { isModalOpen, toggleModal } = useToggleModal()
      const modal = ref<HTMLDivElement | null>(null)

      return {
        isModalOpen,
        modal,
        toggleModal,
      }
    },
  })
</script>
