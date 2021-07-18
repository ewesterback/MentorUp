import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import // UnselectMentor,
// LoadUserFromToken
'../store/actions/MentorActions'
import {
  // FindThreadByMentor,
  // FindMessagesByThread,
  // UnselectThread,
  StageMessage,
  // CreateNewThreadWithNewMessage,
  CreateNewMessageGivenThread,
  // FindThreadsByUser,
  // SelectThread
  DeleteMessageGivenId
} from '../store/actions/MessageActions'
import { Input, Button } from 'react-rainbow-components'
import moment from 'moment'

const mapStateToProps = ({ mentorState, messageState }) => {
  return { mentorState, messageState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // unselectMentor: () => dispatch(UnselectMentor()),
    // findThreads: (id) => dispatch(FindThreadByMentor(id)),
    // loadMessages: (threadId) => dispatch(FindMessagesByThread(threadId)),
    // selectThread: (threadId) => dispatch(SelectThread(threadId)),
    // unselectThread: () => dispatch(UnselectThread()),
    handleMessage: (content) => dispatch(StageMessage(content)),
    // createNewThreadWithNewMessage: (mentorId, content) =>
    //   dispatch(CreateNewThreadWithNewMessage(mentorId, content)),
    createNewMessageGivenThread: (threadId, content) =>
      dispatch(CreateNewMessageGivenThread(threadId, content)),
    // loadThreadsForUser: () => dispatch(FindThreadsByUser()),
    // setUser: () => dispatch(LoadUserFromToken())
    deleteMessage: (messageId) => dispatch(DeleteMessageGivenId(messageId))
  }
}

const MessageCard = (props) => {
  console.log(props.message)
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
  const onDelete = (id) => {
    console.log(id)
    props.deleteMessage(id)
  }
  return (
    <div className="message-card">
      {/* <p>profile page</p>
      <div>{mappedThreads}</div>
      <p>******** Messages **************</p>
      <div>{mappedMessages}</div> */}
      <p
        className={
          props.message.User.id === props.mentorState.user.id
            ? 'sender-message'
            : 'recipient-message'
        }
      >
        {props.message.content}
      </p>
      <p>
        {moment(props.message.updatedAt).format(
          'dddd, MMMM Do YYYY, h:mm:ss a'
        )}
      </p>
      <Button
        label="Delete"
        onClick={() => {
          onDelete(props.message.id)
        }}
      />

      {/* <Input
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
      /> */}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageCard)
