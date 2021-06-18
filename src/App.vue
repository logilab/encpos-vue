<template>
  <div class="layout-grid-container">
    <app-navbar class="layout-navbar" />
    <Suspense>
      <router-view class="layout-main" />
    </Suspense>
    <app-footer class="layout-footer" />
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";

import { onMounted } from "vue";

export default {
  components: {
    AppNavbar,
    AppFooter,
  },

  setup() {
    onMounted(() => {});
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
body {
  background-color: #ffffff;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

.layout-navbar {
  grid-area: "header";
}
.layout-main {
  grid-area: "main";
}
.layout-footer {
  grid-area: "footer";
}
.layout-grid-container {
  display: grid;
  height: calc(100% - 50px);
  grid-template-columns: 100%;
  grid-template-rows: 50px auto 100px;
  grid-template-areas:
    "header"
    "main"
    "footer";
}
</style>
