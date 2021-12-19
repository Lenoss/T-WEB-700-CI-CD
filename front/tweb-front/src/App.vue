<template>
  <div
    id="app "
    class="d-flex flex-column"
    :class="{ 'theme-dark': nightMode }"
  >
    <div class="div-nav">
      <nav
        class="
          navbar-data navbar navbar-expand navbar-light
          content
          bg-white
          topbar
          static-top
          py-1
          my-0
        "
      >
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <span class="pr-1">Welcome to mycoin, nice to see you again !</span>
            <span class="navbar-data-content pe-2 ps-1"></span>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <i class="bi bi-brightness-high" v-if="nightMode" @click="nightMode = !nightMode"></i>
            <i class="bi bi-moon" v-else @click="nightMode = !nightMode"></i>
          </li>
          <li class="nav-item">
            <span class="px-1">English</span>
          </li>
          <li class="nav-item">
            <span class="pl-1">EUR</span>
          </li>
        </ul>
      </nav>
    </div>
    <div class="div-nav shadow-sm">
      <nav
        class="
          navbar navbar-expand navbar-light
          content
          bg-white
          topbar
          static-top
        "
      >
        <router-link class="navbar-brand text-decoration-none" to="/"
          >MyCoin</router-link
        >
        <button
          id="sidebarToggleTop"
          class="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i class="fa fa-bars"></i>
        </button>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/"
              >Cryptocurrencies</router-link
            >
          </li>
        </ul>
        <ul  class="navbar-nav ms-auto">
          <li v-if="bearer == null" class="nav-item">
            <router-link class="nav-link fw-bold" to="/login"
              >Login</router-link
            >
          </li>
          <li v-if="bearer == null" class="nav-item">
            <router-link class="nav-link fw-bold" to="/register"
              >Register</router-link
            >
          </li>
          <div v-else class="login">
          <li  class="nav-item">
            <router-link class="nav-link mr-0 pr-0 fw-bold" to="/profile"
              >Profile</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bold" type="submit" @click="logout"
              >Logout</a>
            
          </li>
          </div>
        </ul>
      </nav>
    </div>
    <router-view />
    <footer class="footer mt-auto py-3 bg-light">
      <div class="container">
        <span class="text-muted">@2021 T-WEB</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      nightMode: false,
      bearer: localStorage.bearer,
      test: "test"
    };
  },
  watch: {
    nightMode: function () {
      localStorage.setItem("nightMode", JSON.stringify(this.nightMode));
    },
  },
  created() {
    this.nightMode = JSON.parse(localStorage.getItem("nightMode"));
  },
  methods: {
    logout(){
        localStorage.removeItem("bearer");
        localStorage.removeItem("id");
        this.$router.go(this.$router.currentRoute)
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #1c1d24;
  min-height: 100%;
}
.theme-dark {
  background-color: #1c1d24;
  color: rgb(234, 236, 239) !important;
}
.theme-dark footer.bg-light {
  background-color: #1c1d24 !important;
  color: rgb(234, 236, 239) !important;
}
.theme-dark .text-muted {
  color: rgb(234, 236, 239) !important;
}
.theme-dark .div-nav {
  background-color: #1b1c20;
  border-bottom: 1px solid #1b1c20;
}
.theme-dark .div-nav nav.bg-white {
  background-color: #1b1c20 !important;
  color: rgb(234, 236, 239) !important;
}
.theme-dark .div-nav nav.bg-white .navbar-data-content {
  background-color: #1b1c20 !important;
  color: #ef820d !important;
}
.theme-dark .div-nav nav.bg-white .navbar-brand {
  background-color: #1b1c20 !important;
  color: rgb(234, 236, 239) !important;
}
.theme-dark .div-nav nav.bg-white .nav-link {
  background-color: #1b1c20 !important;
  color: rgb(234, 236, 239) !important;
}
.login{
  display: flex;
}
.content {
  max-width: 1400px;
  width: 100%;
  overflow: hidden;
  margin: 0px auto;
}
.div-nav {
  border-bottom: 1px solid rgb(239, 242, 245);
}
.div-nav ul{
  align-items: center;
}
.div-nav i{
  font-size: 16px;
}
.navbar-data {
  font-size: 13px;
}
.navbar-data-content {
  color: #ef820d;
  font-weight: bold;
}
</style>
