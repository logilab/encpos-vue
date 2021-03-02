<template>
    <p class="menu-label">Thèses de l'année : </p>
    <ul class="menu-list" v-if="state.metadata">
      <li v-for="these in state.metadata" :key="these">
        <ul>
        <b v-if="these[0]=== textid">{{these[1]}} - {{these[2]}}</b>
        <router-link :to="these[0]" v-else>{{these[1]}} - {{these[2]}}</router-link>
        </ul>
      </li>
    </ul>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import {getPositionAnneeFromApi } from "@/api/document";

export default {

name: "ListeTheseAnnee",

props: ["id", "textid"],
setup(props) {
    let state = reactive({});
    const { id } = toRefs(props);
        
    const getPositionThese = async () =>{
        var test_data;
        var return_data = {};
        test_data = await getPositionAnneeFromApi(id.value);
        console.log(id.value);
        for (var these of test_data['member']){
          var page = these['dts:dublincore']['dct:extend'].toString().split("-")[0];
          return_data[page] = [these['@id'], these['dts:extensions']["ns2:creator"], these['title']];
        }
        console.log(return_data);
        state.metadata = return_data;
    };

onMounted(getPositionThese);

return{
    state
};

},
}
</script>