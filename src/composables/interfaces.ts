import { Ref } from 'vue'

export interface ToggleState {
  isOpen: boolean
}

export interface UseToggle {
  isOpen: Ref<boolean>
  toggle: () => void
}
