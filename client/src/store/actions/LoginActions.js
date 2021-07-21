import {
  UserLogin,
  UserRegister,
  LoadUserUsingToken,
  FindEmail
} from '../../services/UserService'
import {
  USER_LOGIN,
  SET_AUTH,
  USER_REGISTER,
  STAGE_LOGIN,
  SET_LOGIN_ERROR,
  SET_REG_ERROR,
  LOAD_USER,
  CHECK_REG_EMAIL
} from '../types'

export const LoadUser = (email, password) => {
  return async (dispatch) => {
    try {
      const user = await UserLogin(email, password)
      dispatch({ type: USER_LOGIN, payload: user })
    } catch (error) {
      dispatch({
        type: SET_LOGIN_ERROR,
        payload: 'Username or password is incorrect'
      })
    }
  }
}
export const LoadUserFromToken = () => {
  return async (dispatch) => {
    try {
      const mentor = await LoadUserUsingToken()
      dispatch({ type: LOAD_USER, payload: mentor })
    } catch (error) {
      return alert('Something went wrong')
    }
  }
}
export const SetAuth = (bool) => ({
  type: SET_AUTH,
  payload: bool
})
export const SetLoginError = (msg) => ({
  type: SET_LOGIN_ERROR,
  payload: msg
})
export const SetRegError = (msg) => ({
  type: SET_REG_ERROR,
  payload: msg
})

export const RegisterUser = (input) => {
  return async (dispatch) => {
    try {
      await UserRegister(input)
      dispatch({ type: USER_REGISTER })
    } catch (error) {
      dispatch({
        type: SET_REG_ERROR,
        payload: 'Something went wrong'
      })
    }
  }
}
export const CheckEmail = (email) => {
  return async (dispatch) => {
    try {
      const val = await FindEmail(email)
      let errorMessage = ''
      if (val.data.length > 0) {
        errorMessage = 'Email already in use'
      } else {
        errorMessage = ''
      }
      dispatch({ type: SET_REG_ERROR, payload: errorMessage })
    } catch (error) {
      throw error
    }
  }
}

export const StageLogin = (formValue) => ({
  type: STAGE_LOGIN,
  payload: formValue
})
