<template>
  <div class="columns is-multiline is-mobile">
    <div class="column is-2">
      <div v-if="metadata" class="hide-button ListeData">
        <document-metadata :metadata="metadata" />
        <liste-these-annee v-if="metadata.date" :id="metadata.date" :textid="docId" />
      </div>
    </div>
    <div class="column">
      <Suspense>
        <document :id="docId" :key="docId" />
      </Suspense>
    </div>
    <div v-show="manifestIsAvailable" class="column is-4 Mirador">
      <div id="vue-mirador-container" />
    </div>
  </div>
</template>

<script>
import Document from "@/components/Document.vue";
import DocumentMetadata from "../components/DocumentMetadata.vue";
import { getMetadataFromApi } from "@/api/document";
import { toRefs, watch, reactive, provide, ref } from "vue/dist/vue.esm-bundler.js";
import ListeTheseAnnee from "@/components/ListeTheseAnnee.vue";

import useMirador from "@/composables/use-mirador";

const sources = [
  { name: "data_bnf", ext: "data.bnf.fr" },
  { name: "dbpedia", ext: "dbpedia.org" },
  { name: "idref", ext: "idref.fr" },
  { name: "catalogue_bnf", ext: "catalogue.bnf.fr" },
  { name: "wikidata", ext: "wikidata" },
  { name: "wikipedia", ext: "wikipedia" },
  { name:"thenca", ext:"thenca" },
  {}
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
  props: ["docId"],
  async setup(props) {
    const { docId } = toRefs(props);
    const manifestIsAvailable = ref(false);

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

    const getMetadata = async () => {
      const listmetadata = await getMetadataFromApi(docId.value);
      const dublincore = listmetadata["dts:dublincore"];
      try{
      metadata.iiifManifestUrl = dublincore["dct:source"][0]["@id"];
      }catch{
        metadata.iiifManifestUrl =""
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
              const source = findSource(member["@id"])
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
            manifestIsAvailable.value = r.ok;
            miradorInstance.setManifestUrl(metadata.iiifManifestUrl);
          })
          .catch(() => {
            manifestIsAvailable.value = false;
          });
      }
    };

    watch(
      () => metadata.iiifManifestUrl,
      async () => {
        setMirador();
      }
    );

    watch(docId, async () => {
      getMetadata();
    });

    await getMetadata();

    return {
      metadata,
      manifestIsAvailable,
    };
  },
};
</script>
