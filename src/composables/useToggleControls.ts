import { reactive, toRefs } from 'vue'
import { IToggleState, IUseToggle } from '/@/composables/interfaces'

const createToggleControls = () => {
  const state: IToggleState = reactive({
    isOpen: false,
  })

  const useToggleControls = (): IUseToggle => {
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
