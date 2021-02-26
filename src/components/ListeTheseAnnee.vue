<template>
    <p class="menu-label">Thèses de l'année : </p>
    <ul class="menu-list" v-if="state.metadata">
      <li v-for="these in state.metadata['member']" :key="these['@id']">
        <b v-if="these['@id']===state.metadata['@id']">{{these['dts:extensions']["ns3:creator"]}} - {{these['title']}}</b>
        <router-link :to="these['@id']" v-else>{{these['dts:extensions']["ns3:creator"]}} - {{these['title']}}</router-link>
      </li>
    </ul>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import {getPositionAnneeFromApi } from "@/api/document";

export default {

name: "ListeTheseAnnee",

props: ["id"],
setup(props) {
    let state = reactive({});
    const { id } = toRefs(props);
        
    const getPositionThese = async () =>{
        state.metadata = await getPositionAnneeFromApi(id.value);
    };

onMounted(getPositionThese);

return{
    state
};

},
}
</script>