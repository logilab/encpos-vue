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
      <!--
      <div class="column is-2">
        <aside class="menu is-hidden-mobile">
          <p class="menu-label">General</p>
          <ul class="menu-list">
            <li><a class="is-active">Dashboard</a></li>
            <li><a>Customers</a></li>
            <li><a>Other</a></li>
          </ul>
          <p class="menu-label">Administration</p>
          <ul class="menu-list">
            <li><a>Team Settings</a></li>
            <li>
              <a>Manage Your Team</a>
              <ul>
                <li><a>Members</a></li>
                <li><a>Plugins</a></li>
                <li><a>Add a member</a></li>
                <li><a>Remove a member</a></li>
              </ul>
            </li>
            <li><a>Invitations</a></li>
            <li><a>Cloud Storage Environment Settings</a></li>
            <li><a>Authentication</a></li>
            <li><a>Payments</a></li>
          </ul>
          <p class="menu-label">Transactions</p>
          <ul class="menu-list">
            <li><a>Payments</a></li>
            <li><a>Transfers</a></li>
            <li><a>Balance</a></li>
            <li><a>Reports</a></li>
          </ul>
        </aside>
        </div>
        -->
      <router-view />
    </div>
  </div>
</template>

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
