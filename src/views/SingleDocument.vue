<template>
  <div class="column is-9">
    Single document page '{{ docId }}'
    <document-metadata :id="docId" />
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
