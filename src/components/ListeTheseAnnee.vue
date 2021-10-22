<template>
  <div class="list-content" :class="listCssClass">
    <div class="list-header is-flex">
      <p class="menu-label">Thèses de l'année : <span>{{ annee }}</span></p>
      <vue-slider
        v-model="annee"
        :min="1849"
        :max="2017"
        :lazy="true"
        :tooltip="'active'"
      ></vue-slider>
      <nav v-if="annee !== id">
        <button v-on:click="downOneAnne">-</button>
        <button v-on:click="reinitalise">Retour à l'année en cours <span>{{ id }}</span></button>
        <button v-on:click="addOneAnne">+</button>
      </nav>
      <a href="#" class="toggle-btn" v-on:click="toggleContent"></a>
    </div>
    <ul class="menu-list" v-if="state.metadata">
      <li v-for="these in state.metadata" :key="these">
        <ul v-if="these[1] !== 'None'">
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
import { getPositionAnneeFromApi } from "@/api/document";
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
    var annee = ref(id.value);


    const getPositionThese = async () => {
      let metadata = {};
      const data = await getPositionAnneeFromApi(annee.value);

      var htmlnamespace = Object.keys(data["@context"]).find(k => data["@context"][k].includes('html'));
      var dcnamespace = Object.keys(data["@context"]).find(k => data["@context"][k].includes('dc/elements'));

      if (data && data["member"]) {
        for (var these of data["member"]) {
          var title = these["dts:extensions"][htmlnamespace+":h1"];
          var author = '';

          if (Array.isArray(these["dts:dublincore"]["dct:creator"]) === true) {
            for (let aut of these["dts:dublincore"]["dct:creator"]) {
              if (typeof aut == "string") {
                author = aut;
              }
            }
          } else if (these["dts:dublincore"]["dct:creator"] === "") {
            author = "None";
          } else if (these["dts:dublincore"]["dct:creator"]) {
            author = these["dts:dublincore"]["dct:creator"];
          }

          if (author.length === 0) {
            author = these["dts:extensions"][dcnamespace+":creator"];
          }

          try {
            const page = these["dts:dublincore"]["dct:extend"].toString().split("-")[0];
            metadata[page] = [these["@id"], author, title];
          } catch {
            metadata[these["@id"].split("_")[2]] = [these["@id"], author, title];
          }
        }
      }

      state.metadata = metadata;

      console.log('state.metadata', state.metadata)
    };

    getPositionThese();

    watch(annee, getPositionThese);


    const listCssClass = computed(() => {
      return state.isOpened ? "is-opened" : "";
    });

    const toggleContent = function (event) {
      event.preventDefault();
      state.isOpened = !state.isOpened;
    };

    const downOneAnne = function () {
      let anneedown = parseInt(annee.value);
      anneedown -= 1;
      annee.value = anneedown.toString();
      return annee;
    };

    const reinitalise = function () {
      annee.value = id.value;
      return annee;
    };

    const addOneAnne = function () {
      let anneeup = parseInt(annee.value);
      anneeup += 1;
      annee.value = anneeup.toString();
      return annee;
    };

    const gotoTop = function () {
      scroll(0, 0);
    };

    return {
      state,
      listCssClass,
      toggleContent,
      addOneAnne,
      getPositionThese,
      annee,
      reinitalise,
      downOneAnne,
      gotoTop,
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
