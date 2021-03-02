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
      var namespacedt = "";
      console.log(typeof listmetadata["@context"]);
      for (const namespace in listmetadata["@context"]){
          if (listmetadata["@context"][namespace]==="http://purl.org/dc/elements/1.1/"){
            namespacedt = namespace;
          }
      }
      console.log(namespacedt);
      try {
        metadata["idref"] = listmetadata["dts:dublincore"]["dct:isPartOf"][0]["@id"];
      } catch {
        metadata["idref"] = null; // to be refactored
      }

      const extensions = listmetadata["dts:extensions"];
      if (extensions) {
        metadata["author"] = extensions[namespacedt+":creator"];
        metadata["coverage"] = extensions[namespacedt+":coverage"];
        metadata["date"] = extensions[namespacedt+":date"];
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
