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
  grid-template-rows: auto auto 272px;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

/* responsive layout */
.app-width-margin {
  margin: 0 auto !important;
  max-width: 1100px;
}
.app-width-padding {
  margin: 0;
  padding-left: calc( 50% - 550px );
  padding-right: calc( 50% - 550px );
}

@media screen and (max-width: 1150px) {
  .app-width-padding {
    padding-left: 20px;
    padding-right: 20px;
  }
  .app-width-margin {
    margin: 0;
    max-width: 100%;
    padding: 0 20px;
  }
}

@media screen and (max-width: 800px) {
  .app-width-padding {
    padding-left: 2.5%;
    padding-right: 2.5%;
  }
  .app-width-margin {
    margin: 0;
    max-width: 100%;
    padding: 0 2.5%;
  }
}

@media screen and (max-width: 800px) {
  .layout-grid-container {
    margin-top: 71px;
  }
}

@media screen and (max-width: 500px) {
  .layout-grid-container {
    margin-top: 90px;
  }
}
</style>
