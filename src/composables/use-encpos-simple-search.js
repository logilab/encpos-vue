import { readonly, ref} from "vue"

import useSimpleSearch from "@/composables/use-simple-search"


export default function useEncposSimpleSearch() {
    const search = useSimpleSearch()

    const isFulltextSearch = ref(true)

    const setIsFulltextSearch = function(t) {
        isFulltextSearch.value = t  
    }

    return {
        term: readonly(search.term),
        ranges: readonly(search.ranges),
        sorts: readonly(search.sorts),
        pageNum: readonly(search.pageNum),
        pageSize: readonly(search.pageSize),
        isFulltextSearch : readonly(isFulltextSearch),
        pageCount: readonly(search.pageCount),
        setTerm: search.setTerm,
        setRange: search.setRange,
        setSorts: search.setSorts,
        setPageNum: search.setPageNum,
        setIsFulltextSearch,
        execute: search.execute,
        loading: readonly(search.loading),
        result: readonly(search.result),
        totalCount: readonly(search.totalCount),
        error: readonly(search.error)
    }
}