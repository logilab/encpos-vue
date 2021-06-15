<template>
  <div>
    <aside class="menu is-hidden-mobile">
      <Suspense>
        <div class="columns block">
          <div v-if="authorThumbnailUrl" class="column is-5">
            <figure class="image" style="max-width: 100%">
              <img :src="authorThumbnailUrl" />
            </figure>
          </div>
          <div class="column">
            <span
              v-if="metadata['author']"
              class="block"
              style="text-justify: none; line-height: 4em"
              >{{ metadata["author"] }}</span
            ><br />
            <div class="level">
              <div class="level-left">
                <div v-if="metadata.wikipedia" class="level-item">
                  <figure class="image is-48x48">
                    <a v-bind:href="metadata.wikipedia">
                      <img :src="require('@/assets/images/wikipedia-logo.png')" />
                    </a>
                  </figure>
                </div>
                <div v-if="metadata.catalogue_bnf" class="level-item">
                  <figure class="image is-48x48 level-left">
                    <a v-bind:href="metadata['catalogue_bnf']">
                      <img :src="require('@/assets/images/Logo_bnf.png')" />
                    </a>
                  </figure>
                </div>
                <div v-if="metadata.thenca" class="level-item">
                  <figure class="image is-48x48 level-left">
                    <a v-bind:href="metadata.thenca">
                      <img :src="require('@/assets/images/Logo_thenca.png')" />
                    </a>
                  </figure>
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
import { ref, toRefs, watch } from "vue";
import md5 from "md5";

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
            .replace(" ", "_")
            .replace(" ", "_");

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
        const response = await fetch(`${httpsUrl}.json`, {
          method: "GET",
          mode: "no-cors",
        });
        //const document = await response.text();
        console.log("fetch biblio data", response);
      }
    };

    // when the component is created
    // and when the metadata changes
    watch(
      metadata,
      () => {
        fetchAuthorThumbnailUrl();
        fetchBiblioData();
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
