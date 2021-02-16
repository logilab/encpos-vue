<template>
  <div class="document-container">
    Single document page '{{ docId }}'
    <document :id="docId" />
  </div>
</template>

<script>
import Document from "@/components/Document.vue";

export default {
  name: "SingleDocument",
  components: {
    Document,
  },
  props: ["docId"],
};
</script>
