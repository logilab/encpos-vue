<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <span class="level-item">
          <router-link to="/" active-class="active">Le projet</router-link>
        </span>
        <span class="level-item"> </span>
        <span class="level-item">
          <router-link to="/">Les thèses</router-link>
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
  padding-bottom: 0px;
}
a {
  color: #457b9d;
  font-family: "Montserrat", sans-serif;
}
.active {
  color: #e63946;
}
</style>
