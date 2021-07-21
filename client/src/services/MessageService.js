//import API from './'
import axios from 'axios'
import { BASE_URL } from '../globals'

export const LoadMessagesForMentor = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/thread/mentor/${id}`)
    return res.data[0]
  } catch (error) {
    return null
  }
}
export const LoadThreadsForUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/thread/user`)
    return res.data
  } catch (error) {
    return null
  }
}
// ------------------------------
// Message APIs
// _______________________________

export const LoadMessagesForThread = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/message/id/${id}`)
    return res.data
  } catch (error) {
    return null
  }
}

export const CreateNewThreadAndMessage = async (mentorId, content) => {
  try {
    const threadRes = await axios.post(`${BASE_URL}/thread/${mentorId}`)
    let threadId = threadRes.data.id
    const body = {
      threadId: threadId,
      content: content
    }
    const res = await axios.post(`${BASE_URL}/message/create`, body)
    return res.data
  } catch (error) {
    return null
  }
}
export const CreateNewMessage = async (threadId, content) => {
  try {
    const body = {
      threadId: threadId,
      content: content
    }
    const res = await axios.post(`${BASE_URL}/message/create`, body)
    return res.data
  } catch (error) {
    return null
  }
}
export const DeleteMessage = async (messageId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/message/${messageId}`)
    return res
  } catch (error) {
    return null
  }
}

export const EditMessage = async (body) => {
  let message = { content: body.content }
  try {
    const res = await axios.put(`${BASE_URL}/message/${body.id}`, message)
    return res
  } catch (error) {
    return null
  }
}
