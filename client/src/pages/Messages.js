import { React, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  UnselectMentor,
  LoadUserFromToken
} from '../store/actions/MentorActions'
import {
  FindThreadByMentor,
  FindMessagesByThread,
  UnselectThread,
  StageMessage,
  CreateNewThreadWithNewMessage,
  CreateNewMessageGivenThread,
  FindThreadsByUser,
  SelectThread
} from '../store/actions/MessageActions'
import { Input } from 'react-rainbow-components'
import MessageCard from '../components/MessageCard'
import arrow from '../assets/arrow.png'

const mapStateToProps = ({ mentorState, messageState }) => {
  return { mentorState, messageState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    unselectMentor: () => dispatch(UnselectMentor()),
    findThreads: (id) => dispatch(FindThreadByMentor(id)),
    loadMessages: (threadId) => dispatch(FindMessagesByThread(threadId)),
    selectThread: (threadId) => dispatch(SelectThread(threadId)),
    unselectThread: () => dispatch(UnselectThread()),
    handleMessage: (content) => dispatch(StageMessage(content)),
    createNewThreadWithNewMessage: (mentorId, content) =>
      dispatch(CreateNewThreadWithNewMessage(mentorId, content)),
    createNewMessageGivenThread: (threadId, content) =>
      dispatch(CreateNewMessageGivenThread(threadId, content)),
    loadThreadsForUser: () => dispatch(FindThreadsByUser()),
    setUser: () => dispatch(LoadUserFromToken())
  }
}

const Messages = (props) => {
  const [messageClicked, setMessageClicked] = useState(false)
  const [selectedName, setSelectedName] = useState('')
  useEffect(() => {
    props.loadThreadsForUser()
    props.setUser()
  }, [])
  const onThreadClick = (thread) => {
    let threadId = thread.id
    let name = ''
    if (thread.mentor.id === props.mentorState.user.id) {
      name = `${thread.mentee.firstName} ${thread.mentee.lastName}`
    } else {
      name = `${thread.mentor.firstName} ${thread.mentor.lastName}`
    }
    props.selectThread(threadId)
    props.loadMessages(threadId)
    setMessageClicked(true)
    setSelectedName(name)
  }
  const onBackClick = () => {
    setMessageClicked(false)
    setSelectedName('')
  }
  const handleInput = (e) => {
    props.handleMessage(e.target.value)
  }
  //handle send message
  const onSend = (e) => {
    e.preventDefault()
    props.createNewMessageGivenThread(
      props.messageState.selectedThread,
      props.messageState.messageContent
    )
    props.handleMessage('')
  }
  const mappedThreads = props.messageState.messageThreads.map((thread, i) => (
    <div className="thread-card" key={i} onClick={() => onThreadClick(thread)}>
      {thread.mentor.id === props.mentorState.user.id ? (
        <div className="message-recipient-name">
          <img className="message-photo" src={thread.mentee.photo} alt="" />
          <h4>
            {thread.mentee.firstName} {thread.mentee.lastName}
          </h4>
        </div>
      ) : (
        <div className="message-recipient-name">
          <img className="message-photo" src={thread.mentor.photo} alt="" />
          <h4>
            {thread.mentor.firstName} {thread.mentor.lastName}
          </h4>
        </div>
      )}
      {thread.message.userId === props.mentorState.user.id ? (
        <p>You: {thread.message.content}</p>
      ) : (
        <p>
          {thread.message.User.firstName}: {thread.message.content}
        </p>
      )}
    </div>
  ))
  const mappedMessages = props.messageState.messages.map((message, i) => (
    <MessageCard key={i} message={message} />
  ))
  return (
    <div className="message-page">
      {!messageClicked ? (
        <div className="user-threads">{mappedThreads}</div>
      ) : (
        <div className="user-messages">
          <div className="message-header" onClick={onBackClick}>
            <img src={arrow} alt="back arrow" />
            <h4>{selectedName}</h4>
          </div>
          <div className="mapped-messages">{mappedMessages}</div>
          <Input
            placeholder="message"
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto message-input"
            value={props.messageState.messageContent}
            onChange={handleInput}
          />
          <button className="message-send-message" onClick={onSend}>
            Send Message
          </button>
        </div>
      )}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages)
