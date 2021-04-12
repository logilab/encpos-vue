import useSimpleSearch from "@/composables/use-simple-search"

// const _baseApiURL = `${process.env.VUE_APP_ELASTICSEARCH_URL}`;

export default function useAggSearch() {
    const search = useSimpleSearch()
 
    return {search}
}