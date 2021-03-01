<template>
  <aside class="menu is-hidden-mobile" v-if="state">
    <p class="menu-label">Positions de thèses</p> 
    <ul class="menu-list" v-if="encpos">
      <li v-for="posannee in encpos.metadata['member']" :key="posannee['@id']">
      {{posannee['@id'].split("_")[1]}}
      </li>
    </ul>
    <p class="menu-label">Metadata position </p>
    <ul class="menu-list">
        <li>Auteur: {{ state["author"] }}</li>
        <li v-if="state['coverage']">Période historique: {{ state["coverage"] }}</li>
        <li v-if="state['idref'] !== 'Test'"> idref : {{ state["idref"] }}</li>
    </ul>
    <theseAnnee v-if="state['date']" :id ="state['date']" :textid="id"/>

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
    let encpos = reactive({});
    const { id } = toRefs(props);

    const getMetadata = async () => {
      var listmetadata;
      listmetadata = await getMetadataFromApi(id.value);
      if (typeof listmetadata["dts:dublincore"]["dct:isPartOf"][0]["@id"] !== 'undefined'){
        state["idref"] = listmetadata["dts:dublincore"]["dct:isPartOf"][0]["@id"];
      } else {
        state["idref"] = "Test";
      }
      if (typeof listmetadata["dts:extensions"]["ns2:creator"] !== 'undefined'){
        state["author"] = listmetadata["dts:extensions"]["ns2:creator"];
      }
      if (typeof listmetadata['dts:extensions']['ns2:coverage'] !== 'undefined'){
        state["coverage"] = listmetadata['dts:extensions']['ns2:coverage'];
      } else {
        state["coverage"] = "";
      }
      if (typeof listmetadata['dts:extensions']['ns2:date'] !== 'undefined'){
        state["date"] = listmetadata['dts:extensions']['ns2:date'];
      }
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
      encpos
    };
  },
};
</script>
