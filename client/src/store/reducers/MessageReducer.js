const {
  LOAD_MESSAGE_FOR_MENTOR,
  LOAD_MESSAGE_FOR_THREAD,
  CREATE_NEW_MESSAGE_AND_THREAD,
  CREATE_NEW_MESSAGE_ON_THREAD,
  UNSELECT_THREAD,
  STAGE_MESSAGE
} = require('../types')

const iState = {
  messageThreads: [],
  selectedThread: null,
  messages: [],
  messageContent: ''
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
    default:
      return { ...state }
  }
}

export default MessageReducer
