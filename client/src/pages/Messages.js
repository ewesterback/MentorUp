import { React, useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
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
import { Input, Button } from 'react-rainbow-components'
import MessageCard from '../components/MessageCard'

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
  useEffect(() => {
    props.loadThreadsForUser()
    props.setUser()
  }, [])
  const onThreadClick = (threadId) => {
    props.selectThread(threadId)
    props.loadMessages(threadId)
  }

  const handleInput = (e) => {
    props.handleMessage(e.target.value)
  }
  console.log(props.messageState)
  //handle send message
  const onSend = (e) => {
    e.preventDefault()
    console.log(props.messageState)
    props.createNewMessageGivenThread(
      props.messageState.selectedThread,
      props.messageState.messageContent
    )
    props.handleMessage('')
  }
  const mappedThreads = props.messageState.messageThreads.map((thread, i) => (
    <div key={i} onClick={() => onThreadClick(thread.id)}>
      {thread.mentor.id === props.mentorState.user.id ? (
        <div className="message-recipient-name">
          <img className="message-photo" src={thread.mentee.photo} />
          <h4>{thread.mentee.firstName}</h4>
        </div>
      ) : (
        <div className="message-recipient-name">
          <img className="message-photo" src={thread.mentor.photo} />
          <h4>{thread.mentor.firstName}</h4>
        </div>
      )}
      <p>{thread.message.content}</p>
    </div>
  ))
  console.log(props.messageState.messages)
  console.log(props.messageState.messageThreads)
  const mappedMessages = props.messageState.messages.map((message, i) => (
    <div key={i}>
      <MessageCard message={message} />
    </div>
  ))
  return (
    <div className="message-page">
      {!messageClicked ? (
        <div className="side-threads">{mappedThreads}</div>
      ) : (
        <div className="side-messages">
          {mappedMessages}
          <Input
            placeholder="message"
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            value={props.messageState.messageContent}
            onChange={handleInput}
          />
          <Button
            label="Send Message"
            variant="success"
            className="rainbow-m-around_medium"
            onClick={onSend}
          />
        </div>
      )}
      {/* <div className="side-threads">{mappedThreads}</div>
      <div className="side-messages">
        {mappedMessages}
        <Input
          placeholder="message"
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          value={props.messageState.messageContent}
          onChange={handleInput}
        />
        <Button
          label="Send Message"
          variant="success"
          className="rainbow-m-around_medium"
          onClick={onSend}
        />
      </div> */}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages)
