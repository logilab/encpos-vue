<template>
  <div class="list-content" :class="listCssClass">
    <div class="list-header is-flex">
      <p class="menu-label">Thèses de l'année : <span>{{ annee }}</span></p>
      <vue-slider
        v-model="annee"
        :vData="listProm"
        :lazy="true"
        :tooltip="'active'"
      ></vue-slider>
      <nav v-if="isNotInitialAnnee">
        <button v-on:click="downOneAnne">-</button>
        <button v-on:click="reinitalise">Retour à l'année en cours <span>{{ id }}</span></button>
        <button v-on:click="addOneAnne">+</button>
      </nav>
      <a href="#" class="toggle-btn" v-on:click="toggleContent"></a>
    </div>
    <ul class="menu-list" v-if="state.metadata">
      <li v-for="these in state.metadata" :key="these">
        <ul v-if="these[1]">
          <b v-if="these[0] === textid">
            <div class="thesis-author">{{ these[1] }}</div>
            <div class="thesis-title" v-html="these[2]"></div>
          </b>
          <router-link :to="these[0]" v-else
            >
            <div v-on:click="gotoTop">
              <div class="thesis-author">{{ these[1] }}</div>
              <div v-html="these[2]"></div>
            </div>
          </router-link>
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
import {ref, reactive, toRefs, watch, computed} from "vue";
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
    let state = reactive({
      isOpened: false
    });
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

      // console.log('state.metadata', state.metadata)
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


    const listCssClass = computed(() => {
      return state.isOpened ? "is-opened" : "";
    });

    const toggleContent = function (event) {
      event.preventDefault();
      state.isOpened = !state.isOpened;
    };

    const isNotInitialAnnee = computed(() => {
      return annee.value.toString() !== id.value.toString();
    });

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
      listCssClass,
      toggleContent,
      isNotInitialAnnee,
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
  nav button,
  .list-header p.menu-label {
    font-family: "Barlow", sans-serif !important;
    font-size: 15px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0;
  }
  .list-header {
    align-items: center;
    background-color: #B8B5AD;
    padding: 20px 0 20px;
    border-radius: 6px;
    position: relative;
  }
  .list-content.is-opened .list-header {
    border-radius: 6px 6px 0 0;
  }
  .list-header p.menu-label {
    color: #4A4A4A;
  }
  .menu-label {
    margin-bottom: 0;
  }
  .menu-label span {
    background-color: #FFF;
    font-size: 14px;
    color: #8B8A7E;
    padding: 1px 20px;
    margin: 0 10px;
  }
  nav button {
    border: none;
    background: none;
    color: #FFFFFF;
  }
  nav button:not(:nth-child(2)) {
    display: none;
  }
  nav button > span {
    border: #FFFFFF solid 1px;
    border-radius: 4px;
    padding: 4px 20px;
    margin-left: 10px;
  }

  /* slider */
  .vue-slider {
    min-width: 200px;
    margin-right: 10px;
  }
  .vue-slider.vue-slider-ltr {
    margin-top: 2px !important;
    padding: 0 10px !important;
    height: 3px !important;
  }
  .vue-slider :deep( .vue-slider-dot ) {
    width: 18px !important;
    height: 18px !important;
  }
  .vue-slider:hover :deep( .vue-slider-rail ),
  .vue-slider :deep( .vue-slider-rail ) {
    background-color: #FFFFFF;
  }
  .vue-slider :deep( .vue-slider:hover .vue-slider-process ),
  .vue-slider :deep( .vue-slider-process ) {
    background-color: #B9192F !important;
  }
  .vue-slider :deep( .vue-slider-dot-handle:hover ),
  .vue-slider :deep( .vue-slider-dot-handle-focus ),
  .vue-slider :deep( .vue-slider-dot-handle ) {
    border-color: #B9192F !important;
  }
  .vue-slider :deep( .vue-slider-dot-handle-focus ) {
    box-shadow: 0 0 0 5px rgba(185,25,47,0.2);
  }

  /* toogle */
  .toggle-btn {
    position: absolute;
    right: 20px;
    width: 27px;
    height: 27px;
    background: url(../assets/images/chevron_blanc.svg) center / cover no-repeat;
    border: none;
    text-decoration: none;
  }
  .list-content.is-opened .toggle-btn {
    background: url(../assets/images/croix_blc.svg) center / cover no-repeat;
  }

  .list-content .menu-list {
    display: none;
  }
  .list-content.is-opened .menu-list {
    display: block;
    border-radius: 0 0 6px 6px;
  }
  .menu-list {
    padding: 20px;
    background-color: #E5E3DE;
    border-radius: 0 0 6px 6px;
    counter-reset: thesis-counter;
    columns: 3;
  }

  .thesis-author {
    font-weight: 600;
  }
  .thesis-author::before {
    content: counter(thesis-counter);
    counter-increment: thesis-counter;
    color: #B9192F;
    margin-right: 5px;
  }
  .menu-list > li {
    margin-bottom: 20px;
    break-inside: avoid;
  }
  .menu-list li > ul {
    border: none;
    display: block;
    margin: 0;
  }
  .menu-list > li {
    flex: 33.333% 0 0;
  }
  .menu-list b,
  .menu-list a {
    border: none;
    padding: 0;
    font-family: "Barlow Semi Condensed", sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 25px;
    color: #161616;
    text-transform: none;
  }
  .menu-list b {
    font-weight: 600;
  }
  ol,
  ul {
    list-style: none;
  }
</style>
