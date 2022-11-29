import { reactive, toRefs } from 'vue'
import {
  IToggleState,
  IUseToggle,
  TUseToggleReturn,
} from '/@/composables/interfaces'

const createToggle = (): TUseToggleReturn => {
  const state: IToggleState = reactive({
    isOpen: false,
  })

  const useToggle = (): IUseToggle => {
    const toggle = (): void => {
      state.isOpen = !state.isOpen
    }

    return {
      ...toRefs(state),
      toggle,
    }
  }

  return useToggle
}

export { createToggle }
