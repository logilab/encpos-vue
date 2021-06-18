<template>
  <div>
    <p class="menu-label">Thèses de l'année : {{ annee }}</p>
    <vue-slider
      v-model="annee"
      :min="1849"
      :max="2017"
      :lazy="true"
      :tooltip="'active'"
    ></vue-slider>
    <br />
    <button v-on:click="downOneAnne">-</button>
    <button v-on:click="reinitalise">Retour</button>
    <button v-on:click="addOneAnne">+</button>
    <ul class="menu-list" v-if="state.metadata">
      <li v-for="these in state.metadata" :key="these">
        <ul v-if="these[1] !== 'None'">
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
    let state = reactive({});
    const { id } = toRefs(props);
    var annee = ref(id.value);

    const getPositionThese = async () => {
      let metadata = {};
      const data = await getPositionAnneeFromApi(annee.value);
      if (data && data["member"]) {
        for (var these of data["member"]) {
          if (Array.isArray(these["dts:dublincore"]["dct:creator"]) === true) {
            for (let aut of these["dts:dublincore"]["dct:creator"]) {
              if (typeof aut == "string") {
                var author = aut;
              }
            }
          } else if (these["dts:dublincore"]["dct:creator"] == "") {
            author = "None";
          } else {
            author = these["dts:dublincore"]["dct:creator"];
          }
          try {
            const page = these["dts:dublincore"]["dct:extend"].toString().split("-")[0];
            metadata[page] = [these["@id"], author, these["title"]];
          } catch {
            metadata[these["@id"].split("_")[2]] = [these["@id"], author, these["title"]];
          }
        }
      }

      state.metadata = metadata;
    };

    getPositionThese();

    watch(annee, getPositionThese);

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
ol,
ul {
  list-style: none;
}
</style>
