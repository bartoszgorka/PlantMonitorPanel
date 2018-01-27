import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import oauth from './oauth/oauth'
import device from './device/device'
import data from './device/data'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    oauth,
    device,
    data
  },
  plugins: [
    createPersistedState()
  ]
})
