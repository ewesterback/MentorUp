// export const LOAD_MESSAGE_FOR_MENTOR = 'LOAD_MESSAGE_FOR_MENTOR'
// export const LOAD_MESSAGE_FOR_THREAD = 'LOAD_MESSAGE_FOR_THREAD'
// export const CREATE_NEW_MESSAGE_AND_THREAD = 'CREATE_NEW_MESSAGE_AND_THREAD'
// export const CREATE_NEW_MESSAGE_ON_THREAD = 'CREATE_NEW_MESSAGE_ON_THREAD'

import {
  LoadMessagesForMentor,
  LoadMessagesForThread,
  CreateNewThreadAndMessage,
  CreateNewMessage,
  LoadThreadsForUser,
  DeleteMessage
} from '../../services/MessageService'
import {
  LOAD_MESSAGE_FOR_MENTOR,
  LOAD_MESSAGE_FOR_THREAD,
  CREATE_NEW_MESSAGE_AND_THREAD,
  CREATE_NEW_MESSAGE_ON_THREAD,
  UNSELECT_THREAD,
  STAGE_MESSAGE,
  LOAD_THREADS_FOR_USER,
  SELECT_THREAD,
  DELETE_MESSAGE
} from '../types'

//returns thread between user and mentor, specially handling added for if there is not a thread
export const FindThreadByMentor = (id) => {
  return async (dispatch) => {
    try {
      const thread = await LoadMessagesForMentor(id)
      console.log('yoooooooooooooo')
      if (thread) {
        console.log(`ready to call messages for ${thread.id}`)
        let threadId = thread.id
        const messages = await LoadMessagesForThread(threadId)
        console.log('post')
        dispatch({
          type: LOAD_MESSAGE_FOR_MENTOR,
          payload: { thread: thread.id, messages: messages }
        })
      } else {
        dispatch({
          type: LOAD_MESSAGE_FOR_MENTOR,
          payload: { thread: null, messages: [] }
        })
      }
    } catch (error) {
      return alert('No messages right now')
    }
  }
}
// finds all threads for the logged in user
export const FindThreadsByUser = () => {
  return async (dispatch) => {
    try {
      const threads = await LoadThreadsForUser()
      console.log('threads for users')
      console.log(threads)
      dispatch({
        type: LOAD_THREADS_FOR_USER,
        payload: threads
      })
    } catch (error) {
      return error
    }
  }
}
export const FindMessagesByThread = (id) => {
  console.log(`the thread id is ${id}`)
  return async (dispatch) => {
    try {
      const messages = await LoadMessagesForThread(id)
      dispatch({ type: LOAD_MESSAGE_FOR_THREAD, payload: messages })
    } catch (error) {
      return alert('error 1')
    }
  }
}
export const CreateNewThreadWithNewMessage = (mentorId, content) => {
  return async (dispatch) => {
    try {
      const message = await CreateNewThreadAndMessage(mentorId, content)
      dispatch({ type: CREATE_NEW_MESSAGE_AND_THREAD, payload: message })
    } catch (error) {
      return alert('error 2')
    }
  }
}
export const CreateNewMessageGivenThread = (threadId, content) => {
  return async (dispatch) => {
    try {
      const message = await CreateNewMessage(threadId, content)
      console.log(message)
      dispatch({ type: CREATE_NEW_MESSAGE_ON_THREAD, payload: message })
    } catch (error) {
      return alert('error 3')
    }
  }
}
export const DeleteMessageGivenId = (messageId) => {
  return async (dispatch) => {
    try {
      const res = await DeleteMessage(messageId)
      console.log(res)
      dispatch({ type: DELETE_MESSAGE, payload: res })
    } catch (error) {
      return alert('Uh oh')
    }
  }
}
export const SelectThread = (threadId) => ({
  type: SELECT_THREAD,
  payload: threadId
})

export const UnselectThread = () => ({
  type: UNSELECT_THREAD
})

export const StageMessage = (content) => ({
  type: STAGE_MESSAGE,
  payload: content
})
