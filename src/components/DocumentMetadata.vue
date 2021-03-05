<template>
  <div v-if="metadata">
    <aside class="menu is-hidden-mobile">
      <p class="menu-label">Metadata position</p>
      <ul class="menu-list">
        <li v-if="metadata['author']">Auteur: {{ metadata["author"] }}</li>
        <li v-if="metadata['title']">Titre: {{ metadata["title"] }}</li>
        <li v-if="metadata['coverage']">
          Période historique: {{ metadata["coverage"] }}
        </li>
        <li v-if="metadata['sudoc']">sudoc : {{ metadata["sudoc"] }}</li>
        <li v-if="metadata['benc']">{{ metadata["benc"] }}</li>
        <li v-if="metadata['idref']">idref : {{ metadata["idref"] }}</li>
      </ul>
    </aside>

    <!--  <theseAnnee v-if="state['date']" :id="state['date']" :textid="id" /> -->
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
//import theseAnnee from "@/components/ListeTheseAnnee.vue";

export default {
  name: "DocumentMetadata",

  components: {
    //   theseAnnee,
  },

  props: ["metadata"],

  setup() {
    //let state = reactive({});
    let encpos = reactive({});


    onMounted(() => {
    });

    return {
      encpos,
    };
  },
};
</script>
