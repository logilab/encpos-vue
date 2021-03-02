<template>
  <div v-if="state">
    <aside class="menu is-hidden-mobile">
      <p class="menu-label">Positions de thèses</p>
      <ul class="menu-list" v-if="encpos.metadata">
        <li v-for="posannee in encpos.metadata['member']" :key="posannee['@id']"></li>
      </ul>
      <p class="menu-label">Metadata position</p>
      <ul class="menu-list">
        <li>Auteur: {{ state["author"] }}</li>
        <li v-if="state['coverage']">Période historique: {{ state["coverage"] }}</li>
        <li v-if="state['idref'] !== 'Test'">idref : {{ state["idref"] }}</li>
      </ul>
    </aside>

    <theseAnnee v-if="state['date']" :id="state['date']" :textid="id" />
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from "vue";
import { getMetadataFromApi, getMetadataENCPOSFromApi } from "@/api/document";
import theseAnnee from "@/components/ListeTheseAnnee.vue";

export default {
  name: "DocumentMetadata",

  components: {
    theseAnnee,
  },

  props: ["id"],

  setup(props) {
    let state = reactive({});
    let encpos = reactive({});
    const { id } = toRefs(props);

    const getMetadata = async () => {
      const listmetadata = await getMetadataFromApi(id.value);

      try {
        state["idref"] = listmetadata["dts:dublincore"]["dct:isPartOf"][0]["@id"];
      } catch {
        state["idref"] = "Test";
      }

      try {
        state["author"] = listmetadata["dts:extensions"]["ns2:creator"];
      } catch {
        state["author"] = null;
      }

      try {
        state["coverage"] = listmetadata["dts:extensions"]["ns2:coverage"];
      } catch {
        state["coverage"] = null;
      }

      try {
        state["date"] = listmetadata["dts:extensions"]["ns2:date"];
      } catch {
        state["date"] = null;
      }
    };

    const getMetadataENCPOS = async () => {
      encpos.metadata = await getMetadataENCPOSFromApi();
    };

    onMounted(() => {
      getMetadata();
      getMetadataENCPOS();
    });

    watch(id, () => {
      getMetadata();
    });

    return {
      state,
      encpos,
    };
  },
};
</script>
