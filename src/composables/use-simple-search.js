import { reactive, readonly, ref, watchEffect, computed } from 'vue'
import { debounce } from 'lodash'
import useApi from '@/composables/use-api'

const _baseApiURL = `${import.meta.env.VITE_ELASTICSEARCH_URL}`

export default function useSimpleSearch () {
  const api = useApi()

  const term = ref('')
  const ranges = reactive({})
  const sorts = ref('')
  const pageNum = ref(1)
  const pageSize = ref(25)
  const pageCount = computed(() => {
    return Math.ceil(totalCount.value / pageSize.value)
  })
  const result = ref()
  const totalCount = ref(0)
  const noHighlight = ref(false)

  const setTerm = function (t) {
    term.value = t
  }
  const setRange = function (key, ops) {
    ranges[key] = ops
  }
  const setSorts = function (s) {
    sorts.value = s
  }
  const setPageNum = function (num) {
    pageNum.value = num
  }
  const setNoHighlight = function (b) {
    noHighlight.value = b
  }

  function updateQuery () {
    let rangesArg = ''
    for (const rangeName in ranges) {
      rangesArg += `&range[${rangeName}]=${ranges[rangeName]}`
    }

    let sortArg = ''
    if (sorts.value) {
      sortArg = '&sort=' + sorts.value
    }

    const highlight = noHighlight.value ? '&no-highlight' : ''
    const termValue = term.value ? term.value : '***'

    api.setQuery(`${_baseApiURL}/search?query=${termValue}${sortArg}${rangesArg}&page[number]=${pageNum.value || 1}&page[size]=${pageSize.value}${highlight}`)
  }

  watchEffect(updateQuery, { flush: 'post' })

  const execute = debounce(async function () {
    if (api.query.value) {
      await api.runQuery()
      if (api.error.value) {
        console.log('api error', api.error.value)
      } else {
        const _res = api.result.value
        result.value = _res.data
        totalCount.value = _res['total-count']
      }
    }
  }, 150)

  return {
    term: readonly(term),
    ranges: readonly(ranges),
    sorts: readonly(sorts),
    pageNum: readonly(pageNum),
    pageSize: readonly(pageSize),
    pageCount,
    noHighlight: readonly(noHighlight),
    setTerm,
    setRange,
    setSorts,
    setPageNum,
    setNoHighlight,
    execute,
    loading: readonly(api.loading),
    result: readonly(result),
    totalCount: readonly(totalCount),
    error: readonly(api.error)
  }
}
