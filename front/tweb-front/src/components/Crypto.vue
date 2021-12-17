<template>
  <div class="crypto-list pt-5">
    <h2 class="fw-bold pb-3">Liste des cryptomonnaies</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Prix</th>
          <th scope="col">prix d'ouverture</th>
          <th scope="col">24h %</th>
          <th scope="col">prix le plus bas</th>
          <th scope="col">prix le plus haut</th>
        </tr>
        <tr>
          <th>
            <img
              src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579"
            />
            <span>{{ data.name }} ({{ data.symbol }})</span>
          </th>
          <th>
            <span>€{{ dataPrice.eur /*dataPrice.current_price */ }}</span>
          </th>
          <th>
            <span>€{{}}</span>
          </th>
          <th>
            <span>{{ dataPrice.eur_24h_change }}%</span>
          </th>
          <th>
            <span>€{{ dataPrice.low_24h }}</span>
          </th>
          <th>
            <span>€{{ dataPrice.high_24h }}</span>
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "crypto-list",
  data() {
    return {
      data: {},
      dataPrice: {},
      dataList: {},
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
      //var url2 = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin"
      const requestOptions2 = {
        method: "GET",
      };
      const res1 = await fetch(url2, requestOptions2);
      const data1 = await res1.json();
      this.dataPrice = data1.bitcoin;
    },
  },
};
</script>

<style>
.theme-dark section {
  background-color: #1c1d24;
  color: rgb(234, 236, 239) !important;
}
.theme-dark span {
  color: rgb(234, 236, 239) !important;
}
.theme-dark th {
  color: rgb(234, 236, 239) !important;
}
</style>