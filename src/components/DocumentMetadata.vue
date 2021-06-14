<template>
  <div v-if="metadata">
    <aside class="menu is-hidden-mobile">
        <div class="columns block">
          <div v-if="link_image" class="column is-5">
            <figure class="image" style='max-width:100%'>
              <img :src="link_image"/>
            </figure>
          </div>
            <div class="column">
              <div class="level">
                <div class="level-left">
                  <div class="level-item">
                    <figure  v-if="metadata['wikipedia']" class="image is-48x48 ">
                    <a v-bind:href="metadata['wikipedia']">
                      <img :src="require('../assets/images/wikipedia-logo.png')"/>
                    </a>
                    </figure>
                  </div>
                  <div class="level-item">
                    <figure v-if="metadata['catalogue_bnf']" class="image is-48x48 level-left">
                      <a v-bind:href="metadata['catalogue_bnf']">
                        <img :src="require('../assets/images/Logo_bnf.png')"/>
                      </a>
                    </figure>
                  </div>
                  <div class="level-item">
                    <figure v-if="metadata['thenca']" class="image is-48x48 level-left">
                      <a v-bind:href="metadata['thenca']">
                        <img :src="require('../assets/images/Logo_thenca.png')"/>
                      </a>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </aside>

    <!--  <theseAnnee v-if="state['date']" :id="state['date']" :textid="id" /> -->
  </div>
</template>

<script>
import { reactive, ref, onMounted,toRefs, watch } from "vue";


export default {
  name: "DocumentMetadata",

  components: {},

  props: ["metadata"],

  setup(props) {
    const {metadata} = toRefs(props);
    console.log(metadata.value);
    let encpos = reactive({});
    let link_image = ref();
    var md5 = require("md5");    

    const obtain_link = async (options={})=>{
      if (metadata.value["wikidata"]){
        let wikidata_id = metadata.value["wikidata"].split('/')
        wikidata_id = wikidata_id[wikidata_id.length-1];
        const response = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetclaims&property=P18&entity=${wikidata_id}&format=json&origin=*`, {method:"GET",...options})
        const document = await response.json();
        let wikidata_link = "";
        let keymd5 = []
        console.log(wikidata_link);
        if(document.claims.P18){
          wikidata_link = document.claims.P18[0]["mainsnak"]["datavalue"]["value"].replace(" ","_").replace(" ","_");
          keymd5[0] = md5(wikidata_link)[0];
          keymd5[1] = md5(wikidata_link)[1];
          console.log(keymd5);
          wikidata_link = (`https://upload.wikimedia.org/wikipedia/commons/${keymd5[0]}/${keymd5[0]}${keymd5[1]}/${wikidata_link}`);
          link_image.value = wikidata_link;
          console.log(link_image);
        } else{
          link_image.value = "";
        }
      } else{
        link_image.value = "";
      }
    }
    const bibliographie = async()=>{
      if (metadata.value['data_bnf']){
        const response = await fetch(`${metadata.value['data_bnf']}.json`, {method:"GET", mode:"no-cors"});
        const document = await response;
        console.log(document);
      }
    }

    onMounted(async () => {
      obtain_link();
      bibliographie();
    });
    watch(metadata, async () => {
      obtain_link();
      bibliographie();
    });
    return {
      encpos,
      link_image
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
