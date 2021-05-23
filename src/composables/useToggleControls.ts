import { reactive, toRefs } from 'vue'
import { ToggleState, UseToggle } from '/@/composables/interfaces'

const createToggleControls = () => {
  const state: ToggleState = reactive({
    isOpen: false,
  })

  const useToggleControls = (): UseToggle => {
    const toggle = (): void => {
      state.isOpen = !state.isOpen
    }

    return {
      ...toRefs(state),
      toggle,
    }
  }

  return useToggleControls
}

export const useToggleControls = createToggleControls()
