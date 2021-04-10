import { reactive, readonly } from "vue";
import { searchDocument } from "@/api/elasticsearch";
import { debounce } from "lodash";

const state = reactive({
    searchTerm: null,
    year: [1849, 2017],
    date_sujet: [-500, 2000],
    listPosition: [],
    sorts: "",
    numPage: 1,
    pageSize: 15,
    totalPageNum: 1,
    resultSearch: 0,

    loading: false
});

const setSearchTerm = function(term) {
    state.searchTerm = term
}

const clearSearchTerm = function() {
  setSearchTerm(null)
}

const setNumPage = function(num) {
    state.numPage = num
}

const setSelectedListPosition = function(listPos) {
    state.listPosition = listPos
}

const setSelectedYear = function(year) {
    state.year = year
}

const setSelecteDateSujet = function(dateSujet){
    state.date_sujet = dateSujet
}

const setSelecteRangeSujet = function(rangeSorts){
    state.rangeSorts = rangeSorts
}

const performSearch = debounce(async function() {
    if (state.searchTerm) {
      state.loading = true
      // todo: le paramètre ranges peut devenir un champ computed du state
      const ranges = [
        {
          field: "metadata.promotion_year",
          ops: "gte:" + state.year[0] + ",lte:" + state.year[1],
        },
        {
          field: "metadata.topic_notAfter",
          ops: "lte:" + state.date_sujet[1]
        },
        {
          field: "metadata.topic_notBefore",
          ops: "gte:" + state.date_sujet[0]
        }
      ]
      const result = await searchDocument(
        state.searchTerm,
        state.sorts,
        ranges,
        state.numPage,
        100
      );
      state.totalPageNum = Math.ceil(result["total-count"] / 100);
      state.resultSearch = result["total-count"];
      state.listPosition = [];
      for (var position of result.data) {
        state.listPosition.push(position);
      }

      state.loading = false
    }
  },500)

export default { 
    state: readonly(state),
    performSearch,
    clearSearchTerm,
    setSearchTerm,
    setSelecteDateSujet,
    setSelecteRangeSujet,
    setSelectedListPosition,
    setSelectedYear,
    setNumPage
};