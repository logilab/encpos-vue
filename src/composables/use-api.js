
import {reactive, toRefs} from "vue"

export default function useApi() {
    const state = reactive({
        result: null,
        error: null,
        loading: false,
        query: ""
    })

    const clear = function(){
        state.result = null
        state.error = null
        state.loading = false
        state.query = ""
    }

    const runQuery = async function(json=true){
        state.loading = true
        state.error = null
        console.log("runQuery", state.query)
        try {
            const response = await fetch(state.query, {mode: 'cors'})
            state.result = json ? await response.json() : await response.text()
        } catch (e) {
            state.error = e
        } finally {
            state.loading = false
        }
    }

    return {
        ...toRefs(state),
        runQuery,
        clear
    }
}