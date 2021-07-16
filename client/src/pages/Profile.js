import { React, useEffect } from 'react'
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
  FindThreadsByUser
} from '../store/actions/MessageActions'
import { Input, Button } from 'react-rainbow-components'

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
      dispatch(CreateNewMessageGivenThread(threadId, content)),
    loadThreadsForUser: () => dispatch(FindThreadsByUser()),
    setUser: () => dispatch(LoadUserFromToken())
  }
}

const Profile = (props) => {
  //functions
  useEffect(() => {
    props.loadThreadsForUser()
    props.setUser()
  }, [])
  const mappedThreads = props.messageState.messageThreads.map((thread, i) => (
    <div key={i}>
      <p>User ID {props.mentorState.user.id}</p>
      <p>Name 1: {thread.mentee.firstName}</p>
      <p>NAme 2: {thread.mentor.firstName}</p>
      <p>Message: {thread.message.content}</p>
    </div>
  ))
  console.log(props.messageState.messageThreads)
  return (
    <div className="profile-page">
      <p>profile page</p>
      {mappedThreads}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
