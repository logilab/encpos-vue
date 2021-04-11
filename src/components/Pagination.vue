<template>
  <div v-show="searchModule.state.totalPageNum > 1">
    <span class="icon button" @click="performAction(1)">
      <i class="fas fa-angle-double-left" />
    </span>
    <span
      class="icon button"
      @click="performAction(parseInt(searchModule.state.numPage) - 1)"
    >
      <i class="fas fa-arrow-left"></i>
    </span>
    <span class="pagination__button__input-box">
      <input v-model="currentInput" class="input is-medium" />
      <span> / {{ searchModule.state.totalPageNum }}</span>
    </span>
    <span
      class="icon button"
      @click="performAction(parseInt(searchModule.state.numPage) + 1)"
    >
      <i class="fas fa-arrow-right" />
    </span>
    <span class="icon button" @click="performAction(searchModule.state.totalPageNum)">
      <i class="fas fa-angle-double-right"></i>
    </span>
  </div>
</template>
<script>
import { ref, inject, watch } from "vue";

export default {
  name: "Pagination",
  setup() {
    const start = 1;
    let currentInput = ref(start);
    const searchModule = inject("searchModule");

    const performAction = function (num) {
      if (!parseInt(num)) {
        num = start;
      }
      if (num > searchModule.state.totalPageNum) {
        num = searchModule.state.totalPageNum;
      } else if (num < start) {
        num = start;
      }
      searchModule.setNumPage(num);
      if (!searchModule.state.loading) {
        searchModule.performSearch();
      }
    };

    watch(searchModule.state, () => {
      if (searchModule.state.numPage != currentInput.value) {
        currentInput.value = searchModule.state.numPage;
      }
    });

    watch(
      () => currentInput,
      () => {
        performAction(currentInput);
      }
    );

    return { searchModule, currentInput, performAction };
  },
  created() {
    this.currentInput = this.searchModule.state.numPage;
  },
};
</script>

<style>
span.button {
  height: 26px;
  width: 40px;
  margin: 4px;
}
.pagination__button__input-box {
  margin-right: 16px;
  margin-left: 16px;
  line-height: 2.15;
}
.pagination__button__input-box .input {
  margin: 4px;
  width: 50px;
  height: 26px;
}
</style>
