import { reactive, toRefs } from 'vue'
import { IToggleState, IUseToggle } from '/@/composables/interfaces'

const createToggleDialog = () => {
  const state: IToggleState = reactive({
    isOpen: false,
  })

  const useToggleDialog = (): IUseToggle => {
    const toggle = (): void => {
      state.isOpen = !state.isOpen
    }

    return {
      ...toRefs(state),
      toggle,
    }
  }

  return useToggleDialog
}

export const useToggleDialog = createToggleDialog()
