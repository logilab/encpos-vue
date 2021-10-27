<template>
  <div>
    <p class="menu-label">Thèses de l'année : {{ annee }}</p>
    <vue-slider
      v-model="annee"
      :vData="listProm"
      :lazy="true"
      :tooltip="'active'"
      style="margin-left: 1.1em; margin-right: 1.1em"
    ></vue-slider>
    <br />
    <div style="margin: 0 auto; width: 100px;">
      <button v-on:click="downOneAnne">-</button>
      <button v-on:click="reinitalise">Retour</button>
      <button v-on:click="addOneAnne">+</button>
    </diV>
    <ul class="menu-list" v-if="state.metadata">
      <li v-for="these in state.metadata" :key="these">
        <ul v-if="these[1]">
          <b v-if="these[0] === textid"
            >{{ these[1] }} - <span v-html="these[2]"></span
          ></b>
          <router-link :to="these[0]" v-else
            ><div v-on:click="gotoTop">
              {{ these[1] }} - <span v-html="these[2]"></span></div
          ></router-link>
        </ul>
        <ul v-else>
          <b v-if="these[0] === textid">{{ these[2] }}</b>
          <router-link :to="these[0]" v-on:click="gotoTop" v-else
            ><span v-html="these[2]"></span
          ></router-link>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch } from "vue";
import { getPositionAnneeFromApi, getMetadataENCPOSFromApi } from "@/api/document";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  name: "ListeTheseAnnee",

  props: ["id", "textid"],
  components: {
    VueSlider,
  },
  setup(props) {
    let state = reactive({});
    const { id } = toRefs(props);
    var annee = ref(id.value.toString());
    const listProm = ref([]);
    
    const getPositionThese = async () => {
      let metadata = {};
      const data = await getPositionAnneeFromApi(annee.value);
      var htmlnamespace = Object.keys(data["@context"]).find(k => data["@context"][k].includes('html'))
      var dcnamespace = Object.keys(data["@context"]).find(k => data["@context"][k].includes('dc/elements')); 

      if (data && data["member"]) {
        for (var these of data["member"]) {
          var title = these["dts:extensions"][htmlnamespace+":h1"];
          var author = these["dts:extensions"][dcnamespace+":creator"];
          try {
            const page = these["dts:dublincore"]["dct:extend"].toString().split("-")[0];
            metadata[page] = [these["@id"], author, title];
          } catch {
            metadata[these["@id"].split("_")[2]] = [these["@id"], author, title];
          }
        }
      }

      state.metadata = metadata;
    };

    const getCollectionThese = async () => {
      const data = await getMetadataENCPOSFromApi();
      let listPromo = []
      for (var member of data.member){
        listPromo.push(member['@id'].replace('ENCPOS_',''))
      }
      listPromo.sort();
      listProm.value = listPromo;
    }

    getPositionThese();
    getCollectionThese();
    watch(annee, getPositionThese, getCollectionThese);

    const downOneAnne = function () {
      if (listProm.value.indexOf(annee.value.toString()) != '0'){
        annee.value = listProm.value[listProm.value.indexOf(annee.value.toString()) - 1].toString();
      }
      return annee;
    };

    const reinitalise = function () {
      annee.value = id.value.toString();
      return annee;
    };

    const addOneAnne = function () {
      if (listProm.value.indexOf(annee.value.toString()) != listProm.value.length.toString() - 1){
        annee.value = listProm.value[listProm.value.indexOf(annee.value.toString()) + 1].toString();
      }
      return annee;
    };

    const gotoTop = function () {
      scroll(0, 0);
    };

    return {
      state,
      addOneAnne,
      getPositionThese,
      annee,
      reinitalise,
      downOneAnne,
      gotoTop,
      listProm
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
