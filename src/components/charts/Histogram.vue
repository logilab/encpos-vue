<template>
  <vue3-chart-js
    v-show="
      aggSearch.result.value &&
      aggSearch.result.value.length &&
      histoChart.data.datasets.length
    "
    :id="histoChart.id"
    ref="chartRef"
    :type="histoChart.type"
    :data="histoChart.data"
    :options="histoChart.options"
  ></vue3-chart-js>
</template>

<script>
import { ref, inject, watch } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
  name: 'Histogram',
  components: {
    Vue3ChartJs
  },
  setup () {
    const aggSearch = inject('agg-search')

    const chartRef = ref(null)

    const histoChart = {
      id: 'doughnut',
      type: 'bar',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        beginAtZero: true,
        plugins: {
          title: {
            display: true,
            text: 'Nombre de positions par année',
            position: 'bottom'
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            type: 'linear',
            ticks: {
              stepSize: 1
            },
            grid: {
              display: false
            }
          }
        }
      }
    }

    const currentYear = new Date().getFullYear()

    const updateChart = () => {
      const labels = []
      const data = []

      // TODO: should fetch the upper bound
      for (let i = 1849; i <= currentYear; i++) {
        labels.push(i)
        const found = aggSearch.result.value.find(
          (bucket) => bucket.key['metadata.promotion_year'] === i
        )
        if (found) {
          data.push(parseInt(found.doc_count))
        } else {
          data.push(0)
        }
      }

      histoChart.data.labels = labels
      histoChart.data.datasets = [
        {
          label: 'Par année de promotion',
          backgroundColor: ['rgba(255, 206, 86, 0.75)'],
          borderColor: ['rgba(255, 206, 86, 1)'],
          borderWidth: 0.4,
          data
        }
      ]

      chartRef.value.update()
    }

    watch(aggSearch.result, updateChart)

    return {
      aggSearch,
      histoChart,
      updateChart,
      chartRef
    }
  }
}
</script>
<style scoped></style>
