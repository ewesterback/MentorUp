import { React, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { UnselectMentor } from '../store/actions/MentorActions'
import {
  FindThreadByMentor,
  FindMessagesByThread,
  UnselectThread,
  StageMessage,
  CreateNewThreadWithNewMessage,
  CreateNewMessageGivenThread
} from '../store/actions/MessageActions'
import { Input, Button } from 'react-rainbow-components'
import MentorCard from '../components/MentorCard'

const mapStateToProps = ({ mentorState, messageState }) => {
  return { mentorState, messageState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    unselectMentor: () => dispatch(UnselectMentor()),
    findThreads: (id) => dispatch(FindThreadByMentor(id)),
    loadMessages: (threadId) => dispatch(FindMessagesByThread(threadId)),
    unselectThread: () => dispatch(UnselectThread()),
    handleMessage: (content) => dispatch(StageMessage(content)),
    createNewThreadWithNewMessage: (mentorId, content) =>
      dispatch(CreateNewThreadWithNewMessage(mentorId, content)),
    createNewMessageGivenThread: (threadId, content) =>
      dispatch(CreateNewMessageGivenThread(threadId, content))
  }
}

const MentorDetail = (props) => {
  //finds message thread between user and mentor if there is one
  useEffect(() => {
    props.findThreads(props.mentorState.selectedMentor.id)
  }, [])
  //handles message input
  const handleInput = (e) => {
    props.handleMessage(e.target.value)
  }
  //handle send message
  const onSend = (e) => {
    e.preventDefault()
    if (!props.messageState.selectedThread) {
      props.createNewThreadWithNewMessage(
        props.mentorState.selectedMentor.id,
        props.messageState.messageContent
      )
    } else {
      props.createNewMessageGivenThread(
        props.messageState.selectedThread,
        props.messageState.messageContent
      )
    }
    props.handleMessage('')
  }
  //handle back to mentor search
  const onClick = (e) => {
    e.preventDefault()
    props.unselectMentor()
    props.unselectThread()
    props.history.push(`/mentors`)
  }
  //maps all of the messages between user and mentor
  const mappedMessages = props.messageState.messages.map((message, i) => (
    <p key={i}>{message.content}</p>
  ))
  return (
    <div className="mentor-detail-page">
      <Button label="Go Back to Mentor Search" onClick={onClick} />
      <div className="mentor-detail">
        <p>mentor details</p>
        <p>{props.mentorState.selectedMentor.firstName}</p>
      </div>
      <div className="messaging-pane">
        <p>load messages here</p>
        {props.messageState.selectedThread ? (
          <p>{props.messageState.selectedThread}</p>
        ) : null}
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
      <p>mentors</p>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(MentorDetail)
