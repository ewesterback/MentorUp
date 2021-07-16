const {
  LOAD_MENTORS,
  SELECT_MENTOR,
  CHANGE_FILTER,
  UNSELECT_MENTOR,
  LOAD_USER
} = require('../types')

const iState = {
  mentors: [],
  selectedMentor: null,
  filters: {
    field: '',
    state: ''
  },
  user: null
}

const MentorReducer = (state = iState, action) => {
  switch (action.type) {
    case LOAD_MENTORS:
      console.log('reducer')
      return {
        ...state,
        mentors: action.payload
      }
    case SELECT_MENTOR:
      return {
        ...state,
        selectedMentor: action.payload
      }
    case UNSELECT_MENTOR:
      return {
        ...state,
        selectedMentor: null
      }
    case LOAD_USER:
      return {
        ...state,
        user: action.payload
      }
    case CHANGE_FILTER:
      //need to change
      return { ...state }
    default:
      return { ...state }
  }
}

export default MentorReducer
