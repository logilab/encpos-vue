<template>

  <section class="tiles-section">
    <div class="tiles">
      <div class="tile is-ancestor">
        <div class="tile">
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <div class="is-flex is-flex-direction-row title-tile">
                  <p class="title">Les positions de thèses de l'École</p>
                  <img
                    class="enc-logo"
                    alt="Logo de l'École nationale des chartes"
                    src="@/assets/images/enc.png"
                  />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare
                  magna eros, eu pellentesque tortor vestibulum ut.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <div class="search-form">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    class="input is-medium"
                    type="text"
                    placeholder="Find a repository"
                    v-model="searchedTerm"
                  />
                </div>
                <div class="control">
                  <a class="button is-light is-medium search" @click="performSearch">Chercher</a>
                </div>
              </div >
              <div class="block">
                <div class="field vue-slider is-left">
                    <div class="control">
                      <span>Promotions :</span>
                      <vue-slider
                        v-model="year"
                        :min="1849"
                        :max="2017"
                        :lazy="true"
                        :tooltip="'active'"
                      ></vue-slider>
                    </div>
                </div>
                <div class="field vue-slider is-right">
                  <div class="control">
                    <span>Période du sujet :</span>
                    <vue-slider
                      v-model="date_sujet"
                      :min="-500"
                      :max="2000"
                      :lazy="true"
                      :tooltip="'active'"
                    ></vue-slider>
                  </div>
              </div>
              </div>
            </div>
            <div class="table-container">
              <table class="table is-hoverable is-narrow is-fulldwidth">
                <thead>
                  <tr>
                    <th @click="'sort(nom)'">Nom</th>
                    <th @click="'sort(prenom)'">Prénom</th>
                    <th @click="'sort(titre)'">Titre</th>
                    <th @click="'sort(promotion)'"><abbr title="Promotion">Prom</abbr></th>
                    <th @click="'sort(de)'"><abbr title="Période du sujet">De</abbr></th>
                    <th @click="'sort(a)'"><abbr title="Période du sujet">A</abbr></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="position in listPosition" :key="position.id">
                    <td>{{position.nom}}</td>
                    <td>{{position.prenom}}</td>
                    <td>                      <router-link
                  :to="{ name: 'DocumentPage', params: { docId: position.id } }">
                     <span v-html="position.titre"></span></router-link></td>
                    <td>{{position.promotion}}</td>
                    <td>{{position.de}}</td>
                    <td>{{position.a}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>
        <div class="tile is-vertical is-parent">
          <article class="tile is-child box">
            <p class="title has-text-weight-light">Le saviez vous ?</p>
            <p class="subtitle">With some content</p>
            <div class="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare
                magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem.
                Etiam finibus odio quis feugiat facilisis.
                <router-link
                  :to="{ name: 'DocumentPage', params: { docId: 'ENCPOS_1999_35' } }"
                >
                  Visiter le document
                </router-link>
              </p>
            </div>
          </article>
          <article class="tile is-child box">
            <p class="title has-text-weight-light">La diplomatique</p>
            <p class="subtitle">Top box</p>
          </article>
          <article class="tile is-child box">
            <p class="title has-text-weight-light">Histoire des métiers</p>
            <p class="subtitle">Bottom box</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { searchDocument } from "@/api/elasticsearch";

export default {
  name: "Home",
  components: {
    VueSlider,
  },
  data() {
    return {
      year: 1999,
      date_sujet: [-500, 2000],
      listPosition:[{id: 'ENCPOS_1972_18', nom:'Pastoureau',prenom:'Michel',titre:'Le bestiaire héraldique au Moyen Âge',promotion:"1972", de:"1000", a:"1499"},
      {id: 'ENCPOS_1999_35', nom:'Marguin',prenom:'Elsa',titre:'"L<i>Ars lectoria Ecclesie</i> de Jean de Garlande. Étude, édition et traduction"',promotion:"1999", de:"1200", a:"1255"},
      {id: 'ENCPOS_1994_04', nom:'Bubenicek',prenom:'Michelle',titre:'Le pouvoir au féminin. Une princesse en politique et son entourage : Yolande de Flandre, comtesse de Bar et dame de Cassel (1326-1395)',promotion:"1994", de:"1326", a:"1395"}],
      searchedTerm: null,
    };
  },
  methods: {
    async performSearch() {
      if (this.searchedTerm) {
        const result = await searchDocument(this.searchedTerm);
        console.log(result.data);
        this.listPosition = []
        for (var position of result.data){
          var temppos = {};
          console.log(position);
          temppos["id"] = position.id;
          temppos["nom"] = position.fields.metadata.author_name;
          temppos["prenom"] = position.fields.metadata.author_firstname;
          temppos["titre"] = position.fields.metadata.title_rich;
          temppos["promotion"] = position.fields.metadata.promotion_year;
          temppos["de"] = position.fields.metadata.topic_notAfter;
          temppos["a"] = position.fields.metadata.topic_notBefore;
          this.listPosition.push(temppos)
          console.log(temppos);
        }
      }
    },
  },
};
</script>

<style scoped>
.description {
  text-align: center;
}
.tiles {
  margin: 0 auto;
  max-width: 90%;

  font-family: "Montserrat", sans-serif;
}
.tiles-section {
  background-color: #ffffff;
  padding-top: 20px;
  padding-bottom: 100px;
}
.tile.box {
  border: 1px solid #e4e5df;
  box-shadow: none;
  background-color: #fbf7fa;
}
.tile.is-parent {
  padding: 8px;
}
.title-tile {
  justify-content: space-between;
}
.title {
  color: #dd1c1a;
}
.enc-logo {
  height: 64px;
  border-radius: 3px;
}

/* 
  search form
*/
.search {
  border: 1px solid #e4e5df;
  border-radius: 3px;
}
.vue-slider {
  width: 375px;
}
/* 
  search table
*/
.table-container {
  margin-top: 12px;
  overflow-y: auto;
  min-height: 600px;
}
table {
}
tr:hover {
  cursor: pointer;
}
</style>
