<template>
  <div class="grid-container">
    <section class="toc">
      <ul>
        <li
          v-for="tab in tabs"
          :key="tab"
          @click="currentTab = tab"
          :class="['tab', { 'is-active': currentTab === tab }]"
        >
          <div>{{ tab }}</div>
        </li>
      </ul>
    </section>
    <section class="main container">
      <Suspense>
        <div class="content">
          <keep-alive>
            <component :is="currentTab"></component>
          </keep-alive>
        </div>
      </Suspense>
    </section>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "DocumentationPage",
  components: {
    ApiDocumentation: defineAsyncComponent(() =>
      import("@/components/documentation/ApiDocumentation")
    ),
    AppDocumentation: defineAsyncComponent(() =>
      import("@/components/documentation/AppDocumentation")
    ),
    DtsDocumentation: defineAsyncComponent(() =>
      import("@/components/documentation/DtsDocumentation")
    ),
  },
  data() {
    return {
      currentTab: "api-documentation",
      tabs: ["api-documentation", "app-documentation", "dts-documentation"],
    };
  },
};
</script>

<style scoped>
.toc {
  grid-area: "main";
  background-color: #eeeeee;
}
.main {
  grid-area: "sidebar";
}
.content {
  padding-top: 75px;
}
.tab {
  padding: 10px;
  margin: 20px;
  color: #457b9d;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
}
.tab.is-active {
  color: #e63946;
}
.tab:hover {
  cursor: pointer;
}
.grid-container {
  display: grid;
  height: 100%;
  grid-template-columns: 320px auto;
  grid-template-rows: auto;
  grid-template-areas: "sidebar main";
}
</style>
