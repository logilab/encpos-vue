<template>
  <section class="tiles-section">
    <div class="tiles">
      <div class="tile is-ancestor app-width-padding">
        <div class="tile">
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <div class="is-flex is-flex-direction-row title-tile">
                  <p class="title">Les positions de thèses<br />de l'École nationale des chartes</p>
                  <p><span>Position</span> : Lieu où est placée une chose, une personne, par rapport à un ensemble.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-ancestor is-vertical app-width-margin">
        <div class="tile is-parent search-form-and-carousel">
          <div class="tile is-child search-form">
            <!-- Input + submit button -->
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
            <!-- Input sliders -->
            <div class="is-flex sliders">
              <div class="field slider-control is-inline-block">
                <div class="control">
                  <label>Promotions</label>
                  <span>Entre</span>
                  <span class="year">{{ inputPromotionYearRange[0] }}</span>
                  <span>et</span>
                  <span class="year">{{ inputPromotionYearRange[1] }}</span>
                  <vue-slider
                    v-model="inputPromotionYearRange"
                    :min="1849"
                    :max="2017"
                    :tooltip="'none'"
                    :disabled="search.loading.value"
                  ></vue-slider>
                </div>
              </div>
              <div class="field slider-control is-inline-block">
                <div class="control">
                  <label>Période du sujet</label>
                  <span>Entre</span>
                  <span class="year">{{ inputTopicRange[0] }}</span>
                  <span>et</span>
                  <span class="year">{{ inputTopicRange[1] }}</span>
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
            <!-- Fulltext + results count -->
            <div class="field is-flex px-2 search-form-footer">
              <div class="control is-flex">
                <label>Domaine de recherche</label>
                <Toggle
                  id="ToggleSwitch"
                  on-label="Plein texte"
                  off-label="Notice"
                  v-model="isFulltextSearch"
                  :width="120"
                />
              </div>
              <div
                  v-if="search.result.value"
                  class="results-count is-flex"
              >
                <span>{{ search.totalCount.value }}</span>
                <span>résultat(s)</span>
              </div>
          </div>
          </div>
          <div class="tile is-child carousel-parent">
            <div class="tile is-parent carousel">
              <article class="tile is-child box">
                <p class="title has-text-weight-light">Le saviez vous ?</p>
                <p class="subtitle">With some content</p>
                <div class="content">
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
        <div class="tile is-parent is-vertical">
          <!-- Table toogle + pagination -->
          <div class="is-flex toggle-list-and-pagination">
            <div v-if="isFulltextSearch === true" class="is-inline-block">
              <div class="field is-inline-block px-1">
                <div class="control">
                  <Toggle
                          id="ToggleTableau"
                          on-label="Tableau"
                          off-label="Déplié"
                          v-model="isTableau"
                          :width="120"
                  />
                </div>
              </div>
              <div v-if="isTableau === false & isFulltextSearch === true"
                   class="field is-inline-block px-1">
                <div class="control mb-6 block is-inline-block sort-options">
                  <span>
                    Tris
                  </span>
                  <div class="is-inline-block" >
                    <select name="tri" id="tri-select" v-model="inputSort">
                      <option value="">--Please choose an option--</option>
                      <option v-if="inputSort.includes('-')" value="-metadata.author_name.keyword">Auteur</option>
                      <option v-else value="metadata.author_name.keyword">Auteur</option>
                      <option v-if="inputSort.includes('-')" value="-metadata.promotion_year">Promotion</option>
                      <option v-else value="metadata.promotion_year">Promotion</option>
                      <option v-if="inputSort.includes('-')" value="-metadata.topic_notAfter">
                        Sujet du plus ancien au plus récent
                      </option>
                      <option v-else value="metadata.topic_notAfter">
                        Sujet du plus ancien au plus récent
                      </option>
                      <option v-if="inputSort.includes('-')" value="-metadata.topic_notBefore">
                        Sujet du plus récent au plus ancien
                      </option>
                      <option v-else value="metadata.topic_notBefore">
                        Sujet du plus récent au plus ancien
                      </option>
                    </select>
                    <span
                            v-if="inputSort.includes('-')"
                            class="icon button"
                            @click="inputSort = inputSort.replace('-', '')"
                    >
                    <i class="fas fa-arrow-up" />
                  </span>
                    <span v-else class="icon button" @click="inputSort = `-${inputSort}`">
                    <i class="fas fa-arrow-down" />
                  </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="search.pageCount" class="has-text-centered">
              <pagination />
            </div>
          </div>
          <div class="block text-results" v-if="(isFulltextSearch === true) & (isTableau === false)">
            <div
              class="table is-hoverable is-narrow is-fulldwidth"
              v-if="search.result.value && search.result.value.length"
            >
              <template v-for="position in search.result.value" :key="position.id">
                <router-link
                  :to="{
                    name: 'DocumentPage',
                    params: { docId: position.id },
                  }"
                  tag="tr"
                  style="text-decoration: none; color: inherit"
                >
                  <div class="columns mb-6">
                    <div class="column is-2">
                      <img
                        class="pb-thumnbail"
                        onerror="this.onerror=null; this.src='https://iiif.chartes.psl.eu/images/enc/logo-enc.png/full/120,/0/default.png'"
                        :src="`${VUE_APP_IIIF_IMAGES_URL}/${position.id}/${position.id}_01.TIF/full/120,/0/default.jpg`"
                      />
                    </div>
                    <div class="block column is-10">
                      <div
                        class="has-text-left is-size-5 position-title"
                        v-html="position.fields.metadata.title_rich"
                      ></div>
                      <div class="has-text-left has-text-weight-bold position-author">
                        {{ position.fields.metadata.author_name }}
                        {{ position.fields.metadata.author_firstname }}
                      </div>
                      <div class="has-text-right is-inline-block position-infos">
                        <span class="year"
                          >Promotion :
                          {{ position.fields.metadata.promotion_year }}</span
                        >|<span class="period">Période du sujet :
                        {{ position.fields.metadata.topic_notBefore }} -
                        {{ position.fields.metadata.topic_notAfter }}</span>
                      </div>
                      <div v-if="position.highlight" class="position-highlight">
                        <span
                          v-for="(phrase, index) in position.highlight.content"
                          :key="phrase"
                        >
                          <span v-html="phrase"></span
                          ><span v-if="index !== position.highlight.content.length - 1">
                            -
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </router-link>
              </template>
            </div>
          </div>
          <div v-else class="table-container table-results">
            <table
              class="table is-hoverable is-narrow is-fulldwidth"
              v-if="search.result.value && search.result.value.length"
            >
              <thead>
                <tr>
                  <th
                    @click="inputSort = '-metadata.author_name.keyword'"
                    v-if="inputSort === 'metadata.author_name.keyword'"
                  >
                      <div class="sortable sort-alpha-down"><span>Nom</span></div>
                  </th>
                  <th
                    @click="inputSort = ''"
                    v-else-if="inputSort === '-metadata.author_name.keyword'"
                  >
                      <div class="sortable sort-alpha-up"><span>Nom</span></div>
                  </th>
                  <th @click="inputSort = 'metadata.author_name.keyword'"
                      v-else>
                      <div class="sortable"><span>Nom</span></div>
                  </th>
                  <th>
                      <div><span>Prénom</span></div>
                  </th>
                  <th
                    class="largerTab"
                    @click="inputSort = '-metadata.promotion_year'"
                    v-if="inputSort === 'metadata.promotion_year'"
                  >
                      <div class="sortable sort-numeric-down"><abbr title="Promotion" class="is-inline-block">Prom.</abbr></div>
                  </th>
                  <th
                    class="largerTab"
                    @click="inputSort = ''"
                    v-else-if="inputSort === '-metadata.promotion_year'"
                  >
                      <div class="sortable sort-numeric-up"><abbr title="Promotion" class="is-inline-block">Prom.</abbr></div>
                  </th>
                  <th
                    class="largerTab"
                    @click="inputSort = 'metadata.promotion_year'"
                    v-else
                  >
                      <div class="sortable"><abbr title="Promotion" class="is-inline-block">Prom.</abbr></div>
                  </th>
                  <th>
                      <div><span>Titre</span></div>
                  </th>
                  <th
                    class="largerTab"
                    @click="inputSort = '-metadata.topic_notBefore'"
                    v-if="inputSort === 'metadata.topic_notBefore'"
                  >
                      <div class="sortable sort-numeric-down"><abbr title="Période du sujet">De </abbr></div>
                  </th>
                  <th
                    class="largerTab"
                    @click="inputSort = ''"
                    v-else-if="inputSort === '-metadata.topic_notBefore'"
                  >
                      <div class="sortable sort-numeric-up"><abbr title="Période du sujet">De </abbr></div>
                  </th>
                  <th
                    class="largerTab"
                    @click="inputSort = 'metadata.topic_notBefore'"
                    v-else
                  >
                      <div class="sortable"><abbr title="Période du sujet">De </abbr></div>
                  </th>
                  <th
                    class="inline"
                    @click="inputSort = '-metadata.topic_notAfter'"
                    v-if="inputSort === 'metadata.topic_notAfter'"
                  >
                      <div class="sortable sort-numeric-down"><abbr title="Période du sujet">A </abbr></div>
                  </th>
                  <th
                    class="inline"
                    @click="inputSort = ''"
                    v-else-if="inputSort === '-metadata.topic_notAfter'"
                  >
                      <div class="sortable sort-numeric-up"><abbr title="Période du sujet">A </abbr></div>
                  </th>
                  <th
                    class="inline"
                    @click="inputSort = 'metadata.topic_notAfter'"
                    v-else
                  >
                      <div class="sortable"><abbr title="Période du sujet">A </abbr></div>
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="position in search.result.value" :key="position.id">
                  <tr class="row-infos" :class="positionCssClass(position)">
                    <td>
                      <router-link :to="{ name: 'DocumentPage', params: { docId: position.id }, }">
                      {{ position.fields.metadata.author_name }}
                      </router-link>
                    </td>
                    <td>{{ position.fields.metadata.author_firstname }}</td>
                    <td>{{ position.fields.metadata.promotion_year }}</td>
                    <td>
                      <router-link :to="{ name: 'DocumentPage', params: { docId: position.id }, }">
                        <span v-html="position.fields.metadata.title_rich"></span>
                      </router-link>
                    </td>
                    <td>{{ position.fields.metadata.topic_notBefore }}</td>
                    <td>{{ position.fields.metadata.topic_notAfter }}</td>
                    <td class="inline oeil">
                      <router-link :to="{ name: 'DocumentPage', params: { docId: position.id }, }" />
                    </td>
                    <td v-if="onrollActive.includes(position.id) & (isFulltextSearch === true) & (isTableau === true) & position.highlight != null" class="inline chevron-down">
                        <a href="#" @click="rollActive($event, position.id)"></a>
                    </td>
                    <td v-else-if="(isFulltextSearch === true) & (isTableau === true) & position.highlight != null" class="inline chevron-up">
                        <a href="#" @click="rollActive($event, position.id)"></a>
                    </td>
                  </tr>
                  <tr v-if="onrollActive.includes(position.id) & (isFulltextSearch === true) & (isTableau === true) & position.highlight != null"
                      class="row-details"
                  >
                    <td colspan="8">
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

          <article class="tile is-child box">
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

const VUE_APP_IIIF_IMAGES_URL = `${process.env.VUE_APP_IIIF_IMAGES_URL}`;

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
    let isTableau = ref(true);

    function executeSearches() {
      if (isFulltextSearch.value) {
        search.setTerm(inputTerm.value);
      } else {
        console.log(isNaN(inputTerm.value));
        if (isNaN(inputTerm.value) === "false") {
          search.setTerm(
            `metadata.promotion_year:${inputTerm.value}+OR+metadata.topic_notBefore:${inputTerm.value}+OR+metadata.topic_notBefore:${inputTerm.value}+OR+metadata.title_rich:${inputTerm.value}`
          );
        } else if (typeof inputTerm.value === "string") {
          search.setTerm(
            `metadata.author_name:${inputTerm.value}+OR+metadata.title_rich:${inputTerm.value}+OR+metadata.author_firstname:${inputTerm.value}`
          );
        }
      }
      search.execute();
      aggSearch.execute();
    }

    function getInitialState() {
      // initial values
      const initialTerm = "Diplomatie";
      const initialTopicRange = [-500, 2000];
      //TODO: should fetch the upper bound
      const initialPromotionYearRange = [1849, 2017];
      const initialSort = "";
      const initialIsFulltextSearch = false;

      // restore content
      const notBefore = search.ranges["metadata.topic_notBefore"];
      const notAfter = search.ranges["metadata.topic_notAfter"];
      const promotionYear = search.ranges["metadata.promotion_year"];

      // try to restore else get the initial values
      return {
        term: search.term.value || initialTerm,
        isFulltextSearch: search.isFulltextSearch.value || initialIsFulltextSearch,
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
    const isFulltextSearch = ref(initialState.isFulltextSearch);

    search.setTerm(inputTerm.value);
    search.setRange(
      "metadata.promotion_year",
      `gte:${inputPromotionYearRange.value[0]},lte:${inputPromotionYearRange.value[1]}`
    );

    search.setRange("metadata.topic_notBefore", "gte:" + inputTopicRange.value[0]);
    search.setRange("metadata.topic_notAfter", "lte:" + inputTopicRange.value[1]);
    search.setSorts(inputSort.value);
    search.setIsFulltextSearch(isFulltextSearch);

    watch(inputTerm, () => {
      search.setTerm(inputTerm.value);
    });

    watch(isFulltextSearch, executeSearches);

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

    watch(isTableau);

    // run the initial searches
    executeSearches();

    return {
      search,
      aggSearch,
      executeSearches,
      inputTopicRange,
      isFulltextSearch,
      inputTerm,
      inputPromotionYearRange,
      inputSort,
      onrollActive,
      VUE_APP_IIIF_IMAGES_URL,
      isTableau,
    };
  },
  methods: {
    rollActive: function (event, id) {
      event.preventDefault();
      if (this.onrollActive.includes(id) === false) {
        this.onrollActive.push(id);
      } else {
        const index = this.onrollActive.indexOf(id);
        if (index > -1) {
          this.onrollActive.splice(index, 1);
        }
      }
    },
    positionCssClass: function (position) {
      return this.onrollActive.includes(position.id) && (this.isFulltextSearch === true) && (this.isTableau === true) && (position.highlight != null) ? "is-selected":"";
    }
  },
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
abbr {
    text-decoration: none !important;
}
thead tr {
    display: table-row;
}
th {
  white-space: nowrap;
}
th > div {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
    border: none !important;
    text-decoration: none !important;
}
th > div > span {
  display: inline-block;
}
th > div.sortable {
    cursor: pointer;
}
th > div::before {
    content:'';
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-bottom: 5px;
}
th > div.sortable::before {
    background: url(../assets/images/b_tri.svg) center / cover no-repeat;
}
th > div.sort-alpha-down::before {
    background-image: url(../assets/images/b_tri_AZ.svg);
}
th > div.sort-alpha-up::before {
    background-image: url(../assets/images/b_tri_ZA.svg);
}
th > div.sort-numeric-down::before {
    background-image: url(../assets/images/b_tri_19.svg);
}
th > div.sort-numeric-up::before {
    background-image: url(../assets/images/b_tri_91.svg);
}
tr td.oeil a,
tr td.chevron-down a,
tr td.chevron-up a {
  display: block;
  width: 35px;
  text-decoration: none !important;
  border-bottom:none !important;
}
tr td.oeil a:hover,
tr td.chevron-down a:hover,
tr td.chevron-up a:hover {
  background-color: transparent !important;
  text-decoration: none !important;
}
tr td.oeil a {
  width: 27px;
  height: 20px;
  background: url(../assets/images/b_oeil.svg) center / contain no-repeat;
}
.table tr.row-infos.is-selected td.oeil a {
  background-image: url(../assets/images/b_oeil_blc.svg);
}
tr td.chevron-up a::before,
tr td.chevron-down a::before {
    content: '';
    display: inline-block;
    width: 27px;
    height: 20px;
    transform-origin: 50%;
}
tr td.chevron-down a::before {
  background: url(../assets/images/croix_blc.svg) center / contain no-repeat;
}
tr td.chevron-up a::before {
  background: url(../assets/images/chevron_rouge.svg) center / contain no-repeat;
}

.description {
  text-align: center;
}
.tiles {
}
.tiles-section {
  background-color: #ffffff;
  padding-bottom: 100px;
}
.tile.is-ancestor:first-child {
  padding-top: 35px;
  padding-bottom: 37px;
  background-color: #FBF8F4;
  margin: 0 0 46px 0;
}
.tile.box {
  border: none;
  box-shadow: none;
  background: none;
  padding: 0;
}
.tile.is-parent {
  padding: 0;
}
.toggle-list-and-pagination,
.title-tile {
  justify-content: space-between;
  align-items: center;
}
.toggle-list-and-pagination > div:first-child .is-inline-block {
  margin-bottom: 0 !important;
}
.toggle-list-and-pagination .sort-options select,
.toggle-list-and-pagination .sort-options > span {
  font-family: "Barlow", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #ADADAD;
}
.toggle-list-and-pagination .sort-options > span {
  text-transform: uppercase;
  margin: 0 10px 0 30px;
}
.toggle-list-and-pagination .sort-options select {
  background: transparent;
  inset: unset;
  border: #D9D8D3 solid 1px;
  padding: 3px 5px 5px 10px;
  margin-right: 10px;
}
.title-tile > p:last-child {
  width: 345px;
  font-family: "Noto Serif", serif;
  font-size: 14px;
  color: #5C5241;
  font-style: italic;
  text-align: left;
  text-indent: 0;
}
.title-tile > p:last-child span {
  font-weight: 700;
  font-style: normal;
}
.title, .subtitle {
  font-family: "Noto Serif", serif;
}
.title {
  font-size: 35px;
  font-style: normal;
  line-height: 47px;
  font-weight: 400;
  color: #B9192F;
  margin-bottom: 0;
  text-align: left;
  text-indent:0;
}
.subtitle {
  font-size: 25px;
  line-height: 32px;
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
.search-form-and-carousel {
  gap: 20px;
  padding-bottom: 50px !important;
  border-bottom: solid 1px #B8B8B8;
  margin-bottom: 24px !important;
}
.search-form {
}
.search-form > *:first-child {
  background-color: #868686;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 32px 24px 34px 28px;
  margin-bottom: 0;
}
.search-form > *:not(:first-child) {
  background-color: #E4E4E4;
  margin-bottom: 0;
}
.search-form > *:last-child {
  padding: 24px !important;
}
.search-form .input {
  box-shadow: none;
  border-radius: 4px !important;
  height: auto;
  padding-bottom: 6px;
  padding-top: 6px;
}
.search-form button.search.button.is-light {
  background: #B9192F url(../assets/images/bouton_loupe.svg);
  border: none;
  border-radius: 4px !important;
  font-size: 0;
  width: 44px;
  height: 44px;
  margin-left: 9px;
}
.search-form-footer {
  font-family: "Barlow", sans-serif;
  background-color: #F0F0F0 !important;
  justify-content: space-between;
  align-items: center;
}
.search-form-footer .control label {
  margin-right: 10px;
  font-size: 14px;
  line-height: 35px;
  font-weight: 500;
  color: #979797;
  text-transform: uppercase;
}
.search-form-footer .results-count {
  flex-direction: column;
}
.search-form-footer .results-count > span {
  text-align: center;
}
.search-form-footer .results-count > span:first-child {
  font-size: 50px;
  line-height: 50px;
  font-weight: 700;
  color: #7E7E7E;
}
.search-form-footer .results-count > span:last-child {
  font-size: 12px;
  font-weight: 500;
  color: #4A4A4A;
  text-transform: uppercase;
}
/* toggle */
.toggle-input :deep(input) {
}
.toggle-input :deep(input + label) {
  display: flex;
  width: auto;
  text-transform: uppercase;
  background-color: #DDDDDD !important;
  padding: 18px 0;
  border-radius: 17.5px;
  font-family: "Barlow", sans-serif;
  font-size: 14px;
}
.toggle-input :deep( input + label span ) {
  padding: 0 15px;
  line-height: 36px;
}
.toggle-input :deep( input + label .toggle-on),
.toggle-input :deep( input + label .toggle-off) {
  display: inline-block;
  color: #828282;
}
.toggle-input :deep( input:not(:checked) + label .toggle-off ),
.toggle-input :deep( input:checked + label .toggle-on ) {
  margin: 0;
  background-color: #B9192F !important;
  border-radius: 17.5px;
  color: #FFF;
}
.toggle-input :deep( label::before ) {
  display: none;
}

/* sliders */
.sliders {
  font-family: "Barlow", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
}
.sliders label {
  font-size: 16px;
  color: #4A4A4A;
  margin-bottom: 10px;
}
.sliders span {
  font-size: 14px;
  color: #979797;
}
.sliders span.year {
  background-color: #fff;
  padding: 2px 20px;
  margin: 0 15px;
}
.slider-control {
  flex: 50% 0 0;
  padding: 24px;
}
.slider-control label {
  display: block;
}
.vue-slider.vue-slider-ltr {
  margin-top: 15px !important;
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

/* carousel */
.carousel-parent {
  flex: 355px 0 0;
  background-color: #F6F2ED;
  padding: 15px 8px;
  border-radius: 6px;
}
.carousel > *:not(:first-child) {
  display: none;
}
.carousel article .title {
  font-size: 24px;
  text-align: center;
  vertical-align: top;
  font-weight: 700 !important;
  font-style: italic;
  text-transform: none;
  color: #5B5B5B;
  margin-bottom: 10px;
}
.carousel article .subtitle {
  font-size: 20px;
  line-height: 32px;
  text-align: center;
}
.carousel :deep( canvas ) {
  max-width: 100%;
}

/* search table */
.table-container {
  font-family: "Barlow Semi Condensed", sans-serif;
  margin-top: 24px;
  overflow-y: auto;
  min-height: 600px;
}
.table thead {
  background-color: #F0F0F0;
}
.table thead th {
  padding: 15px 0 12px 20px;
  background: none;
  text-transform: uppercase;
}
.table tr.row-infos.is-selected {
  background-color: #A3A3A3 !important;
}
tr.row-infos > td {
  padding: 14px 0 14px 20px;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color:#666666;
  border: none;
  border-top: #B9192F 1px dashed;
}
tr.row-infos > td a {
  color:#666666;
}
tr.row-infos.is-selected > td > a,
tr.row-infos.is-selected > td {
  color: #FFFFFF !important;
}
tr.row-infos:last-child > td {
  border-bottom: #B9192F 3px solid;
}
tr.row-infos > td:nth-child(1) {
  text-transform: uppercase;
}
tr.row-infos > td:nth-child(2) {
  /* font-weight: 600; */
}
tr.row-infos > td:nth-child(3) {
  color: #000000;
}
tr.row-infos > td:nth-child(4) > a {
  font-size: 18px;
  font-weight: 400 !important;
  line-height: 24px;
  color: #4A4A4A;
  text-decoration: none;
  border: none;
}
tr.row-infos:hover {
  cursor: pointer;
}
tr.row-details {
  background-color: #F6F6F6;
}
tr.row-details :deep( td ) {
  border: inherit;
}
tr.row-details :deep( ul ) {
  padding: 25px 25px 40px;
}
tr.row-details :deep( li ) {
  font-family: "Libre Baskerville", serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  color: #5F5F5F;
}
/* search text results */
.text-results .table {
  margin-top: 24px;
}
.text-results .table > a {
  display: block;
  padding-top: 15px;
  border-top: #B9192F 1px dashed;
  font-family: "Barlow Semi Condensed", sans-serif;
}
.text-results .table > a:last-child {
  border-bottom: #B9192F 3px solid;
}
.text-results .table > a .columns.mb-6 {
  margin-bottom: 10px !important;
}
.text-results .table > a .position-title {
  width: 65%;
  font-size: 22px;
  font-weight: 600;
  line-height: 26px;
  color: #000000;
  margin-bottom: 10px;
}
.text-results .table > a .position-author {
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  text-transform: uppercase;
  color: #666666;
}
.text-results .table > a .position-infos {
  font-size: 16px;
  font-weight: 600;
  color: #828282;
}
.text-results .table > a .position-infos span.year {
  margin-right: 8px;
}
.text-results .table > a .position-infos span.period {
  margin-left: 8px;
}
.text-results .table > a .position-highlight {
  font-family: "Libre Baskerville", serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  color: #5F5F5F;
  margin-top: 15px;
}
tr.row-details :deep( em ),
.text-results .table > a :deep( em ) {
  background-color: #FFEC00;
  border-radius: 3px;
  font-style: normal;
  padding: 4px 5px;
}

@media screen and (max-width: 1150px) {
  .tile.is-ancestor:first-child {
    padding-top:35px;
    padding-bottom:35px;
  }
}

@media screen and (max-width: 1040px) {
  .sliders {
    flex-direction: column;
    padding-bottom: 10px;
  }
  .slider-control {
    padding: 18px 24px;
    margin-bottom: 0;
  }
  .toggle-list-and-pagination {
    flex-direction: column;
    justify-content: flex-start;
  }
  .toggle-list-and-pagination > div:first-child {
    width: 100%;
    align-self: flex-start;
    display: flex !important;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .toggle-list-and-pagination > div:last-child {
    align-self: center;
  }
}

@media screen and (max-width: 900px) {
  .title-tile {
    flex-direction: column !important;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
  }
  .search-form-footer .control {
    flex-direction: column;
  }
  .search-form-footer .control label {
    margin-bottom: 5px;
  }
  .text-results .table > a .columns.mb-6 {
    flex-direction: column;
  }
}
@media screen and (max-width: 768px) {
  .carousel-parent {
    margin-top: 20px !important;
  }
}
@media screen and (max-width: 800px) {
  .title {
    font-size: 30px;
    line-height: 36px;
  }
  .tile.is-ancestor:first-child {
    margin-bottom: 22px;
  }
  .tiles-section {
    padding-bottom: 40px;
  }
  .toggle-list-and-pagination > div {
    flex-direction: column;
    align-items: flex-start;
    gap:30px;
  }
  .toggle-list-and-pagination > div:first-child > .is-inline-block {
    margin-bottom:20px !important;
  }
  .toggle-list-and-pagination .sort-options > span {
    margin-left:0;
  }
  .text-results .table > a .columns.mb-6 {
    margin: 10px 0;
  }
  .table,
  .table tr {
    width: 100%;
  }
  .table-container thead tr,
  .table-container tr.row-infos {
    display: flex;
    flex-wrap: wrap;
  }
  .table-container thead tr {
    justify-content: flex-start;
  }
  .table-container thead tr > th {
    flex: 25% 0 0;
  }
  .table-container thead tr > th:nth-child(2),
  .table-container thead tr > th:nth-child(4),
  .table-container thead tr > th:nth-child(7),
  .table-container thead tr > th:nth-child(8) {
    display: none;
  }
  .table-container thead tr > th:nth-child(5),
  .table-container thead tr > th:nth-child(6) {
    padding: 15px 20px 12px 0;
  }
  .table-container thead tr > th:nth-child(5) div.sortable,
  .table-container thead tr > th:nth-child(6) div.sortable {
    align-items: flex-end;
    justify-content: flex-start;
  }
  .table-container thead tr > th:nth-child(5) div.sortable abbr {
    padding-right: 12px;
  }
  .table-container tr.row-infos {
    border-top: #B9192F 1px dashed;
    padding: 10px 20px;
    position: relative;
  }
  .table-container tr.row-infos:last-child {
    padding-bottom: 20px;
    border-bottom: #BA0F29 solid 3px;
  }
  .table-container tr.row-details td {
    padding: 0;
  }
  .table-container tr.row-details ul {
    padding: 15px;
  }
  .text-results .table > a .position-highlight,
  tr.row-details li {
    font-size: 14px;
    line-height: 24px;
  }
  tr.row-infos > td {
    border: none !important;
    padding: 0;
  }
  tr.row-infos.is-selected > td::before {
    color: #FFF !important;
  }
  tr.row-infos > td:nth-child(1) {
    /* Nom */
    order: 1;
    font-size: 18px;
  }
  tr.row-infos > td:nth-child(2) {
    order: 2;
    margin-left: 10px;
    font-size: 16px;
  }
  tr.row-infos > td:nth-child(3) {
    /* Promotion */
    order: 4;
    flex: 100% 0 0;
    padding-top: 10px;
    font-weight: 500;
    color: #000000;
  }
  tr.row-infos > td:nth-child(3)::before {
    content: "Promotion : ";
    color: #666666;
  }
  tr.row-infos > td:nth-child(4) {
    /* Titre */
    order: 3;
    flex: 100% 0 0;
    padding:4px 50px 0 0;
  }
  tr.row-infos > td:nth-child(4) > a {
    font-weight: 600 !important;
    line-height: 22px;
  }
  tr.row-infos > td:nth-child(5) {
    order: 5;
    color: #000000;
  }
  tr.row-infos > td:nth-child(5)::before {
    content: "Période du sujet : de";
    margin: 0 5px 0 0;
    color: #666666;
  }
  tr.row-infos > td:nth-child(6) {
    order: 6;
    color: #000000;
  }
  tr.row-infos > td:nth-child(6)::before {
    content: "à";
    margin: 0 5px;
    color: #666666;
  }
  tr.row-infos > td:nth-child(7) {
    order: 7;
    position: absolute;
    top: 15px;
    right: 20px;
  }
  tr.row-infos > td:nth-child(8) {
    order: 8;
    position: absolute;
    bottom: 10px;
    right: 12px;
  }
  @media screen and (max-width: 640px) {
    .title {
      text-align: center;
      padding-bottom: 20px;
      margin: auto;
    }
    .title-tile > p:last-child {
      margin: auto;
      width: 60%;
    }
  }

}

</style>