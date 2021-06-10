<template>
  <div v-if="metadata">
    <aside class="menu is-hidden-mobile">
      <p class="menu-label" v-if="metadata['author'] !== 'None'">Metadata position</p>
      <ul class="menu-list" v-if="metadata['author'] !== 'None'">
        <li v-if="metadata['author']">Auteur: {{ metadata["author"] }}</li>
        <li v-if="metadata['title']">Titre: {{ metadata["title"] }}</li>
        <li v-if="metadata['catalogue_bnf']">
          catalogue Bnf: {{ metadata['catalogue_bnf']}}
        </li>
        <li v-if="metadata['sudoc']">sudoc : {{ metadata["sudoc"] }}</li>
        <li v-if="metadata['wikidata']">wikidata : {{ metadata["wikidata"] }}</li>
        <li v-if="metadata['dbpedia']">dbpedia : {{ metadata["dbpedia"] }}</li>
        <li v-if="metadata['wikipedia']">wikipedia : {{ metadata["wikipedia"] }}</li>
        <li v-if="metadata['benc']">{{ metadata["benc"] }}</li>
        <li v-if="metadata['idref']">idref : {{ metadata["idref"] }}</li>
      </ul>
    </aside>

    <!--  <theseAnnee v-if="state['date']" :id="state['date']" :textid="id" /> -->
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "DocumentMetadata",

  components: {},

  props: ["metadata"],

  setup() {
    let encpos = reactive({});

    return {
      encpos,
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
