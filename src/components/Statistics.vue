<template>
  <canvas id="chart" />
</template>

<script lang="ts">
  import { defineComponent, onMounted, PropType, ref, toRefs, watch } from 'vue'
  import { Chart, ChartConfiguration, registerables } from 'chart.js'

  export interface IStatistics {
    data: Array<number>
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
        type: Object as PropType<IStatistics>,
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
        () => props.statistics,
        () => {
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
