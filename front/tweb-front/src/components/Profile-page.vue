<template>
  <section class="pt-5">
    <div class="container pb-8 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div
                class="col-md-5 col-lg-5 d-none d-md-block block-date-profile"
              >
                <img
                  class="rounded-circle mt-2 img-fluid px-5 p-4"
                  src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Download.png"
                />
                <div><span class="font-weight-bold w-100">Shiba45</span></div>
                <span class="text-black-50">john.shiba@mail.com</span
                ><span> </span>
              </div>
              <div class="col-md-7 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-md-5 p-lg-5 text-black">
                  <h2 class="text-right fw-bold">Profile Settings</h2>
                  <form>
                    <div class="row mt-2 py-2">
                      <div class="col-md-6">
                        <label class="labels float-start">Name</label
                        ><input
                          type="text"
                          class="form-control"
                          placeholder="first name"
                          value=""
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="labels float-start">Surname</label
                        ><input
                          type="text"
                          class="form-control"
                          value=""
                          placeholder="surname"
                        />
                      </div>
                    </div>
                    <div class="col-md-12 py-2">
                      <label class="labels float-start">Username</label
                      ><input
                        type="text"
                        class="form-control"
                        placeholder="first name"
                        value=""
                      />
                    </div>
                    <div class="col-md-12 py-2">
                      <label class="labels float-start">Email</label
                      ><input
                        type="email"
                        class="form-control"
                        placeholder="first name"
                        value=""
                      />
                    </div>
                    <div class="col-md-12 py-2">
                      <label class="labels float-start">Favorite crypto</label
                      ><input
                        type="text"
                        class="form-control"
                        value=""
                        placeholder="Bitcoin"
                      />
                    </div>
                    <div class="col-md-12 py-2">
                      <label class="labels float-start">Password</label
                      ><input
                        type="password"
                        class="form-control"
                        placeholder=""
                        value=""
                      />
                    </div>
                    <button
                      class="btn btn-dark btn-lg btn-block my-4"
                      type="button"
                    >
                      Save
                    </button>
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
.container {
  width: fit-content;
}
.block-date-profile {
  background-color: #f2f2f2;
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
