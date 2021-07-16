// export const LOAD_MESSAGE_FOR_MENTOR = 'LOAD_MESSAGE_FOR_MENTOR'
// export const LOAD_MESSAGE_FOR_THREAD = 'LOAD_MESSAGE_FOR_THREAD'
// export const CREATE_NEW_MESSAGE_AND_THREAD = 'CREATE_NEW_MESSAGE_AND_THREAD'
// export const CREATE_NEW_MESSAGE_ON_THREAD = 'CREATE_NEW_MESSAGE_ON_THREAD'

import {
  LoadMessagesForMentor,
  LoadMessagesForThread,
  CreateNewThreadAndMessage,
  CreateNewMessage
} from '../../services/MessageService'
import {
  LOAD_MESSAGE_FOR_MENTOR,
  LOAD_MESSAGE_FOR_THREAD,
  CREATE_NEW_MESSAGE_AND_THREAD,
  CREATE_NEW_MESSAGE_ON_THREAD,
  UNSELECT_THREAD,
  STAGE_MESSAGE
} from '../types'

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
      dispatch({ type: CREATE_NEW_MESSAGE_ON_THREAD, payload: message })
    } catch (error) {
      return alert('error 3')
    }
  }
}

export const UnselectThread = () => ({
  type: UNSELECT_THREAD
})

export const StageMessage = (content) => ({
  type: STAGE_MESSAGE,
  payload: content
})
