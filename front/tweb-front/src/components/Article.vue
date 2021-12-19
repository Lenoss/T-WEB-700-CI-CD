<template>
<div>
  <div class="row" >
        <div class="col-sm-3" v-for="item in articles" :key="item.id">
          <div class="card shadow-sm  text-white">
            <img v-for="media in item.media" :key="media.id" :src="`${media.thumbnail.url}`" class="card-img"
              alt="..."/>
              <h3>{{ item.title}}</h3>
              <a class="btn btn-primary" :href="`${item.link}`">Read more</a>
          </div>
        </div>
      </div>
</div>
</template>

<script>
export default {
  name: "crypto-list",
  data() {
    return {
      articles: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {


      var url2 =
        "http://localhost:3000/articles";
      const requestOptions2 = {
        method: "GET",
      };
      const res1 = await fetch(url2, requestOptions2);
      const data1 = await res1.json();
      var newData = JSON.parse(JSON.stringify(data1));
      this.articles = newData.data;
       console.log(newData.data)
    //   console.log(newData.data[0].media[0].thumbnail.url)
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
}
.card{
    border: none !important;
    margin-bottom: 20px;
    border-radius: 10px !important;
}
.card img{
    border-radius: 10px 10px 0px 0px;
}
.card a{
    border-radius: 0px 0px 10px 10px !important;
}

.card h3{
    color:black;
    font-size: 16px;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
           line-clamp: 2; 
   -webkit-box-orient: vertical;
    margin: 0.5rem;
}
div.col-sm-3:nth-child(even){
  display: none;
}
div.col-sm-3:nth-child(n+9){
  display: none;
}
.btn-primary{
    background-color: #db7609 !important;
    border-color: #ef820d !important;
    border-radius: 0px 0px 0rem 0rem !important;
}
</style>