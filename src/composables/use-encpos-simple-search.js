import { readonly, ref } from 'vue'

import useSimpleSearch from '@/composables/use-simple-search'

export default function useEncposSimpleSearch () {
  const search = useSimpleSearch()

  const isFulltextSearch = ref(true)

  const setIsFulltextSearch = function (t) {
    isFulltextSearch.value = t
  }

  const isResultTableMode = ref(true)

  search.setSorts('-metadata.promotion_year')

  return {
    term: search.term,
    ranges: search.ranges,
    sorts: search.sorts,
    pageNum: search.pageNum,
    pageSize: search.pageSize,
    noHighlight: search.noHighlight,
    isFulltextSearch: readonly(isFulltextSearch),
    isResultTableMode,
    pageCount: search.pageCount,
    setTerm: search.setTerm,
    setRange: search.setRange,
    setSorts: search.setSorts,
    setPageNum: search.setPageNum,
    setNoHighlight: search.setNoHighlight,
    setIsFulltextSearch,
    execute: search.execute,
    loading: search.loading,
    result: search.result,
    totalCount: search.totalCount,
    error: search.error
  }
}
