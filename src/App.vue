<template>
  <div>
    <div class="content">
      <app-navbar />
      <router-view />
    </div>
    <div class="footer">
      <app-footer />
    </div>
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
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}
</style>
