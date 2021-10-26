<template>
  <div
          class="is-flex is-flex-direction-column"
          :class="layout.miradorVisible.value ? 'document-page-grid-container' : 'document-page-grid-container-no-viewer'"
  >
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
    <nav class="controls is-flex app-width-margin">
      <a href="" @click="toggleTOCMenu">Sommaire</a>
      <ul class="is-flex">
        <li><a href="" class="text-btn" aria-label="texte seul"></a></li>
        <li><a href="" class="text-images-btn" aria-label="texte et images"></a></li>
        <li><a href="" class="images-btn" aria-label="images seules"></a></li>
      </ul>
      <ul class="is-flex">
        <li><a href="" class="pdf-btn" aria-label="Télécharger le PDF"></a></li>
        <li><a href="" class="xml-btn" aria-label="Télécharger le XML"></a></li>
        <li><a href="" class="access_link">Accès à la thèse</a></li>
      </ul>
    </nav>
    <div class="document-area is-flex app-width-margin">
      <div id="toc-area-aside" class="toc-area-aside" :class="tocMenuCssClass" />
      <document :id="$route.params.docId" :key="$route.params.docId" />
    </div>
    <div v-if="metadata.iiifManifestUrl != ''" v-on:click="layout.setMiradorVisible(!layout.miradorVisible.value)" class="separation-area">
      <i class="fas fa-book-open"></i>
    </div>
    <div class="mirador-container-area">
      <div id="vue-mirador-container" />
    </div>
  </div>
</template>

<script>
import Document from "@/components/Document.vue";
import DocumentMetadata from "../components/DocumentMetadata.vue";
import { getMetadataFromApi } from "@/api/document";
import { watch, reactive, provide, ref, inject } from "vue/dist/vue.esm-bundler.js";

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
  { name: "hal", ext: "hal" },
  { name: "benc", ext: "koha" },
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
      isTOCOpened: false,
      isTOCMenuOpened: false,
    });

    const manifestIsAvailable = ref(false);

    const tocCssClass = computed(() => {
      return state.isTOCOpened ? "is-opened" : "";
    });

    const tocMenuCssClass = computed(() => {
      return state.isTOCMenuOpened ? "is-opened" : "";
    });

    const toggleTOCContent = function (event) {
      event.preventDefault();
      state.isTOCOpened = !state.isTOCOpened;
    };

    const toggleTOCMenu = function (event) {
      event.preventDefault();
      state.isTOCMenuOpened = !state.isTOCMenuOpened;
    };

    const metadata = reactive({
      sudoc: null,
      benc: null,
      thenca: null,
      iiifManifestUrl: null,
      hal: null,
      download: null,

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

    const layout = inject("variable-layout");

    const getMetadata = async (docId) => {
      const listmetadata = await getMetadataFromApi(docId);

      var dcnamespace = Object.keys(listmetadata["@context"]).find(k => listmetadata["@context"][k].includes('dc/elements'));
      metadata.author = listmetadata["dts:extensions"][dcnamespace + ":creator"];
      metadata.download = listmetadata["dts:download"];

      const dublincore = listmetadata["dts:dublincore"];
      console.log('---------');
      console.log('dublincore', dublincore);
      try {
        metadata.iiifManifestUrl = dublincore["dct:source"][0]["@id"];
        layout.setMiradorVisible(true);
      } catch {
        metadata.iiifManifestUrl = "";
        layout.setMiradorVisible(false);
      }
      metadata.date = dublincore["dct:date"];
      metadata.page = dublincore["dct:extend"];
      metadata.coverage = dublincore["dct:coverage"];
      metadata.rights = dublincore["dct:rights"][0]["@id"];
      metadata.title = dublincore["dct:title"][0]["@value"];

      console.log('metadata.iiifManifestUrl', metadata.iiifManifestUrl);
      console.log('metadata', metadata);

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
        if (Array.isArray(dublincore["dct:creator"])) {
          for (let aut of dublincore["dct:creator"]) {
            if (aut["@id"]) {
              // find the source name from its extension
              const source = findSource(aut["@id"]);
              if (source) {
                metadata[source] = aut["@id"];
                console.log("source found:", source, aut["@id"]);
              }
            }
          }
        }
      }
    };


    const setMirador = function () {
      fetch(metadata.iiifManifestUrl, {
        method: "HEAD",
      })
        .then((r) => {
          manifestIsAvailable.value = r.ok;
          miradorInstance.setManifestUrl(metadata.iiifManifestUrl);
          miradorInstance.initialize();
        })
        .catch(() => {
          manifestIsAvailable.value = false;
        });
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
      tocMenuCssClass,
      toggleTOCMenu,
      metadata,
      manifestIsAvailable,
      layout,
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
  .toc-area {
    width: 100%;
    font-family: "Barlow", sans-serif !important;
    margin-bottom: 30px !important;
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
  .toc-area-aside {
    display: none;
  }
  .toc-area-aside.is-opened {
    display: flex;
    width: 230px;
  }

  .document-area {
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

  .controls {
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-top: #B9192F 1px dashed;
    border-bottom: #B8B8B8 1px solid;
    padding: 12px 0 9px;
  }
  .controls a {
    display:inline;
    font-family: "Barlow", sans-serif;
    font-size: 15px;
    font-weight: 500;
    text-transform: uppercase;
    color: #4A4A4A;
    margin: 0;
  }
  .controls > a {
    font-size: 14px;
    color: #AEAEAE;
    padding: 6px 10px;
    border: #AEAEAE 1px solid;
    border-radius: 4px;
  }
  .controls ul {
    align-items: center;
  }
  .controls ul > li {
    margin: 0;
  }
  .controls ul > li > a {
    display:inline-block;
    width: 42px;
    height: 42px;
    margin-right: 10px;
  }
  .controls ul > li > a.access_link {
    vertical-align: center;
    display: inline;
    margin-left: 15px;
  }
  .controls a.text-btn {
    background: url(../assets/images/b_text_off.svg) center / cover no-repeat;
  }
  .controls a.text-images-btn {
    width: 80px;
    background: url(../assets/images/b_text-image_off.svg) center / cover no-repeat;
    margin: 0 25px 0 15px;
  }
  .controls a.images-btn {
    background: url(../assets/images/b_image_off.svg) center / cover no-repeat;
  }
  .controls a.pdf-btn {
    background: url(../assets/images/b_PDF.svg) center / cover no-repeat;
  }
  .controls a.xml-btn {
    background: url(../assets/images/b_XML.svg) center / cover no-repeat;
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

  /*
    .document-area {
      grid-area: document;
      margin-left: 20px;
    }
    .toc-area {
      grid-area: toc;
    }
    .metadata-area {
      grid-area: metadata;
    }
    .liste-theses-area {
      grid-area: liste-theses;
    }
   */

.separation-area {
  grid-area: separation;
  position: sticky;
  vertical-align: top;
  max-height: 100vh;
  overflow-y: auto;
  top: 0;
  bottom: 0;
}
.mirador-container-area {
  grid-area: mirador-container;

  position: sticky;
  vertical-align: top;
  max-height: 100vh;
  overflow-y: auto;
  top: 0;
  bottom: 0;
}
.document-page-grid-container {
  display: grid;
  margin-bottom: 150px;

  grid-template-columns: 280px 230px auto 50px 620px;
  grid-template-rows: minmax(0, auto) auto;
  grid-template-areas:
    "metadata toc document separation mirador-container"
    "liste-theses . document separation mirador-container";
}
.document-page-grid-container-no-viewer {
  display: grid;
  margin-bottom: 150px;

  grid-template-columns: 280px 230px auto 50px 0px;
  grid-template-rows: minmax(0, auto) auto;
  grid-template-areas:
    "metadata toc document separation mirador-container"
    "liste-theses . document separation mirador-container";
}

</style>
