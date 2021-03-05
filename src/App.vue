<template>
  <div id="nav" class="hero">
    <div id="navMenu" class="navbar-menu">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/document/ENCPOS_1999_35">Document</router-link>
    </div>
  </div>
  <!-- START NAV -->
  <div class="container is-fluid">
    <div class="columns">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
