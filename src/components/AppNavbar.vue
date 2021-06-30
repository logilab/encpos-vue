<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <span class="level-item" active-class="active">
          <router-link :to="{ name: 'SearchPage' }" active-class="active"
            >Les positions</router-link
          >
        </span>
        <span class="level-item">
          <router-link :to="{ name: 'AboutPage' }" active-class="active"
            >Le projet</router-link
          >
        </span>
        <span class="level-item">
          <a href="http://omekatest.chartes.psl.eu/s/thenca/page/accueil" target="_blank" active-class="active">Thenca</a>
        </span>
      </div>
      <div class="level-right">
        <span class="level-item">
          <router-link :to="{ name: 'DocumentationPage' }" active-class="active"
            >Documentation</router-link
          >
        </span>
      </div>
    </nav>
  </section>
</template>

<style scoped>
nav {
  font-size: inherit;
}
section {
  padding: 14px;
  padding-bottom: 30px;
}
a {
  color: #457b9d;
  font-family: "Montserrat", sans-serif;
}
.active {
  color: #e63946;
}
</style>
