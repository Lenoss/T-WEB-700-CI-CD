<template>
  <div class="content">
    <div class="articles pt-5">
      <h2 class="fw-bold pb-3">Latest articles on crypto</h2>
      <Article/>
    </div>
    <div v-if="bearer != null" class="crypto-favorite pt-5">
      <h2 class="fw-bold pb-3">Favorite crypto</h2>
      <div class="row">
        <div class="col-12 d-flex align-items-center">
          <div>
            <div class="d-flex align-items-center">
               <img :src="`${data.image}`" />
              <span class="d-flex align-items-center">
                <h2 class="m-0 px-2 fw-bold">{{ data.name }}</h2>
               <p class="badge-title">({{ data.symbol }})</p>
              </span>
            </div>
            <div class="d-flex align-items-center pt-2">
              <span class="badge-rank p-1 me-2">Rank {{ data.market_cap_rank }}</span>
              <p class="badge-title">Cryptocurrencie</p>
            </div>
          </div>
          <div class="ps-3">
            <div>
              <span>Price of {{ data.name }} ({{ data.symbol }})</span>
            </div>
            <div class="d-flex align-items-center pl-2">
              <span class="d-flex align-items-center"
                >
                <h2 class="m-0 pe-2 fw-bold">€{{ data.current_price }}</h2>
                </span
              >
            </div>
          </div>
          <div class="ps-3">
            <div>
              <span>Price change 24h</span>
            </div>
            <div class="d-flex align-items-center pl-2">
              <span class="d-flex align-items-center"
                >
                <h2 class="m-0 pe-2 fw-bold">€{{ data.price_change_24h }}</h2>
                </span
              >
            </div>
          </div>
          <div class="ps-3">
            <div>
              <span>Lowest price</span>
            </div>
            <div class="d-flex align-items-center pl-2">
              <span class="d-flex align-items-center"
                >
                <h2 class="m-0 pe-2 fw-bold">€{{ data.low_24h }}</h2>
                </span
              >
            </div>
          </div>
          <div class="ps-3">
            <div>
              <span>Highest price</span>
            </div>
            <div class="d-flex align-items-center pl-2">
              <span class="d-flex align-items-center"
                >
                <h2 class="m-0 pe-2 fw-bold">€{{ data.high_24h }}</h2>
                </span
              >
            </div>
          </div>
        </div>
        <div class="col-6"></div>
      </div>
    </div>
    <Crypto />
  </div>
</template>

<script>
import Crypto from "./Crypto.vue";
import Article from "./Article.vue";
export default {
  name: "App",
  components: {
    Crypto,
    Article,
  },
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
      var favoriteCoin = "bitcoin"
      
      if(localStorage.bearer != null){
        var url = "http://localhost:3000/cryptos/"+favoriteCoin;
      const requestOptions = {
        method: "GET",
        headers: {
                'Authorization': 'Bearer '+bearer,
            }
      };
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      this.data = data.data[0];
      }
      else{
        console.log("nope");
      }
    },
  },
};
</script>

<style scoped>
.content {
  max-width: 1400px;
  width: 100%;
  overflow: hidden;
  margin: 0px auto;
}
.articles img {
  border-radius: 8px;
}
.articles .card-image-overlay {
  border-radius: 15px;
}
.pt-5 {
  margin: 2em;
}
h2 {
  text-align: left;
}
.crypto-favorite {
  text-align: left;
}
.crypto-favorite .badge-title {
  background-color: #eff2f5;
  color: #58667e;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0px;
}
.crypto-favorite .badge-rank {
  background-color: #808a9d;
  color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
}
.crypto-favorite .badge-24h {
  white-space: nowrap;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 10px;
  background-color: #ea3943;
  color: rgb(255, 255, 255);
  margin-bottom: 0px;
}
.crypto-favorite .cut-24h {
  max-width: 27px;
  display: block;
  overflow: hidden;
}
.crypto-favorite img{
  height: 50px;
}
</style>
