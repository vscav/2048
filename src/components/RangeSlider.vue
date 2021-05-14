<template>
  <div class="slider-container">
    <input
      ref="input"
      v-model="currentValue"
      class="slider"
      type="range"
      :min="min"
      :max="max"
      @input="onChange"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export interface SliderPayload {
    value: number
  }

  export default defineComponent({
    name: 'RangeSlider',
    components: {},
    props: {
      value: {
        type: Number,
        required: true,
      },
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    emits: ['onchange'],
    setup(_, { emit }) {
      const onChange = (event: InputEvent) => {
        emit('onchange', { value: (event.target as HTMLInputElement).value })
      }
      return {
        onChange,
      }
    },
    data() {
      return {
        currentValue: this.value,
      }
    },
  })
</script>
