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
export default {
  name: "Pagination",
  inject: ["searchModule"],
  data() {
    return {
      currentInput: 1,
    };
  },
  watch: {
    numPage: function () {
      this.currentInput = this.searchModule.state.numPage;
    },
    currentInput: function () {
      this.performAction(this.currentInput);
    },
  },
  created() {
    this.currentInput = this.searchModule.state.numPage;
  },
  methods: {
    search() {
      if (!this.searchModule.state.loading) {
        this.searchModule.performSearch();
      }
    },
    performAction(num) {
      if (!parseInt(num)) {
        num = 1;
      }
      if (num > this.searchModule.state.totalPageNum) {
        num = this.searchModule.state.totalPageNum;
      } else if (num < this.start) {
        num = this.start;
      }
      this.searchModule.setNumPage(num);
      this.search();
    },
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
