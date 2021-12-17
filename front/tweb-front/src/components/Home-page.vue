<template>
  <div class="content">
    <div class="articles pt-5">
      <h2 class="fw-bold pb-3">Derniers article sur la crypto</h2>
      <div class="row">
        <div class="col-sm-3">
          <div class="card text-white">
            <img
              src="https://mdbootstrap.com/img/new/slides/017.jpg"
              class="card-img"
              alt="..."
            />
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card text-white">
            <img
              src="https://mdbootstrap.com/img/new/slides/017.jpg"
              class="card-img"
              alt="..."
            />
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card text-white">
            <img
              src="https://mdbootstrap.com/img/new/slides/017.jpg"
              class="card-img"
              alt="..."
            />
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card text-white">
            <img
              src="https://mdbootstrap.com/img/new/slides/017.jpg"
              class="card-img"
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
    <div class="crypto-favorite pt-5">
      <h2 class="fw-bold pb-3">Crypto préférée</h2>
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <div>
            <div class="d-flex align-items-center">
              <img :src="`${data.image.small}`" />
              <span class="d-flex align-items-center">
                <h2 class="m-0 px-2 fw-bold">{{ data.name }}</h2>
                <p class="badge-title">({{ data.symbol }})</p>
              </span>
            </div>
            <div class="d-flex align-items-center pt-2">
              <span class="badge-rank p-1 me-2"
                >Position n° {{ data.market_cap_rank }}</span
              >
              <p class="badge-title">Cryptomonnaie</p>
            </div>
          </div>
          <div class="ps-3">
            <div>
              <span>Prix de {{ data.name }} ({{ data.symbol }})</span>
            </div>
            <div class="d-flex align-items-center pl-2">
              <span class="d-flex align-items-center"
                ><h2 class="m-0 pe-2 fw-bold">€{{ dataPrice.eur }}</h2>
                <p class="d-flex align-items-center badge-24h">
                  <span class="cut-24h">{{ dataPrice.eur_24h_change }}</span
                  >%
                </p></span
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
export default {
  name: "App",
  components: {
    Crypto,
  },
  data() {
    return {
      data: {},
      dataPrice: {},
      dataList: {},
      dataGlobal: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      var url = "https://api.coingecko.com/api/v3/coins/bitcoin";
      const requestOptions = {
        method: "GET",
      };
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      this.data = data;
      console.log(data);

      var url2 =
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true";
      const requestOptions2 = {
        method: "GET",
      };
      const res1 = await fetch(url2, requestOptions2);
      const data1 = await res1.json();
      this.dataPrice = data1.bitcoin;

      var url3 =
        "https://api.coingecko.com/api/v3/global";
      const requestOptions3 = {
        method: "GET",
      };
      const res2 = await fetch(url3, requestOptions3);
      const data2 = await res2.json();
      this.dataGlobal = data2.bitcoin;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
