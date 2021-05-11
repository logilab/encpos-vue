<template>
  <div>
    <div v-if="document" v-html="document" id="card-content"></div>
  </div>
</template>

<script>
import { ref, toRefs, watch } from "vue";
import { getDocumentFromApi } from "@/api/document";

export default {
  name: "Document",

  props: ["id"],

  setup(props) {
    const { id } = toRefs(props);
    const document = ref("");

    const getDocument = async () => {
      document.value = await getDocumentFromApi(id.value);
    };

    getDocument();

    watch(id, getDocument);

    return {
      document,
      getDocument,
    };
  },
};
</script>
<style scoped>
@import "../assets/css/html.css";
@import "../assets/css/postprod.css";
</style>
