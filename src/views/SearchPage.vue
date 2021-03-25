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
            <p class="title has-text-weight-light">Middle box</p>
            <p class="subtitle">With an image</p>
            <div class="search-form">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    class="input is-medium"
                    type="text"
                    placeholder="Find a repository"
                  />
                </div>
                <div class="control">
                  <a class="button is-light is-medium search">Chercher</a>
                </div>
              </div>
              <div
                class="is-flex is-flex-direction-row"
                style="justify-content: space-between"
              >
                <div class="field">
                  <div class="control">
                    <label class="radio">
                      <input type="radio" name="question" />
                      Yes
                    </label>
                    <label class="radio">
                      <input type="radio" name="question" />
                      No
                    </label>
                  </div>
                </div>
                <div class="field vue-slider">
                  <div class="control">
                    <vue-slider
                      v-model="year"
                      :min="1849"
                      :max="2017"
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
                    <th><abbr title="Position">Pos</abbr></th>
                    <th>Team</th>
                    <th><abbr title="Played">Pld</abbr></th>
                    <th><abbr title="Won">W</abbr></th>
                    <th><abbr title="Drawn">D</abbr></th>
                    <th><abbr title="Lost">L</abbr></th>
                    <th><abbr title="Goals for">GF</abbr></th>
                    <th><abbr title="Goals against">GA</abbr></th>
                    <th><abbr title="Goal difference">GD</abbr></th>
                    <th><abbr title="Points">Pts</abbr></th>
                    <th>Qualification or relegation</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th><abbr title="Position">Pos</abbr></th>
                    <th>Team</th>
                    <th><abbr title="Played">Pld</abbr></th>
                    <th><abbr title="Won">W</abbr></th>
                    <th><abbr title="Drawn">D</abbr></th>
                    <th><abbr title="Lost">L</abbr></th>
                    <th><abbr title="Goals for">GF</abbr></th>
                    <th><abbr title="Goals against">GA</abbr></th>
                    <th><abbr title="Goal difference">GD</abbr></th>
                    <th><abbr title="Points">Pts</abbr></th>
                    <th>Qualification or relegation</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>
                      <a
                        href="https://en.wikipedia.org/wiki/Leicester_City_F.C."
                        title="Leicester City F.C."
                        >Leicester City</a
                      >
                      <strong>(C)</strong>
                    </td>
                    <td>38</td>
                    <td>23</td>
                    <td>12</td>
                    <td>3</td>
                    <td>68</td>
                    <td>36</td>
                    <td>+32</td>
                    <td>81</td>
                    <td>
                      Qualification for the
                      <a
                        href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage"
                        title="2016–17 UEFA Champions League"
                        >Champions League group stage</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>
                      <a
                        href="https://en.wikipedia.org/wiki/Arsenal_F.C."
                        title="Arsenal F.C."
                        >Arsenal</a
                      >
                    </td>
                    <td>38</td>
                    <td>20</td>
                    <td>11</td>
                    <td>7</td>
                    <td>65</td>
                    <td>36</td>
                    <td>+29</td>
                    <td>71</td>
                    <td>
                      Qualification for the
                      <a
                        href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage"
                        title="2016–17 UEFA Champions League"
                        >Champions League group stage</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>
                      <a
                        href="https://en.wikipedia.org/wiki/Tottenham_Hotspur_F.C."
                        title="Tottenham Hotspur F.C."
                        >Tottenham Hotspur</a
                      >
                    </td>
                    <td>38</td>
                    <td>19</td>
                    <td>13</td>
                    <td>6</td>
                    <td>69</td>
                    <td>35</td>
                    <td>+34</td>
                    <td>70</td>
                    <td>
                      Qualification for the
                      <a
                        href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage"
                        title="2016–17 UEFA Champions League"
                        >Champions League group stage</a
                      >
                    </td>
                  </tr>
                  <tr class="is-selected">
                    <th>4</th>
                    <td>
                      <a
                        href="https://en.wikipedia.org/wiki/Manchester_City_F.C."
                        title="Manchester City F.C."
                        >Manchester City</a
                      >
                    </td>
                    <td>38</td>
                    <td>19</td>
                    <td>9</td>
                    <td>10</td>
                    <td>71</td>
                    <td>41</td>
                    <td>+30</td>
                    <td>66</td>
                    <td>
                      Qualification for the
                      <a
                        href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Play-off_round"
                        title="2016–17 UEFA Champions League"
                        >Champions League play-off round</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>
        <div class="tile is-vertical is-parent">
          <article class="tile is-child box">
            <p class="title has-text-weight-light">Third column</p>
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
            <p class="title has-text-weight-light">Vertical tiles</p>
            <p class="subtitle">Top box</p>
          </article>
          <article class="tile is-child box">
            <p class="title has-text-weight-light">Vertical tiles</p>
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

export default {
  name: "Home",
  components: {
    VueSlider,
  },
  data() {
    return {
      year: 1999,
    };
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
  padding-top: 50px;
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
