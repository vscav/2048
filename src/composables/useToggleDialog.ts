import { reactive, toRefs } from 'vue'
import { ToggleState, UseToggle } from '/@/composables/interfaces'

const createToggleDialog = () => {
  const state: ToggleState = reactive({
    isOpen: true,
  })

  const useToggleDialog = (): UseToggle => {
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
