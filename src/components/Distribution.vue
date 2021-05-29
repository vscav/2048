<template>
  <div class="distribution">
    <div class="distribution-title">
      <h3>Current tile type distribution</h3>
    </div>
    <div class="distribution-visualization-container">
      <canvas id="chart" />
    </div>
  </div>
</template>

<script lang="ts">
  import {
    ComputedRef,
    defineComponent,
    onMounted,
    PropType,
    ref,
    toRefs,
    watch,
  } from 'vue'
  import { Chart, ChartConfiguration, registerables } from 'chart.js'

  import _ from 'lodash'

  export interface IDistribution {
    data: ComputedRef<Array<number>>
    labels: Array<string>
    colors: Array<string>
  }

  export default defineComponent({
    name: 'Cell',
    props: {
      type: {
        type: String,
        required: true,
      },
      statistics: {
        type: Object as PropType<IDistribution>,
        required: true,
      },
      options: {
        type: Object,
        default: () => ({}),
        required: false,
      },
    },
    setup(props) {
      const { type, statistics, options } = toRefs(props)

      const chart = ref<Chart>()

      watch(
        (): ComputedRef<Array<number>> => _.cloneDeep(props.statistics.data),
        (): void => {
          chart.value?.destroy()
          createChart({
            datasets: [
              {
                data: statistics.value.data,
                backgroundColor: statistics.value.colors,
              },
            ],
            labels: statistics.value.labels,
          })
        },
      )

      onMounted(() => {
        Chart.register(...registerables)

        createChart({
          datasets: [
            {
              data: statistics.value.data,
              backgroundColor: statistics.value.colors,
            },
          ],
          labels: statistics.value.labels,
        })
      })

      const createChart = (chartData: unknown) => {
        const context = document.getElementById('chart') as HTMLCanvasElement
        const opts = {
          type: type.value,
          data: chartData,
          options: options.value,
        } as ChartConfiguration
        chart.value = new Chart(context, opts)
      }
    },
  })
</script>
