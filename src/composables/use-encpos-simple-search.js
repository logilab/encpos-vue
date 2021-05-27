import { readonly, ref} from "vue"

import useSimpleSearch from "@/composables/use-simple-search"


export default function useEncposSimpleSearch() {
    const search = useSimpleSearch()

    const isFulltextSearch = ref(true)

    const setIsFulltextSearch = function(t) {
        isFulltextSearch.value = t  
    }

    return {
        term: search.term,
        ranges: search.ranges,
        sorts: search.sorts,
        pageNum: search.pageNum,
        pageSize: search.pageSize,
        isFulltextSearch : readonly(isFulltextSearch),
        pageCount: search.pageCount,
        setTerm: search.setTerm,
        setRange: search.setRange,
        setSorts: search.setSorts,
        setPageNum: search.setPageNum,
        setIsFulltextSearch,
        execute: search.execute,
        loading: search.loading,
        result: search.result,
        totalCount: search.totalCount,
        error: search.error
    }
}