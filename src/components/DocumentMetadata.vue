<template>
  <div>
    <aside class="menu is-hidden-mobile" style="margin-left: 1.1em; margin-right: 1.1em">
      <Suspense>
        <div class="columns is-multiline" >
          <div>
            <h2 class="title is-5">Auteur:</h2>
            <div v-if="authorThumbnailUrl" class="column is-5">
              <figure class="image" style="max-width: 100%">
                <img :src="authorThumbnailUrl" />
              </figure>
            </div>
            <span
              v-if="metadata.author"
              class="block"
              style="text-justify: none; "
              >{{ metadata.author }}</span
            ><br />
            <div class="columns is-multiline is-mobile block" >
              <div v-if="metadata.wikipedia" class="column is-one-quarter">
                <figure class="image is-48x48">
                  <a v-bind:href="metadata.wikipedia">
                    <img :src="require('@/assets/images/Logo_wikipedia.png')" />
                  </a>
                </figure>
              </div>
              <div v-if="metadata.catalogue_bnf" class="column is-one-quarter">
                <figure class="image is-48x48 level-left">
                  <a v-bind:href="metadata['catalogue_bnf']">
                    <img :src="require('@/assets/images/Logo_bnf.png')" />
                  </a>
                </figure>
              </div>
              <div v-if="metadata.data_bnf" class="column is-one-quarter">
                <figure class="image is-48x48 level-left">
                  <a v-bind:href="metadata.data_bnf">
                    <img :src="require('@/assets/images/Logo_databnf.png')" />
                  </a>
                </figure>
              </div>
              <div v-if="metadata.idref" class="column is-one-quarter">
                <figure class="image is-48x48 level-left">
                  <a v-bind:href="metadata.idref">
                    <img :src="require('@/assets/images/Logo_idref.png')" />
                  </a>
                </figure>
              </div>
              <div v-if="metadata.dbpedia" class="column is-one-quarter">
                <figure class="image is-48x48 level-left">
                  <a v-bind:href="metadata.dbpedia">
                    <img :src="require('@/assets/images/Logo_dbpedia.png')" />
                  </a>
                </figure>
              </div>
              <div v-if="metadata.wikidata" class="column is-one-quarter">
                <figure class="image is-48x48 level-left">
                  <a v-bind:href="metadata.wikidata">
                    <img :src="require('@/assets/images/Logo_wikidata.png')" />
                  </a>
                </figure>
              </div>
            </div>
          </div>

          <div class="colum">
            <p class="title is-5">Position de thèse :</p>
            <ul>
              <li
              v-if="metadata.date && metadata.page"
              class="block"
              style="text-justify: none;"
              >Positions des thèses soutenues par les élèves de la promotion de {{ metadata.date }} pour obtenir le diplôme d'archiviste paléographe, p.{{ metadata.page }}</li>
              <li
              v-if="metadata.coverage"
              class="block"
              style="text-justify: none; "
              >Période du sujet  : {{ metadata.coverage }}</li>
              <span
              v-for="link in metadata.download" :key="link"
              class="block"
              style="text-justify: none;"
              >
                <a v-if="link.includes('PDF')" v-bind:href="link">Voir le pdf </a>
                <a v-if="link.includes('xml')" v-bind:href="link">Voir le xml </a>
              </span>
              <span><a v-bind:href="metadata.rights">(licence cc. BY-NC-ND 3.0)</a></span>
              <br />
            </ul>
          </div>
          <div class="column" >
            <p class="title is-5">Thèse :</p>
            <div class="columns is-multiline is-mobile block">
              <div v-if="metadata.thenca" class="column is-one-quarter">
                <figure class="image is-48x48 level-left">
                  <a v-bind:href="metadata.thenca">
                    <img :src="require('@/assets/images/Logo_thenca.png')" />
                  </a>
                </figure>
              </div>
              <div v-if="metadata.sudoc" class="column is-one-quarter">
                <figure class="image is-48x48 level-left">
                  <a v-bind:href="metadata.sudoc">
                    <img :src="require('@/assets/images/Logo_sudoc.png')" />
                  </a>
                </figure>
              </div>
              <div v-if="metadata.benc" class="column is-one-quarter">
                <figure class="image is-48x48 level-left">
                  <a v-bind:href="metadata.benc">
                    <img :src="require('@/assets/images/Logo_benc.png')" />
                  </a>
                </figure>
              </div>
              <div v-if="metadata.hal" class="column is-one-quarter">
                <figure class="image is-48x48 level-left">
                  <a v-bind:href="metadata.hal">
                    <img :src="require('@/assets/images/Logo_hal.png')" />
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </aside>

    <!--  <theseAnnee v-if="state['date']" :id="state['date']" :textid="id" /> -->
  </div>
</template>

<script>
import { ref, toRefs, watch } from "vue";
import md5 from "md5";
import  $rdf from "rdflib";

export default {
  name: "DocumentMetadata",

  components: {},

  props: { metadata: { required: true, default: () => {}, type: Object } },

  setup(props) {
    const { metadata } = toRefs(props);
    let authorThumbnailUrl = ref(null);

    const fetchAuthorThumbnailUrl = async (options = {}) => {
      if (metadata.value.wikidata) {
        let wikidata_id = metadata.value.wikidata.split("/");
        wikidata_id = wikidata_id[wikidata_id.length - 1];

        console.log("fetchAuthorThumbnailUrl");

        const response = await fetch(
          `https://www.wikidata.org/w/api.php?action=wbgetclaims&property=P18&entity=${wikidata_id}&format=json&origin=*`,
          { method: "GET", ...options }
        );
        const document = await response.json();

        if (document.claims.P18) {
          let wikidata_link = document.claims.P18[0]["mainsnak"]["datavalue"]["value"]
            .replaceAll(" ", "_");

          const _sum = md5(wikidata_link);
          wikidata_link = `https://upload.wikimedia.org/wikipedia/commons/${_sum[0]}/${_sum[0]}${_sum[1]}/${wikidata_link}`;
          authorThumbnailUrl.value = wikidata_link;

          console.log("author url", authorThumbnailUrl);
        } else {
          authorThumbnailUrl.value = null;
        }
      } else {
        authorThumbnailUrl.value = null;
      }
    };

    const fetchBiblioData = async () => {
      if (metadata.value.data_bnf) {
        const httpsUrl = metadata.value.data_bnf.replace("http:", "https:");
        //console.log("extra metadata:", httpsUrl);
        console.log(decodeURIComponent(`${httpsUrl}.json`))
        const response = await fetch(`${httpsUrl}.json`, {
          method: "GET",
          redirect: 'follow',
          mode: "cors",
        });
        //const document = await response.text();
        console.log(response.uri.href)
        console.log("fetch biblio data", response.json());
      }
    };

    const fetchRDF = async () =>{
      const store = $rdf.graph();
      const me = store.sym(metadata.value.idref);
      console.log(me);
    };

    // when the component is created
    // and when the metadata changes
    watch(
      metadata,
      () => {
        fetchAuthorThumbnailUrl();
        fetchBiblioData();
        fetchRDF();
      },
      { deep: true, immediate: true }
    );

    return {
      authorThumbnailUrl,
    };
  },
};
</script>

<style scoped>
ol,
ul {
  list-style: none;
}
</style>
