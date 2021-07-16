//import API from './'
import axios from 'axios'
import { BASE_URL } from '../globals'

export const LoadMessagesForMentor = async (id) => {
  console.log('load messages for mentor')
  try {
    //const res = await API.get(`/thread/mentor/${id}`)
    const res = await axios.get(`${BASE_URL}/thread/mentor/${id}`)
    console.log(res.data)
    return res.data[0]
  } catch (error) {
    return null
  }
}
export const LoadThreadsForUser = async () => {
  console.log('load messages for user')
  try {
    const res = await axios.get(`${BASE_URL}/thread/user`)
    console.log(res.data)
    return res.data
  } catch (error) {
    return null
  }
}
// ------------------------------
// Message APIs
// _______________________________

export const LoadMessagesForThread = async (id) => {
  console.log('load messages for thread')
  console.log(id)
  try {
    const res = await axios.get(`${BASE_URL}/message/id/${id}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    return null
  }
}

export const CreateNewThreadAndMessage = async (mentorId, content) => {
  console.log('create new thread and message')
  try {
    const threadRes = await axios.post(`${BASE_URL}/thread/${mentorId}`)
    console.log(threadRes)
    let threadId = threadRes.data.id
    const body = {
      threadId: threadId,
      content: content
    }
    const res = await axios.post(`${BASE_URL}/message/create`, body)
    console.log(res.data)
    return res.data
  } catch (error) {
    return null
  }
}
export const CreateNewMessage = async (threadId, content) => {
  console.log('create new message')
  try {
    const body = {
      threadId: threadId,
      content: content
    }
    const res = await axios.post(`${BASE_URL}/message/create`, body)
    console.log(res.data)
    return res.data
  } catch (error) {
    return null
  }
}
