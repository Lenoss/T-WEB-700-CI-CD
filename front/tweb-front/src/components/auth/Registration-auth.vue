<template>
  <section class="pt-5 pb-3">
    <div class="container pb-8 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div class="col-md-5 col-lg-5 d-none d-md-block register-image">
                <img
                  src="https://image.freepik.com/vecteurs-libre/illustration-concept-connexion-securisee_114360-4511.jpg"
                  alt="login form"
                  class="img-fluid"
                  style="border-radius: 1rem 0 0 1rem"
                />
              </div>
              <div class="col-md-7 col-lg-7 d-flex align-items-center register-form">
                <div class="card-body p-4 p-md-5 p-lg-5 text-black">
                  <form @submit.prevent="persistUser">
                    <h5
                      class="h2 fw-bold mb-3 pb-3"
                      style="letter-spacing: 1px"
                    >
                      Create my account
                    </h5>
                    <div class="mb-3">
                      <label
                        for="lastname"
                        class="form-label float-start"
                        >Last name</label
                      >
                      <input
                        v-model="lastname"
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="lastname" required
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        for="firstname"
                        class="form-label float-start"
                        >First name</label
                      >
                      <input
                        v-model="firstname"
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="firstname" required
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        for="email"
                        class="form-label float-start"
                        >Email address</label
                      >
                      <input
                        v-model="email"
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email" required
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
                        id="exampleInputPassword1"
                        name="password" required
                      />
                    </div>

                    <div class="pt-1 mb-4">
                      <button
                        class="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Registration
                      </button>
                    </div>
                    <p class="mb-5 pb-md-2 pb-lg-2" style="color: #393f81">
                      Already registered?
                      <a href="/login" style="color: #393f81">Login</a>
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
export default {
  name: "App",
  data() {
    return {
      data: {},
    };
  },
  beforeMount() {
    localStorage.removeItem("bearer");
    localStorage.removeItem("id");
    localStorage.removeItem("admin");
  },
  methods: {
    async persistUser() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: this.password,
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
          
        }),
      };
      const truc = await fetch(
        "http://localhost:3000/users/register",
        requestOptions
      );
      const data = await truc.json();
      if (data.error == null) {
        this.$router.push("/login");
      } else {
        this.$alert("Email already used, try to log in or a different email.");
      }
    },
  },
};
</script>


<style scoped>
section {
  background-color: #fdfeff;
  padding-bottom: 200px !important;
}
.theme-dark section {
  background-color: #1c1d24;
}
.register-image{
      background: white;
      padding-top: 50px;
      border-radius: 10px 0px 0px 10px;
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
.register-form{
  background-color: #adb5bd26;
  border-radius: 0px 10px 10px 0px;
}
</style>