<template>
  <div v-show="search.pageCount.value > 1">
    <span class="icon button" @click="goToPage(1)">
      <i class="fas fa-angle-double-left" />
    </span>
    <span class="icon button" @click="goToPage(currentInput - 1)">
      <i class="fas fa-arrow-left"></i>
    </span>
    <span class="pagination__button__input-box">
      <input v-model="currentInput" class="input is-medium" />
      <span> / {{ search.pageCount.value }}</span>
    </span>
    <span class="icon button" @click="goToPage(currentInput + 1)">
      <i class="fas fa-arrow-right" />
    </span>
    <span class="icon button" @click="goToPage(search.pageCount.value)">
      <i class="fas fa-angle-double-right"></i>
    </span>
  </div>
</template>
<script>
import { ref, inject, watch } from "vue";

export default {
  name: "Pagination",
  setup() {
    const search = inject("search");

    const start = 1;
    let currentInput = ref(start);

    const goToPage = function (num) {
      if (!parseInt(num)) {
        num = start;
      }

      if (num > search.pageCount.value) {
        num = search.pageCount.value;
      } else if (num < start) {
        num = start;
      }
      currentInput.value = num;

      if (search.pageNum !== num) {
        search.setPageNum(num);
        search.execute();
      }
    };

    watch(search.pageNum, () => {
      if (search.pageNum.value != currentInput.value) {
        currentInput.value = search.numPage.value;
      }
    });

    watch(currentInput, () => {
      goToPage(currentInput.value);
    });

    //currentInput.value = search.numPage.value || start;

    return { search, currentInput, goToPage };
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
