import axios from 'axios'

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
