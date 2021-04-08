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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  ornare magna eros, eu pellentesque tortor vestibulum ut.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div class="tile is-ancestor">
        <div class="tile is-parent is-8">
          <article class="tile is-child box">
            <div class="search-form">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    class="input is-medium"
                    type="text"
                    placeholder="Find a repository"
                    v-model="inputTerm"
                  />
                </div>
                <div class="control">
                  <a class="button is-light is-medium search" @click="search"
                    >Chercher</a
                  >
                </div>
              </div>
              <div class="block">
                <div class="field vue-slider is-inline-block">
                  <div class="control">
                    <span
                      >Promotions : {{ inputYear[0] }} -
                      {{ inputYear[1] }}</span
                    >
                    <vue-slider
                      v-model="inputYear"
                      :min="1849"
                      :max="2017"
                      :tooltip="'none'"
                    ></vue-slider>
                  </div>
                </div>
                <div class="field vue-slider is-inline-block">
                  <div class="control">
                    <span
                      >Période du sujet : {{ inputDateSujet[0] }} -
                      {{ inputDateSujet[1] }}</span
                    >
                    <vue-slider
                      v-model="inputDateSujet"
                      :min="-500"
                      :max="2000"
                      :tooltip="'none'"
                    ></vue-slider>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-container">
              <table class="table is-hoverable is-narrow is-fulldwidth">
                <thead>
                  <tr>
                    <th>+</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th @click="performSort('metadata.promotion_year')" class="largerTab">
                      <abbr title="Promotion" class="is-inline-block"
                        >Prom  </abbr>
                      <i
                        v-if="
                          (activeColumn.name === 'metadata.promotion_year') &
                          (activeColumn.order === 'asc')
                        "
                        class="fas fa-sort-numeric-down is-inline-block"
                      ></i>
                      <i
                        v-else-if="
                          (activeColumn.name === 'metadata.promotion_year') &
                          (activeColumn.order === 'dsc')
                        "
                        class="fas fa-sort-numeric-up is-inline-block"
                      ></i>
                      <i v-else class="fas fa-sort is-inline-block"></i>
                    </th>
                    <th>Titre</th>
                    <th @click="performSort('metadata.topic_notBefore')" class="largerTab">
                      <abbr title="Période du sujet">De </abbr>
                      <i
                        v-if="
                          (activeColumn.name === 'metadata.topic_notBefore') &
                          (activeColumn.order === 'asc')
                        "
                        class="fas fa-sort-numeric-down"
                      ></i>
                      <i
                        v-else-if="
                          (activeColumn.name === 'metadata.topic_notBefore') &
                          (activeColumn.order === 'dsc')
                        "
                        class="fas fa-sort-numeric-up"
                      ></i>
                      <i v-else class="fas fa-sort"></i>
                    </th>
                    <th @click="performSort('metadata.topic_notAfter')" class="inline">
                      <abbr title="Période du sujet">A </abbr>
                      <i
                        v-if="
                          (activeColumn.name === 'metadata.topic_notAfter') &
                          (activeColumn.order === 'asc')
                        "
                        class="fas fa-sort-numeric-down"
                      ></i>
                      <i
                        v-else-if="
                          (activeColumn.name === 'metadata.topic_notAfter') &
                          (activeColumn.order === 'dsc')
                        "
                        class="fas fa-sort-numeric-up"
                      ></i>
                      <i v-else class="fas fa-sort"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="position in listPosition" :key="position.id">
                    <tr>
                      <span @click="position.fields.metadata.enc_teacher = !position.fields.metadata.enc_teacher">
                      <i v-if="position.fields.metadata.enc_teacher === true" class="fas fa-chevron-down"></i>
                      <i v-else class="fas fa-chevron-up"></i></span>
                      <td>{{ position.fields.metadata.author_name }}</td>
                      <td>{{ position.fields.metadata.author_firstname }}</td>
                      <td>{{ position.fields.metadata.promotion_year }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'DocumentPage',
                            params: { docId: position.id },
                          }"
                        >
                          <span
                            v-html="position.fields.metadata.title_rich"
                          ></span
                        ></router-link>
                      </td>
                      <td>{{ position.fields.metadata.topic_notBefore }}</td>
                      <td>{{ position.fields.metadata.topic_notAfter }}</td>
                    </tr>
                      <tr v-if="position.fields.metadata.enc_teacher === true">
                        <td colspan="7">
                          <ul>
                            <li v-for="phrase in position.highlight.content" :key="phrase">
                              <span v-html="phrase"></span>
                            </li>
                          </ul>
                        </td>
                      </tr>
                  </template>
                </tbody>
              </table>
              <div class="has-text-centered">
                <pagination />
              </div>
            </div>
          </article>
        </div>
        <div class="tile is-vertical is-parent">
          <article class="tile is-child box">
            <p class="title has-text-weight-light">Le saviez vous ?</p>
            <p class="subtitle">With some content</p>
            <div class="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat
                facilisis.
                <router-link
                  :to="{
                    name: 'DocumentPage',
                    params: { docId: 'ENCPOS_1999_35' },
                  }"
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
import { mapState, mapActions } from "vuex";
import Pagination from "@/components/Pagination";

export default {
  name: "Home",
  components: {
    VueSlider,
    Pagination,
  },
  data() {
    return {
      inputDateSujet: [-500, 2000],
      inputTerm: null,
      inputYear: [1849, 2017],
      activeColumn: {},
    };
  },
  computed: {
    ...mapState("search", [
      "searchTerm",
      "listPosition",
      "year",
      "date_sujet",
      "sorts",
    ]),
  },
  watch: {
    inputTerm() {
      this.setSearchTerm(this.inputTerm);
    },
    inputYear() {
      this.setSelectedYear(this.inputYear);
    },
    inputDateSujet() {
      this.setSelecteDateSujet(this.inputDateSujet);
    },
  },
  created() {
    this.inputTerm = this.searchTerm;
    this.inputYear = this.year;
    this.inputDateSujet = this.date_sujet;
  },
  methods: {
    ...mapActions("search", [
      "performSearch",
      "setSearchTerm",
      "setSelectedYear",
      "setSelecteDateSujet",
      "setSelecteRangeSujet",
      "setNumPage"
    ]),
    search() {
      this.performSearch();
    },
    performSort(inputSort) {
      this.activeColumn["name"] = inputSort;
      if (inputSort === this.sorts) {
        inputSort = "-" + inputSort;
        this.activeColumn["order"] = "dsc";
      } else {
        this.activeColumn["order"] = "asc";
      }
      console.log(this.activeColumn);
      this.setSelecteRangeSujet(inputSort);
      this.setNumPage(1);
      this.performSearch();
    },
  },
};
</script>

<style scoped>
th{
  white-space: nowrap;
}
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
  border: 1px solid #ffffff;
  box-shadow: yes;
  background-color: #ffffff;
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
  padding: 15px;
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
