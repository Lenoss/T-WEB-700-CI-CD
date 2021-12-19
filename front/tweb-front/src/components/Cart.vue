<template>
  <div>
    <div class="chartPage">
      <h1>This is a Trading Chart page</h1>
    </div>
    <trading-vue :data="chart"
      :width="this.width"
      :height="this.height"
      :color-back="colors.colorBack"
      :color-grid="colors.colorGrid"
      :color-text="colors.colorText">
    </trading-vue>
  </div>
</template>

<script>
import { TradingVue, DataCube } from 'trading-vue-js'
import fetchData from './Crypto.vue'

export default {
  name: 'trading-chart',
  props: ['night'],
  components: {
    TradingVue
  },
  methods: {
    onResize () {
      this.width = window.innerWidth
      this.height = window.innerHeight - 50
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    window.dc = this.chart
  },
  computed: {
    colors () {
      return this.$props.night ? {} : {
        colorBack: '#fff',
        colorGrid: '#eee',
        colorText: '#333'
      }
    }
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.onResize)
  },
  data () {
    return {
      chart: new DataCube(fetchData),
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}
</script>

<style>

</style>