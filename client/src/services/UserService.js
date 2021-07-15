import API from './'

export const UserLogin = async (loginEmail, loginPassword) => {
  let body = {
    email: loginEmail,
    password: loginPassword
  }
  try {
    const res = await API.post(`/user/login`, body)
    return res.data //res.data returns {payload: {email, id}, token: ''}
  } catch (error) {
    throw error
  }
}

export const UserRegister = async (input) => {
  try {
    const res = await API.post(`/user/register`, input)
    return res.data
  } catch (error) {
    throw error
  }
}
export const LoadAllUsers = async () => {
  console.log('service')
  try {
    const res = await API.get(`/user/load`)
    return res.data
  } catch (error) {
    throw error
  }
}
