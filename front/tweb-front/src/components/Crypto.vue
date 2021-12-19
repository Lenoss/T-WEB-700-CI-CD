<template>
  <div class="crypto-list pt-5">
    <h2 class="fw-bold pb-3">List of cryptocurrencies</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Opening price</th>
          <th scope="col">Price change 24h</th>
          <th scope="col">Lowest price</th>
          <th scope="col">Highest price</th>
        </tr>
        <tr class="data-crypto" v-for="item in dataPrices" :key="item.id">
          <td class="align-middle">
            <img :src="`${item.image}`" />
          </td>
          <td class="align-middle">
            <span>{{ item.name }} ({{ item.symbol }})</span>
          </td>
          <td class="align-middle">
            <span>€{{ item.current_price }}</span>
          </td>
          <td class="align-middle">
            <span>€{{ item.Open}}</span>
          </td>
          <td class="align-middle">
            <span>€{{ item.price_change_24h }}</span>
          </td>
          <td class="align-middle">
            <span>€{{ item.low_24h }}</span>
          </td>
          <td class="align-middle">
            <span>€{{ item.high_24h }}</span>
          </td>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <!-- <div>
      <Cart />
    </div> -->
  </div>
</template>

<script>
// import Cart from './Cart.vue'

export default {
  name: "crypto-list",
  // components: {
  //   Cart
  // },
  data() {
    return {
      dataPrices: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    tradeCart() {
      return {
        
      }
    },
    async fetchData() {


      var url2 =
        "http://localhost:3000/cryptos";
      const requestOptions2 = {
        method: "GET",
      };
      const res1 = await fetch(url2, requestOptions2);
      const data1 = await res1.json();
      var newData = JSON.parse(JSON.stringify(data1));
      this.dataPrices = newData.data.result;
      console.log(newData.data.result)
      console.log(newData)
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
td img{
  height: 50px;
}
table{
  margin-bottom: 50px  !important;
  border-color: #707a85 !important;
}

.data-crypto:nth-child(n+12){
  display: none;
}
</style>