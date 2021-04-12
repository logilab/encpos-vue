import {reactive, readonly, ref, watch} from "vue"
import { debounce } from "lodash";
import useApi from "@/composables/use-api"

const _baseApiURL = `${process.env.VUE_APP_ELASTICSEARCH_URL}`;

export default function useSimpleSearch() {
    const api = useApi()
    
    const term = ref("")
    const ranges = reactive({})
    const sorts = ref("")
    const pageNum = ref(1)
    const pageSize = ref(40)

    const result = ref()
    const totalCount = ref(0)

    const setTerm = function(t) {
        term.value = t  
    }
    const setRange = function(key, ops) {
        ranges[key] = ops 
    }
    const setSorts = function(s) {
        sorts.value = s 
    }
    const setPageNum = function(num) {
        pageNum.value = num  
    }

    function updateQuery() {
        let rangesArg = ''
        for (let rangeName in ranges){
            rangesArg += `&range[${rangeName}]=${ranges[rangeName]}`
        }
    
        let sortArg = ''
        if (sorts.value) {
            sortArg = '&sort=' + sorts.value
        }

        api.query.value = `${_baseApiURL}/search?query=${term.value}${sortArg}${rangesArg}&page[number]=${pageNum.value || 1}&page[size]=${pageSize.value}`
    }

    watch([term, ranges, sorts, pageNum, pageSize], updateQuery)

    const execute = debounce(async function() {
        if (term.value.length >= 2 && api.query.value){
            console.log("simple search execution", api.query.value)
            await api.runQuery()
            if (api.error.value) {
                console.log("api error", api.error.value)
            } else {
                const _res = api.result.value
                result.value = _res.data
                totalCount.value =  _res['total-count']
                console.log("result:", result.value, totalCount.value)
            }
        }
    }, 150)

    return {
        term: readonly(term),
        ranges: readonly(ranges),
        sorts: readonly(sorts),
        pageNum: readonly(pageNum),
        pageSize: readonly(pageSize),
        setTerm,
        setRange,
        setSorts,
        setPageNum,
        execute,
        loading: readonly(api.loading),
        result: readonly(result),
        totalCount: readonly(totalCount),
        error: readonly(api.error)
    }
}