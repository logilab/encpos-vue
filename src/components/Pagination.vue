<template>
  <div v-show="pageCount > 1">
    <span class="icon button" @click="goToPage(1)">
      <i class="fas fa-angle-double-left" />
    </span>
    <span class="icon button" @click="goToPage(--currentInput)">
      <i class="fas fa-arrow-left"></i>
    </span>
    <span class="pagination__button__input-box">
      <input v-model="currentInput" class="input is-medium" />
      <span>sur</span>
      <span class="page-count">{{ pageCount }}</span>
    </span>
    <span class="icon button" @click="goToPage(++currentInput)">
      <i class="fas fa-arrow-right" />
    </span>
    <span class="icon button" @click="goToPage(pageCount)">
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

    console.log("pagination:", search.pageCount);

    const start = 1;
    let currentInput = ref(search.pageNum.value || start);

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
        currentInput.value = search.pageNum.value;
      }
    });

    watch(currentInput, () => {
      goToPage(currentInput.value);
    });

    //currentInput.value = search.numPage.value || start;

    return { pageCount: search.pageCount, currentInput, goToPage };
  },
};
</script>

<style scoped>
span {
  margin: 0 5px;
  font-family: "Barlow", sans-serif;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
  color: #979797;
  text-transform: uppercase;
}
.pagination__button__input-box .input,
span.page-count,
span.button {
  height: 47px;
  width: 47px;
  margin: 0 5px;
}
span.button {
  color: #FFF;
  background-color: #C3C3C3;
}
.page-count {
  display: inline-block;
  border: solid 1px #dbdbdb;
  background-color: #DFDFDF;
  border-radius: 4px;
  color: #9B9B9B;
  vertical-align: middle;
  line-height: 45px;
}
.pagination__button__input-box {
  margin: 0 5px;
}
span.page-count,
.pagination__button__input-box .input {
  font-family: "Barlow", sans-serif;
  font-size: 24px;
  font-weight: 800;
}
.pagination__button__input-box .input {
  color: #B9192F;
  border: solid 1px #B9192F;
  line-height: 1;
  padding-left: 2px;
  padding-right: 2px;
  text-align: center;
}
</style>
