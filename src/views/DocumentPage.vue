<template>
  <div class="is-flex is-flex-direction-column">
    <div v-if="metadata">
      <liste-these-annee
              v-if="metadata.date"
              class="liste-theses-area app-width-padding"
              :id="metadata.date"
              :textid="$route.params.docId"
      />
      <document-metadata :metadata="metadata" class="metadata-area app-width-margin" />
    </div>
    <div class="toc-area app-width-margin" :class="tocCssClass">
      <div class="toc-area-header" >
        <a href="#" v-on:click="toggleTOCContent">SOMMAIRE</a>
        <a href="#" class="toggle-btn" v-on:click="toggleTOCContent"></a>
      </div>
      <div id="toc-area" class="toc-area-content" />
    </div>
    <div class="document-area is-flex app-width-margin">
      <div id="toc-area-aside" class="toc-area-aside" />
      <document :id="$route.params.docId" :key="$route.params.docId" />
    </div>
    <div v-if="metadata.iiifManifestUrl != ''" id="vue-mirador-container" class="mirador-container-area" />
    <div v-else></div>
  </div>
</template>

<script>
import Document from "@/components/Document.vue";
import DocumentMetadata from "../components/DocumentMetadata.vue";
import { getMetadataFromApi } from "@/api/document";
import { watch, reactive, provide, ref } from "vue/dist/vue.esm-bundler.js";

import { onBeforeRouteUpdate, useRoute } from "vue-router";

import ListeTheseAnnee from "@/components/ListeTheseAnnee.vue";

import useMirador from "@/composables/use-mirador";
import {computed} from "vue";

const sources = [
  { name: "data_bnf", ext: "data.bnf.fr" },
  { name: "dbpedia", ext: "dbpedia.org" },
  { name: "idref", ext: "idref.fr" },
  { name: "catalogue_bnf", ext: "catalogue.bnf.fr" },
  { name: "wikidata", ext: "wikidata" },
  { name: "wikipedia", ext: "wikipedia" },
  { name: "thenca", ext: "thenca" },
  {},
];

function findSource(id) {
  let i = 0;
  let source = null;

  do {
    source = id.includes(sources[i].ext) ? sources[i] : null;
    i++;
  } while (i < sources.length && source === null);

  if (source) {
    return source.name;
  }

  return null;
}

export default {
  name: "DocumentPage",
  components: {
    Document,
    DocumentMetadata,
    ListeTheseAnnee,
  },
  async setup() {
    let state = reactive({
      isTOCOpened: false
    });

    const manifestIsAvailable = ref(false);

    const tocCssClass = computed(() => {
      return state.isTOCOpened ? "is-opened" : "";
    });

    const toggleTOCContent = function (event) {
      event.preventDefault();
      state.isTOCOpened = !state.isTOCOpened;
    };

    const metadata = reactive({
      sudoc: null,
      benc: null,
      thenca: null,
      iiifManifestUrl: null,

      author: null,
      data_bnf: null,
      dbpedia: null,
      idref: null,
      catalogue_bnf: null,
      wikidata: null,
      wikipedia: null,
    });
    const miradorInstance = useMirador("vue-mirador-container", null, 0);
    // provide an uninitialized instance of Mirador
    provide("mirador", miradorInstance);

    const getMetadata = async (docId) => {

      const listmetadata = await getMetadataFromApi(docId);

      const dublincore = listmetadata["dts:dublincore"];
      try {
        metadata.iiifManifestUrl = dublincore["dct:source"][0]["@id"];
      } catch {
        metadata.iiifManifestUrl = "";
      }
      metadata.date = dublincore["dct:date"];

      if (dublincore) {
        // reset the sources
        for (let s of sources) {
          metadata[s.name] = null;
        }

        // benc & sudoc & thenca
        if (dublincore["dct:isVersionOf"]) {
          for (const member of dublincore["dct:isVersionOf"]) {
            if (member["@id"]) {
              const source = findSource(member["@id"]);
              if (source) {
                metadata[source] = member["@id"];
                console.log("source found:", source, member["@id"]);
              }
            }
          }
        }

        // creators
        for (let aut of dublincore["dct:creator"]) {
          if (aut["@id"]) {
            // find the source name from its extension
            const source = findSource(aut["@id"]);
            if (source) {
              metadata[source] = aut["@id"];
              console.log("source found:", source, aut["@id"]);
            }
          } else {
            metadata.author = aut;
          }
        }
      }
    };

    const setMirador = function () {
      if (metadata.iiifManifestUrl) {
        fetch(metadata.iiifManifestUrl, {
          method: "HEAD",
        })
          .then((r) => {
            if (manifestIsAvailable.value === false){
              miradorInstance.initialize();
            }
            manifestIsAvailable.value = r.ok;
            miradorInstance.setManifestUrl(metadata.iiifManifestUrl);
          })
          .catch(() => {
            manifestIsAvailable.value = false;
          });
      } else {
        manifestIsAvailable.value = false;
      }
    };

    watch(
      () => metadata.iiifManifestUrl,
      async () => {
        setMirador();
      }
    );

    onBeforeRouteUpdate(async (to) => {
      getMetadata(to.params.docId);
    });

    const route = useRoute();
    await getMetadata(route.params.docId);

    return {
      state,
      tocCssClass,
      toggleTOCContent,
      metadata,
      manifestIsAvailable,
    };
  },
};
</script>

<style>
  .liste-theses-area {
    background-color: #FBF8F4;
    padding-top: 50px;
    padding-bottom: 50px;
    margin-bottom: 28px;
  }
  .metadata-area {
    background-color: #E4E4E4;
    border-radius: 6px;
    margin-bottom: 15px !important;
  }
  .metadata-area .columns {
    margin: 0;
  }
  .document-area {
  }
  .toc-area {
    width: 100%;
    font-family: "Barlow", sans-serif !important;
  }
  .toc-area-header {
    display: flex;
    width: 100%;
    padding: 20px;
    background-color: #F1F1F1;
    border-radius: 6px;
    position: relative;
  }
  .toc-area-header > a {
    text-decoration: none;
    border: none;
  }
  .toc-area-content {
    background-color: #E4E4E4;
    border-radius: 0 0 6px 6px;
    display: none;
  }
  .toc-area.is-opened .toc-area-header {
    background-color: #F1F1F1;
    border-radius: 6px 6px 0 0;
  }
  .toc-area.is-opened .toc-area-content {
    display: block;
  }
  .toc-area .toc-area-content aside {
    width: 100% !important;
    padding: 20px 50px !important;
  }
  .toc-area .toc-area-content nav > ol.tree {
    columns: 4;
    gap: 40px;
  }
  .toc-area .toc-area-content > aside > nav > nav > ol.tree > li {
    text-transform: uppercase;
    margin-bottom: 20px;
    padding: 0;
  }
  .toc-area .toc-area-content > aside > nav > nav > ol.tree > li.more > a {
    display: inline-block;
    margin-bottom: 8px;
  }
  .toc-area .toc-area-content > aside > nav > nav > ol.tree > li li {
    padding: 0;
    margin: 0 0 6px;
    text-transform: none;
  }
  .toc-area .toc-area-content > aside > nav > nav > ol.tree > li ol {
    margin: 0;
  }
  .toc-area .toc-area-content nav > ol.tree > li {
    break-inside: avoid;
  }
  .toc-area .toc-area-content nav > ol.tree li::before {
    display: none;
  }

  .toc-area.is-opened .toc-area-content a {
    font-family: "Barlow Semi Condensed", sans-serif !important;
    font-size: 17px;
    text-align: left;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0;
    color: #252525;
  }

  /* toogle */
  .toggle-btn {
    position: absolute;
    right: 20px;
    width: 27px;
    height: 27px;
    background: url(../assets/images/chevron_rouge.svg) center / cover no-repeat;
    border: none;
    text-decoration: none;
  }
  .toc-area.is-opened .toggle-btn {
    background: url(../assets/images/croix.svg) center / cover no-repeat;
  }

  .document-area  #aside,
  .toc-area #aside {
    position: unset;
    float: none;
    margin: 0;
    background: none;
    border: none;
  }
  .document-area  #aside header,
  .toc-area #aside  header {
    display: none;
  }
  .document-area {
  }
  .mirador-container-area {
    position: sticky;
    vertical-align: top;
    max-height: 100vh;
    overflow-y: auto;
    top: 0;
    bottom: 0;
  }
</style>
