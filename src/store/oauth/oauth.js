import api from '@/api.js'

const state = {
  scopes: [],
  accessToken: null,
  refreshToken: null,
  expires: 0 // DateTime in UNIX, millisecond
}

const getters = {
  getAccessToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken,
  getScopes: state => state.scopes,

  // Check token date - if expired should be refreshed
  checkExpired: state => Date.now() >= state.expires,

  // Check logged in Tahmeel Admin
  checkLogged: state => {
    return state.accessToken != null && state.expires > Date.now()
  }
}

const actions = {
  // Call API - Admin login to authorize
  authorize ({ commit }, { email, password }) {
    return api.login(email, password)
    .then(data => {
      commit('setTokenDetails', data)
      return state
    })
    .catch(error => Promise.reject(error))
  },

  // Refresh access token
  refreshToken ({ state, commit }) {
    return api.refreshToken(state.accessToken, state.refreshToken)
    .then(data => {
      commit('setTokenDetails', data)
      return state
    })
    .catch(error => Promise.reject(error))
  },

  // Logout from Admin panel
  logout ({ state, commit }) {
    commit('logout')
    return true
  }
}

const mutations = {
  logout (state) {
    state.accessToken = null
    state.refreshToken = null
    state.scopes = []
    state.expires = 0

    localStorage.removeItem('OAuthToken')
  },
  setTokenDetails (state, data) {
    state.accessToken = data.access_token
    state.refreshToken = data.refresh_token
    state.scopes = data.permissions.split(',')
    state.expires = Date.now() + parseInt(data.expires_in) * 1000
    localStorage.setItem('OAuthToken', state.accessToken)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
