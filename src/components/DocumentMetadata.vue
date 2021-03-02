<template>
  <div v-if="metadata">
    <aside class="menu is-hidden-mobile">
      <p class="menu-label">Positions de thèses</p>
      <ul class="menu-list" v-if="encpos">
        <li v-for="posannee in encpos['member']" :key="posannee['@id']"></li>
      </ul>
      <p class="menu-label">Metadata position</p>
      <ul class="menu-list">
        <li v-if="metadata['author']">Auteur: {{ metadata["author"] }}</li>
        <li v-if="metadata['coverage']">
          Période historique: {{ metadata["coverage"] }}
        </li>
        <li v-if="metadata['idref']">idref : {{ metadata["idref"] }}</li>
      </ul>
    </aside>

    <!--  <theseAnnee v-if="state['date']" :id="state['date']" :textid="id" /> -->
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { getMetadataENCPOSFromApi } from "@/api/document";
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

    const getMetadataENCPOS = async () => {
      encpos = await getMetadataENCPOSFromApi();
    };

    onMounted(() => {
      getMetadataENCPOS();
    });

    return {
      encpos,
    };
  },
};
</script>
