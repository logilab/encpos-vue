<template>
  <div>
    <CarouselPlugin>
      <Slide :key="idx" v-for="(itemName, idx) in items">
        <div class="carousel__item">
          <slot :name="itemName"></slot>
        </div>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </CarouselPlugin>
  </div>
</template>

<script>
import { Carousel as CarouselPlugin, Slide, Navigation, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  name: 'Carousel',
  components: {
    CarouselPlugin,
    Slide,
    Navigation,
    Pagination
  },
  props: ['items']
}
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
.carousel {
  padding-bottom: 30px;
}
.carousel :deep(p) {
  text-align: center;
}
:deep(.carousel__viewport) {
  height: 100%;
}
:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: #aaa292;
  width: 24px;
  height: 24px;
}
:deep(.carousel__prev) {
  left: 18px;
}
:deep(.carousel__next) {
  right: 18px;
}
:deep(.carousel__track) {
  margin: 0;
}
.carousel__pagination {
  margin: 0 !important;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
}
.carousel__pagination :deep(li) {
  margin: 0;
}
.carousel__pagination :deep(.carousel__pagination-button) {
  background-color: transparent;
  border: solid 3px #aaa292;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
.carousel__pagination :deep(.carousel__pagination-button--active) {
  background-color: #aaa292;
}
.content ol:not([type]) {
  list-style: none;
}
</style>
