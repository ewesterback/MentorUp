const {
  LOAD_MESSAGE_FOR_MENTOR,
  LOAD_MESSAGE_FOR_THREAD,
  CREATE_NEW_MESSAGE_AND_THREAD,
  CREATE_NEW_MESSAGE_ON_THREAD,
  UNSELECT_THREAD,
  STAGE_MESSAGE,
  LOAD_THREADS_FOR_USER,
  SELECT_THREAD,
  DELETE_MESSAGE,
  TOGGLE_EDIT_MESSAGE,
  EDIT_MESSAGE,
  STAGE_EDIT_MESSAGE
} = require('../types')

const iState = {
  messageThreads: [],
  selectedThread: null,
  messages: [],
  messageContent: '',
  editMessage: null,
  editMessageContent: ''
}

const MessageReducer = (state = iState, action) => {
  switch (action.type) {
    case LOAD_MESSAGE_FOR_MENTOR:
      console.log('reducer')
      return {
        ...state,
        selectedThread: action.payload.thread,
        messages: action.payload.messages
      }
    case LOAD_THREADS_FOR_USER:
      return {
        ...state,
        messageThreads: action.payload
      }
    case LOAD_MESSAGE_FOR_THREAD:
      return {
        ...state,
        messages: action.payload
      }
    case CREATE_NEW_MESSAGE_AND_THREAD:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        selectedThread: action.payload.threadId
      }
    case CREATE_NEW_MESSAGE_ON_THREAD:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    case SELECT_THREAD:
      return {
        ...state,
        selectedThread: action.payload
      }
    case UNSELECT_THREAD:
      console.log('made it to unselect')
      return {
        ...state,
        messages: [],
        selectedThread: null
      }
    case STAGE_MESSAGE:
      return {
        ...state,
        messageContent: action.payload
      }
    case STAGE_EDIT_MESSAGE:
      return {
        ...state,
        editMessageContent: action.payload
      }
    case DELETE_MESSAGE:
      console.log(action.payload)
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload
        )
      }
    case EDIT_MESSAGE:
      console.log(action.payload)
      // state.messages.forEach((message)=>{
      //   if (message.id == action.payload.id) {
      //     message.content = action.payload.content
      //   }
      // })
      return {
        ...state,
        messageContent: '',
        message: state.messages.forEach((message) => {
          if (message.id === action.payload.id) {
            message.content = action.payload.content
          }
        })
      }
    case TOGGLE_EDIT_MESSAGE:
      return {
        ...state,
        editMessage: action.payload
      }
    default:
      return { ...state }
  }
}

export default MessageReducer
