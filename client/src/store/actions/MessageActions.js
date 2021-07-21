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
  DeleteMessage,
  EditMessage
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
  DELETE_MESSAGE,
  TOGGLE_EDIT_MESSAGE,
  EDIT_MESSAGE,
  STAGE_EDIT_MESSAGE
} from '../types'

//returns thread between user and mentor, specially handling added for if there is not a thread
export const FindThreadByMentor = (id) => {
  return async (dispatch) => {
    try {
      const thread = await LoadMessagesForMentor(id)
      if (thread) {
        let threadId = thread.id
        const messages = await LoadMessagesForThread(threadId)
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
      return 'No messages right now'
    }
  }
}
// finds all threads for the logged in user
export const FindThreadsByUser = () => {
  return async (dispatch) => {
    try {
      const threads = await LoadThreadsForUser()
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
  return async (dispatch) => {
    try {
      const messages = await LoadMessagesForThread(id)
      dispatch({ type: LOAD_MESSAGE_FOR_THREAD, payload: messages })
    } catch (error) {
      return 'error 1'
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
export const DeleteMessageGivenId = (messageId) => {
  return async (dispatch) => {
    try {
      const res = await DeleteMessage(messageId)
      dispatch({ type: DELETE_MESSAGE, payload: messageId })
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

export const StageEditMessage = (content) => ({
  type: STAGE_EDIT_MESSAGE,
  payload: content
})

export const ToggleEditMessage = (id) => ({
  type: TOGGLE_EDIT_MESSAGE,
  payload: id
})

export const EditGivenMessage = (body) => {
  return async (dispatch) => {
    try {
      const res = await EditMessage(body)
      let message = res.data[1][0]
      dispatch({ type: EDIT_MESSAGE, payload: message })
    } catch (error) {
      return alert('Uh oh')
    }
  }
}
