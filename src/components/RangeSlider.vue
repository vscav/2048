<template>
  <div class="slider">
    <div v-show="!(slider.description === '')" class="slider-title">
      <h3>{{ slider.description }}</h3>
    </div>
    <div class="slider-container">
      <span>{{ slider.min }}</span>
      <input
        ref="input"
        v-model="currentValue"
        class="slider"
        type="range"
        :min="slider.min"
        :max="slider.max"
        :step="slider.step"
        @input="onChange"
      />
      <span>{{ slider.max }}</span>
    </div>
    <div class="slider-value">
      <span>{{ currentValue }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'

  export interface IRSliderData {
    currentValue: number
  }

  export interface IRSlider {
    name: string
    value: number
    min: number
    max: number
    step: number
    description: string
    // eslint-disable-next-line no-unused-vars
    onchange: (payload: IRSliderPayload) => void
  }

  export interface IRSliders {
    [key: string]: IRSlider
  }

  export interface IRSliderPayload {
    value: number
  }

  export default defineComponent({
    name: 'RangeSlider',
    props: {
      slider: {
        type: Object as PropType<IRSlider>,
        required: true,
      },
    },
    emits: ['onchange'],
    setup(_, { emit }) {
      const onChange = (event: InputEvent) => {
        emit('onchange', {
          value: parseFloat((event.target as HTMLInputElement).value),
        })
      }

      return {
        onChange,
      }
    },
    data(): IRSliderData {
      return {
        currentValue: this.slider.value,
      }
    },
  })
</script>
