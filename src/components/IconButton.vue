<template>
  <button
    :name="icon"
    :class="[
      {
        'icon-button-small': small,
        'icon-button-medium': medium,
        'icon-button-large': large,
        highlight: highlight,
      },
      icon ? 'icon-' + icon : '',
    ]"
    class="icon-button"
    @click="click"
  >
    <slot />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'IconButton',
    props: {
      small: {
        type: Boolean,
        default: false,
        required: false,
      },
      medium: {
        type: Boolean,
        default: false,
        required: false,
      },
      large: {
        type: Boolean,
        default: false,
        required: false,
      },
      icon: {
        type: String,
        default: '',
        required: false,
      },
      highlight: {
        type: Boolean,
        default: false,
        required: false,
      },
      onclick: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const click = (): void => {
        props.onclick && props.onclick()
      }
      return { click }
    },
  })
</script>
