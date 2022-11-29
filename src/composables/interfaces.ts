import { Ref } from 'vue'

export interface IToggleState {
  isOpen: boolean
}

export interface IUseToggle {
  isOpen: Ref<boolean>
  toggle: () => void
}

export type TUseToggleReturn = () => IUseToggle
