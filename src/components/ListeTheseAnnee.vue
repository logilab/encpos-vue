<template>
  <p class="menu-label">Thèses de l'année : {{annee}}</p>
    <vue-slider v-model="annee" :min="1848" :max="2017" :lazy="true" :tooltip="'active'"></vue-slider>
  <br>
  <button v-on:click="downOneAnne"> - </button>
  <button v-on:click="reinitalise"> Retour</button>
  <button v-on:click="addOneAnne"> + </button>
  <ul class="menu-list" v-if="state.metadata">
    <li v-for="these in state.metadata" :key="these">
      <ul v-if="these[1] !== 'None'">
        <b v-if="these[0] === textid">{{ these[1] }} - {{ these[2] }}</b>
        <router-link :to="these[0]" v-else>{{ these[1] }} - {{ these[2] }}</router-link>
      </ul>
      <ul v-else>
        <b v-if="these[0] === textid">{{ these[2] }}</b>
        <router-link :to="these[0]" v-else>{{ these[2] }}</router-link>
      </ul>
    </li>
  </ul>
</template>

<script>

import { ref, reactive, toRefs, onMounted, watch} from "vue";
import { getPositionAnneeFromApi } from "@/api/document";
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';



export default {
  name: "ListeTheseAnnee",

  props: ["id", "textid"],
  components:{
    VueSlider
  },
  setup(props) {
    let state = reactive({});
    const { id } = toRefs(props);
    var annee  = ref(id.value);
    console.log(annee.value);

    const getPositionThese = async () => {
      let metadata = {};
      const data = await getPositionAnneeFromApi(annee.value);
      var namespacedt;

      for (const namespace in data["@context"]){
        if (data["@context"][namespace]==="http://purl.org/dc/elements/1.1/"){
          namespacedt = namespace;
        }
      }

      for (var these of data["member"]) {
        try {
          const page = these["dts:dublincore"]["dct:extend"].toString().split("-")[0];
          metadata[page] = [
            these["@id"],
            these["dts:extensions"][namespacedt+":creator"],
            these["title"],
          ];
        } catch {
          console.log("no dct:extend");
        }
      }

      state.metadata = metadata;
    };

    onMounted(getPositionThese);

    watch(getPositionThese);

    const downOneAnne = function() {
      let anneedown = parseInt(annee.value);
      anneedown -= 1;
      annee.value = anneedown.toString();
      return annee;
    }

    const reinitalise = function() {
      console.log(id.value)
      annee.value = id.value;
      return annee;
    }

    const addOneAnne= function() {
      let anneeup = parseInt(annee.value);
      anneeup += 1;
      annee.value = anneeup.toString();
      return annee;
    }

    return {
      state,
      addOneAnne,
      getPositionThese,
      annee,
      reinitalise,
      downOneAnne
    };

  }
};
</script>
