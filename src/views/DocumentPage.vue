<template>
  <div
    :class="
      layout.miradorVisible.value
        ? 'document-page-grid-container'
        : 'document-page-grid-container-no-viewer'
    "
  >
    <div class="metadata-area">
      <document-metadata v-if="metadata" :metadata="metadata" />
    </div>
    <div class="liste-theses-area">
      <liste-these-annee
        v-if="metadata && metadata.date"
        :id="metadata.date"
        :textid="$route.params.docId"
      />
    </div>

    <div class="toc-area">
      <div id="toc-area" />
    </div>
    <div class="document-area">
      <document :id="$route.params.docId" :key="$route.params.docId" />
    </div>
    <div v-on:click="layout.setMiradorVisible(!layout.miradorVisible.value)" class="separation-area">
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
    const manifestIsAvailable = ref(false);
    
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

      metadata.download = listmetadata["dts:download"];

      const dublincore = listmetadata["dts:dublincore"];
      try {
        metadata.iiifManifestUrl = dublincore["dct:source"][0]["@id"];
      } catch {
        metadata.iiifManifestUrl = "";
      }
      metadata.date = dublincore["dct:date"];
      metadata.page = dublincore["dct:extend"];
      metadata.coverage = dublincore["dct:coverage"];
      metadata.rights = dublincore["dct:rights"][0]["@id"];

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
            } else {
              metadata.author = aut;
            }
          }
        } else {
          metadata.author = dublincore["dct:creator"];
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
      metadata,
      manifestIsAvailable,
      layout,
    };
  },
};
</script>

<style>
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
  grid-template-rows: 640px auto;
  grid-template-areas:
    "metadata toc document separation mirador-container"
    "liste-theses . document separation mirador-container";
}
.document-page-grid-container-no-viewer {
  display: grid;
  margin-bottom: 150px;

  grid-template-columns: 280px 230px auto 50px 0px;
  grid-template-rows: 640px auto;
  grid-template-areas:
    "metadata toc document separation mirador-container"
    "liste-theses . document separation mirador-container";
}
</style>
