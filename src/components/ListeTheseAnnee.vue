<template>
  <p class="menu-label">Thèses de l'année :</p>
  <ul class="menu-list" v-if="state.metadata">
    <li v-for="these in state.metadata" :key="these">
      <ul>
        <b v-if="these[0] === textid">{{ these[1] }} - {{ these[2] }}</b>
        <router-link :to="these[0]" v-else>{{ these[1] }} - {{ these[2] }}</router-link>
      </ul>
    </li>
  </ul>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { getPositionAnneeFromApi } from "@/api/document";

export default {
  name: "ListeTheseAnnee",

  props: ["id", "textid"],
  setup(props) {
    let state = reactive({});
    const { id } = toRefs(props);

    const getPositionThese = async () => {
      let metadata = {};
      const data = await getPositionAnneeFromApi(id.value);

      for (var these of data["member"]) {
        try {
          const page = these["dts:dublincore"]["dct:extend"].toString().split("-")[0];
          metadata[page] = [
            these["@id"],
            these["dts:extensions"]["ns2:creator"],
            these["title"],
          ];
        } catch {
          console.log("no dct:extend");
        }
      }

      state.metadata = metadata;
    };

    onMounted(getPositionThese);

    return {
      state,
    };
  },
};
</script>
