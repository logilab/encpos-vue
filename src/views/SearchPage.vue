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
        <div class="tile is-parent is-8">
          <article class="tile is-child box">
            <div class="search-form">
              <div class="field">
                <Toggle
                  id="ToggleSwitch"
                  on-label="Notice"
                  off-label="Plein-text"
                  v-model="inputCheckedMetadata"
                  :width="100"
                />
              </div>
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    class="input is-medium"
                    type="text"
                    placeholder="Find a repository"
                    v-model="inputTerm"
                    @keyup.enter="executeSearches"
                  />
                </div>
                <div class="control">
                  <button
                    class="button is-light is-medium search"
                    @click="executeSearches"
                    :disabled="search.loading.value"
                  >
                    Chercher
                  </button>
                </div>
              </div>
              <div v-if="search.result.value">
                <span>Résultat de votre recherche : {{ search.totalCount.value }}</span>
              </div>
              <div class="block">
                <div class="field vue-slider is-inline-block">
                  <div class="control">
                    <span
                      >Promotions : {{ inputPromotionYearRange[0] }} -
                      {{ inputPromotionYearRange[1] }}</span
                    >
                    <vue-slider
                      v-model="inputPromotionYearRange"
                      :min="1849"
                      :max="2017"
                      :tooltip="'none'"
                      :disabled="search.loading.value"
                    ></vue-slider>
                  </div>
                </div>
                <div class="field vue-slider is-inline-block">
                  <div class="control">
                    <span
                      >Période du sujet : {{ inputTopicRange[0] }} -
                      {{ inputTopicRange[1] }}</span
                    >
                    <vue-slider
                      v-model="inputTopicRange"
                      :min="-500"
                      :max="2000"
                      :tooltip="'none'"
                      :disabled="search.loading.value"
                    ></vue-slider>
                  </div>
                </div>
              </div>
            </div>
            <div class="has-text-centered">
              <pagination />
            </div>
            <div class="table-container">
              <table
                class="table is-hoverable is-narrow is-fulldwidth"
                v-if="search.result.value && search.result.value.length"
              >
                <thead>
                  <tr>
                    <th>
                      Nom
                      <i
                        @click="inputSort = '-metadata.author_name.keyword'"
                        v-if="inputSort === 'metadata.author_name.keyword'"
                        class="fas fa-sort-numeric-down is-inline-block"
                      ></i>
                      <i
                        @click="inputSort = ''"
                        v-else-if="inputSort === '-metadata.author_name.keyword'"
                        class="fas fa-sort-numeric-up is-inline-block"
                      ></i>
                      <i
                        @click="inputSort = 'metadata.author_name.keyword'"
                        v-else
                        class="fas fa-sort is-inline-block"
                      ></i>
                    </th>
                    <th>Prénom</th>
                    <th class="largerTab">
                      <abbr title="Promotion" class="is-inline-block">Prom </abbr>
                      <i
                        @click="inputSort = '-metadata.promotion_year'"
                        v-if="inputSort === 'metadata.promotion_year'"
                        class="fas fa-sort-numeric-down is-inline-block"
                      ></i>
                      <i
                        @click="inputSort = ''"
                        v-else-if="inputSort === '-metadata.promotion_year'"
                        class="fas fa-sort-numeric-up is-inline-block"
                      ></i>
                      <i
                        @click="inputSort = 'metadata.promotion_year'"
                        v-else
                        class="fas fa-sort is-inline-block"
                      ></i>
                    </th>
                    <th>Titre</th>
                    <th class="largerTab">
                      <abbr title="Période du sujet">De </abbr>
                      <i
                        @click="inputSort = '-metadata.topic_notBefore'"
                        v-if="inputSort === 'metadata.topic_notBefore'"
                        class="fas fa-sort-numeric-down is-inline-block"
                      ></i>
                      <i
                        @click="inputSort = ''"
                        v-else-if="inputSort === '-metadata.topic_notBefore'"
                        class="fas fa-sort-numeric-up is-inline-block"
                      ></i>
                      <i
                        @click="inputSort = 'metadata.topic_notBefore'"
                        v-else
                        class="fas fa-sort is-inline-block"
                      ></i>
                    </th>
                    <th class="inline">
                      <abbr title="Période du sujet">A </abbr>
                      <i
                        @click="inputSort = '-metadata.topic_notAfter'"
                        v-if="inputSort === 'metadata.topic_notAfter'"
                        class="fas fa-sort-numeric-down is-inline-block"
                      ></i>
                      <i
                        @click="inputSort = ''"
                        v-else-if="inputSort === '-metadata.topic_notAfter'"
                        class="fas fa-sort-numeric-up is-inline-block"
                      ></i>
                      <i
                        @click="inputSort = 'metadata.topic_notAfter'"
                        v-else
                        class="fas fa-sort is-inline-block"
                      ></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="position in search.result.value" :key="position.id">
                    <tr @click="rollActive(position.id)">
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
                          <span v-html="position.fields.metadata.title_rich"></span
                        ></router-link>
                      </td>
                      <td>{{ position.fields.metadata.topic_notBefore }}</td>
                      <td>{{ position.fields.metadata.topic_notAfter }}</td>
                    </tr>
                    <tr v-if="onrollActive.includes(position.id)">
                      <td colspan="6">
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
                  :to="{
                    name: 'DocumentPage',
                    params: { docId: 'ENCPOS_1999_35' },
                  }"
                >
                  Visiter le document
                </router-link>
              </p>
              <histogram />
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
import { inject, ref, watch } from "vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import Pagination from "@/components/Pagination";
import Toggle from "@vueform/toggle";

import Histogram from "@/components/charts/Histogram";

export default {
  name: "Home",
  components: {
    VueSlider,
    Pagination,
    Histogram,
    Toggle,
  },
  setup() {
    const search = inject("search");
    const aggSearch = inject("agg-search");

    function executeSearches() {
      if (inputCheckedMetadata.value === true) {
        console.log("TestMetadata");
        search.setTerm(
          `metadata.author_name:${inputTerm.value}+OR+metadata.title_rich:${inputTerm.value}+OR+metadata.author_firstname:${inputTerm.value}+OR+metadata.promotion_year:${inputTerm.value}`
        );
        search.execute();
        aggSearch.execute();
      } else {
        console.log("TestMetadata");
        search.setTerm(inputTerm.value);
        search.execute();
        aggSearch.execute();
      }
    }

    function getInitialState() {
      // initial values
      const initialTerm = "Diplomatie";
      const initialTopicRange = [-500, 2000];
      //TODO: should fetch the upper bound
      const initialPromotionYearRange = [1849, 2017];
      const initialSort = "";
      const initialCheckedMetadata = false;

      // restore content
      const notBefore = search.ranges["metadata.topic_notBefore"];
      const notAfter = search.ranges["metadata.topic_notAfter"];
      const promotionYear = search.ranges["metadata.promotion_year"];

      // try to restore else get the initial values
      return {
        term: search.term.value || initialTerm,
        checkedMetadata: search.checkedMetadata.value || initialCheckedMetadata,
        topicRange:
          notBefore && notAfter
            ? [notBefore.replace("gte:", ""), notAfter.replace("lte:", "")]
            : initialTopicRange,
        sort: search.sorts.value || initialSort,
        promotionYearRange: promotionYear
          ? promotionYear.replace("lte:", "").replace("gte:", "").split(",")
          : initialPromotionYearRange,
      };
    }

    const initialState = getInitialState();
    const inputTerm = ref(initialState.term);
    const inputTopicRange = ref(initialState.topicRange);
    const inputPromotionYearRange = ref(initialState.promotionYearRange);
    const inputSort = ref(initialState.sort);
    const onrollActive = ref([]);
    const inputCheckedMetadata = ref(initialState.checkedMetadata);

    search.setTerm(inputTerm.value);
    search.setRange(
      "metadata.promotion_year",
      `gte:${inputPromotionYearRange.value[0]},lte:${inputPromotionYearRange.value[1]}`
    );

    search.setRange("metadata.topic_notBefore", "gte:" + inputTopicRange.value[0]);
    search.setRange("metadata.topic_notAfter", "lte:" + inputTopicRange.value[1]);
    search.setSorts(inputSort.value);
    search.setCheckedMetadata(inputCheckedMetadata);

    watch(inputTerm, () => {
      search.setTerm(inputTerm.value);
    });

    watch(inputCheckedMetadata, () => {
      if (inputCheckedMetadata.value === true) {
        console.log("TestMetadata");
        search.setTerm(
          `metadata.author_name:${inputTerm.value}+OR+metadata.title_rich:${inputTerm.value}+OR+metadata.author_firstname:${inputTerm.value}+OR+metadata.promotion_year:${inputTerm.value}`
        );
        executeSearches();
      } else {
        console.log("Test");
        search.setTerm(inputTerm.value);
        executeSearches();
      }
    });

    watch(inputPromotionYearRange, () => {
      search.setRange(
        "metadata.promotion_year",
        `gte:${inputPromotionYearRange.value[0]},lte:${inputPromotionYearRange.value[1]}`
      );
      search.setPageNum(1);
      executeSearches();
    });

    watch(inputTopicRange, () => {
      search.setRange("metadata.topic_notBefore", "gte:" + inputTopicRange.value[0]);
      search.setRange("metadata.topic_notAfter", "lte:" + inputTopicRange.value[1]);
      search.setPageNum(1);
      executeSearches();
    });

    watch(inputSort, () => {
      search.setSorts(inputSort.value);
      search.setPageNum(1);
      search.execute();
    });

    // set up the agg search and bind it to the search inputs changes
    aggSearch.setTerm(search.term.value);
    aggSearch.setSorts(search.sorts.value);
    aggSearch.setGroupbyField("metadata.promotion_year");
    aggSearch.setWithIds(true);
    Object.keys(search.ranges).map((k) => {
      aggSearch.setRange(k, search.ranges[k]);
    });

    watch(search.term, () => {
      aggSearch.setTerm(search.term.value);
    });
    watch(search.sorts, () => {
      aggSearch.setSorts(search.sorts.value);
    });
    watch(search.ranges, () => {
      Object.keys(search.ranges).map((k) => {
        aggSearch.setRange(k, search.ranges[k]);
      });
    });

    // run the initial searches
    executeSearches();

    return {
      search,
      aggSearch,
      executeSearches,
      inputTopicRange,
      inputCheckedMetadata,
      inputTerm,
      inputPromotionYearRange,
      inputSort,
      onrollActive,
    };
  },
  methods: {
    rollActive: function (event) {
      if (this.onrollActive.includes(event) === false) {
        this.onrollActive.push(event);
      } else {
        const index = this.onrollActive.indexOf(event);
        if (index > -1) {
          this.onrollActive.splice(index, 1);
        }
      }
    },
  },
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
th {
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
tr:hover {
  cursor: pointer;
}
tr :deep(em) {
  background-color: rgba(251, 232, 65, 0.555);
  border-radius: 3px;
  font-style: normal;
  padding: 4px 5px;
}
</style>
