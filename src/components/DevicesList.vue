<template>
  <div>
    <table class="table table--data">
      <thead>
        <tr>
          <th class="u-hiddenDown@md">No</th>
          <th>Name</th>
          <th>Place</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th class="u-hiddenDown@md">No</th>
          <th>Name</th>
          <th>Place</th>
        </tr>
      </tfoot>
      <tbody>
        <template v-for="(device, index) in this.devices">
        <tr>
          <td data-label="No" class="u-hiddenDown@md">{{ index + 1 }}</td>
          <td data-label="Name">
            <router-link :to="{ name: 'device', params: { device_id: device.id }}">{{ device.name }}</router-link>
          </td>
          <td data-label="Place">{{ device.place }}</td>
        </tr>
      </template>

      <infinite-loading
        v-if="showScroll"
        v-on:infinite="infiniteHandler"
        ref="infiniteLoading"
        spinner="bubbles">
      </infinite-loading>

      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'devices-list',
    data () {
      return {
        devices: [],
        showScroll: true
      }
    },
    mounted () {
      this.devices = this.$store.getters['device/devices']
    },
    methods: {
      // Load devices from API
      infiniteHandler (state) {
        this.$store.dispatch('device/getDevices')
        .then(data => {
          if (data.length > 0) {
            this.devices = this.$store.getters['device/devices']
            state.loaded()
          } else {
            state.complete()
            this.showScroll = false
          }
        })
      }
    }
  }
</script>
