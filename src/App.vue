<template>
  <div class="grid-container">
    <app-navbar class="navbar" />
    <router-view class="main" />
    <app-footer class="footer" />
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";

export default {
  components: {
    AppNavbar,
    AppFooter,
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

.navbar {
  grid-area: "header";
}
.main {
  grid-area: "main";
}
.footer {
  grid-area: "footer";
}
.grid-container {
  display: grid;
  height: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 50px auto 100px;
  grid-template-areas:
    "header"
    "main"
    "footer";
}
</style>
