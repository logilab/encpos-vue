<template>
  <section>
    <nav class="level">
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
  padding: 10px calc( 50% - 552px );
}
a {
  color: inherit;
  font-family: inherit;
}
.active {
  color: #FFFFFF;
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
  margin-right: 40px;
  background: url(../assets/images/head_logo.svg) center / cover;
}
@media screen and (max-width: 1150px) {
  nav {
    padding:26px 20px;
  }
}
</style>
