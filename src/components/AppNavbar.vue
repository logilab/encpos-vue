<template>
  <section>
    <nav class="level app-width-padding">
      <div class="level-left">
        <a href="#" class="logo-header"></a>
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
  font-family: 'Barlow', sans-serif;
  font-size: 18px;
  line-height: 1;
  color: #FFFFFF;
  background-color: #B9192F;
  padding-top: 10px;
  padding-bottom: 10px;
}
a {
  color: inherit;
  font-family: inherit;
  background-color: transparent !important;
}
a:hover {
  text-decoration: underline dotted;
  color: #FFFFFF;
}
.active {
  color: #FFFFFF;
  text-decoration: none;
}
nav span.level-item:not(:last-child)::after {
  content: '|';
  display: inline-block;
  color: #000;
  padding-left: .75rem;
}
.logo-header {
  width: 45px;
  height: 50px;
  margin:0 40px 0 2px;
  background: url(../assets/images/head_logo.svg) center / cover;
}
@media screen and (max-width: 1150px) {
  nav {
    padding-top:26px;
    padding-bottom:26px;
  }
}
</style>
