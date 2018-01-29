import axios from 'axios'
import constPaths from '@/constants/constant-paths.js'

const buildPath = path => {
  return constPaths().API_URL + `${path}`
}

const prepareHeaders = (params) => {
  var header = localStorage.getItem('OAuthToken')
  return {params: params, headers: {'Authorization': `Bearer ${header}`}}
}

const api = {
  // Login Admin to Tahmeel API
  login (email, password) {
    return axios.post(buildPath('api/login'), {
      email: email,
      password: password
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
      return Promise.reject(error)
    })
  },

  // Refresh token call
  refreshToken (accessToken, refreshToken) {
    var header = 'Bearer ' + `${accessToken}`
    return axios.post(buildPath('oauth/token'), {
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    }, {headers: {'Authorization': header}})
    .then(response => response.data)
    .catch(error => {
      console.log(error)
      return Promise.reject(error)
    })
  },

  // Get device list
  deviceList (page) {
    var params = new URLSearchParams()
    params.append('page', page)
    var headers = prepareHeaders(params)

    return axios.get(buildPath('api/devices'), headers)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
      return Promise.reject(error)
    })
  },

  // Get device list
  measurementData (deviceId, page) {
    var params = new URLSearchParams()
    params.append('page', page)
    params.append('limit', 50)
    var headers = prepareHeaders(params)

    return axios.get(buildPath('api/panel/measurement_data/' + deviceId), headers)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
      return Promise.reject(error)
    })
  }
}

export default api
