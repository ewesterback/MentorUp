import { UserLogin, UserRegister } from '../../services/UserService'
import {
  USER_LOGIN,
  SET_AUTH,
  USER_REGISTER,
  STAGE_LOGIN,
  SET_LOGIN_ERROR,
  SET_REG_ERROR
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
// export const FindAllUsers = () => {
//   return async (dispatch) => {
//     try {
//       await LoadAllUsers()
//       dispatch({ type: USER_REGISTER })
//     } catch (error) {
//       throw error
//     }
//   }
// }

export const StageLogin = (formValue) => ({
  type: STAGE_LOGIN,
  payload: formValue
})
