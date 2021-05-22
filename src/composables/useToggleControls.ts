import { reactive, toRefs } from 'vue'

export interface ControlsState {
  isControlsOpen: boolean
}

const createToggleControls = () => {
  const state: ControlsState = reactive({
    isControlsOpen: true,
  })

  const useToggleControls = () => {
    const toggleControls = () => {
      state.isControlsOpen = !state.isControlsOpen
    }

    return {
      ...toRefs(state),
      toggleControls,
    }
  }

  return useToggleControls
}

export const useToggleControls = createToggleControls()
