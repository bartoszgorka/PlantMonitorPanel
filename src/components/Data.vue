<template>
  <div>
    <!-- LOADER -->
    <infinite-loading
      v-if="showScroll"
      v-on:infinite="infiniteHandler"
      ref="infiniteLoading"
      spinner="bubbles">
    </infinite-loading>

    <!-- GRAPHS -->
    <line-graph
      v-if="!showScroll"
      description="Soil humidity [in %]"
      background="#52a956"
      :data="this.soilHumidity"
      :labels="this.dataTime"
      :bind="true"></line-graph>

     <line-graph
      v-if="!showScroll"
      description="Air humidity [in %]"
      background="#bdbdbd"
      :data="this.airHumidity"
      :labels="this.dataTime"
      :bind="true"></line-graph>

    <line-graph
      v-if="!showScroll"
      description="Air temperature [°C]"
      background="#f9a01b"
      :data="this.airTemperature"
      :labels="this.dataTime"
      :bind="true"></line-graph>

    <line-graph
      v-if="!showScroll"
      description="Liquid level [in %]"
      background="#689bca"
      :data="this.liquidLevel"
      :labels="this.dataTime"
      :bind="true"></line-graph>

  </div>
</template>

<script>
  import LineGraph from '@/graphs/LineGraph'

  export default {
    name: 'measurement-data',
    props: ['deviceId'],
    components: {
      LineGraph
    },
    data () {
      return {
        measurementData: [],
        soilHumidity: [],
        liquidLevel: [],
        airTemperature: [],
        airHumidity: [],
        dataTime: [],
        showScroll: true
      }
    },
    mounted () {
      this.$store.dispatch('data/resetStore', {deviceId: this.deviceId})
    },
    methods: {
      infiniteHandler (state) {
        this.$store.dispatch('data/getMeasurementData')
        .then(data => {
          if (data.length > 0) {
            this.measurementData = this.$store.getters['data/measurementData']
            state.loaded()
          } else {
            state.complete()
            this.showScroll = false
            this.prepareData()
          }
        })
      },
      prepareData () {
        this.measurementData.forEach((data) => {
          this.soilHumidity.push(data.soil_humidity)
          this.liquidLevel.push(data.liquid_level_millimeters)
          this.airTemperature.push(data.air_temperature)
          this.airHumidity.push(data.air_humidity)
          var measureTime = new Date(data.inserted_at * 1000)
          this.dataTime.push(measureTime.toLocaleString())
        })
      }
    }
  }
</script>
