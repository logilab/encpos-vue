<template>
  <div>
    <Carousel>
      <Slide :key="1">
        <div class="carousel__item">
          <p>Début du Carrousel de test</p>
        </div>
      </Slide>
      <Slide :key="2">
        <div class="carousel__item">
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
        </div>
      </Slide>
      <Slide :key="3">
        <div class="carousel__item">
          <p>Fin du carrousel</p>
        </div>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { ref, inject, watch } from "vue";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  name: "Histogram",
  components: {
    Vue3ChartJs,
    Carousel,
    Slide,
    Navigation,
    Pagination,
  },
  setup() {
    const aggSearch = inject("agg-search");

    const chartRef = ref(null);

    const histoChart = {
      id: "doughnut",
      type: "bar",
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        beginAtZero: true,
        plugins: {
          title: {
            display: true,
            text: "Nombre de positions par année",
            position: "bottom",
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            type: "linear",
            ticks: {
              stepSize: 1,
            },
            grid: {
              display: false,
            },
          },
        },
      },
    };

    const updateChart = () => {
      let labels = [];
      let data = [];

      //TODO: should fetch the upper bound
      for (let i = 1849; i <= 2017; i++) {
        labels.push(i);
        let found = aggSearch.result.value.find(
          (bucket) => bucket["key"]["metadata.promotion_year"] === i
        );
        if (found) {
          data.push(parseInt(found["doc_count"]));
        } else {
          data.push(0);
        }
      }

      histoChart.data.labels = labels;
      histoChart.data.datasets = [
        {
          label: "Par année de promotion",
          backgroundColor: ["rgba(255, 206, 86, 0.75)"],
          borderColor: ["rgba(255, 206, 86, 1)"],
          borderWidth: 0.4,
          data,
        },
      ];

      chartRef.value.update();
    };

    watch(aggSearch.result, updateChart);

    return {
      aggSearch,
      histoChart,
      updateChart,
      chartRef,
    };
  },
};
</script>
<style scoped>
.carousel__item {
  min-height: 200px;
  width: 80%;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
.content ol:not([type]){
  list-style: none 
}
</style>