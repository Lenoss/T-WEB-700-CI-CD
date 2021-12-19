<template>
  <section class="pt-5">
    <div class="container pb-8 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block login-image">
                <img
                  src="https://image.freepik.com/vecteurs-libre/illustration-concept-connexion-securisee_114360-4511.jpg"
                  alt="login form"
                  class="img-fluid"
                  style="border-radius: 1rem 0 0 1rem"
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center form-login">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form @submit.prevent="persistUser">
                    <h5
                      class="h2 fw-bold mb-3 pb-3"
                      style="letter-spacing: 1px"
                    >
                      MyCoin Login
                    </h5>

                    <div class="mb-3">
                      <label
                        for="username"
                        class="form-label float-start"
                        >Email address</label
                      >
                      <input
                        v-model="username"
                        type="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp" required
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        for="password"
                        class="form-label float-start"
                        >Password</label
                      >
                      <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="password" required
                      />
                    </div>

                    <div class="pt-1 mb-4">
                      <button
                        class="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>

                    <p class="mb-5 pb-lg-2" style="color: #393f81">
                      You don't have an account?
                      <a href="/register" style="color: #393f81"
                        >Register</a
                      >
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { notify } from "@kyvg/vue3-notification";
export default {
  
  beforeMount() {
    localStorage.removeItem("bearer");
    localStorage.removeItem("id");
  },
  methods: {
    async persistUser() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: this.username,
            password: this.password,
        }),
      };
      const res = await fetch(
        "http://localhost:3000/users/login",
        requestOptions
      );
      const data = await res.json();
      if (data.access_token != null) {
        localStorage.setItem("bearer", data.access_token);
        localStorage.setItem("id", data.account.id)
        this.$router.push("/");
      } else {
        notify("Password or email wrong, try again or try to create a new accout");
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #fdfeff;
}
section {
  background-color: #fdfeff;
  padding-bottom: 240px;
}
.login-image{
      background: white;
      padding-top: 20px;
      border-radius: 10px 0px 0px 10px;
}
.theme-dark section {
  background-color: #1c1d24;
}
.theme-dark .card {
  background-color: #1c1d24;
  border: 1px solid grey;
}
.theme-dark .card .card-body {
  color: rgb(234, 236, 239) !important;
}
.theme-dark .card .card-body p {
  color: rgb(234, 236, 239) !important;
}
.theme-dark .card .card-body a {
  color: rgb(234, 236, 239) !important;
}
.btn-dark {
  background-color: #db7609;
  border-color: #ef820d;
}
.btn-dark:hover,
.btn-dark:focus,
.btn-dark:active {
  background-color: #db7609;
  border-color: #db7609;
}
.form-login{
  background-color: #adb5bd26;
  border-radius: 0px 10px 10px 0px;
}
</style>