const {
  USER_LOGIN,
  SET_AUTH,
  USER_REGISTER,
  STAGE_LOGIN,
  SET_LOGIN_ERROR,
  SET_REG_ERROR,
  LOAD_USER,
  CHECK_REG_EMAIL
} = require('../types')

const iState = {
  user: null,
  authenticated: false,
  formInput: {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    availableToMentor: false,
    state: '',
    linkedin: '',
    photo: '',
    bio: '',
    passions: '',
    currentTitle: '',
    currentCompany: '',
    yearsInIndustry: ''
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
      console.log(action.payload)
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
    case LOAD_USER:
      return {
        ...state,
        user: action.payload
      }
    case SET_LOGIN_ERROR:
      return { ...state, loginError: action.payload }
    case SET_REG_ERROR:
      console.log(action.payload)
      return { ...state, registrationError: action.payload }
    default:
      return { ...state }
  }
}

export default LoginReducer
