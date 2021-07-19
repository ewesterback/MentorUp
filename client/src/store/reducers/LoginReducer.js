const {
  USER_LOGIN,
  SET_AUTH,
  USER_REGISTER,
  STAGE_LOGIN,
  SET_LOGIN_ERROR,
  SET_REG_ERROR
} = require('../types')

const iState = {
  //user: null,
  authenticated: false,
  formInput: {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    isMentor: 0,
    availableToMentor: 0,
    field: '',
    state: '',
    linkedin: '',
    photo: ''
  },
  registrationError: '',
  loginError: ''
}

const LoginReducer = (state = iState, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        registrationError: '',
        loginError: ''
      }
    case USER_LOGIN:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        //user: action.payload,
        authenticated: true,
        registrationError: '',
        loginError: ''
      }
    case STAGE_LOGIN:
      return {
        ...state,
        formInput: action.payload
      }
    case SET_AUTH:
      return { ...state, authenticated: action.payload }
    case SET_LOGIN_ERROR:
      return { ...state, loginError: action.payload }
    case SET_REG_ERROR:
      return { ...state, registrationError: action.payload }
    default:
      return { ...state }
  }
}

export default LoginReducer
