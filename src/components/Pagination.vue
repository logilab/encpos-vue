<template>
  <div v-show="search.totalPageNum > 1">
    <span class="icon button" @click="performAction(1)">
      <i class="fas fa-angle-double-left" />
    </span>
    <span class="icon button" @click="performAction(parseInt(search.numPage) - 1)">
      <i class="fas fa-arrow-left"></i>
    </span>
    <span class="pagination__button__input-box">
      <input v-model="currentInput" class="input is-medium" />
      <span> / {{ search.totalPageNum }}</span>
    </span>
    <span class="icon button" @click="performAction(parseInt(search.numPage) + 1)">
      <i class="fas fa-arrow-right" />
    </span>
    <span class="icon button" @click="performAction(search.totalPageNum)">
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
    const search = inject("search");

    const performAction = function (num) {
      if (!parseInt(num)) {
        num = start;
      }
      if (num > search.totalPageNum) {
        num = search.totalPageNum;
      } else if (num < start) {
        num = start;
      }
      search.setPageNum(num);
      if (!search.loading) {
        search.execute();
      }
    };

    watch(search.pageNum, () => {
      if (search.pageNum != currentInput.value) {
        currentInput.value = search.numPage;
      }
    });

    watch(
      () => currentInput,
      () => {
        performAction(currentInput);
      }
    );

    return { search, currentInput, performAction };
  },
  created() {
    this.currentInput = this.search.numPage;
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
