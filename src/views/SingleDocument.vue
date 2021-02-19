<template>
    <div class="column is-9 ">
      Single document page '{{ docId }}'
      <metada-document :id="docId"/>
      <document :id="docId" />
    </div>
</template>

<script>
import Document from "@/components/Document.vue";
import MetadaDocument from '../components/MetadaDocument.vue';

export default {
  name: "SingleDocument",
  components: {
    Document,
    MetadaDocument
  },
  props: ["docId"],
};
</script>
