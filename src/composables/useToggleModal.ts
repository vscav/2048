import { reactive, toRefs } from 'vue'

export interface ModalState {
  isModalOpen: boolean
}

const createToggleModal = () => {
  const state: ModalState = reactive({
    isModalOpen: true,
  })

  const useToggleModal = () => {
    const toggleModal = () => {
      state.isModalOpen = !state.isModalOpen
    }

    return {
      ...toRefs(state),
      toggleModal,
    }
  }

  return useToggleModal
}

export const useToggleModal = createToggleModal()
