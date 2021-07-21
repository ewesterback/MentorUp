import axios from 'axios'
import { BASE_URL } from '../globals'

export const UserLogin = async (loginEmail, loginPassword) => {
  let body = {
    email: loginEmail,
    password: loginPassword
  }
  try {
    const res = await axios.post(`${BASE_URL}/user/login`, body)
    return res.data //res.data returns {payload: {email, id}, token: ''}
  } catch (error) {
    throw error
  }
}

export const UserRegister = async (input) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/register`, input)
    return res.data
  } catch (error) {
    throw error
  }
}
export const LoadAllUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user/load`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const LoadUserUsingToken = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user/token`)
    return res.data[0]
  } catch (error) {
    throw error
  }
}

export const FindEmail = async (newEmail) => {
  try {
    const res = await axios.get(`${BASE_URL}/user/email/${newEmail}`)
    return res
  } catch (error) {}
}
