// import Axios from 'axios'
// import { BASE_URL } from '../globals'

// const API = Axios.create({ baseURL: BASE_URL })

// export default API

import axios from 'axios'
//export const BASE_URL = 'http://localhost:3001/api'

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
const API = axios.create({ baseURL: 'http://localhost:3001/api' })

export default API
