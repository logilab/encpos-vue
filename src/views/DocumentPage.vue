<template>
  <div class="column is-2">
    <div v-if="state.metadata">
      <document-metadata :metadata="state.metadata" />
      <liste-these-annee
        v-if="state.metadata['date']"
        :id="state.metadata['date']"
        :textid="docId"
      />
    </div>
  </div>
  <div class="column is-10">
    <document :id="docId" />
  </div>
</template>

<script>
import Document from "@/components/Document.vue";
import DocumentMetadata from "../components/DocumentMetadata.vue";
import { getMetadataFromApi } from "@/api/document";
import { toRefs, onMounted, watch, reactive } from "vue";
import ListeTheseAnnee from "@/components/ListeTheseAnnee.vue";

export default {
  name: "DocumentPage",
  components: {
    Document,
    DocumentMetadata,
    ListeTheseAnnee,
  },
  props: ["docId"],
  setup(props) {
    const { docId } = toRefs(props);
    let state = reactive({});

    const getMetadata = async () => {
      let metadata = {};
      const listmetadata = await getMetadataFromApi(docId.value);

      try {
        metadata["idref"] = listmetadata["dts:dublincore"]["dct:isPartOf"][0]["@id"];
      } catch {
        metadata["idref"] = null; // to be refactored
      }

      const extensions = listmetadata["dts:extensions"];
      if (extensions) {
        metadata["author"] = extensions["ns2:creator"];
        metadata["coverage"] = extensions["ns2:coverage"];
        metadata["date"] = extensions["ns2:date"];
      }

      state.metadata = metadata;
    };

    onMounted(() => {
      getMetadata();
    });

    watch(docId, () => {
      getMetadata();
    });

    return {
      state,
    };
  },
};
</script>
