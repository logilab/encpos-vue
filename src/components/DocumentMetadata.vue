<template>
  <div class="document-metadata" :class="metaDataCssClass">
    <div class="document-metadata-header">
      <a href="#" v-on:click="toggleContent">
        <span class="metadata-header-author">{{ metadata.author }}</span>
        <span v-html="metadata.title" class="metadata-header-title"></span>
      </a>
      <a href="#" class="toggle-btn" v-on:click="toggleContent"></a>
    </div>
    <aside class="menu">
      <Suspense>
        <div class="columns is-multiline">
          <div class="column is-2">
            <div v-if="authorThumbnailUrl">
              <figure class="image" style="max-width: 100%">
                <img :src="authorThumbnailUrl" />
              </figure>
            </div>
            <div v-else class="author-default-thumbnail" />
          </div>
          <div class="column is-7 thesis-infos is-flex is-flex-direction-column">
            <section v-if="metadata.coverage">
              <h2 class="title">Position</h2>
              <ul>
                <li v-if="metadata.coverage" class="block" style="text-justify: none">
                  <span>Période du sujet</span> : {{ metadata.coverage }}
                </li>
              </ul>
            </section>
            <section>
              <h2 class="title">Citer</h2>
              <ul>
                <li class="block" style="text-justify: none">
                  <span style="font-variant: all-small-caps">{{ metadata.author }}</span
                  >, « <span v-html="metadata.title"></span> », in
                  <span style="font-style: italic"
                    >Positions des thèses soutenues par les élèves de la promotion de
                    {{ metadata.date }} pour obtenir le diplôme d'archiviste
                    paléographe</span
                  >, École nationale des chartes, Paris, {{ metadata.date
                  }}<span v-if="metadata.page">, p. {{ metadata.page }}</span
                  >.
                </li>

                <li>
                  <span>Licence :
                    <a target="_blank" v-bind:href="metadata.rights">cc. BY-NC-ND 3.0
                    </a>
                  </span>
                </li>
              </ul>
            </section>
          </div>
          <div class="column thesis-links">
            <h2 class="title">Liens externes</h2>
            <div class="is-flex is-flex-direction-column">
              <div>
                <p class="title">Auteur</p>
                <div class="columns is-multiline is-mobile block">
                  <div v-if="metadata.wikipedia" class="column is-one-quarter">
                    <figure class="image is-48x48">
                      <a target="_blank" v-bind:href="metadata.wikipedia">
                        <img :src="require('@/assets/images/Logo_wikipedia.png')" />
                      </a>
                    </figure>
                  </div>
                  <div v-if="metadata.catalogue_bnf" class="column is-one-quarter">
                    <figure class="image is-48x48 level-left">
                      <a target="_blank" v-bind:href="metadata['catalogue_bnf']">
                        <img :src="require('@/assets/images/Logo_bnf.png')" />
                      </a>
                    </figure>
                  </div>
                  <div v-if="metadata.data_bnf" class="column is-one-quarter">
                    <figure class="image is-48x48 level-left">
                      <a target="_blank" v-bind:href="metadata.data_bnf">
                        <img :src="require('@/assets/images/Logo_databnf.png')" />
                      </a>
                    </figure>
                  </div>
                  <div v-if="metadata.idref" class="column is-one-quarter">
                    <figure class="image is-48x48 level-left">
                      <a target="_blank" v-bind:href="metadata.idref">
                        <img :src="require('@/assets/images/Logo_idref.png')" />
                      </a>
                    </figure>
                  </div>
                  <div v-if="metadata.dbpedia" class="column is-one-quarter">
                    <figure class="image is-48x48 level-left">
                      <a target="_blank" v-bind:href="metadata.dbpedia">
                        <img :src="require('@/assets/images/Logo_dbpedia.png')" />
                      </a>
                    </figure>
                  </div>
                  <div v-if="metadata.wikidata" class="column is-one-quarter">
                    <figure class="image is-48x48 level-left">
                      <a target="_blank" v-bind:href="metadata.wikidata">
                        <img :src="require('@/assets/images/Logo_wikidata.png')" />
                      </a>
                    </figure>
                  </div>
                </div>
              </div>
              <div>
                <p class="title">Thèse</p>
                <div class="columns is-multiline is-mobile block">
                  <div v-if="metadata.thenca" class="column is-one-quarter">
                    <figure class="image is-48x48 level-left">
                      <a target="_blank" v-bind:href="metadata.thenca">
                        <img :src="require('@/assets/images/Logo_thenca.png')" />
                      </a>
                    </figure>
                  </div>
                  <div v-if="metadata.sudoc" class="column is-one-quarter">
                    <figure class="image is-48x48 level-left">
                      <a target="_blank" v-bind:href="metadata.sudoc">
                        <img :src="require('@/assets/images/Logo_sudoc.png')" />
                      </a>
                    </figure>
                  </div>
                  <div v-if="metadata.benc" class="column is-one-quarter">
                    <figure class="image is-48x48 level-left">
                      <a target="_blank" v-bind:href="metadata.benc">
                        <img :src="require('@/assets/images/Logo_benc.png')" />
                      </a>
                    </figure>
                  </div>
                  <div v-if="metadata.hal" class="column is-one-quarter">
                    <figure class="image is-48x48 level-left">
                      <a target="_blank" v-bind:href="metadata.hal">
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
import { computed, reactive, ref, toRefs, watch } from 'vue'
import md5 from 'md5'
// import $rdf from "rdflib";

export default {
  name: 'DocumentMetadata',

  components: {},

  props: { metadata: { required: true, default: () => {}, type: Object } },

  setup (props) {
    const state = reactive({
      isOpened: false
    })
    const { metadata } = toRefs(props)
    const authorThumbnailUrl = ref(null)

    console.log('state.metadata', metadata)

    const fetchAuthorThumbnailUrl = async (options = {}) => {
      if (metadata.value.wikidata) {
        let wikidata_id = metadata.value.wikidata.split('/')
        wikidata_id = wikidata_id[wikidata_id.length - 1]

        console.log('fetchAuthorThumbnailUrl')

        const response = await fetch(
          `https://www.wikidata.org/w/api.php?action=wbgetclaims&property=P18&entity=${wikidata_id}&format=json&origin=*`,
          { method: 'GET', ...options }
        )
        const document = await response.json()

        if (document.claims.P18) {
          let wikidata_link = document.claims.P18[0].mainsnak.datavalue.value.replaceAll(' ', '_')

          const _sum = md5(wikidata_link)
          wikidata_link = `https://upload.wikimedia.org/wikipedia/commons/${_sum[0]}/${_sum[0]}${_sum[1]}/${wikidata_link}`
          authorThumbnailUrl.value = wikidata_link

          console.log('author url', authorThumbnailUrl)
        } else {
          authorThumbnailUrl.value = null
        }
      } else {
        authorThumbnailUrl.value = null
      }
    }

    const fetchBiblioData = async () => {
      if (metadata.value.data_bnf) {
        const httpsUrl = metadata.value.data_bnf.replace('http:', 'https:')
        // console.log("extra metadata:", httpsUrl);
        console.log(decodeURIComponent(`${httpsUrl}`))
        const redirectUrl = await fetch(`${httpsUrl}`, {
          method: 'GET',
          redirect: 'follow',
          mode: 'cors'
        })
        console.log('redirectUrl.url after redirect : ', redirectUrl.url)
        const httpsUrlJson = redirectUrl.url.replace('/fr', '').slice(0, -1) + '.json'
        console.log('biblio json URL', httpsUrlJson)
        const biblioResponse = await fetch(`${httpsUrlJson}`, {
          method: 'GET',
          mode: 'cors'
        }).then((response) => {
          return response.json()
        }).catch(() => {
          console.error('Error while loading databnf data')
        })
        console.log('fetch biblio data', biblioResponse)
      }
    }

    const metaDataCssClass = computed(() => {
      return state.isOpened ? 'is-opened' : ''
    })

    const toggleContent = function (event) {
      event.preventDefault()
      state.isOpened = !state.isOpened
    }

    const $rdf = require('rdflib')
    const fetchRDF = async () => {
      if (metadata.value.idref) {
        console.log('metadata.value.idref : ', metadata.value.idref)
        const store = $rdf.graph()
        const me = store.sym(metadata.value.idref)
        console.log('me : ', me)
      }
    }

    // when the component is created
    // and when the metadata changes
    watch(
      metadata,
      () => {
        fetchAuthorThumbnailUrl()
        fetchBiblioData()
        fetchRDF()
      },
      { deep: true, immediate: true }
    )

    return {
      metaDataCssClass,
      toggleContent,
      authorThumbnailUrl
    }
  }
}
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
  background-color: #e4e4e4;
  border-radius: 6px;
  position: relative;

  font-family: "Barlow Semi Condensed", sans-serif !important;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
}
.is-opened .document-metadata-header {
  border-radius: 6px 6px 0 0;
}
.document-metadata-header span.metadata-header-author {
  margin-right: 40px;
  color: #4a4a4a;
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
  max-width: calc(100% - 40px);
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
  padding: 25px 20px 40px;
  border-top: solid 2px #fcfcfc;
  background-color: #e4e4e4;
  border-radius: 0 0 6px 6px;
}
aside.menu > .columns > .column {
  padding: 0;
}
aside.menu > .columns > .column:nth-child(1) {
  padding-right: 50px;
}
aside.menu > .columns > .column:nth-child(2) {
  padding-right: 80px;
}
aside.menu > .columns > .column:nth-child(3) {
  max-width: 50%;
}
.column .title,
.column {
  font-family: "Barlow", sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-style: normal;
}
.title {
  text-indent: 0;
  margin-bottom: 0;
  color: #4a4a4a;
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
.author-default-thumbnail {
  display: block;
  width: 120px;
  height: 158px;
  background: url(../assets/images/fantome.png) center / contain no-repeat;
}
.thesis-infos,
.thesis-links > div {
  gap: 40px;
}
.thesis-links .column {
  padding: 15px 0 0 0;
}

@media screen and (max-width: 1150px) {
  .menu-list,
  aside.menu > .columns {
    flex-direction: column;
  }
  aside.menu > .columns > .column:nth-child(1) {
    width: 25% !important;
    padding-right: 0;
    margin-bottom: 50px;
  }
  aside.menu > .columns > .column:nth-child(2),
  aside.menu > .columns > .column:nth-child(3) {
    width: 100% !important;
    padding-right: 0;
    margin-bottom: 50px;
  }
  aside.menu > .columns > .column:nth-child(3) {
    max-width: 75% !important;
  }
  .thesis-links {
    margin-top: 40px;
  }
}
@media screen and (max-width: 800px) {
  aside.menu > .columns > .column:nth-child(1) {
    width: 50% !important;
  }
  .document-metadata-header > a {
    max-width: calc(100% - 30px);
  }
  .document-metadata-header span.metadata-header-title,
  .document-metadata-header span.metadata-header-author {
    display: block;
  }
}
@media screen and (max-width: 640px) {
  .toggle-btn {
    width: 20px;
    right: 15px;
  }
}
</style>
