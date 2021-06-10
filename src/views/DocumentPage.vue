<template>
  <div class="columns">
    <div class="column is-2">
      <div v-if="state.metadata" class="hide-button ListeData">
        <document-metadata :metadata="state.metadata" />
        <liste-these-annee
          v-if="state.metadata['date']"
          :id="state.metadata['date']"
          :textid="docId"
        />
      </div>
    </div>
    <div class="column">
      <Suspense>
        <document :id="docId" :key="docId" />
      </Suspense>
    </div>
    <div v-show="manifestIsAvailable" class="column is-4 Mirador">
      <div id="vue-mirador-container" />
      <!-- <mirador-viewer :textid="docId" /> -->
    </div>
  </div>
</template>

<script>
import { provide, computed, ref } from "vue";

import Document from "@/components/Document.vue";
import DocumentMetadata from "../components/DocumentMetadata.vue";
import { getMetadataFromApi } from "@/api/document";
import { toRefs, onMounted, watch, reactive } from "vue";
import ListeTheseAnnee from "@/components/ListeTheseAnnee.vue";

import useMirador from "@/composables/use-mirador";

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
    const manifestIsAvailable = ref(false);

    let state = reactive({});

    const manifestUrl = computed(() => {
      return `https://iiif.chartes.psl.eu/encpos/${docId.value
        .toString()
        .toLowerCase()}/manifest`;
    });

    const miradorInstance = useMirador("vue-mirador-container", manifestUrl.value, 0);
    provide("mirador", miradorInstance);

    const getMetadata = async () => {
      let metadata = {};
      const listmetadata = await getMetadataFromApi(docId.value);

      metadata["sudoc"] = null;
      metadata["benc"] = null;
      var PartOf;
      try {
        PartOf = listmetadata["dts:dublincore"]["dct:isVersionOf"];
      } catch {
        PartOf = "";
      }
      if (PartOf !== undefined) {
        for (const member of PartOf) {
          if (typeof member === "object") {
            metadata["sudoc"] = member["@id"];
          } else if (member.includes("benc")) {
            metadata["benc"] = member;
          }
        }
      }

      const dublincore = listmetadata["dts:dublincore"];
      if (dublincore){
        metadata["date"] = dublincore["dct:date"]
        for (let aut of dublincore["dct:creator"]){
            if(typeof aut == "string"){
              metadata["author"] = aut;
            } else if (aut["@id"].includes("data.bnf.fr")){
              metadata["data_bnf"] = aut["@id"];
            } else if (aut["@id"].includes("dbpedia.org")){
              metadata["dbpedia"] = aut["@id"];
            } else if (aut["@id"].includes("idref.fr")){
              metadata["idref"] = aut["@id"];
            } else if (aut["@id"].includes("catalogue.bnf.fr")){
              metadata["catalogue_bnf"] = aut["@id"];
            } else if (aut["@id"].includes("wikidata")){
              metadata["wikidata"] = aut["@id"];
            } else if (aut["@id"].includes("wikipedia")){
              metadata["wikipedia"] = aut["@id"];
            }
          }
       }

      state.metadata = metadata;
    };

    const setMirador = function () {
      fetch(manifestUrl.value, {
        method: "HEAD",
      })
        .then((r) => {
          manifestIsAvailable.value = r.ok;
          miradorInstance.setManifestUrl(manifestUrl.value);
        })
        .catch(() => {
          manifestIsAvailable.value = false;
        });
    };

    onMounted(async () => {
      getMetadata();
      setMirador();
    });

    watch(manifestUrl, async () => {
      setMirador();
    });

    watch(docId, async () => {
      getMetadata();
    });

    return {
      state,
      manifestIsAvailable,
      manifestUrl,
    };
  },
};
</script>
