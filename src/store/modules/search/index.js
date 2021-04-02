import { searchDocument } from "@/api/elasticsearch";

const state = {
  searchTerm: null,
  year: [1849, 2017],
  date_sujet: [-500, 2000],
  listPosition: [],
  numPage: 1,
  pageSize: 15,
  totalPageNum: 1
};


const mutations = {
  SET_SEARCH_TERM(state, term) {
    state.searchTerm = term;
  },
  SET_NUM_PAGE(state, num) {
    state.numPage = num;
  },
  SET_SELECTED_LIST_POSITION(state, listPos) {
    state.listPosition = listPos;
  },
  SET_YEAR(state, y){
    state.year = y;
  },
  SET_DATE_SUJET(state, dateSujet){
    state.date_sujet = dateSujet;
  }
};

const actions = {
  setSearchTerm({commit}, term) {
    commit('SET_SEARCH_TERM', term);
  },
  clearSearchTerm({commit}) {
    commit('SET_SEARCH_TERM', null)
  },
  setNumPage({commit}, num) {
    commit('SET_NUM_PAGE', num)
  },
  setSelectedListPosition({commit}, listPos) {
    commit('SET_SELECTED_LIST_POSITION', listPos)
  },
  setSelectedYear({commit}, y) {
    commit('SET_YEAR', y)
  },
  setSelecteDateSujet({commit}, dateSujet){
    commit('SET_DATE_SUJET', dateSujet)
  },
  async performSearch ({state}) {
    if (state.searchTerm) {
      const result = await searchDocument(
        state.searchTerm,
        "-metadata.promotion_year",
        [
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
        ],
        state.numPage,
        100
      );
      state.totalPageNum = Math.ceil(result["total-count"] / 100);
      state.listPosition = [];
      for (var position of result.data) {
        state.listPosition.push(position);
      }
    }
  }
};



const searchModule = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default searchModule;
