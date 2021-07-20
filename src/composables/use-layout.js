
import {ref, readonly} from "vue"

export default function useLayout() {

    const miradorVisible = ref(true);

    const setMiradorVisible = function(miradorV) {
        console.log("Test")
        console.log(miradorV.value)
        miradorVisible.value = miradorV;
      }

    return {
        miradorVisible: readonly(miradorVisible),
        setMiradorVisible,
    }
}