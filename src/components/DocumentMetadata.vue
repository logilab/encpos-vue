<template>
  <aside class="menu is-hidden-mobile" v-if="state.metadata">
    <p class="menu-label">Positions de thèses</p>
    <ul class="menu-list" v-if="encpos">
      <li v-for="posannee in encpos.metadata['member']" :key="posannee['@id']">
      {{posannee['@id'].split("_")[1]}}
      </li>
    </ul>
    <p class="menu-label">Metadata position</p>
    <ul class="menu-list">
        <li>Auteur: {{ state.metadata["dts:extensions"]["ns1:creator"] }}</li>
        <li v-if="state.metadata['dts:extensions']['ns1:coverage']">Période historique: {{ state.metadata["dts:extensions"]["ns1:coverage"] }}</li>
        <li v-if="state.metadata['dts:dublincore']['dct:isPartOf'][0]['@id']"> idref : {{ state.metadata["dts:dublincore"]["dct:isPartOf"][0]["@id"] }}</li>
    </ul>
    <theseAnnee :id ="state.metadata['dts:extensions']['ns1:date']" />

  </aside>
  <div>

  </div>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from "vue";
import { getMetadataFromApi, getMetadataENCPOSFromApi } from "@/api/document";
import theseAnnee from "@/components/ListeTheseAnnee.vue";


export default {
  name: "DocumentMetadata",

  components: {
    theseAnnee
  },

  props: ["id"],

  setup(props) {
    let state = reactive({});
    let these_annee = reactive({});
    let encpos = reactive({});
    const { id } = toRefs(props);

    const getMetadata = async () => {
      state.metadata = await getMetadataFromApi(id.value);
    }; 

    const getMetadataENCPOS= async () =>{
      encpos.metadata = await getMetadataENCPOSFromApi();
    };


    onMounted(() => {
      getMetadata();
      getMetadataENCPOS();

    });

    watch(id, ()=> {
      getMetadata();
      });

    return {
      state,
      these_annee,
      encpos
    };
  },
};
</script>
