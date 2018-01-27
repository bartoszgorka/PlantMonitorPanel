import api from '@/api.js'

const state = {
  devices: [],
  pageNumber: 0
}

const getters = {
  devices: state => state.devices,
  pageNumber: state => state.pageNumber,
  deviceById: (state) => (id) => {
    return state.devices.find(device => device.id === id)
  }
}

const actions = {
  // Get devices list from API
  getDevices ({ state, commit }) {
    return api.deviceList(state.pageNumber)
    .then(data => {
      commit('setDeviceList', data.devices)
      return data.devices
    })
    .catch(error => Promise.reject(error))
  }
}

const mutations = {
  setDeviceList (state, devices) {
    state.devices = [...state.devices, ...devices]
    if (devices.length > 0) {
      state.pageNumber++
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
