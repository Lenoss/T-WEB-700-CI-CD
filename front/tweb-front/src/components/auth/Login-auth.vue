<template>
  <section class="pt-5">
    <div class="container pb-8 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/img1.jpg"
                  alt="login form"
                  class="img-fluid"
                  style="border-radius: 1rem 0 0 1rem"
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form>
                    <h5
                      class="h2 fw-bold mb-3 pb-3"
                      style="letter-spacing: 1px"
                    >
                      MyCoin Connexion
                    </h5>

                    <div class="mb-3">
                      <label
                        for="exampleInputEmail1"
                        class="form-label float-start"
                        >Adresse mail</label
                      >
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        for="exampleInputPassword1"
                        class="form-label float-start"
                        >Mot de passe</label
                      >
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>

                    <div class="pt-1 mb-4">
                      <button
                        class="btn btn-dark btn-lg btn-block"
                        type="button"
                      >
                        Connexion
                      </button>
                    </div>

                    <p class="mb-5 pb-lg-2" style="color: #393f81">
                      Vous n'avez pas de compte ?
                      <a href="/register" style="color: #393f81"
                        >Inscrivez-vous</a
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
</script>

<style scoped>
body {
  background-color: #fdfeff;
}
section {
  background-color: #fdfeff;
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
</style>