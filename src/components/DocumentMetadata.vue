<template>
  <div v-if="state.metadata">
    {{ state.metadata["dts:extensions"]["ns2:coverage"] }}
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from "vue";
import { getMetadataFromApi } from "@/api/document";

export default {
  name: "DocumentMetadata",

  props: ["id"],

  setup(props) {
    let state = reactive({});
    const { id } = toRefs(props);

    const getMetadata = async () => {
      state.metadata = await getMetadataFromApi(id.value);
    };

    onMounted(getMetadata);

    watch(id, getMetadata);

    return {
      getMetadata,
      state,
    };
  },
};
</script>
