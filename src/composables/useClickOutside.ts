import { Ref } from 'vue'
import { useEventListener } from '/@/composables/useEventListener'

export const useClickOutside = (
  rootElementRef: Ref<HTMLElement | null>,
  callback: () => unknown,
): void => {
  if (!rootElementRef) return
  // `mousedown` or `mouseup` is better than `click` here because it doesn't bubble up (unlike `click`)
  useEventListener(window, 'mouseup', (e: Event) => {
    const clickedEl = e.target as HTMLElement
    if (rootElementRef.value?.contains(clickedEl)) return

    callback()
  })
}
