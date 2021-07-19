import { LoadAllUsers, LoadUserUsingToken } from '../../services/UserService'
import {
  LOAD_MENTORS,
  SELECT_MENTOR,
  UNSELECT_MENTOR,
  LOAD_USER
} from '../types'

export const LoadMentors = () => {
  return async (dispatch) => {
    try {
      const mentors = await LoadAllUsers()
      dispatch({ type: LOAD_MENTORS, payload: mentors })
    } catch (error) {
      return alert('No mentors right now')
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

export const SelectMentor = (mentor) => ({
  type: SELECT_MENTOR,
  payload: mentor
})

export const UnselectMentor = () => ({
  type: UNSELECT_MENTOR
})

// export const RegisterUser = (input) => {
//   return async (dispatch) => {
//     try {
//       await UserRegister(input)
//       dispatch({ type: USER_REGISTER })
//     } catch (error) {
//       throw error
//     }
//   }
// }
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

// export const StageLogin = (formValue) => ({
//   type: STAGE_LOGIN,
//   payload: formValue
// })
