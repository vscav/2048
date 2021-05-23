<template>
  <div class="slider">
    <div v-show="!(description === '')" class="slider-title">
      <h3>{{ description }}</h3>
    </div>
    <div class="slider-container">
      <span>{{ min }}</span>
      <input
        ref="input"
        v-model="currentValue"
        class="slider"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        @input="onChange"
      />
      <span>{{ max }}</span>
    </div>
    <div class="slider-value">
      <span>{{ currentValue }}</span>
    </div>
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
      step: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        default: '',
        required: false,
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
    data() {
      return {
        currentValue: this.value,
      }
    },
  })
</script>
