<template>
  <section class="pt-5">
    <div class="container pb-8 h-100">
      <div v-if="bearer !== null" class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div
                class="col-md-5 col-lg-5 d-none d-md-block block-date-profile"
              >
                <img
                  class="rounded mt-2 img-fluid px-5 p-4"
                  src="https://image.freepik.com/vecteurs-libre/avatar-personnes-modernes-dans-vetements-decontractes-illustration-dessin-anime-vecteur-homme-visage-cheveux-individuels-dans-cadre-numerique-clair-ordinateur-bleu-fonce-photo-pour-profil-web_107791-4258.jpg"
                />
                <div><span class="font-weight-bold w-100">{{data.firstname}} {{data.lastname}}</span></div>
                <span class="text-black-50">{{data.email}}</span
                ><span> </span>
              </div>
              <div class="col-md-7 col-lg-7 d-flex align-items-center block-data-user">
                <div class="card-body p-4 p-md-5 p-lg-5 text-black">
                  <h2 class="text-right fw-bold">Profile Settings</h2>
                  <form>
                    <div class="row mt-2 py-2">
                      <div class="col-md-6">
                        <label class="labels float-start">Lastname</label
                        ><input
                          type="text"
                          class="form-control"
                          :placeholder="`${data.lastname}`"
                          value=""
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="labels float-start">Firstname</label
                        ><input
                          type="text"
                          class="form-control"
                          value=""
                         :placeholder="`${data.firstname}`"
                        />
                      </div>
                    </div>
                    <div class="col-md-12 py-2">
                      <label class="labels float-start">Email</label
                      ><input
                        type="email"
                        class="form-control"
                        :placeholder="`${data.email}`"
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
      <div v-else>
        <p>To access your profile please login</p>
        <a href="/register">I don't have an account yet </a>
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
      bearer: localStorage.bearer
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      var bearer = localStorage.getItem('bearer');
      
      if(localStorage.bearer != null){
        var url = "http://localhost:3000/users/profile/";
      const requestOptions = {
        method: "GET",
        headers: {
                'Authorization': 'Bearer '+bearer,
            }
      };
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      this.data = data;
      console.log(data)
      }
      else{
        console.log("nope");
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
  padding-bottom: 200px;
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
  background-color: white;
  border-radius: 10px 0px 0px 10px;
  padding-top: 60px;
}
.block-date-profile span{
  color: grey !important;;
}
.block-data-user{
  background-color: #adb5bd26;
  border-radius: 0px 10px 10px 0px;
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
