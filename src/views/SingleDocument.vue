<template>
  <div class="column is-2">
    <document-metadata :id="docId" />
  </div>
    <div class="column is-10">
    <document :id="docId" />
  </div>
</template>

<script>
import Document from "@/components/Document.vue";
import DocumentMetadata from "../components/DocumentMetadata.vue";

export default {
  name: "SingleDocument",
  components: {
    Document,
    DocumentMetadata,
  },
  props: ["docId"],
};
</script>
