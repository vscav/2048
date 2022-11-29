import { isRef, onBeforeUnmount, onMounted, Ref, unref, watch } from 'vue'

export const useEventListener = (
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (_e: Event) => unknown,
): void => {
  if (isRef(target)) {
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, handler)
      value?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}
