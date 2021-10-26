<template>
  <div class="document-metadata" :class="metaDataCssClass">
    <div class="document-metadata-header" >
      <a href="#" v-on:click="toggleContent">
        <span class="metadata-header-author">{{ metadata.author }}</span>
        <span class="metadata-header-title">{{ metadata.title }}</span>
      </a>
      <a href="#" class="toggle-btn" v-on:click="toggleContent"></a>
    </div>
    <aside class="menu is-hidden-mobile">
      <Suspense>
        <div class="columns is-multiline" >
          <div class="column is-2">
            <div v-if="authorThumbnailUrl">
              <figure class="image" style="max-width: 100%">
                <img :src="authorThumbnailUrl" />
              </figure>
            </div>
          </div>
          <div class="column is-4">
            <h2 class="title">La position</h2>
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
              ><span>Période du sujet</span>  : {{ metadata.coverage }}</li>
              <template v-if="typeof metadata.download ==='object'">
              <span
              v-for="link in metadata.download" :key="link"
              class="block"
              style="text-justify: none;"
              >chev
                <a v-if="link.includes('PDF')" v-bind:href="link">Voir le pdf </a>
                <a v-if="link.includes('xml')" v-bind:href="link">Voir le xml </a>
              </span>
              </template>
              <template v-else>
                <a v-if="metadata.download.includes('xml')" v-bind:href="metadata.download">Voir le xml </a>
              </template>
              <span><a v-bind:href="metadata.rights">(licence cc. BY-NC-ND 3.0)</a></span>
              <br />
            </ul>
          </div>
          <div class="column is-4 thesis-links" >
            <h2 class="title">Liens externes</h2>
            <div class="is-flex is-flex-direction-column">
              <div>
                <p class="title">Auteur:</p>
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
              <div>
                <p class="title">Thèse :</p>
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
          </div>
        </div>
      </Suspense>
    </aside>

    <!--  <theseAnnee v-if="state['date']" :id="state['date']" :textid="id" /> -->
  </div>
</template>

<script>
  import {computed, reactive, ref, toRefs, watch} from "vue";
import md5 from "md5";
import  $rdf from "rdflib";

export default {
  name: "DocumentMetadata",

  components: {},

  props: { metadata: { required: true, default: () => {}, type: Object } },

  setup(props) {
    let state = reactive({
      isOpened: false
    });
    const { metadata } = toRefs(props);
    let authorThumbnailUrl = ref(null);

    console.log('state.metadata', metadata)

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

    const metaDataCssClass = computed(() => {
      return state.isOpened ? "is-opened" : "";
    });

    const toggleContent = function (event) {
      event.preventDefault();
      state.isOpened = !state.isOpened;
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
      metaDataCssClass,
      toggleContent,
      authorThumbnailUrl,
    };
  },
};
</script>

<style scoped>
.document-metadata {
  width: 100%;
  font-family: "Barlow", sans-serif !important;
}
.document-metadata-header {
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: #E4E4E4;
  border-radius: 6px;
  position: relative;

  font-family: "Barlow Semi Condensed", sans-serif !important;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
}
.document-metadata-header span.metadata-header-author {
  margin-right: 40px;
  color: #4A4A4A;
}
.document-metadata-header span.metadata-header-title {
  color: #929292;
}
/* toogle */
.toggle-btn {
  position: absolute;
  right: 20px;
  width: 27px;
  height: 27px;
  background: url(../assets/images/chevron_rouge.svg) center top -7px / cover no-repeat;
  border: none;
  text-decoration: none;
}
.is-opened .toggle-btn {
  background: url(../assets/images/croix.svg) center / cover no-repeat;
}

.document-metadata-header > a {
  text-decoration: none;
  border: none;
}
.document-metadata .menu {
  display: none;
}
.document-metadata.is-opened .menu {
  display: block;
}
ol,
ul {
  list-style: none;
}
aside.menu > .columns {
  padding: 25px 20px;
  border-top:solid 2px #FCFCFC;
}
aside.menu > .columns > .column {
  padding: 0;
}
aside.menu > .columns > .column:not(:last-child) {
  padding-right: 40px;
}
.column .title,
.column {
  font-family: "Barlow", sans-serif;
  font-size: 15px;
  font-style: normal;
}
.title {
  text-indent: 0;
  margin-bottom: 0;
  color: #4A4A4A;
}
h2.title {
  text-align: left;
  margin: 0 0 20px 0;
  padding: 0;
  text-transform: uppercase;
  font-weight: 700;
  color: #929292;
}
figure img,
figure {
  margin: 0 !important;
  padding: 0 !important;
  border: none;
}
.thesis-links > div {
  gap: 40px;
}
.thesis-links .column {
  padding: 15px 5px 0 0;
}

</style>
