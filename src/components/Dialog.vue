<template>
  <teleport to="#app">
    <div v-show="showModal" ref="modal-backdrop" class="modal-backdrop">
      <div
        v-show="showModal"
        ref="modal"
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <slot>Default is empty</slot>
        <button class="button" @click="closeModal">Close modal</button>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'

  export default defineComponent({
    name: 'Dialog',
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['close'],
    setup(props, { emit }) {
      const showModal = ref<boolean>(false)
      const modal = ref<HTMLDivElement | null>(null)

      const closeModal = () => {
        emit('close')
      }

      const onClickOutside = () => {
        if (showModal.value === true) {
          closeModal()
        }
      }

      watch(
        () => props.show,
        (show) => {
          showModal.value = show
        },
      )

      return {
        closeModal,
        onClickOutside,
        showModal,
        modal,
      }
    },
  })
</script>
