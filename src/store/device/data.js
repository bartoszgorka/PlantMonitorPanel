import api from '@/api.js'

const state = {
  measurementData: [],
  deviceId: null,
  pageNumber: 0
}

const getters = {
  measurementData: state => state.measurementData,
  pageNumber: state => state.pageNumber,
  deviceId: state => state.deviceId
}

const actions = {
  // Load measurement data from API
  getMeasurementData ({ state, commit }) {
    return api.measurementData(state.deviceId, state.pageNumber)
    .then(data => {
      commit('setDataList', data.measurement)
      return data.measurement
    })
    .catch(error => Promise.reject(error))
  },
  resetStore ({ state, commit }, { deviceId }) {
    commit('clearStore', deviceId)
    return state.measurementData
  }
}

const mutations = {
  setDataList (state, measurementData) {
    state.measurementData = [...state.measurementData, ...measurementData]
    if (measurementData.length > 0) {
      state.pageNumber++
    }
  },
  clearStore (state, deviceId) {
    state.measurementData = []
    state.pageNumber = 0
    state.deviceId = deviceId
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
