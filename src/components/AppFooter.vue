<template>
  <footer class="footer">
    <div class="content has-text-centered is-flex">
      <img
        class="enc-logo"
        alt="Logo de l'École nationale des chartes"
        src="@/assets/images/footer_logo.png"
      />
      <img
        class="humanum-logo"
        alt="Logo de Huma-num"
        src="@/assets/images/humanum-logo.png"
      />
    </div>
  </footer>
</template>

<style>
.footer {
  background-color: #4C4949;
  border-top: #BA0F29 solid 4px;
  max-height: 400px;
  text-align: center;
  padding: 50px 10%;
}
.footer .content {
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.enc-logo {
  width: 302px;
  height: 70px;
}
.humanum-logo {
  width: auto;
  height: 70px;
}
</style>
