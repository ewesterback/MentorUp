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
  console.log('hi!')
  useEffect(() => {
    props.findThreads(props.mentorState.selectedMentor.id)
  }, [])
  const handleInput = (e) => {
    props.handleMessage(e.target.value)
  }
  console.log(props.messageState)
  const onSend = () => {
    console.log(props.messageState)
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
  const onClick = () => {
    props.unselectMentor()
    props.unselectThread()
    props.history.push(`/mentors`)
  }
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
