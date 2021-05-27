<template>
  <div class="grid-container">
    <section class="toc">
      <ul>
        <li v-for="tab in tabs" :key="tab" @click="currentTab = tab">
          <div class="tab">{{ tab }}</div>
        </li>
      </ul>
    </section>
    <section class="main">
      <section class="container">
        <Suspense>
          <keep-alive>
            <component :is="currentTab"></component>
          </keep-alive>
        </Suspense>
      </section>
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
}
.main {
  grid-area: "sidebar";
}
.tab {
  padding: 10px;
}
.tab:hover {
  cursor: pointer;
}
.grid-container {
  display: grid;
  height: 100%;
  grid-template-columns: 500px auto;
  grid-template-rows: auto;
  grid-template-areas: "sidebar main";
}
</style>
