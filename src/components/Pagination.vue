<template>
    <div v-show="totalPageNum > 1">
        <span
            class="icon button"
            :disabled="documentLoading"
            @click="performAction(1)"
        >
            <i class="fas fa-arrow-left" />
        </span>
        <span
            class="icon button"
            :disabled="documentLoading"
            @click="performAction(parseInt(numPage)-1)"
        >
            <i class="fas fa-angle-double-left"></i>
        </span>
        <span class="pagination__button__input-box">
            <input
            v-model="currentInput"
            class="input"
            :disabled="documentLoading"
            >
            <span> / {{ totalPageNum }}</span>
        </span>
        <span
            class="icon button"
            :disabled="documentLoading"
            @click="performAction(parseInt(numPage)+1)"
        >
            <i class="fas fa-arrow-right" />
        </span>
        <span
            class="icon button"
            :disabled="documentLoading"
            @click="performAction(totalPageNum)"
        >
        <i class="fas fa-angle-double-right"></i>
    </span>
    </div>
</template>
<script>
import { mapState, mapActions} from "vuex";

export default {
  name: "Pagination",
  props: {},
  data() {
    return {
      currentInput: 1
    };
  },
  computed: {
    ...mapState("search", ["numPage", "pageSize","totalPageNum"]),
  },
  watch: {
    numPage: function() {
      this.currentInput = this.numPage;
    },
    currentInput:  function() {
      this.performAction(this.currentInput);
    }
  },
  created() {
    this.currentInput = this.numPage;
  },
  methods: {
    ...mapActions("search", ["performSearch", "setSearchTerm", "setNumPage"]),
    search() {
      if (!this.documentLoading) {
        this.performSearch();
      }
    },
    performAction(num){
      if (!parseInt(num)) {
        num = 1;
      }
      if (num > this.totalPageNum) {
        num = this.totalPageNum;
      } else if (num < this.start) {
        num = this.start;
      }
      this.setNumPage(num);
      this.search();
    }
  }
};
</script>

